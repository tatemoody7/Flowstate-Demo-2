import React, { useState } from "react";
import { StyleSheet, View, Image, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius, SchoolColors } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";

type LocationPermissionScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "LocationPermission">;
  route: RouteProp<AuthStackParamList, "LocationPermission">;
};

export default function LocationPermissionScreen({
  navigation,
  route,
}: LocationPermissionScreenProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { setUser, setIsOnboarded } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = Location.useForegroundPermissions();

  const completeOnboarding = async (locationEnabled: boolean) => {
    await setUser({
      email: route.params.email,
      school: route.params.school,
      locationEnabled,
    });
    await setIsOnboarded(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleAllowLocation = async () => {
    setIsLoading(true);

    try {
      if (!permission?.granted) {
        const result = await requestPermission();
        if (result.granted) {
          await completeOnboarding(true);
        } else if (!result.canAskAgain && Platform.OS !== "web") {
          try {
            await Linking.openSettings();
          } catch (error) {
            // openSettings not supported
          }
        }
      } else {
        await completeOnboarding(true);
      }
    } catch (error) {
      console.error("Error requesting location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    await completeOnboarding(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundRoot,
          paddingTop: insets.top + Spacing["4xl"],
          paddingBottom: insets.bottom + Spacing["2xl"],
        },
      ]}
    >
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/location-permission.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.textContainer}>
        <ThemedText type="h1" style={styles.title}>
          Find Healthy Spots Nearby
        </ThemedText>
        <ThemedText type="body" style={styles.description}>
          Allow location access to discover restaurants, gyms, and grocery stores near your campus with student discounts.
        </ThemedText>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.benefits}>
        <View style={styles.benefitRow}>
          <View style={styles.benefitIcon}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: FlowstateColors.primaryLighter },
              ]}
            >
              <Image
                source={require("../../assets/images/empty-discover.png")}
                style={styles.benefitImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.benefitText}>
            <ThemedText type="h4" style={styles.benefitTitle}>
              Nearby Places
            </ThemedText>
            <ThemedText type="small" style={styles.benefitDesc}>
              See what's closest to you right now
            </ThemedText>
          </View>
        </View>

        <View style={styles.benefitRow}>
          <View style={styles.benefitIcon}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: `${FlowstateColors.secondary}15` },
              ]}
            >
              <Image
                source={require("../../assets/images/empty-saved.png")}
                style={styles.benefitImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.benefitText}>
            <ThemedText type="h4" style={styles.benefitTitle}>
              Distance Info
            </ThemedText>
            <ThemedText type="small" style={styles.benefitDesc}>
              Know exactly how far each spot is
            </ThemedText>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.buttonContainer}>
        <Button
          onPress={handleAllowLocation}
          disabled={isLoading}
          style={styles.allowButton}
        >
          {isLoading ? "Enabling..." : "Allow Location"}
        </Button>
        <ThemedText type="body" style={styles.skipButton} onPress={handleSkip}>
          Maybe Later
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing["2xl"],
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  illustration: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.md,
    color: FlowstateColors.textPrimary,
  },
  description: {
    textAlign: "center",
    color: FlowstateColors.textSecondary,
    paddingHorizontal: Spacing.lg,
  },
  benefits: {
    gap: Spacing.lg,
    marginBottom: Spacing["3xl"],
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  benefitIcon: {
    marginRight: Spacing.lg,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  benefitImage: {
    width: 32,
    height: 32,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  benefitDesc: {
    color: FlowstateColors.textSecondary,
  },
  buttonContainer: {
    marginTop: "auto",
    alignItems: "center",
  },
  allowButton: {
    width: "100%",
    backgroundColor: FlowstateColors.primary,
    marginBottom: Spacing.lg,
  },
  skipButton: {
    color: FlowstateColors.textSecondary,
    textDecorationLine: "underline",
  },
});
