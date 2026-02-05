import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";

interface CategoryChipProps {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  isSelected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CategoryChip({ label, icon, isSelected, onPress }: CategoryChipProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  if (isSelected) {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.chipWrapper, animatedStyle]}
      >
        <LinearGradient
          colors={[FlowstateColors.primary, FlowstateColors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.chipSelected}
        >
          <Feather name={icon} size={16} color="#FFFFFF" style={styles.icon} />
          <ThemedText type="small" style={styles.labelSelected}>
            {label}
          </ThemedText>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.chip, animatedStyle]}
    >
      <Feather
        name={icon}
        size={16}
        color={FlowstateColors.textSecondary}
        style={styles.icon}
      />
      <ThemedText type="small" style={styles.label}>
        {label}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chipWrapper: {
    marginRight: Spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: FlowstateColors.surface,
    borderWidth: 1.5,
    borderColor: FlowstateColors.border,
    marginRight: Spacing.sm,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  chipSelected: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    shadowColor: FlowstateColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginRight: Spacing.xs,
  },
  label: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
  },
  labelSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
