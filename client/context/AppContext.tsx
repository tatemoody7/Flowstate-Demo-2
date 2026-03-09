import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SchoolColors } from "@/constants/theme";
import type { ScannedFood } from "@/data/mockData";
import { mockScannedFoods } from "@/data/mockData";

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
  savedFoods: ScannedFood[];
  savedFoodIds: Set<string>;
  toggleSavedPlace: (id: string) => void;
  toggleSavedFood: (food: ScannedFood) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "@flowstate_user",
  ONBOARDED: "@flowstate_onboarded",
  SAVED_PLACES: "@flowstate_saved_places",
  SAVED_FOODS: "@flowstate_saved_foods",
};

/**
 * Migrate old string[] format to ScannedFood[] format.
 * Old format stored just IDs like ["f1", "f2", "db-123"].
 * New format stores full objects. We can only recover mock IDs (f1-f7).
 */
function migrateSavedFoods(stored: unknown): ScannedFood[] {
  if (!Array.isArray(stored) || stored.length === 0) return [];

  // Already new format — items are objects with an `id` field
  if (typeof stored[0] === "object" && stored[0] !== null && "id" in stored[0]) {
    return stored as ScannedFood[];
  }

  // Old format — array of string IDs. Recover what we can from mock data.
  if (typeof stored[0] === "string") {
    return (stored as string[])
      .map((id) => mockScannedFoods.find((f) => f.id === id))
      .filter((f): f is ScannedFood => f !== undefined);
  }

  return [];
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<string[]>([]);
  const [savedFoods, setSavedFoods] = useState<ScannedFood[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Derived set for O(1) lookups
  const savedFoodIds = useMemo(
    () => new Set(savedFoods.map((f) => f.id)),
    [savedFoods],
  );

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
      if (storedFoods) {
        const parsed = JSON.parse(storedFoods);
        const migrated = migrateSavedFoods(parsed);
        setSavedFoods(migrated);
        // Persist migrated format back if it was the old string[] format
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") {
          await AsyncStorage.setItem(STORAGE_KEYS.SAVED_FOODS, JSON.stringify(migrated));
        }
      }
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

  const toggleSavedPlace = (id: string) => {
    setSavedPlaces((prev) => {
      const next = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id];
      AsyncStorage.setItem(STORAGE_KEYS.SAVED_PLACES, JSON.stringify(next));
      return next;
    });
  };

  const toggleSavedFood = (food: ScannedFood) => {
    setSavedFoods((prev) => {
      const exists = prev.some((f) => f.id === food.id);
      const next = exists
        ? prev.filter((f) => f.id !== food.id)
        : [...prev, food];
      AsyncStorage.setItem(STORAGE_KEYS.SAVED_FOODS, JSON.stringify(next));
      return next;
    });
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
        savedFoodIds,
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
