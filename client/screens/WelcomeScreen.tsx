import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Welcome">;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[FlowstateColors.primary, FlowstateColors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          { paddingTop: insets.top + Spacing["4xl"], paddingBottom: insets.bottom + Spacing["2xl"] },
        ]}
      >
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.textContainer}>
          <ThemedText type="hero" style={styles.title}>
            Flowstate
          </ThemedText>
          <ThemedText type="body" style={styles.tagline}>
            Your Campus Health Companion
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.features}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <ThemedText style={styles.featureEmoji}>
                <View style={styles.iconCircle}>
                  <Image
                    source={require("../../assets/images/location-permission.png")}
                    style={styles.featureImage}
                    resizeMode="contain"
                  />
                </View>
              </ThemedText>
            </View>
            <View style={styles.featureText}>
              <ThemedText type="h4" style={styles.featureTitle}>
                Discover Healthy Spots
              </ThemedText>
              <ThemedText type="small" style={styles.featureDesc}>
                Find restaurants, gyms, and grocery stores near campus
              </ThemedText>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <View style={styles.iconCircle}>
                <Image
                  source={require("../../assets/images/camera-prompt.png")}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.featureText}>
              <ThemedText type="h4" style={styles.featureTitle}>
                Scan Food Items
              </ThemedText>
              <ThemedText type="small" style={styles.featureDesc}>
                Get instant nutrition info and price comparisons
              </ThemedText>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <View style={styles.iconCircle}>
                <Image
                  source={require("../../assets/images/empty-saved.png")}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.featureText}>
              <ThemedText type="h4" style={styles.featureTitle}>
                Student Discounts
              </ThemedText>
              <ThemedText type="small" style={styles.featureDesc}>
                Exclusive deals at partner locations
              </ThemedText>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("SignUp")}
            style={styles.getStartedButton}
          >
            Get Started
          </Button>
          <View style={styles.loginRow}>
            <ThemedText type="small" style={styles.loginText}>
              Already have an account?
            </ThemedText>
            <ThemedText
              type="small"
              style={styles.loginLink}
              onPress={() => navigation.navigate("SignUp")}
            >
              {" "}Sign In
            </ThemedText>
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing["2xl"],
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 70,
    height: 70,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  tagline: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
  features: {
    gap: Spacing.xl,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  featureIcon: {
    marginRight: Spacing.lg,
  },
  featureEmoji: {
    fontSize: 32,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  featureImage: {
    width: 36,
    height: 36,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: "#FFFFFF",
    marginBottom: 2,
  },
  featureDesc: {
    color: "rgba(255,255,255,0.7)",
  },
  buttonContainer: {
    alignItems: "center",
  },
  getStartedButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  loginRow: {
    flexDirection: "row",
    marginTop: Spacing.lg,
  },
  loginText: {
    color: "rgba(255,255,255,0.7)",
  },
  loginLink: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
