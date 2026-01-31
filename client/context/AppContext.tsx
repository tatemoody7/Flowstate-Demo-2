import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SchoolColors } from "@/constants/theme";

interface User {
  email: string;
  school: keyof typeof SchoolColors;
  locationEnabled: boolean;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "@flowstate_user",
  ONBOARDED: "@flowstate_onboarded",
  SAVED_PLACES: "@flowstate_saved_places",
  SAVED_FOODS: "@flowstate_saved_foods",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [savedFoods, setSavedFoods] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [storedUser, storedOnboarded, storedPlaces, storedFoods] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_PLACES),
        AsyncStorage.getItem(STORAGE_KEYS.SAVED_FOODS),
      ]);

      if (storedUser) setUserState(JSON.parse(storedUser));
      if (storedOnboarded) setIsOnboardedState(JSON.parse(storedOnboarded));
      if (storedPlaces) setSavedPlaces(JSON.parse(storedPlaces));
      if (storedFoods) setSavedFoods(JSON.parse(storedFoods));
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
