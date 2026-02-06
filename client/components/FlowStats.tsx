import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";

function isFlowComplete(day: { nourish: boolean; move: boolean; rest: boolean }) {
  return day.nourish && day.move && day.rest;
}

export function FlowStats() {
  const { currentStreak, bestStreak, weeklyFlow } = useApp();

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay();
  const weekDayLabels = weeklyFlow.map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return ["S", "M", "T", "W", "T", "F", "S"][d.getDay()];
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(400)}
      style={styles.container}
      testID="flow-stats"
    >
      <View style={styles.headerRow}>
        <ThemedText type="h4" style={styles.title}>
          Flow Stats
        </ThemedText>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Feather name="zap" size={18} color={FlowstateColors.accent} />
          </View>
          <ThemedText type="h2" style={styles.statValue}>
            {currentStreak}
          </ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>
            Current
          </ThemedText>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Feather name="award" size={18} color={FlowstateColors.secondary} />
          </View>
          <ThemedText type="h2" style={styles.statValue}>
            {bestStreak}
          </ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>
            Best
          </ThemedText>
        </View>
      </View>

      <View style={styles.weekContainer}>
        <ThemedText type="caption" style={styles.weekTitle}>
          This Week
        </ThemedText>
        <View style={styles.weekRow}>
          {weeklyFlow.map((day, index) => {
            const complete = isFlowComplete(day);
            const isToday = index === 6;
            return (
              <View
                key={day.date}
                style={styles.dayColumn}
                accessibilityLabel={`${weekDayLabels[index]}${isToday ? " (today)" : ""}: ${complete ? "in flow" : "not in flow"}`}
              >
                <View
                  style={[
                    styles.dayDot,
                    complete ? styles.dayDotFilled : null,
                    isToday ? styles.dayDotToday : null,
                  ]}
                />
                <ThemedText
                  type="caption"
                  style={[
                    styles.dayLabel,
                    isToday ? styles.dayLabelToday : null,
                  ]}
                >
                  {weekDayLabels[index]}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    </Animated.View>
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
  },
  headerRow: {
    marginBottom: Spacing.lg,
  },
  title: {
    color: FlowstateColors.textPrimary,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: FlowstateColors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xs,
  },
  statValue: {
    color: FlowstateColors.textPrimary,
    fontWeight: "800",
    fontSize: 28,
  },
  statLabel: {
    color: FlowstateColors.textSecondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: FlowstateColors.border,
  },
  weekContainer: {
    borderTopWidth: 1,
    borderTopColor: FlowstateColors.borderLight,
    paddingTop: Spacing.lg,
  },
  weekTitle: {
    color: FlowstateColors.textSecondary,
    marginBottom: Spacing.md,
    fontWeight: "600",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayColumn: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: FlowstateColors.background,
    borderWidth: 2,
    borderColor: FlowstateColors.border,
  },
  dayDotFilled: {
    backgroundColor: FlowstateColors.secondary,
    borderColor: FlowstateColors.secondary,
  },
  dayDotToday: {
    borderColor: FlowstateColors.primary,
    borderWidth: 2.5,
  },
  dayLabel: {
    color: FlowstateColors.textTertiary,
    fontSize: 11,
  },
  dayLabelToday: {
    color: FlowstateColors.primary,
    fontWeight: "700",
  },
});
