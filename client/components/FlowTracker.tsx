import React, { useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PillarButtonProps {
  icon: string;
  label: string;
  isChecked: boolean;
  onPress: () => void;
  delay: number;
}

function PillarButton({ icon, label, isChecked, onPress, delay }: PillarButtonProps) {
  const scale = useSharedValue(1);
  const ringProgress = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    ringProgress.value = withSpring(isChecked ? 1 : 0, { damping: 15 });
  }, [isChecked]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSequence(
      withTiming(0.85, { duration: 80 }),
      withSpring(1, { damping: 8 })
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringProgress.value,
    transform: [{ scale: 0.8 + ringProgress.value * 0.2 }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(400).springify()}>
      <AnimatedPressable
        onPress={handlePress}
        style={[styles.pillarButton, animatedStyle]}
        testID={`flow-pillar-${label.toLowerCase()}`}
      >
        <View style={styles.pillarCircleOuter}>
          {isChecked ? (
            <Animated.View style={[StyleSheet.absoluteFill, ringStyle]}>
              <LinearGradient
                colors={[FlowstateColors.secondary, "#00C865"]}
                style={styles.pillarCircleFilled}
              >
                <Feather name={icon as any} size={26} color="#FFFFFF" />
              </LinearGradient>
            </Animated.View>
          ) : null}
          {!isChecked ? (
            <View style={styles.pillarCircleEmpty}>
              <Feather name={icon as any} size={26} color={FlowstateColors.textSecondary} />
            </View>
          ) : null}
        </View>
        <ThemedText
          type="caption"
          style={[
            styles.pillarLabel,
            isChecked ? styles.pillarLabelActive : null,
          ]}
        >
          {label}
        </ThemedText>
      </AnimatedPressable>
    </Animated.View>
  );
}

export function FlowTracker() {
  const { flowToday, toggleFlowPillar, isInFlow, currentStreak } = useApp();
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (isInFlow) {
      glowOpacity.value = withSpring(1);
    } else {
      glowOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isInFlow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value * 0.15,
  }));

  return (
    <View style={styles.container} testID="flow-tracker">
      <Animated.View style={[styles.glowBg, glowStyle]}>
        <LinearGradient
          colors={[FlowstateColors.secondary, FlowstateColors.accent]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.headerRow}>
        <View>
          <ThemedText type="h3" style={styles.title}>
            {isInFlow ? "Locked in." : "Lock in today"}
          </ThemedText>
          <ThemedText type="caption" style={styles.subtitle}>
            {isInFlow ? "You're in flow" : "Nail the essentials"}
          </ThemedText>
        </View>
        {currentStreak > 0 ? (
          <View style={styles.streakBadge}>
            <Feather name="zap" size={14} color={FlowstateColors.accent} />
            <ThemedText type="caption" style={styles.streakText}>
              {currentStreak}-day streak
            </ThemedText>
          </View>
        ) : null}
      </View>

      <View style={styles.pillarsRow}>
        <PillarButton
          icon="coffee"
          label="Nourish"
          isChecked={flowToday.nourish}
          onPress={() => toggleFlowPillar("nourish")}
          delay={100}
        />
        <PillarButton
          icon="activity"
          label="Move"
          isChecked={flowToday.move}
          onPress={() => toggleFlowPillar("move")}
          delay={200}
        />
        <PillarButton
          icon="moon"
          label="Rest"
          isChecked={flowToday.rest}
          onPress={() => toggleFlowPillar("rest")}
          delay={300}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
    overflow: "hidden",
  },
  glowBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xl,
  },
  title: {
    color: FlowstateColors.textPrimary,
    fontWeight: "700",
  },
  subtitle: {
    color: FlowstateColors.textSecondary,
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 184, 28, 0.15)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  streakText: {
    color: "#92400E",
    fontWeight: "700",
  },
  pillarsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pillarButton: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  pillarCircleOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  pillarCircleFilled: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarCircleEmpty: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: FlowstateColors.background,
    borderWidth: 2.5,
    borderColor: FlowstateColors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarLabel: {
    color: FlowstateColors.textSecondary,
    fontWeight: "600",
  },
  pillarLabelActive: {
    color: FlowstateColors.secondary,
  },
});
