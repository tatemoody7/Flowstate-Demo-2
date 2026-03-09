import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Platform, Text, Animated as RNAnimated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";

import DiscoverStackNavigator from "@/navigation/DiscoverStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { ScreenErrorBoundary } from "@/components/ScreenErrorBoundary";
import { useTheme } from "@/hooks/useTheme";
import { FlowstateColors, Spacing, Shadows } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

/** Wrapped stack navigators with per-screen error boundaries */
function WrappedDiscoverStack() {
  return (
    <ScreenErrorBoundary>
      <DiscoverStackNavigator />
    </ScreenErrorBoundary>
  );
}

function WrappedProfileStack() {
  return (
    <ScreenErrorBoundary>
      <ProfileStackNavigator />
    </ScreenErrorBoundary>
  );
}

export type MainTabParamList = {
  DiscoverTab: undefined;
  ScanTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function EmptyScanScreen() {
  return <View style={{ flex: 1 }} />;
}

/** Pulsing gradient scan button */
function ScanFab() {
  const pulseAnim = useRef(new RNAnimated.Value(1)).current;
  const glowOpacity = useRef(new RNAnimated.Value(0.4)).current;

  useEffect(() => {
    const pulse = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 1400,
          useNativeDriver: true,
        }),
        RNAnimated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    );
    const glow = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(glowOpacity, {
          toValue: 0.1,
          duration: 1400,
          useNativeDriver: true,
        }),
        RNAnimated.timing(glowOpacity, {
          toValue: 0.4,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    glow.start();
    return () => { pulse.stop(); glow.stop(); };
  }, [pulseAnim, glowOpacity]);

  return (
    <View style={styles.scanFabWrapper}>
      {/* Outer glow ring */}
      <RNAnimated.View
        style={[
          styles.scanGlowRing,
          { transform: [{ scale: pulseAnim }], opacity: glowOpacity },
        ]}
      />
      {/* Inner glow ring */}
      <RNAnimated.View
        style={[
          styles.scanGlowRingInner,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      {/* Gradient button */}
      <View style={styles.scanFab}>
        <LinearGradient
          colors={[FlowstateColors.primary, FlowstateColors.accent, FlowstateColors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.scanFabGradient}
        />
        <Feather name="camera" size={26} color="#FFFFFF" />
      </View>
    </View>
  );
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
          height: 76,
          borderRadius: 38,
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
              style={[StyleSheet.absoluteFill, { borderRadius: 38, overflow: "hidden" }]}
            />
          ) : null,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DiscoverTab"
        component={WrappedDiscoverStack}
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <Feather name="compass" size={24} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Discover</Text>
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
          tabBarIcon: () => <ScanFab />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={WrappedProfileStack}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Profile</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2,
  },
  scanFabWrapper: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  scanGlowRing: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: FlowstateColors.accent,
  },
  scanGlowRingInner: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "transparent",
  },
  scanFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: FlowstateColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
  scanFabGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
