import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Spacing, FlowstateColors } from "@/constants/theme";

interface HeaderTitleProps {
  title: string;
  variant?: "default" | "light";
}

export function HeaderTitle({ title, variant = "default" }: HeaderTitleProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/flowstate-logo.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <ThemedText style={[styles.title, variant === "light" && styles.titleLight]} numberOfLines={1}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Spacing.sm,
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    color: FlowstateColors.primary,
  },
  titleLight: {
    color: "#FFFFFF",
  },
  headerLogo: {
    width: 48,
    height: 32,
  },
});
