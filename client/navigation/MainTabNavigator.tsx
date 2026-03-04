import React from "react";
import { StyleSheet, View, Platform, Pressable, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";

import DiscoverStackNavigator from "@/navigation/DiscoverStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { FlowstateColors, Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

export type MainTabParamList = {
  DiscoverTab: undefined;
  ScanTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function EmptyScanScreen() {
  return <View style={{ flex: 1 }} />;
}

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="DiscoverTab"
      screenOptions={{
        tabBarActiveTintColor: FlowstateColors.primary,
        tabBarInactiveTintColor: FlowstateColors.textSecondary,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, 12),
          left: Spacing.sm,
          right: Spacing.sm,
          height: 70,
          borderRadius: 35,
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
          ...Shadows.large,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={80}
              tint={isDark ? "dark" : "light"}
              style={[StyleSheet.absoluteFill, { borderRadius: 35, overflow: "hidden" }]}
            />
          ) : null,
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DiscoverTab"
        component={DiscoverStackNavigator}
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <Feather name="compass" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={[styles.tabLabel, { color }]}
            >
              Discover
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ScanTab"
        component={EmptyScanScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate("Scanner");
          },
        }}
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.scanFabOuter}>
              <View style={styles.scanFab}>
                <Feather name="camera" size={22} color="#FFFFFF" />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={[styles.tabLabel, { color }]}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 2,
  },
  scanFabOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(31, 128, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scanFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: FlowstateColors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: FlowstateColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
