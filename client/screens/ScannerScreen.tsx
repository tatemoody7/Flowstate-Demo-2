import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { StyleSheet, View, Pressable, Image, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeInUp, FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { ScannedFood } from "@/data/mockData";
import { getScanReaction } from "@/data/coachLines";
import { getHealthTier } from "@/utils/healthTier";
import { generateFlowTip } from "@/utils/flowTip";
import { useProductLookup } from "@/hooks/useProductLookup";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type ScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Scanner"
>;

// ─── Full-Screen Gradient Colors ────────────────────────────────────────────

function getFullScreenGradient(tier: string): string[] {
  switch (tier) {
    case "green":
      return ["#10bb82", "#0ea5a0"];
    case "yellow":
      return ["#e6a817", "#d4960f"]; // deeper gold for white text contrast
    case "red":
      return ["#f07269", "#e85d6f"];
    default:
      return ["#10bb82", "#0ea5a0"];
  }
}

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScannerScreenNavigationProp>();
  const { toggleSavedFood, savedFoods } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [scannedFood, setScannedFood] = useState<ScannedFood | null>(null);
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState<"none" | "not_found" | "network" | "timeout">("none");
  const hasHandledResult = useRef(false);

  const { lookupBarcode, reset, scannedFood: apiFood, isLoading, isError, isNotFound } = useProductLookup();

  // Handle API results
  useEffect(() => {
    if (hasHandledResult.current) return;

    if (apiFood) {
      hasHandledResult.current = true;
      setScannedFood(apiFood);
      setShowError(false);
      setErrorType("none");
    } else if (isNotFound) {
      hasHandledResult.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setScannedFood(null);
      setShowError(true);
      setErrorType("not_found");
    } else if (isError) {
      hasHandledResult.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setScannedFood(null);
      setShowError(true);
      setErrorType("network");
    }
  }, [apiFood, isError, isNotFound]);

  const handleBarcodeScanned = useCallback((result: { data: string; type: string }) => {
    if (!isScanning) return;

    setIsScanning(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    lookupBarcode(result.data);
  }, [isScanning, lookupBarcode]);

  const handleScanAgain = useCallback(() => {
    setScannedFood(null);
    setShowError(false);
    setErrorType("none");
    setIsScanning(true);
    hasHandledResult.current = false;
    reset();
  }, [reset]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Whether we're showing results (not actively scanning/loading)
  const showingResults = !!(scannedFood || showError);

  // Health tier
  const healthTier = useMemo(
    () => scannedFood ? getHealthTier(scannedFood.ingredients, scannedFood.healthScore) : null,
    [scannedFood]
  );

  // Flow Tip
  const flowTip = useMemo(
    () => scannedFood && healthTier ? generateFlowTip(scannedFood, healthTier.tier) : null,
    [scannedFood, healthTier]
  );

  // Scan reaction phrase (college slang)
  const scanPhrase = useMemo(
    () => healthTier ? getScanReaction(healthTier.tier) : null,
    [healthTier]
  );

  // Memoized ingredient summary
  const ingredientSummary = useMemo(() => {
    if (!scannedFood?.ingredients || scannedFood.ingredients.length === 0) return null;
    let good = 0, bad = 0, caution = 0;
    for (const i of scannedFood.ingredients) {
      if (i.flag === "good") good++;
      else if (i.flag === "bad") bad++;
      else if (i.flag === "caution") caution++;
    }
    if (good === 0 && bad === 0 && caution === 0) return null;
    return { good, bad, caution };
  }, [scannedFood?.ingredients]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.permissionContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Image
          source={require("../../assets/images/camera-prompt.png")}
          style={styles.permissionImage}
          resizeMode="contain"
        />
        <ThemedText type="h2" style={styles.permissionTitle}>
          Camera Access Required
        </ThemedText>
        <ThemedText type="body" style={styles.permissionText}>
          We need access to your camera to scan food barcodes and show you nutrition information.
        </ThemedText>
        <Button onPress={requestPermission} style={styles.permissionButton}>
          Enable Camera
        </Button>
        <ThemedText type="body" style={styles.closeText} onPress={handleClose}>
          Go Back
        </ThemedText>
      </View>
    );
  }

  // ─── Results Screen (Full-Screen Immersive) ─────────────────────────────────
  if (scannedFood && healthTier) {
    const isSaved = savedFoods.includes(scannedFood.id);
    const gradientColors = getFullScreenGradient(healthTier.tier);

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
            onPress={handleClose}
            style={styles.immersiveCloseButton}
            accessibilityRole="button"
            accessibilityLabel="Close scanner"
          >
            <Feather name="x" size={24} color="#FFFFFF" />
          </Pressable>
          <ThemedText type="h3" style={styles.immersiveTitle}>
            Scan Food
          </ThemedText>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              toggleSavedFood(scannedFood.id);
            }}
            style={[styles.immersiveSaveButton, isSaved && styles.immersiveSaveButtonActive]}
          >
            <Feather
              name="heart"
              size={20}
              color={isSaved ? FlowstateColors.error : "#FFFFFF"}
            />
          </Pressable>
        </View>

        <ScrollView
          style={styles.immersiveScroll}
          contentContainerStyle={[styles.immersiveContent, { paddingBottom: insets.bottom + Spacing["3xl"] }]}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* ─── Hero: Tier Icon + College Slang Phrase ─── */}
          <Animated.View entering={FadeInDown.duration(500)} style={styles.heroSection}>
            <View style={styles.heroIconCircle}>
              <Feather name={healthTier.icon} size={36} color="#FFFFFF" />
            </View>
            <ThemedText type="hero" style={styles.heroPhrase}>
              {scanPhrase}
            </ThemedText>
            <ThemedText type="small" style={styles.heroSubtitle}>
              {healthTier.subtitle}
            </ThemedText>
          </Animated.View>

          {/* ─── Product Info ─── */}
          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.productSection}>
            <Image
              source={{ uri: scannedFood.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <ThemedText type="h2" style={styles.productName} numberOfLines={2}>
              {scannedFood.name}
            </ThemedText>
            <ThemedText type="small" style={styles.productBrand}>
              {scannedFood.brand}
            </ThemedText>
          </Animated.View>

          {/* ─── Ingredient Summary ─── */}
          {ingredientSummary ? (
            <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.summaryRow}>
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
            <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.glassCard}>
              <View style={styles.flowTipHeader}>
                <Feather name="zap" size={14} color="#FFFFFF" />
                <ThemedText type="caption" style={styles.flowTipLabel}>
                  Flow Tip
                </ThemedText>
              </View>
              <ThemedText type="small" style={styles.flowTipText}>
                {flowTip}
              </ThemedText>
            </Animated.View>
          ) : null}

          {/* ─── Macro Percentage Bar ─── */}
          <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.macroSection}>
            {(() => {
              const totalMacroGrams = scannedFood.protein + scannedFood.carbs + scannedFood.fat;
              const proteinPct = totalMacroGrams > 0 ? Math.round((scannedFood.protein / totalMacroGrams) * 100) : 0;
              const carbsPct = totalMacroGrams > 0 ? Math.round((scannedFood.carbs / totalMacroGrams) * 100) : 0;
              const fatPct = totalMacroGrams > 0 ? 100 - proteinPct - carbsPct : 0;
              return (
                <>
                  <View style={styles.macroLabels}>
                    <View style={styles.macroDotLabel}>
                      <View style={[styles.macroDot, { backgroundColor: "#60a5fa" }]} />
                      <ThemedText type="caption" style={styles.macroLabelText}>
                        Protein {scannedFood.protein}g
                      </ThemedText>
                    </View>
                    <View style={styles.macroDotLabel}>
                      <View style={[styles.macroDot, { backgroundColor: "#fbbf24" }]} />
                      <ThemedText type="caption" style={styles.macroLabelText}>
                        Carbs {scannedFood.carbs}g
                      </ThemedText>
                    </View>
                    <View style={styles.macroDotLabel}>
                      <View style={[styles.macroDot, { backgroundColor: "#fb923c" }]} />
                      <ThemedText type="caption" style={styles.macroLabelText}>
                        Fat {scannedFood.fat}g
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.macroBar}>
                    <View style={[styles.macroSegment, { flex: proteinPct, backgroundColor: "#60a5fa", borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
                    <View style={[styles.macroSegment, { flex: carbsPct, backgroundColor: "#fbbf24" }]} />
                    <View style={[styles.macroSegment, { flex: fatPct, backgroundColor: "#fb923c", borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
                  </View>
                </>
              );
            })()}
          </Animated.View>

          {/* ─── Nutrition 2x2 Grid ─── */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              Nutrition Facts
            </ThemedText>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionGridItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {scannedFood.calories}
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Calories
                </ThemedText>
              </View>
              <View style={styles.nutritionGridItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {scannedFood.protein}g
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Protein
                </ThemedText>
              </View>
              <View style={styles.nutritionGridItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {scannedFood.carbs}g
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Carbs
                </ThemedText>
              </View>
              <View style={styles.nutritionGridItem}>
                <ThemedText type="h2" style={styles.nutritionValue}>
                  {scannedFood.fat}g
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Fat
                </ThemedText>
              </View>
            </View>

            {/* Nutrition Details */}
            <View style={styles.nutritionDetails}>
              <View style={styles.nutritionDetailRow}>
                <ThemedText type="body" style={styles.nutritionDetailLabel}>
                  Fiber
                </ThemedText>
                <ThemedText type="body" style={styles.nutritionDetailValue}>
                  {scannedFood.fiber}g
                </ThemedText>
              </View>
              <View style={styles.nutritionDetailRow}>
                <ThemedText type="body" style={styles.nutritionDetailLabel}>
                  Sugar
                </ThemedText>
                <ThemedText type="body" style={styles.nutritionDetailValue}>
                  {scannedFood.sugar}g
                </ThemedText>
              </View>
              <View style={[styles.nutritionDetailRow, { borderBottomWidth: 0 }]}>
                <ThemedText type="body" style={styles.nutritionDetailLabel}>
                  Sodium
                </ThemedText>
                <ThemedText type="body" style={styles.nutritionDetailValue}>
                  {scannedFood.sodium}mg
                </ThemedText>
              </View>
            </View>
          </Animated.View>

          {/* ─── Ingredients ─── */}
          {scannedFood.ingredients && scannedFood.ingredients.length > 0 ? (
            <Animated.View entering={FadeInDown.delay(350).duration(400)} style={styles.ingredientsSection}>
              <ThemedText type="h4" style={styles.sectionTitle}>
                Ingredients
              </ThemedText>
              <View style={styles.ingredientsList}>
                {scannedFood.ingredients.map((ing, idx) => {
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
                      <View style={[styles.ingredientDot, { backgroundColor: dotColor }]} />
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

          {/* ─── Scan Another Button ─── */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.actionSection}>
            <Pressable onPress={handleScanAgain} style={styles.scanAnotherButton}>
              <Feather name="rotate-ccw" size={18} color="#FFFFFF" />
              <ThemedText type="button" style={styles.scanAnotherText}>
                Scan Another
              </ThemedText>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    );
  }

  // ─── Camera / Loading / Error States ──────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Camera: keep alive during loading, unmount when showing results to save battery */}
      {isScanning || isLoading ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "qr"],
          }}
          onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: FlowstateColors.background }]} />
      )}

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top controls */}
        <View style={[styles.topControls, { paddingTop: insets.top + Spacing.lg }]}>
          <Pressable
            onPress={handleClose}
            style={[styles.closeButton, showingResults && styles.closeButtonLight]}
            accessibilityRole="button"
            accessibilityLabel="Close scanner"
            testID="scanner-close"
          >
            <Feather name="x" size={24} color={showingResults ? FlowstateColors.textPrimary : "#FFFFFF"} />
          </Pressable>
          <ThemedText type="h3" style={[styles.title, showingResults && styles.titleLight]}>
            Scan Food
          </ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Scanning frame */}
        {!scannedFood && !isLoading && !showError ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.scanFrame}>
            <View style={styles.scanCorner} />
            <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
            <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
            <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
          </Animated.View>
        ) : null}

        {/* Instructions */}
        {!scannedFood && !isLoading && !showError ? (
          <Animated.View entering={FadeInUp.duration(300)} style={styles.instructions}>
            <ThemedText type="body" style={styles.instructionText}>
              Point your camera at a food barcode
            </ThemedText>
          </Animated.View>
        ) : null}

        {/* Loading state */}
        {isLoading && !scannedFood ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.loadingContainer}>
            <View style={styles.loadingPulse}>
              <ActivityIndicator size="large" color={FlowstateColors.secondary} />
            </View>
            <ThemedText type="body" style={styles.loadingText}>
              Looking up product...
            </ThemedText>
            <ThemedText type="caption" style={styles.loadingSubtext}>
              Checking Open Food Facts database
            </ThemedText>
          </Animated.View>
        ) : null}

        {/* Error state - Product Not Found or Network Error */}
        {showError && !scannedFood ? (
          <Animated.View
            entering={FadeInUp.duration(400)}
            style={[styles.errorCard, { paddingBottom: insets.bottom + Spacing.lg }]}
          >
            <View style={styles.errorContent}>
              <View
                style={[
                  styles.errorIconContainer,
                  {
                    backgroundColor:
                      errorType === "network"
                        ? `${FlowstateColors.error}15`
                        : `${FlowstateColors.warning}15`,
                  },
                ]}
              >
                <Feather
                  name={errorType === "network" ? "wifi-off" : "search"}
                  size={32}
                  color={
                    errorType === "network"
                      ? FlowstateColors.error
                      : FlowstateColors.warning
                  }
                />
              </View>
              <ThemedText type="h3" style={styles.errorTitle}>
                {errorType === "network" ? "Connection Issue" : "Product Not Found"}
              </ThemedText>
              <ThemedText type="body" style={styles.errorDescription}>
                {errorType === "network"
                  ? "We couldn't reach the food database. Check your internet connection and try again."
                  : "This product isn't in the Open Food Facts database yet. Try scanning a different item."}
              </ThemedText>
              <Button onPress={handleScanAgain} style={styles.errorScanButton}>
                {errorType === "network" ? "Try Again" : "Scan Again"}
              </Button>
              <Pressable onPress={handleClose} style={styles.errorCloseLink}>
                <ThemedText type="small" style={styles.errorCloseText}>
                  Go Back
                </ThemedText>
              </Pressable>
            </View>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: FlowstateColors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  permissionImage: {
    width: 200,
    height: 200,
    marginBottom: Spacing["2xl"],
  },
  permissionTitle: {
    textAlign: "center",
    marginBottom: Spacing.md,
    color: FlowstateColors.textPrimary,
  },
  permissionText: {
    textAlign: "center",
    color: FlowstateColors.textSecondary,
    marginBottom: Spacing["2xl"],
  },
  permissionButton: {
    paddingHorizontal: Spacing["3xl"],
    backgroundColor: FlowstateColors.primary,
  },
  closeText: {
    marginTop: Spacing.lg,
    color: FlowstateColors.textSecondary,
    textDecorationLine: "underline",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  // ─── Camera State Controls ──────────────────────────────────────────────────
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonLight: {
    backgroundColor: FlowstateColors.surface,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  title: {
    color: "#FFFFFF",
  },
  titleLight: {
    color: FlowstateColors.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  // ─── Immersive Results Controls ─────────────────────────────────────────────
  immersiveCloseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  immersiveTitle: {
    color: "#FFFFFF",
  },
  immersiveSaveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  immersiveSaveButtonActive: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  // ─── Immersive Results Content ──────────────────────────────────────────────
  immersiveScroll: {
    flex: 1,
  },
  immersiveContent: {
    paddingHorizontal: Spacing.xl,
  },
  // ─── Hero Section ───────────────────────────────────────────────────────────
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
  // ─── Product Section ────────────────────────────────────────────────────────
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
  // ─── Summary Row ────────────────────────────────────────────────────────────
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
  // ─── Glass Card (Flow Tip, etc.) ────────────────────────────────────────────
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
  // ─── Macro Bar Section ──────────────────────────────────────────────────────
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
  // ─── Section Title ──────────────────────────────────────────────────────────
  sectionTitle: {
    color: "#FFFFFF",
    marginBottom: Spacing.md,
  },
  // ─── Nutrition Grid ─────────────────────────────────────────────────────────
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
  // ─── Ingredients ────────────────────────────────────────────────────────────
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
  // ─── Action Section ─────────────────────────────────────────────────────────
  actionSection: {
    marginTop: Spacing.sm,
  },
  scanAnotherButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  scanAnotherText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // ─── Scan Frame ─────────────────────────────────────────────────────────────
  scanFrame: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    height: 200,
  },
  scanCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: FlowstateColors.secondary,
    borderTopLeftRadius: 8,
  },
  scanCornerTopRight: {
    left: undefined,
    right: 0,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
  },
  scanCornerBottomLeft: {
    top: undefined,
    bottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 8,
  },
  scanCornerBottomRight: {
    top: undefined,
    bottom: 0,
    left: undefined,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 8,
  },
  instructions: {
    position: "absolute",
    bottom: "35%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  instructionText: {
    color: "#FFFFFF",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  loadingContainer: {
    position: "absolute",
    top: "38%",
    left: 0,
    right: 0,
    alignItems: "center",
    gap: Spacing.sm,
  },
  loadingPulse: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  loadingSubtext: {
    color: "rgba(255,255,255,0.6)",
  },
  // ─── Error Card ─────────────────────────────────────────────────────────────
  errorCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "90%",
    backgroundColor: FlowstateColors.surface,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    padding: Spacing.xl,
    overflow: "hidden",
  },
  errorContent: {
    alignItems: "center",
    paddingVertical: Spacing["2xl"],
    paddingHorizontal: Spacing.lg,
  },
  errorIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  errorTitle: {
    color: FlowstateColors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  errorDescription: {
    color: FlowstateColors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing["2xl"],
    lineHeight: 22,
  },
  errorScanButton: {
    width: "100%",
    backgroundColor: FlowstateColors.primary,
    marginBottom: Spacing.md,
  },
  errorCloseLink: {
    paddingVertical: Spacing.sm,
  },
  errorCloseText: {
    color: FlowstateColors.textSecondary,
    textDecorationLine: "underline",
  },
});
