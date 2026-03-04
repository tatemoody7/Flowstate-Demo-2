import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import type { ScannedFood } from "@/data/mockData";
import { getHealthTier, type HealthTier } from "@/utils/healthTier";

interface ProductCardProps {
  product: ScannedFood;
  onPress: () => void;
}

const TIER_CARD_COLORS: Record<
  HealthTier,
  { bg: string; border: string; pillBg: string }
> = {
  green: {
    bg: "rgba(16, 187, 130, 0.10)",
    border: FlowstateColors.healthGreen,
    pillBg: FlowstateColors.healthGreen,
  },
  yellow: {
    bg: "rgba(255, 222, 89, 0.12)",
    border: FlowstateColors.healthYellow,
    pillBg: FlowstateColors.healthYellow,
  },
  red: {
    bg: "rgba(240, 114, 105, 0.10)",
    border: FlowstateColors.healthRed,
    pillBg: FlowstateColors.healthRed,
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ProductCard({ product, onPress }: ProductCardProps) {
  const scale = useSharedValue(1);

  const { tier, label: tierLabel } = getHealthTier(product.ingredients);
  const tierColors = TIER_CARD_COLORS[tier];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        {
          backgroundColor: tierColors.bg,
          borderLeftColor: tierColors.border,
        },
        animatedStyle,
      ]}
    >
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ThemedText type="h4" style={styles.name} numberOfLines={1}>
          {product.name}
        </ThemedText>
        <ThemedText type="caption" style={styles.brand} numberOfLines={1}>
          {product.brand}
        </ThemedText>

        <View style={styles.infoRow}>
          {/* Tier Label Pill */}
          <View style={[styles.scorePill, { backgroundColor: tierColors.pillBg }]}>
            <ThemedText type="caption" style={styles.scoreText}>
              {tierLabel}
            </ThemedText>
          </View>

          {/* Calories */}
          <View style={styles.statItem}>
            <Feather name="zap" size={11} color={FlowstateColors.textSecondary} />
            <ThemedText type="small" style={styles.statText}>
              {product.calories} cal
            </ThemedText>
          </View>

          {/* Protein */}
          <View style={styles.statItem}>
            <Feather name="trending-up" size={11} color={FlowstateColors.textSecondary} />
            <ThemedText type="small" style={styles.statText}>
              {product.protein}g protein
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Chevron */}
      <View style={styles.chevron}>
        <Feather
          name="chevron-right"
          size={16}
          color={FlowstateColors.textTertiary}
        />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    borderLeftWidth: 3,
    overflow: "hidden",
    marginBottom: Spacing.md,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    margin: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    backgroundColor: FlowstateColors.surface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingRight: Spacing.sm,
    justifyContent: "center",
  },
  name: {
    color: FlowstateColors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  brand: {
    color: FlowstateColors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  scorePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    minWidth: 32,
    alignItems: "center",
  },
  scoreText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  statText: {
    color: FlowstateColors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  chevron: {
    paddingRight: Spacing.md,
  },
});
