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

  const handleSavePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleSavedFood(food.id);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return FlowstateColors.success;
    if (score >= 60) return FlowstateColors.warning;
    return FlowstateColors.error;
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Fair";
  };

  const lowestPrice = Math.min(...food.prices.map((p) => p.price));

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
              { backgroundColor: `${getHealthScoreColor(food.healthScore)}15` },
            ]}
          >
            <View
              style={[
                styles.healthScoreBadge,
                { backgroundColor: getHealthScoreColor(food.healthScore) },
              ]}
            >
              <ThemedText type="h1" style={styles.healthScoreValue}>
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
                  { color: getHealthScoreColor(food.healthScore) },
                ]}
              >
                {getHealthLabel(food.healthScore)}
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

        {/* Price Comparison */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.priceSection}>
          <ThemedText type="h3" style={styles.sectionTitle}>
            Price Comparison
          </ThemedText>
          <View style={styles.priceList}>
            {food.prices.map((priceItem, index) => {
              const isLowest = priceItem.price === lowestPrice;
              return (
                <View
                  key={index}
                  style={[styles.priceCard, isLowest && styles.priceCardBest]}
                >
                  <View style={styles.priceInfo}>
                    <ThemedText type="h4" style={styles.storeName}>
                      {priceItem.store}
                    </ThemedText>
                    {isLowest ? (
                      <View style={styles.bestPriceBadge}>
                        <Feather name="check" size={12} color={FlowstateColors.secondary} />
                        <ThemedText type="caption" style={styles.bestPriceText}>
                          Best Price
                        </ThemedText>
                      </View>
                    ) : null}
                  </View>
                  <ThemedText
                    type="h3"
                    style={[styles.priceValue, isLowest && styles.priceValueBest]}
                  >
                    ${priceItem.price.toFixed(2)}
                  </ThemedText>
                </View>
              );
            })}
          </View>
        </Animated.View>

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
  priceSection: {
    marginBottom: Spacing.xl,
  },
  priceList: {
    gap: Spacing.md,
  },
  priceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  priceCardBest: {
    borderColor: FlowstateColors.secondary,
    backgroundColor: `${FlowstateColors.secondary}08`,
  },
  priceInfo: {
    flex: 1,
  },
  storeName: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  bestPriceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bestPriceText: {
    color: FlowstateColors.secondary,
    fontWeight: "600",
  },
  priceValue: {
    color: FlowstateColors.textPrimary,
  },
  priceValueBest: {
    color: FlowstateColors.secondary,
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
