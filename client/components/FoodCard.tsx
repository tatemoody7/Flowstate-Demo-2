import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { ScannedFood } from "@/data/mockData";

interface FoodCardProps {
  food: ScannedFood;
  isSaved: boolean;
  onPress: () => void;
  onSavePress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FoodCard({ food, isSaved, onPress, onSavePress }: FoodCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleSavePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSavePress();
  };

  const getHealthScoreColor = () => {
    if (food.healthScore >= 80) return FlowstateColors.success;
    if (food.healthScore >= 60) return FlowstateColors.warning;
    return FlowstateColors.error;
  };

  const lowestPrice = Math.min(...food.prices.map((p) => p.price));
  const lowestPriceStore = food.prices.find((p) => p.price === lowestPrice)?.store;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, animatedStyle]}
    >
      <Image source={{ uri: food.image }} style={styles.image} contentFit="cover" />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText type="h4" style={styles.name} numberOfLines={1}>
              {food.name}
            </ThemedText>
            <ThemedText type="small" style={styles.brand}>
              {food.brand}
            </ThemedText>
          </View>
          <Pressable onPress={handleSavePress} hitSlop={8}>
            <Feather
              name="heart"
              size={20}
              color={isSaved ? FlowstateColors.error : FlowstateColors.textTertiary}
            />
          </Pressable>
        </View>

        <View style={styles.stats}>
          <View style={styles.healthScore}>
            <View
              style={[
                styles.healthScoreBadge,
                { backgroundColor: `${getHealthScoreColor()}20` },
              ]}
            >
              <ThemedText
                type="caption"
                style={[styles.healthScoreText, { color: getHealthScoreColor() }]}
              >
                {food.healthScore}
              </ThemedText>
            </View>
            <ThemedText type="small" style={styles.healthLabel}>
              Health Score
            </ThemedText>
          </View>

          <View style={styles.nutritionPreview}>
            <View style={styles.nutritionItem}>
              <ThemedText type="caption" style={styles.nutritionValue}>
                {food.calories}
              </ThemedText>
              <ThemedText type="caption" style={styles.nutritionLabel}>
                cal
              </ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <ThemedText type="caption" style={styles.nutritionValue}>
                {food.protein}g
              </ThemedText>
              <ThemedText type="caption" style={styles.nutritionLabel}>
                protein
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Feather name="tag" size={12} color={FlowstateColors.secondary} />
          <ThemedText type="small" style={styles.priceText}>
            Best: ${lowestPrice.toFixed(2)} at {lowestPriceStore}
          </ThemedText>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xs,
  },
  titleContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  name: {
    color: FlowstateColors.textPrimary,
  },
  brand: {
    color: FlowstateColors.textSecondary,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
    gap: Spacing.lg,
  },
  healthScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  healthScoreBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  healthScoreText: {
    fontWeight: "700",
  },
  healthLabel: {
    color: FlowstateColors.textSecondary,
  },
  nutritionPreview: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  nutritionItem: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  nutritionValue: {
    color: FlowstateColors.textPrimary,
    fontWeight: "600",
  },
  nutritionLabel: {
    color: FlowstateColors.textTertiary,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  priceText: {
    color: FlowstateColors.secondary,
    fontWeight: "500",
  },
});
