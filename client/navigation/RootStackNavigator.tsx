import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNavigator from "@/navigation/AuthStackNavigator";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import ScannerScreen from "@/screens/ScannerScreen";
import PlaceDetailScreen from "@/screens/PlaceDetailScreen";
import ProductDetailScreen from "@/screens/ProductDetailScreen";
import StoreProductsScreen from "@/screens/StoreProductsScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useApp } from "@/context/AppContext";
import { Place, ScannedFood } from "@/data/mockData";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Scanner: undefined;
  PlaceDetail: { place: Place };
  ProductDetail: { product: ScannedFood };
  StoreProducts: { place: Place };
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
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="StoreProducts"
            component={StoreProductsScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
