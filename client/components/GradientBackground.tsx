import React from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlowstateColors } from "@/constants/theme";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export function GradientBackground({
  children,
  style,
  colors = [FlowstateColors.primary, FlowstateColors.secondary],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}: GradientBackgroundProps) {
  return (
    <LinearGradient colors={colors} start={start} end={end} style={[styles.gradient, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
