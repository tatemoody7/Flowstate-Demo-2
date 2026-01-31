import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
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

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
        animatedStyle,
      ]}
    >
      <Feather
        name={icon}
        size={16}
        color={isSelected ? "#FFFFFF" : FlowstateColors.textSecondary}
        style={styles.icon}
      />
      <ThemedText
        type="small"
        style={[
          styles.label,
          isSelected && styles.labelSelected,
        ]}
      >
        {label}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: FlowstateColors.surface,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    marginRight: Spacing.sm,
  },
  chipSelected: {
    backgroundColor: FlowstateColors.primary,
    borderColor: FlowstateColors.primary,
  },
  icon: {
    marginRight: Spacing.xs,
  },
  label: {
    color: FlowstateColors.textSecondary,
  },
  labelSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
