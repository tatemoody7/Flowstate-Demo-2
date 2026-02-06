import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateLogo } from "@/components/FlowstateLogo";
import { Spacing, FlowstateColors } from "@/constants/theme";

interface HeaderTitleProps {
  title: string;
}

export function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <View style={styles.container}>
      <FlowstateLogo size={24} color={FlowstateColors.primary} variant="icon" />
      <ThemedText style={styles.title}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    color: FlowstateColors.primary,
  },
});
