import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNavigator from "@/navigation/AuthStackNavigator";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import ScannerScreen from "@/screens/ScannerScreen";
import PlaceDetailScreen from "@/screens/PlaceDetailScreen";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useApp } from "@/context/AppContext";
import { Place, ScannedFood } from "@/data/mockData";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Scanner: undefined;
  PlaceDetail: { place: Place };
  FoodDetail: { food: ScannedFood };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();
  const { isOnboarded } = useApp();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!isOnboarded ? (
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Scanner"
            component={ScannerScreen}
            options={{
              headerShown: false,
              presentation: "fullScreenModal",
            }}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetailScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="FoodDetail"
            component={FoodDetailScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
