import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Animated, { FadeInDown, FadeInUp, FadeIn } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { FlowstateLogo } from "@/components/FlowstateLogo";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";

const { width } = Dimensions.get("window");

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "Welcome">;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A3D62", "#0E4D76", "#00A651"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View entering={FadeIn.delay(100).duration(800)} style={styles.decorCircle1} />
      <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.decorCircle2} />
      <Animated.View entering={FadeIn.delay(300).duration(800)} style={styles.decorCircle3} />

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + Spacing["3xl"], paddingBottom: insets.bottom + Spacing["2xl"] },
        ]}
      >
        <Animated.View entering={FadeInDown.delay(300).duration(700).springify()} style={styles.logoContainer}>
          <View style={styles.logoGlow}>
            <View style={styles.logoCircle}>
              <FlowstateLogo size={52} color="#FFFFFF" variant="icon" />
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(700).springify()} style={styles.textContainer}>
          <ThemedText type="hero" style={styles.title}>
            Flowstate
          </ThemedText>
          <ThemedText type="h3" style={styles.tagline}>
            Nail the essentials. Unlock your flow.
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.features}>
          <BlurView intensity={20} tint="light" style={styles.featureCard}>
            <View style={styles.featureRow}>
              <View style={styles.featureIconWrapper}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.iconCircle}
                >
                  <Feather name="map-pin" size={22} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View style={styles.featureText}>
                <ThemedText type="h4" style={styles.featureTitle}>
                  Find Your Spots
                </ThemedText>
                <ThemedText type="small" style={styles.featureDesc}>
                  Healthy eats, gyms & groceries near campus
                </ThemedText>
              </View>
            </View>
          </BlurView>

          <BlurView intensity={20} tint="light" style={styles.featureCard}>
            <View style={styles.featureRow}>
              <View style={styles.featureIconWrapper}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.iconCircle}
                >
                  <Feather name="camera" size={22} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View style={styles.featureText}>
                <ThemedText type="h4" style={styles.featureTitle}>
                  Scan & Know
                </ThemedText>
                <ThemedText type="small" style={styles.featureDesc}>
                  Instant nutrition facts & price drops
                </ThemedText>
              </View>
            </View>
          </BlurView>

          <BlurView intensity={20} tint="light" style={styles.featureCard}>
            <View style={styles.featureRow}>
              <View style={styles.featureIconWrapper}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.iconCircle}
                >
                  <Feather name="zap" size={22} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View style={styles.featureText}>
                <ThemedText type="h4" style={styles.featureTitle}>
                  Lock In Daily
                </ThemedText>
                <ThemedText type="small" style={styles.featureDesc}>
                  Track your essentials. Build your streak.
                </ThemedText>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(900).duration(600)} style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("SignUp")}
            style={styles.getStartedButton}
            textColor={FlowstateColors.primary}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorCircle1: {
    position: "absolute",
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 166, 81, 0.15)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: 200,
    left: -120,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 184, 28, 0.1)",
  },
  decorCircle3: {
    position: "absolute",
    bottom: -50,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing["2xl"],
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoGlow: {
    shadowColor: "#00A651",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logo: {
    width: 75,
    height: 75,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    marginBottom: Spacing.xs,
    fontSize: 42,
    letterSpacing: -1,
  },
  tagline: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: 1,
  },
  features: {
    gap: Spacing.md,
  },
  featureCard: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  featureIconWrapper: {
    marginRight: Spacing.lg,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: "#FFFFFF",
    marginBottom: 2,
    fontWeight: "700",
  },
  featureDesc: {
    color: "rgba(255,255,255,0.75)",
  },
  buttonContainer: {
    alignItems: "center",
  },
  getStartedButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
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
    fontWeight: "700",
  },
});
