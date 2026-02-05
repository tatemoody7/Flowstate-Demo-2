import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import DiscoverStackNavigator from "@/navigation/DiscoverStackNavigator";
import SavedStackNavigator from "@/navigation/SavedStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { FlowstateColors, Shadows, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type MainTabParamList = {
  DiscoverTab: undefined;
  SavedTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function ScannerFAB() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("Scanner");
  };

  return (
    <AnimatedPressable 
      onPress={handlePress} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.fabContainer, animatedStyle]}
    >
      <LinearGradient
        colors={[FlowstateColors.secondary, "#00C865"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fab}
      >
        <Feather name="camera" size={26} color="#FFFFFF" />
      </LinearGradient>
    </AnimatedPressable>
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
    bottom: 32,
    alignSelf: "center",
    zIndex: 100,
    shadowColor: FlowstateColors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.9)",
  },
});
