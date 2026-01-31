import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedScreen from "@/screens/SavedScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type SavedStackParamList = {
  Saved: undefined;
};

const Stack = createNativeStackNavigator<SavedStackParamList>();

export default function SavedStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: "Saved",
        }}
      />
    </Stack.Navigator>
  );
}
