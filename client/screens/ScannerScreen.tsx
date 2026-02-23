import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { StyleSheet, View, Pressable, Image, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeInUp, FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { ScannedFood } from "@/data/mockData";
import { getScanReaction } from "@/data/coachLines";
import { getHealthTier } from "@/utils/healthTier";
import { useProductLookup } from "@/hooks/useProductLookup";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type ScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Scanner"
>;

// ─── Health Color Helpers ────────────────────────────────────────────────────

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

  // Health tier is determined by ingredient flags, not score
  const healthTier = useMemo(
    () => scannedFood ? getHealthTier(scannedFood.ingredients, scannedFood.healthScore) : null,
    [scannedFood]
  );

  // Memoized ingredient summary — single-pass count instead of 3 filter passes
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
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close scanner"
            testID="scanner-close"
          >
            <Feather name="x" size={24} color="#FFFFFF" />
          </Pressable>
          <ThemedText type="h3" style={styles.title}>
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
            style={[styles.resultCard, { paddingBottom: insets.bottom + Spacing.lg }]}
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

        {/* Scanned result */}
        {scannedFood ? (
          <Animated.View
            entering={FadeInUp.duration(400)}
            style={[
              styles.resultCard,
              { paddingBottom: insets.bottom + Spacing.lg, backgroundColor: `${healthTier?.color ?? FlowstateColors.healthGreen}10` },
            ]}
          >
            <ScrollView
              style={styles.resultScroll}
              showsVerticalScrollIndicator={false}
              bounces={true}
            >
              {/* ─── Health Color Banner ─── */}
              {healthTier && (
                <View
                  style={[
                    styles.healthBanner,
                    { backgroundColor: healthTier.color },
                  ]}
                >
                  <Feather
                    name={healthTier.icon}
                    size={32}
                    color={healthTier.tier === "yellow" ? FlowstateColors.textPrimary : "#FFFFFF"}
                  />
                  <ThemedText type="h2" style={[styles.healthBannerLabel, healthTier.tier === "yellow" && { color: FlowstateColors.textPrimary }]}>
                    {healthTier.label}
                  </ThemedText>
                  <ThemedText type="small" style={[styles.healthBannerDescription, healthTier.tier === "yellow" && { color: FlowstateColors.textSecondary }]}>
                    {getScanReaction(healthTier.tier)}
                  </ThemedText>
                </View>
              )}

              {/* ─── Product Header ─── */}
              <View style={styles.resultHeader}>
                <Image
                  source={{ uri: scannedFood.image }}
                  style={styles.resultImage}
                  resizeMode="cover"
                />
                <View style={styles.resultInfo}>
                  <ThemedText type="h3" style={styles.resultName} numberOfLines={2}>
                    {scannedFood.name}
                  </ThemedText>
                  <ThemedText type="small" style={styles.resultBrand}>
                    {scannedFood.brand}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => toggleSavedFood(scannedFood.id)}
                  style={[
                    styles.headerSaveButton,
                    savedFoods.includes(scannedFood.id) && styles.headerSaveButtonActive,
                  ]}
                >
                  <Feather
                    name="heart"
                    size={20}
                    color={
                      savedFoods.includes(scannedFood.id)
                        ? FlowstateColors.error
                        : FlowstateColors.textSecondary
                    }
                  />
                </Pressable>
              </View>

              {/* ─── Ingredient Summary ─── */}
              {ingredientSummary ? (
                <View style={styles.ingredientSummary}>
                  {ingredientSummary.good > 0 ? (
                    <View style={styles.summaryChip}>
                      <View style={[styles.summaryDot, { backgroundColor: FlowstateColors.healthGreen }]} />
                      <ThemedText type="caption" style={{ color: FlowstateColors.healthGreen }}>
                        {ingredientSummary.good} good
                      </ThemedText>
                    </View>
                  ) : null}
                  {ingredientSummary.caution > 0 ? (
                    <View style={styles.summaryChip}>
                      <View style={[styles.summaryDot, { backgroundColor: FlowstateColors.warning }]} />
                      <ThemedText type="caption" style={{ color: FlowstateColors.warning }}>
                        {ingredientSummary.caution} caution
                      </ThemedText>
                    </View>
                  ) : null}
                  {ingredientSummary.bad > 0 ? (
                    <View style={styles.summaryChip}>
                      <View style={[styles.summaryDot, { backgroundColor: FlowstateColors.healthRed }]} />
                      <ThemedText type="caption" style={{ color: FlowstateColors.healthRed }}>
                        {ingredientSummary.bad} flagged
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
              ) : null}

              {/* ─── Macro Percentage Bar ─── */}
              {(() => {
                const totalMacroGrams = scannedFood.protein + scannedFood.carbs + scannedFood.fat;
                const proteinPct = totalMacroGrams > 0 ? Math.round((scannedFood.protein / totalMacroGrams) * 100) : 0;
                const carbsPct = totalMacroGrams > 0 ? Math.round((scannedFood.carbs / totalMacroGrams) * 100) : 0;
                const fatPct = totalMacroGrams > 0 ? 100 - proteinPct - carbsPct : 0;
                return (
                  <View style={styles.macroBarSection}>
                    <View style={styles.macroLabels}>
                      <View style={styles.macroDotLabel}>
                        <View style={[styles.macroDot, { backgroundColor: FlowstateColors.accent }]} />
                        <ThemedText type="caption" style={styles.macroDotText}>
                          Protein {scannedFood.protein}g
                        </ThemedText>
                      </View>
                      <View style={styles.macroDotLabel}>
                        <View style={[styles.macroDot, { backgroundColor: FlowstateColors.warning }]} />
                        <ThemedText type="caption" style={styles.macroDotText}>
                          Carbs {scannedFood.carbs}g
                        </ThemedText>
                      </View>
                      <View style={styles.macroDotLabel}>
                        <View style={[styles.macroDot, { backgroundColor: FlowstateColors.healthRed }]} />
                        <ThemedText type="caption" style={styles.macroDotText}>
                          Fat {scannedFood.fat}g
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.macroBar}>
                      <View style={[styles.macroSegment, { flex: proteinPct, backgroundColor: FlowstateColors.accent, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }]} />
                      <View style={[styles.macroSegment, { flex: carbsPct, backgroundColor: FlowstateColors.warning }]} />
                      <View style={[styles.macroSegment, { flex: fatPct, backgroundColor: FlowstateColors.healthRed, borderTopRightRadius: 4, borderBottomRightRadius: 4 }]} />
                    </View>
                  </View>
                );
              })()}

              {/* ─── Calories ─── */}
              <ThemedText type="body" style={styles.caloriesText}>
                {scannedFood.calories} calories per serving
              </ThemedText>

              {/* ─── Ingredients Section ─── */}
              {scannedFood.ingredients && scannedFood.ingredients.length > 0 ? (
                <View style={styles.ingredientsSection}>
                  <ThemedText type="h4" style={styles.ingredientsTitle}>
                    Ingredients
                  </ThemedText>
                  <View style={styles.ingredientsList}>
                    {scannedFood.ingredients.map((ing, idx) => {
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
                            style={[styles.ingredientText, { color: flagColor }]}
                          >
                            {ing.name}
                          </ThemedText>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : null}

            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.resultActions}>
              <Pressable
                onPress={() => scannedFood && navigation.navigate("FoodDetail", { food: scannedFood })}
                style={styles.viewDetailsButton}
              >
                <ThemedText type="button" style={styles.viewDetailsText}>
                  View Details
                </ThemedText>
              </Pressable>
              <Pressable onPress={handleScanAgain} style={styles.scanAnotherButton}>
                <Feather name="rotate-ccw" size={16} color={FlowstateColors.textPrimary} />
                <ThemedText type="button" style={styles.scanAnotherText}>
                  Scan Another
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
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
  },
  placeholder: {
    width: 44,
  },
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
  resultCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "90%",
    backgroundColor: FlowstateColors.surface,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    padding: Spacing.xl,
  },
  resultScroll: {
    flexGrow: 0,
    marginBottom: Spacing.md,
  },
  // ─── Error State ────────────────────────────────────────────────────
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
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.sm,
  },
  resultInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  resultName: {
    color: FlowstateColors.textPrimary,
  },
  resultBrand: {
    color: FlowstateColors.textSecondary,
  },
  // ─── Health Banner ─────────────────────────────────────────────────
  healthBanner: {
    marginHorizontal: -Spacing.xl,
    marginTop: -Spacing.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
    gap: Spacing.xs,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    marginBottom: Spacing.lg,
  },
  healthBannerLabel: {
    color: "#FFFFFF",
    marginTop: Spacing.xs,
  },
  healthBannerDescription: {
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
  headerSaveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  headerSaveButtonActive: {
    borderColor: FlowstateColors.error,
    backgroundColor: `${FlowstateColors.error}10`,
  },
  ingredientSummary: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  summaryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  summaryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // ─── Score Row ────────────────────────────────────────────────────
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: FlowstateColors.surface,
  },
  scoreValue: {
    fontWeight: "700",
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    color: FlowstateColors.textPrimary,
  },
  scoreBrand: {
    color: FlowstateColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  // ─── Macro Bar ──────────────────────────────────────────────────
  macroBarSection: {
    marginBottom: Spacing.lg,
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
  caloriesText: {
    fontSize: 13,
    fontWeight: "600",
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.lg,
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
  // ─── Nutrition 2x2 Grid ─────────────────────────────────────────
  nutritionGrid2x2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  nutritionGridItem: {
    width: "48%",
    backgroundColor: FlowstateColors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: "center",
  },
  nutritionGridValue: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  nutritionGridLabel: {
    color: FlowstateColors.textSecondary,
  },
  // ─── Nutrition Details ────────────────────────────────────────────
  nutritionDetails: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  nutritionDetailRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.border,
  },
  nutritionDetailLabel: {
    color: FlowstateColors.textSecondary,
  },
  nutritionDetailValue: {
    color: FlowstateColors.textPrimary,
    fontWeight: "500" as const,
  },
  // ─── Ingredients ───────────────────────────────────────────────────
  ingredientsSection: {
    marginBottom: Spacing.xl,
  },
  ingredientsTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.md,
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
  ingredientText: {
    fontSize: 12,
    fontWeight: "600",
  },
  // ─── Actions ───────────────────────────────────────────────────────
  resultActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: FlowstateColors.primary,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  scanAnotherButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: FlowstateColors.background,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderColor: FlowstateColors.border,
  },
  scanAnotherText: {
    color: FlowstateColors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});
