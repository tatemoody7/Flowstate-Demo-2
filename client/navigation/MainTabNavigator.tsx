import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";

import DiscoverStackNavigator from "@/navigation/DiscoverStackNavigator";
import SavedStackNavigator from "@/navigation/SavedStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { FlowstateColors, Shadows, Spacing } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

export type MainTabParamList = {
  DiscoverTab: undefined;
  SavedTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function ScannerFAB() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("Scanner");
  };

  return (
    <Pressable onPress={handlePress} style={styles.fabContainer}>
      <View style={styles.fab}>
        <Feather name="camera" size={24} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="DiscoverTab"
        screenOptions={{
          tabBarActiveTintColor: FlowstateColors.primary,
          tabBarInactiveTintColor: FlowstateColors.textSecondary,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: Platform.select({
              ios: "transparent",
              android: theme.backgroundRoot,
            }),
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarBackground: () =>
            Platform.OS === "ios" ? (
              <BlurView
                intensity={100}
                tint={isDark ? "dark" : "light"}
                style={StyleSheet.absoluteFill}
              />
            ) : null,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="DiscoverTab"
          component={DiscoverStackNavigator}
          options={{
            title: "Discover",
            tabBarIcon: ({ color, size }) => (
              <Feather name="compass" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SavedTab"
          component={SavedStackNavigator}
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <ScannerFAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    zIndex: 100,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: FlowstateColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.fab,
  },
});
