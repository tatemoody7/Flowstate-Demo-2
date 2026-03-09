import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNavigator from "@/navigation/AuthStackNavigator";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import ScannerScreen from "@/screens/ScannerScreen";
import PlaceDetailScreen from "@/screens/PlaceDetailScreen";
import ProductDetailScreen from "@/screens/ProductDetailScreen";
import StoreProductsScreen from "@/screens/StoreProductsScreen";
import { ScreenErrorBoundary } from "@/components/ScreenErrorBoundary";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useApp } from "@/context/AppContext";
import { Place, ScannedFood } from "@/data/mockData";

/** Wrapped modal screens with per-screen error boundaries */
function WrappedScannerScreen() {
  return (
    <ScreenErrorBoundary>
      <ScannerScreen />
    </ScreenErrorBoundary>
  );
}

function WrappedPlaceDetailScreen(props: any) {
  return (
    <ScreenErrorBoundary>
      <PlaceDetailScreen {...props} />
    </ScreenErrorBoundary>
  );
}

function WrappedProductDetailScreen(props: any) {
  return (
    <ScreenErrorBoundary>
      <ProductDetailScreen {...props} />
    </ScreenErrorBoundary>
  );
}

function WrappedStoreProductsScreen(props: any) {
  return (
    <ScreenErrorBoundary>
      <StoreProductsScreen {...props} />
    </ScreenErrorBoundary>
  );
}

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
            component={WrappedScannerScreen}
            options={{
              headerShown: false,
              presentation: "fullScreenModal",
            }}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={WrappedPlaceDetailScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={WrappedProductDetailScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="StoreProducts"
            component={WrappedStoreProductsScreen}
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
