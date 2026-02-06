import React, { useState } from "react";
import { StyleSheet, View, Pressable, Platform, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { mockScannedFoods } from "@/data/mockData";
import { getScanReaction } from "@/data/coachLines";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type ScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Scanner"
>;

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScannerScreenNavigationProp>();
  const { toggleSavedFood, savedFoods } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [scannedFood, setScannedFood] = useState<typeof mockScannedFoods[0] | null>(null);

  const handleBarcodeScanned = () => {
    if (!isScanning) return;

    setIsScanning(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Simulate scanning by picking a random food item
    const randomFood = mockScannedFoods[Math.floor(Math.random() * mockScannedFoods.length)];
    setScannedFood(randomFood);
  };

  const handleScanAgain = () => {
    setScannedFood(null);
    setIsScanning(true);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return FlowstateColors.success;
    if (score >= 60) return FlowstateColors.warning;
    return FlowstateColors.error;
  };

  const getHealthVerdict = (score: number) => {
    const coachLine = getScanReaction(score);
    if (score >= 80) return { label: "Solid Choice", description: coachLine };
    if (score >= 60) return { label: "It's Aight", description: coachLine };
    return { label: "Be Honest", description: coachLine };
  };

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
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "qr"],
        }}
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top controls */}
        <View style={[styles.topControls, { paddingTop: insets.top + Spacing.lg }]}>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Feather name="x" size={24} color="#FFFFFF" />
          </Pressable>
          <ThemedText type="h3" style={styles.title}>
            Scan Food
          </ThemedText>
          <View style={styles.placeholder} />
        </View>

        {/* Scanning frame */}
        {!scannedFood ? (
          <Animated.View entering={FadeIn.duration(300)} style={styles.scanFrame}>
            <View style={styles.scanCorner} />
            <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
            <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
            <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
          </Animated.View>
        ) : null}

        {/* Instructions */}
        {!scannedFood ? (
          <Animated.View entering={FadeInUp.duration(300)} style={styles.instructions}>
            <ThemedText type="body" style={styles.instructionText}>
              Point your camera at a food barcode
            </ThemedText>
          </Animated.View>
        ) : null}

        {/* Scanned result */}
        {scannedFood ? (
          <Animated.View
            entering={FadeInUp.duration(400)}
            style={[styles.resultCard, { paddingBottom: insets.bottom + Spacing.lg }]}
          >
            <View style={styles.resultHeader}>
              <Image
                source={{ uri: scannedFood.image }}
                style={styles.resultImage}
              />
              <View style={styles.resultInfo}>
                <ThemedText type="h3" style={styles.resultName}>
                  {scannedFood.name}
                </ThemedText>
                <ThemedText type="small" style={styles.resultBrand}>
                  {scannedFood.brand}
                </ThemedText>
              </View>
              <View
                style={[
                  styles.healthBadge,
                  { backgroundColor: `${getHealthScoreColor(scannedFood.healthScore)}20` },
                ]}
              >
                <ThemedText
                  type="h4"
                  style={[
                    styles.healthScore,
                    { color: getHealthScoreColor(scannedFood.healthScore) },
                  ]}
                >
                  {scannedFood.healthScore}
                </ThemedText>
                <ThemedText type="caption" style={styles.healthLabel}>
                  Score
                </ThemedText>
              </View>
            </View>

            <View
              style={[
                styles.healthVerdict,
                { backgroundColor: `${getHealthScoreColor(scannedFood.healthScore)}15` },
              ]}
            >
              <View style={styles.verdictHeader}>
                <Feather
                  name={scannedFood.healthScore >= 80 ? "check-circle" : scannedFood.healthScore >= 60 ? "alert-circle" : "x-circle"}
                  size={20}
                  color={getHealthScoreColor(scannedFood.healthScore)}
                />
                <ThemedText
                  type="h4"
                  style={[styles.verdictLabel, { color: getHealthScoreColor(scannedFood.healthScore) }]}
                >
                  {getHealthVerdict(scannedFood.healthScore).label}
                </ThemedText>
              </View>
              <ThemedText type="small" style={styles.verdictDescription}>
                {getHealthVerdict(scannedFood.healthScore).description}
              </ThemedText>
            </View>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <ThemedText type="h4" style={styles.nutritionValue}>
                  {scannedFood.calories}
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Calories
                </ThemedText>
              </View>
              <View style={styles.nutritionItem}>
                <ThemedText type="h4" style={styles.nutritionValue}>
                  {scannedFood.protein}g
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Protein
                </ThemedText>
              </View>
              <View style={styles.nutritionItem}>
                <ThemedText type="h4" style={styles.nutritionValue}>
                  {scannedFood.carbs}g
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Carbs
                </ThemedText>
              </View>
              <View style={styles.nutritionItem}>
                <ThemedText type="h4" style={styles.nutritionValue}>
                  {scannedFood.fat}g
                </ThemedText>
                <ThemedText type="caption" style={styles.nutritionLabel}>
                  Fat
                </ThemedText>
              </View>
            </View>

            <View style={styles.priceComparison}>
              <ThemedText type="h4" style={styles.priceTitle}>
                Prices at Nearby Stores
              </ThemedText>
              {scannedFood.prices.map((price, index) => {
                const isLowest =
                  price.price === Math.min(...scannedFood.prices.map((p) => p.price));
                return (
                  <View
                    key={index}
                    style={[styles.priceRow, isLowest && styles.priceRowBest]}
                  >
                    <ThemedText type="body" style={styles.priceStore}>
                      {price.store}
                    </ThemedText>
                    <ThemedText
                      type="body"
                      style={[styles.priceValue, isLowest && styles.priceValueBest]}
                    >
                      ${price.price.toFixed(2)}
                      {isLowest ? " (Best)" : ""}
                    </ThemedText>
                  </View>
                );
              })}
            </View>

            <View style={styles.resultActions}>
              <Pressable
                onPress={() => toggleSavedFood(scannedFood.id)}
                style={[
                  styles.actionButton,
                  savedFoods.includes(scannedFood.id) && styles.actionButtonActive,
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
                <ThemedText type="small" style={styles.actionText}>
                  {savedFoods.includes(scannedFood.id) ? "Saved" : "Save"}
                </ThemedText>
              </Pressable>
              <Button onPress={handleScanAgain} style={styles.scanAgainButton}>
                Scan Another
              </Button>
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
  resultCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: FlowstateColors.surface,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    padding: Spacing.xl,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
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
  healthBadge: {
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  healthScore: {
    fontWeight: "700",
  },
  healthLabel: {
    color: FlowstateColors.textSecondary,
  },
  healthVerdict: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  verdictHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  verdictLabel: {
    fontWeight: "600",
  },
  verdictDescription: {
    color: FlowstateColors.textSecondary,
    marginLeft: 28,
  },
  nutritionGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.xl,
    backgroundColor: FlowstateColors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    color: FlowstateColors.textPrimary,
  },
  nutritionLabel: {
    color: FlowstateColors.textSecondary,
    marginTop: 2,
  },
  priceComparison: {
    marginBottom: Spacing.xl,
  },
  priceTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.md,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.border,
  },
  priceRowBest: {
    backgroundColor: `${FlowstateColors.secondary}10`,
    marginHorizontal: -Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.xs,
    borderBottomWidth: 0,
  },
  priceStore: {
    color: FlowstateColors.textPrimary,
  },
  priceValue: {
    color: FlowstateColors.textSecondary,
  },
  priceValueBest: {
    color: FlowstateColors.secondary,
    fontWeight: "600",
  },
  resultActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    gap: Spacing.xs,
  },
  actionButtonActive: {
    borderColor: FlowstateColors.error,
    backgroundColor: `${FlowstateColors.error}10`,
  },
  actionText: {
    color: FlowstateColors.textSecondary,
  },
  scanAgainButton: {
    flex: 1,
    backgroundColor: FlowstateColors.primary,
  },
});
