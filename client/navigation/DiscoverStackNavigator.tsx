import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DiscoverScreen from "@/screens/DiscoverScreen";
import ProductDatabaseScreen from "@/screens/ProductDatabaseScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type DiscoverStackParamList = {
  Discover: undefined;
  ProductDatabase: undefined;
};

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export default function DiscoverStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Flowstate" variant="light" />,
          headerStyle: { backgroundColor: "transparent" },
          headerBlurEffect: undefined,
        }}
      />
      <Stack.Screen
        name="ProductDatabase"
        component={ProductDatabaseScreen}
        options={{
          title: "Product Database",
        }}
      />
    </Stack.Navigator>
  );
}
