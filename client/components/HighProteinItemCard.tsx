import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import type { HighProteinItem } from "@/data/highProteinData";

interface HighProteinItemCardProps {
  item: HighProteinItem;
  index: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  meat: "target",
  dairy: "droplet",
  plant: "feather",
  bar: "box",
  seafood: "anchor",
  other: "package",
};

export default function HighProteinItemCard({ item }: HighProteinItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.proteinBadge}>
        <ThemedText type="h3" style={styles.proteinValue}>
          {item.protein}g
        </ThemedText>
        <ThemedText type="caption" style={styles.proteinLabel}>
          protein
        </ThemedText>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <ThemedText type="h4" style={styles.name} numberOfLines={1}>
            {item.name}
          </ThemedText>
          {item.storeExclusive ? (
            <View style={styles.exclusiveBadge}>
              <ThemedText type="caption" style={styles.exclusiveText}>
                Exclusive
              </ThemedText>
            </View>
          ) : null}
        </View>

        {item.brand ? (
          <ThemedText type="caption" style={styles.brand}>
            {item.brand}
          </ThemedText>
        ) : null}

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Feather
              name={CATEGORY_ICONS[item.category] as any || "package"}
              size={12}
              color={FlowstateColors.textTertiary}
            />
            <ThemedText type="caption" style={styles.detailText}>
              {item.calories} cal
            </ThemedText>
          </View>
          <ThemedText type="caption" style={styles.separator}>
            ·
          </ThemedText>
          <ThemedText type="caption" style={styles.detailText}>
            {item.servingSize}
          </ThemedText>
          {item.price ? (
            <>
              <ThemedText type="caption" style={styles.separator}>
                ·
              </ThemedText>
              <ThemedText type="caption" style={styles.priceText}>
                ${item.price.toFixed(2)}
              </ThemedText>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    gap: Spacing.md,
  },
  proteinBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${FlowstateColors.secondary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  proteinValue: {
    color: FlowstateColors.secondary,
    fontSize: 16,
    lineHeight: 20,
  },
  proteinLabel: {
    color: FlowstateColors.secondary,
    fontSize: 9,
    lineHeight: 11,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  name: {
    color: FlowstateColors.textPrimary,
    flex: 1,
  },
  exclusiveBadge: {
    backgroundColor: `${FlowstateColors.accent}20`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  exclusiveText: {
    color: FlowstateColors.accent,
    fontSize: 10,
    fontWeight: "600",
  },
  brand: {
    color: FlowstateColors.textSecondary,
    marginTop: 1,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  detailText: {
    color: FlowstateColors.textTertiary,
  },
  separator: {
    color: FlowstateColors.textTertiary,
  },
  priceText: {
    color: FlowstateColors.textPrimary,
    fontWeight: "500",
  },
});
