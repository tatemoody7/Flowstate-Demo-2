import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "@/screens/WelcomeScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import SchoolSelectionScreen from "@/screens/SchoolSelectionScreen";
import LocationPermissionScreen from "@/screens/LocationPermissionScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { SchoolColors } from "@/constants/theme";

export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  SchoolSelection: { email: string };
  LocationPermission: { email: string; school: keyof typeof SchoolColors };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="SchoolSelection"
        component={SchoolSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
