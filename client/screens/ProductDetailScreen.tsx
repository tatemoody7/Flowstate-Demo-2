import React, { useMemo } from "react";
import { StyleSheet, View, Pressable, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { ScannedFood } from "@/data/mockData";
import { getHealthTier } from "@/utils/healthTier";
import { generateFlowTip } from "@/utils/flowTip";
import type { RootStackParamList } from "@/navigation/RootStackNavigator";

// ─── Full-Screen Gradient Colors ────────────────────────────────────────────

function getFullScreenGradient(tier: string): string[] {
  switch (tier) {
    case "green":
      return ["#10bb82", "#0ea5a0"];
    case "yellow":
      return ["#e6a817", "#d4960f"];
    case "red":
      return ["#f07269", "#e85d6f"];
    default:
      return ["#10bb82", "#0ea5a0"];
  }
}

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetail">>();
  const { toggleSavedFood, savedFoodIds } = useApp();

  const product: ScannedFood = route.params.product;
  const healthTier = getHealthTier(product.ingredients);
  const isSaved = savedFoodIds.has(product.id);
  const gradientColors = getFullScreenGradient(healthTier.tier);

  const flowTip = useMemo(
    () => generateFlowTip(product, healthTier.tier),
    [product, healthTier.tier],
  );

  const ingredientSummary = useMemo(() => {
    if (!product.ingredients || product.ingredients.length === 0) return null;
    let good = 0,
      bad = 0,
      caution = 0;
    for (const i of product.ingredients) {
      if (i.flag === "good") good++;
      else if (i.flag === "bad") bad++;
      else if (i.flag === "caution") caution++;
    }
    if (good === 0 && bad === 0 && caution === 0) return null;
    return { good, bad, caution };
  }, [product.ingredients]);

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={styles.container}
    >
      {/* Top Controls */}
      <View style={[styles.topControls, { paddingTop: insets.top + Spacing.lg }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Feather name="x" size={24} color="#FFFFFF" />
        </Pressable>
        <ThemedText type="h3" style={styles.headerTitle}>
          Product Detail
        </ThemedText>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            toggleSavedFood(product);
          }}
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
        >
          <Feather
            name="heart"
            size={20}
            color={isSaved ? FlowstateColors.error : "#FFFFFF"}
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Spacing["3xl"] },
        ]}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* ─── Hero: Tier Icon + Label ─── */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.heroSection}>
          <View style={styles.heroIconCircle}>
            <Feather name={healthTier.icon} size={36} color="#FFFFFF" />
          </View>
          <ThemedText type="hero" style={styles.heroPhrase}>
            {healthTier.label}
          </ThemedText>
          <ThemedText type="small" style={styles.heroSubtitle}>
            {healthTier.subtitle}
          </ThemedText>
        </Animated.View>

        {/* ─── Product Info ─── */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400)}
          style={styles.productSection}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <ThemedText type="h2" style={styles.productName} numberOfLines={2}>
            {product.name}
          </ThemedText>
          <ThemedText type="small" style={styles.productBrand}>
            {product.brand}
          </ThemedText>
        </Animated.View>

        {/* ─── Ingredient Summary ─── */}
        {ingredientSummary ? (
          <Animated.View
            entering={FadeInDown.delay(150).duration(400)}
            style={styles.summaryRow}
          >
            {ingredientSummary.good > 0 ? (
              <View style={styles.summaryChip}>
                <View style={[styles.summaryDot, { backgroundColor: "#4ade80" }]} />
                <ThemedText type="caption" style={styles.summaryText}>
                  {ingredientSummary.good} good
                </ThemedText>
              </View>
            ) : null}
            {ingredientSummary.caution > 0 ? (
              <View style={styles.summaryChip}>
                <View style={[styles.summaryDot, { backgroundColor: "#fde68a" }]} />
                <ThemedText type="caption" style={styles.summaryText}>
                  {ingredientSummary.caution} caution
                </ThemedText>
              </View>
            ) : null}
            {ingredientSummary.bad > 0 ? (
              <View style={styles.summaryChip}>
                <View style={[styles.summaryDot, { backgroundColor: "#fca5a5" }]} />
                <ThemedText type="caption" style={styles.summaryText}>
                  {ingredientSummary.bad} flagged
                </ThemedText>
              </View>
            ) : null}
          </Animated.View>
        ) : null}

        {/* ─── Flow Tip ─── */}
        {flowTip ? (
          <Animated.View
            entering={FadeInDown.delay(200).duration(400)}
            style={styles.glassCard}
          >
            <View style={styles.flowTipHeader}>
              <Feather name="wind" size={14} color="#FFFFFF" />
              <ThemedText type="caption" style={styles.flowTipLabel}>
                Flow Tip
              </ThemedText>
            </View>
            <ThemedText type="small" style={styles.flowTipText}>
              {flowTip}
            </ThemedText>
          </Animated.View>
        ) : null}

        {/* ─── Ingredients ─── */}
        {product.ingredients && product.ingredients.length > 0 ? (
          <Animated.View
            entering={FadeInDown.delay(250).duration(400)}
            style={styles.ingredientsSection}
          >
            <ThemedText type="h4" style={styles.sectionTitle}>
              Ingredients
            </ThemedText>
            <View style={styles.ingredientsList}>
              {product.ingredients.map((ing, idx) => {
                const dotColor =
                  ing.flag === "good"
                    ? "#4ade80"
                    : ing.flag === "bad"
                      ? "#fca5a5"
                      : ing.flag === "caution"
                        ? "#fde68a"
                        : "rgba(255,255,255,0.4)";
                return (
                  <View key={idx} style={styles.ingredientChip}>
                    <View
                      style={[styles.ingredientDot, { backgroundColor: dotColor }]}
                    />
                    <View style={styles.ingredientTextWrap}>
                      <ThemedText type="caption" style={styles.ingredientName}>
                        {ing.name}
                      </ThemedText>
                      {ing.reason ? (
                        <ThemedText
                          type="caption"
                          style={styles.ingredientReason}
                          numberOfLines={1}
                        >
                          {ing.reason}
                        </ThemedText>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        ) : null}

        {/* ─── Macro Percentage Bar ─── */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(400)}
          style={styles.macroSection}
        >
          {(() => {
            const totalMacroGrams =
              product.protein + product.carbs + product.fat;
            const proteinPct =
              totalMacroGrams > 0
                ? Math.round((product.protein / totalMacroGrams) * 100)
                : 0;
            const carbsPct =
              totalMacroGrams > 0
                ? Math.round((product.carbs / totalMacroGrams) * 100)
                : 0;
            const fatPct =
              totalMacroGrams > 0 ? 100 - proteinPct - carbsPct : 0;
            return (
              <>
                <View style={styles.macroLabels}>
                  <View style={styles.macroDotLabel}>
                    <View
                      style={[
                        styles.macroDot,
                        { backgroundColor: FlowstateColors.macroProtein },
                      ]}
                    />
                    <ThemedText type="caption" style={styles.macroLabelText}>
                      Protein {product.protein}g
                    </ThemedText>
                  </View>
                  <View style={styles.macroDotLabel}>
                    <View
                      style={[
                        styles.macroDot,
                        { backgroundColor: FlowstateColors.macroCarbs },
                      ]}
                    />
                    <ThemedText type="caption" style={styles.macroLabelText}>
                      Carbs {product.carbs}g
                    </ThemedText>
                  </View>
                  <View style={styles.macroDotLabel}>
                    <View
                      style={[
                        styles.macroDot,
                        { backgroundColor: FlowstateColors.macroFat },
                      ]}
                    />
                    <ThemedText type="caption" style={styles.macroLabelText}>
                      Fat {product.fat}g
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.macroBar}>
                  <View
                    style={[
                      styles.macroSegment,
                      {
                        flex: proteinPct,
                        backgroundColor: FlowstateColors.macroProtein,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.macroSegment,
                      {
                        flex: carbsPct,
                        backgroundColor: FlowstateColors.macroCarbs,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.macroSegment,
                      {
                        flex: fatPct,
                        backgroundColor: FlowstateColors.macroFat,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                      },
                    ]}
                  />
                </View>
              </>
            );
          })()}
        </Animated.View>

        {/* ─── Nutrition Grid ─── */}
        <Animated.View entering={FadeInDown.delay(350).duration(400)}>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Nutrition Facts
          </ThemedText>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionValue}>
                {product.calories}
              </ThemedText>
              <ThemedText type="caption" style={styles.nutritionLabel}>
                Calories
              </ThemedText>
            </View>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionValue}>
                {product.protein}g
              </ThemedText>
              <ThemedText type="caption" style={styles.nutritionLabel}>
                Protein
              </ThemedText>
            </View>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionValue}>
                {product.carbs}g
              </ThemedText>
              <ThemedText type="caption" style={styles.nutritionLabel}>
                Carbs
              </ThemedText>
            </View>
            <View style={styles.nutritionGridItem}>
              <ThemedText type="h2" style={styles.nutritionValue}>
                {product.fat}g
              </ThemedText>
              <ThemedText type="caption" style={styles.nutritionLabel}>
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
                {product.fiber}g
              </ThemedText>
            </View>
            <View style={styles.nutritionDetailRow}>
              <ThemedText type="body" style={styles.nutritionDetailLabel}>
                Sugar
              </ThemedText>
              <ThemedText type="body" style={styles.nutritionDetailValue}>
                {product.sugar}g
              </ThemedText>
            </View>
            <View
              style={[styles.nutritionDetailRow, { borderBottomWidth: 0 }]}
            >
              <ThemedText type="body" style={styles.nutritionDetailLabel}>
                Sodium
              </ThemedText>
              <ThemedText type="body" style={styles.nutritionDetailValue}>
                {product.sodium}mg
              </ThemedText>
            </View>
          </View>
        </Animated.View>

        {/* ─── Extra Info ─── */}
        {(product.servingSize || product.nutritionGrade || (product.stores && product.stores.length > 0)) ? (
          <Animated.View
            entering={FadeInDown.delay(400).duration(400)}
            style={styles.extraSection}
          >
            {product.servingSize ? (
              <View style={styles.extraRow}>
                <Feather name="package" size={14} color="rgba(255,255,255,0.7)" />
                <ThemedText type="small" style={styles.extraText}>
                  Serving: {product.servingSize}
                </ThemedText>
              </View>
            ) : null}
            {product.nutritionGrade ? (
              <View style={styles.extraRow}>
                <Feather name="award" size={14} color="rgba(255,255,255,0.7)" />
                <ThemedText type="small" style={styles.extraText}>
                  Nutrition Grade: {product.nutritionGrade.toUpperCase()}
                </ThemedText>
              </View>
            ) : null}
            {product.stores && product.stores.length > 0 ? (
              <View style={styles.extraRow}>
                <Feather name="shopping-bag" size={14} color="rgba(255,255,255,0.7)" />
                <ThemedText type="small" style={styles.extraText}>
                  Available at: {product.stores.join(", ")}
                </ThemedText>
              </View>
            ) : null}
          </Animated.View>
        ) : null}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonActive: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
  },
  // ─── Hero ─────────────────────────────────────────────────────────────────
  heroSection: {
    alignItems: "center",
    marginTop: Spacing["2xl"],
    marginBottom: Spacing["2xl"],
  },
  heroIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  heroPhrase: {
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
  },
  // ─── Product ──────────────────────────────────────────────────────────────
  productSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.lg,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
    marginBottom: Spacing.md,
  },
  productName: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  productBrand: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  // ─── Summary Row ──────────────────────────────────────────────────────────
  summaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  summaryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  summaryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  summaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 11,
  },
  // ─── Glass Card ───────────────────────────────────────────────────────────
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginBottom: Spacing.xl,
  },
  flowTipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: Spacing.sm,
  },
  flowTipLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  flowTipText: {
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
  // ─── Ingredients ──────────────────────────────────────────────────────────
  ingredientsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: "#FFFFFF",
    marginBottom: Spacing.md,
  },
  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  ingredientChip: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
  },
  ingredientTextWrap: {
    flexShrink: 1,
  },
  ingredientName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  ingredientReason: {
    fontSize: 10,
    fontWeight: "400",
    color: "rgba(255,255,255,0.65)",
    marginTop: 1,
  },
  // ─── Macro Bar ────────────────────────────────────────────────────────────
  macroSection: {
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
  macroLabelText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  macroBar: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  macroSegment: {
    height: 8,
  },
  // ─── Nutrition Grid ───────────────────────────────────────────────────────
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  nutritionGridItem: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  nutritionValue: {
    color: "#FFFFFF",
    marginBottom: 2,
  },
  nutritionLabel: {
    color: "rgba(255,255,255,0.7)",
  },
  nutritionDetails: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: Spacing.xl,
  },
  nutritionDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
  nutritionDetailLabel: {
    color: "rgba(255,255,255,0.7)",
  },
  nutritionDetailValue: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  // ─── Extra Info ───────────────────────────────────────────────────────────
  extraSection: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    gap: Spacing.md,
  },
  extraRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  extraText: {
    color: "rgba(255,255,255,0.85)",
  },
});
