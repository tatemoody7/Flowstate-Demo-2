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

        {/* Health Score */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.healthScoreSection}>
          <View
            style={[
              styles.healthScoreCard,
              { backgroundColor: `${healthTier.color}15` },
            ]}
          >
            <View
              style={[
                styles.healthScoreBadge,
                { backgroundColor: healthTier.color },
              ]}
            >
              <ThemedText type="h1" style={[styles.healthScoreValue, healthTier.tier === "yellow" && { color: FlowstateColors.textPrimary }]}>
                {food.healthScore}
              </ThemedText>
            </View>
            <View style={styles.healthScoreInfo}>
              <ThemedText type="h3" style={styles.healthScoreLabel}>
                Health Score
              </ThemedText>
              <ThemedText
                type="body"
                style={[
                  styles.healthScoreRating,
                  { color: healthTier.color },
                ]}
              >
                {healthTier.label}
              </ThemedText>
            </View>
          </View>
        </Animated.View>

        {/* Nutrition Facts */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.nutritionSection}>
          <ThemedText type="h3" style={styles.sectionTitle}>
            Nutrition Facts
          </ThemedText>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {food.calories}
                </ThemedText>
                <ThemedText type="small" style={styles.nutritionLabel}>
                  Calories
                </ThemedText>
              </View>
              <View style={styles.nutritionItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {food.protein}g
                </ThemedText>
                <ThemedText type="small" style={styles.nutritionLabel}>
                  Protein
                </ThemedText>
              </View>
            </View>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {food.carbs}g
                </ThemedText>
                <ThemedText type="small" style={styles.nutritionLabel}>
                  Carbs
                </ThemedText>
              </View>
              <View style={styles.nutritionItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {food.fat}g
                </ThemedText>
                <ThemedText type="small" style={styles.nutritionLabel}>
                  Fat
                </ThemedText>
              </View>
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
              {food.ingredients.map((ing, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.ingredientChip,
                    ing.flag === "good" && styles.ingredientGood,
                    ing.flag === "bad" && styles.ingredientBad,
                    ing.flag === "caution" && styles.ingredientCaution,
                  ]}
                >
                  <View
                    style={[
                      styles.ingredientDot,
                      {
                        backgroundColor:
                          ing.flag === "good"
                            ? FlowstateColors.healthGreen
                            : ing.flag === "bad"
                            ? FlowstateColors.healthRed
                            : ing.flag === "caution"
                            ? FlowstateColors.warning
                            : FlowstateColors.textTertiary,
                      },
                    ]}
                  />
                  <View style={styles.ingredientInfo}>
                    <ThemedText
                      type="small"
                      style={[
                        styles.ingredientName,
                        ing.flag === "good" && { color: FlowstateColors.healthGreen },
                        ing.flag === "bad" && { color: FlowstateColors.healthRed },
                        ing.flag === "caution" && { color: FlowstateColors.warning },
                      ]}
                    >
                      {ing.name}
                    </ThemedText>
                    {ing.reason ? (
                      <ThemedText type="caption" style={styles.ingredientReason}>
                        {ing.reason}
                      </ThemedText>
                    ) : null}
                  </View>
                </View>
              ))}
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
  healthScoreCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  healthScoreBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },
  healthScoreValue: {
    color: "#FFFFFF",
  },
  healthScoreInfo: {
    flex: 1,
  },
  healthScoreLabel: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  healthScoreRating: {
    fontWeight: "600",
  },
  nutritionSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  nutritionGrid: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  nutritionRow: {
    flexDirection: "row",
  },
  nutritionItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  nutritionValue: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  nutritionLabel: {
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
    gap: Spacing.sm,
  },
  ingredientChip: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    backgroundColor: FlowstateColors.surface,
  },
  ingredientGood: {
    borderColor: `${FlowstateColors.healthGreen}40`,
    backgroundColor: `${FlowstateColors.healthGreen}08`,
  },
  ingredientBad: {
    borderColor: `${FlowstateColors.healthRed}40`,
    backgroundColor: `${FlowstateColors.healthRed}08`,
  },
  ingredientCaution: {
    borderColor: `${FlowstateColors.warning}40`,
    backgroundColor: `${FlowstateColors.warning}08`,
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    color: FlowstateColors.textPrimary,
  },
  ingredientReason: {
    color: FlowstateColors.textSecondary,
    marginTop: 2,
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
