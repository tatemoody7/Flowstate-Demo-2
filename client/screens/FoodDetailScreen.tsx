import React from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { getHealthTier } from "@/utils/healthTier";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type FoodDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "FoodDetail">;
  route: RouteProp<RootStackParamList, "FoodDetail">;
};

export default function FoodDetailScreen({ navigation, route }: FoodDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { savedFoods, toggleSavedFood } = useApp();
  const { food } = route.params;

  const isSaved = savedFoods.includes(food.id);
  const healthTier = getHealthTier(food.ingredients, food.healthScore);

  const handleSavePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleSavedFood(food.id);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Spacing["2xl"] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Feather name="x" size={24} color={FlowstateColors.textPrimary} />
          </Pressable>
          <ThemedText type="h3" style={styles.headerTitle}>
            Food Details
          </ThemedText>
          <Pressable onPress={handleSavePress} style={styles.saveButton}>
            <Feather
              name="heart"
              size={24}
              color={isSaved ? FlowstateColors.error : FlowstateColors.textSecondary}
            />
          </Pressable>
        </View>

        {/* Product Info */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.productSection}>
          <Image
            source={{ uri: food.image }}
            style={styles.productImage}
            contentFit="cover"
          />
          <ThemedText type="h1" style={styles.productName}>
            {food.name}
          </ThemedText>
          <ThemedText type="body" style={styles.productBrand}>
            {food.brand}
          </ThemedText>
        </Animated.View>

        {/* Grade Label */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.healthScoreSection}>
          <View style={styles.scoreCenter}>
            <View
              style={[
                styles.scorePill,
                { backgroundColor: `${healthTier.color}18` },
              ]}
            >
              <ThemedText
                type="small"
                style={[styles.scorePillText, { color: healthTier.color }]}
              >
                {healthTier.label}
              </ThemedText>
            </View>
          </View>
        </Animated.View>

        {/* Macro Percentage Bar */}
        <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.macroBarSection}>
          {(() => {
            const totalMacroGrams = food.protein + food.carbs + food.fat;
            const proteinPct = totalMacroGrams > 0 ? Math.round((food.protein / totalMacroGrams) * 100) : 0;
            const carbsPct = totalMacroGrams > 0 ? Math.round((food.carbs / totalMacroGrams) * 100) : 0;
            const fatPct = totalMacroGrams > 0 ? 100 - proteinPct - carbsPct : 0;
            return (
              <>
                <View style={styles.macroLabels}>
                  <View style={styles.macroDotLabel}>
                    <View style={[styles.macroDot, { backgroundColor: FlowstateColors.accent }]} />
                    <ThemedText type="caption" style={styles.macroDotText}>
                      Protein {food.protein}g
                    </ThemedText>
                  </View>
                  <View style={styles.macroDotLabel}>
                    <View style={[styles.macroDot, { backgroundColor: FlowstateColors.warning }]} />
                    <ThemedText type="caption" style={styles.macroDotText}>
                      Carbs {food.carbs}g
                    </ThemedText>
                  </View>
                  <View style={styles.macroDotLabel}>
                    <View style={[styles.macroDot, { backgroundColor: FlowstateColors.healthRed }]} />
                    <ThemedText type="caption" style={styles.macroDotText}>
                      Fat {food.fat}g
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.macroBar}>
                  <View style={[styles.macroSegment, { flex: proteinPct, backgroundColor: FlowstateColors.accent, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
                  <View style={[styles.macroSegment, { flex: carbsPct, backgroundColor: FlowstateColors.warning }]} />
                  <View style={[styles.macroSegment, { flex: fatPct, backgroundColor: FlowstateColors.healthRed, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
                </View>
              </>
            );
          })()}
        </Animated.View>

        {/* Nutrition 2x2 Grid */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.nutritionSection}>
          <ThemedText type="h3" style={styles.sectionTitle}>
            Nutrition Facts
          </ThemedText>
          <View style={styles.nutritionGrid2x2}>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionGridValue}>
                {food.calories}
              </ThemedText>
              <ThemedText type="small" style={styles.nutritionGridLabel}>
                Calories
              </ThemedText>
            </View>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={[styles.nutritionGridValue, food.protein >= 15 && { color: FlowstateColors.secondary }]}>
                {food.protein}g
              </ThemedText>
              <ThemedText type="small" style={styles.nutritionGridLabel}>
                Protein
              </ThemedText>
            </View>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionGridValue}>
                {food.carbs}g
              </ThemedText>
              <ThemedText type="small" style={styles.nutritionGridLabel}>
                Carbs
              </ThemedText>
            </View>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionGridValue}>
                {food.fat}g
              </ThemedText>
              <ThemedText type="small" style={styles.nutritionGridLabel}>
                Fat
              </ThemedText>
            </View>
          </View>

          <View style={styles.nutritionDetails}>
            <View style={styles.nutritionDetailRow}>
              <ThemedText type="body" style={styles.nutritionDetailLabel}>
                Fiber
              </ThemedText>
              <ThemedText type="body" style={styles.nutritionDetailValue}>
                {food.fiber}g
              </ThemedText>
            </View>
            <View style={styles.nutritionDetailRow}>
              <ThemedText type="body" style={styles.nutritionDetailLabel}>
                Sugar
              </ThemedText>
              <ThemedText type="body" style={styles.nutritionDetailValue}>
                {food.sugar}g
              </ThemedText>
            </View>
            <View style={styles.nutritionDetailRow}>
              <ThemedText type="body" style={styles.nutritionDetailLabel}>
                Sodium
              </ThemedText>
              <ThemedText type="body" style={styles.nutritionDetailValue}>
                {food.sodium}mg
              </ThemedText>
            </View>
          </View>
        </Animated.View>

        {/* Ingredients */}
        {food.ingredients && food.ingredients.length > 0 ? (
          <Animated.View entering={FadeInDown.delay(350).duration(400)} style={styles.ingredientsSection}>
            <ThemedText type="h3" style={styles.sectionTitle}>
              Ingredients
            </ThemedText>
            <View style={styles.ingredientsList}>
              {food.ingredients.map((ing, idx) => {
                const flagColor =
                  ing.flag === "good"
                    ? FlowstateColors.healthGreen
                    : ing.flag === "bad"
                    ? FlowstateColors.healthRed
                    : ing.flag === "caution"
                    ? FlowstateColors.warning
                    : FlowstateColors.textTertiary;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.ingredientChip,
                      {
                        backgroundColor: `${flagColor}22`,
                        borderColor: `${flagColor}55`,
                      },
                    ]}
                  >
                    <ThemedText
                      type="caption"
                      style={[styles.ingredientName, { color: flagColor }]}
                    >
                      {ing.name}
                    </ThemedText>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        ) : null}

        {/* Save Button */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.actionSection}>
          <Button
            onPress={handleSavePress}
            style={[
              styles.saveButtonLarge,
              isSaved && styles.saveButtonLargeActive,
            ]}
          >
            <View style={styles.saveButtonContent}>
              <Feather
                name="heart"
                size={20}
                color={isSaved ? FlowstateColors.error : "#FFFFFF"}
              />
              <ThemedText
                type="button"
                style={[
                  styles.saveButtonText,
                  isSaved && styles.saveButtonTextActive,
                ]}
              >
                {isSaved ? "Saved to Favorites" : "Save to Favorites"}
              </ThemedText>
            </View>
          </Button>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FlowstateColors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: FlowstateColors.textPrimary,
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FlowstateColors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  productSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  productImage: {
    width: 140,
    height: 140,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  productName: {
    color: FlowstateColors.textPrimary,
    textAlign: "center",
  },
  productBrand: {
    color: FlowstateColors.textSecondary,
  },
  healthScoreSection: {
    marginBottom: Spacing.xl,
  },
  scoreCenter: {
    alignItems: "center",
    gap: Spacing.md,
  },
  scorePill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  scorePillText: {
    fontWeight: "600",
  },
  macroBarSection: {
    marginBottom: Spacing.xl,
  },
  macroLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  macroDotLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  macroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  macroDotText: {
    fontSize: 11,
    fontWeight: "600",
    color: FlowstateColors.textPrimary,
  },
  macroBar: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: FlowstateColors.border,
  },
  macroSegment: {
    height: 8,
  },
  nutritionSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  nutritionGrid2x2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  nutritionGridItem: {
    width: "48%",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  nutritionGridValue: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  nutritionGridLabel: {
    color: FlowstateColors.textSecondary,
  },
  nutritionDetails: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  nutritionDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.border,
  },
  nutritionDetailLabel: {
    color: FlowstateColors.textSecondary,
  },
  nutritionDetailValue: {
    color: FlowstateColors.textPrimary,
    fontWeight: "500",
  },
  ingredientsSection: {
    marginBottom: Spacing.xl,
  },
  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  ingredientChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    borderWidth: 1,
  },
  ingredientName: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionSection: {
    marginTop: Spacing.lg,
  },
  saveButtonLarge: {
    backgroundColor: FlowstateColors.primary,
  },
  saveButtonLargeActive: {
    backgroundColor: `${FlowstateColors.error}15`,
    borderWidth: 1,
    borderColor: FlowstateColors.error,
  },
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  saveButtonText: {
    color: "#FFFFFF",
  },
  saveButtonTextActive: {
    color: FlowstateColors.error,
  },
});
