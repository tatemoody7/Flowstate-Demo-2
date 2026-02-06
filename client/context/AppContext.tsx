import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SchoolColors } from "@/constants/theme";

interface User {
  email: string;
  school: keyof typeof SchoolColors;
  locationEnabled: boolean;
}

export interface FlowDay {
  date: string;
  nourish: boolean;
  move: boolean;
  rest: boolean;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  schoolColors: typeof SchoolColors.fgcu;
  setUser: (user: User | null) => void;
  setIsOnboarded: (value: boolean) => void;
  logout: () => Promise<void>;
  savedPlaces: string[];
  savedFoods: string[];
  toggleSavedPlace: (id: string) => void;
  toggleSavedFood: (id: string) => void;
  flowToday: FlowDay;
  toggleFlowPillar: (pillar: "nourish" | "move" | "rest") => void;
  isInFlow: boolean;
  currentStreak: number;
  bestStreak: number;
  weeklyFlow: FlowDay[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "@flowstate_user",
  ONBOARDED: "@flowstate_onboarded",
  SAVED_PLACES: "@flowstate_saved_places",
  SAVED_FOODS: "@flowstate_saved_foods",
  FLOW_DATA: "@flowstate_flow_data",
};

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function getEmptyFlowDay(date: string): FlowDay {
  return { date, nourish: false, move: false, rest: false };
}

function isFlowComplete(day: FlowDay): boolean {
  return day.nourish && day.move && day.rest;
}

function calculateStreak(flowDays: FlowDay[]): number {
  const sorted = [...flowDays]
    .filter(d => isFlowComplete(d))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) return 0;

  const today = getTodayString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (sorted[0].date !== today && sorted[0].date !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(sorted[i - 1].date);
    const currDate = new Date(sorted[i].date);
    const diffDays = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateBestStreak(flowDays: FlowDay[]): number {
  const completeDays = flowDays
    .filter(d => isFlowComplete(d))
    .map(d => d.date)
    .sort();

  if (completeDays.length === 0) return 0;

  let best = 1;
  let current = 1;
  for (let i = 1; i < completeDays.length; i++) {
    const prev = new Date(completeDays[i - 1]);
    const curr = new Date(completeDays[i]);
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diffDays) === 1) {
      current++;
      if (current > best) best = current;
    } else {
      current = 1;
    }
  }
  return best;
}

function getWeeklyFlow(flowDays: FlowDay[]): FlowDay[] {
  const week: FlowDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const existing = flowDays.find(fd => fd.date === dateStr);
    week.push(existing || getEmptyFlowDay(dateStr));
  }
  return week;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [savedFoods, setSavedFoods] = useState<string[]>([]);
  const [flowDays, setFlowDays] = useState<FlowDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [storedUser, storedOnboarded, storedPlaces, storedFoods, storedFlow] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_PLACES),
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_FOODS),
        AsyncStorage.getItem(STORAGE_KEYS.FLOW_DATA),
      ]);

      if (storedUser) setUserState(JSON.parse(storedUser));
      if (storedOnboarded) setIsOnboardedState(JSON.parse(storedOnboarded));
      if (storedPlaces) setSavedPlaces(JSON.parse(storedPlaces));
      if (storedFoods) setSavedFoods(JSON.parse(storedFoods));
      if (storedFlow) setFlowDays(JSON.parse(storedFlow));
    } catch (error) {
      console.error("Error loading stored data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUser = async (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    }
  };

  const setIsOnboarded = async (value: boolean) => {
    setIsOnboardedState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED, JSON.stringify(value));
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.ONBOARDED,
      STORAGE_KEYS.SAVED_PLACES,
      STORAGE_KEYS.SAVED_FOODS,
    ]);
    setUserState(null);
    setIsOnboardedState(false);
    setSavedPlaces([]);
    setSavedFoods([]);
  };

  const toggleSavedPlace = async (id: string) => {
    const newPlaces = savedPlaces.includes(id)
      ? savedPlaces.filter((p) => p !== id)
      : [...savedPlaces, id];
    setSavedPlaces(newPlaces);
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_PLACES, JSON.stringify(newPlaces));
  };

  const toggleSavedFood = async (id: string) => {
    const newFoods = savedFoods.includes(id)
      ? savedFoods.filter((f) => f !== id)
      : [...savedFoods, id];
    setSavedFoods(newFoods);
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_FOODS, JSON.stringify(newFoods));
  };

  const toggleFlowPillar = useCallback(async (pillar: "nourish" | "move" | "rest") => {
    const today = getTodayString();
    const existingIndex = flowDays.findIndex(d => d.date === today);
    let updatedDays: FlowDay[];

    if (existingIndex >= 0) {
      updatedDays = [...flowDays];
      updatedDays[existingIndex] = {
        ...updatedDays[existingIndex],
        [pillar]: !updatedDays[existingIndex][pillar],
      };
    } else {
      const newDay = getEmptyFlowDay(today);
      newDay[pillar] = true;
      updatedDays = [...flowDays, newDay];
    }

    setFlowDays(updatedDays);
    await AsyncStorage.setItem(STORAGE_KEYS.FLOW_DATA, JSON.stringify(updatedDays));
  }, [flowDays]);

  const flowToday = flowDays.find(d => d.date === getTodayString()) || getEmptyFlowDay(getTodayString());
  const isInFlow = isFlowComplete(flowToday);
  const currentStreak = calculateStreak(flowDays);
  const bestStreak = calculateBestStreak(flowDays);
  const weeklyFlow = getWeeklyFlow(flowDays);

  const schoolColors = user?.school ? SchoolColors[user.school] : SchoolColors.fgcu;

  if (isLoading) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isOnboarded,
        schoolColors,
        setUser,
        setIsOnboarded,
        logout,
        savedPlaces,
        savedFoods,
        toggleSavedPlace,
        toggleSavedFood,
        flowToday,
        toggleFlowPillar,
        isInFlow,
        currentStreak,
        bestStreak,
        weeklyFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
