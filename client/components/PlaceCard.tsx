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
import { FlowstateColors, Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { Place } from "@/data/mockData";

interface PlaceCardProps {
  place: Place;
  isSaved: boolean;
  onPress: () => void;
  onSavePress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PlaceCard({ place, isSaved, onPress, onSavePress }: PlaceCardProps) {
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

  const getCategoryIcon = () => {
    switch (place.category) {
      case "restaurant":
        return "coffee";
      case "gym":
        return "activity";
      case "grocery":
        return "shopping-cart";
      default:
        return "map-pin";
    }
  };

  const renderPriceLevel = () => {
    const dollars = [];
    for (let i = 0; i < 4; i++) {
      dollars.push(
        <ThemedText
          key={i}
          type="small"
          style={[
            styles.dollar,
            i < place.priceLevel && styles.dollarActive,
          ]}
        >
          $
        </ThemedText>
      );
    }
    return <View style={styles.priceLevel}>{dollars}</View>;
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, animatedStyle]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Pressable
          onPress={handleSavePress}
          style={styles.saveButton}
          hitSlop={8}
        >
          <Feather
            name={isSaved ? "heart" : "heart"}
            size={18}
            color={isSaved ? FlowstateColors.error : "#FFFFFF"}
            style={isSaved && styles.savedIcon}
          />
        </Pressable>
        {place.studentDiscount ? (
          <View style={styles.discountBadge}>
            <Feather name="tag" size={10} color="#FFFFFF" />
            <ThemedText type="caption" style={styles.discountText}>
              Student Deal
            </ThemedText>
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {place.logo ? (
            <View style={styles.logoBadge}>
              <Image
                source={place.logo}
                style={styles.logoImage}
                contentFit="contain"
              />
            </View>
          ) : (
            <View style={styles.categoryBadge}>
              <Feather
                name={getCategoryIcon()}
                size={12}
                color={FlowstateColors.primary}
              />
            </View>
          )}
          <ThemedText type="h4" style={styles.name} numberOfLines={1}>
            {place.name}
          </ThemedText>
        </View>

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={12} color={FlowstateColors.textSecondary} />
            <ThemedText type="small" style={styles.distance}>
              {place.distance}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Feather name="star" size={12} color={FlowstateColors.accent} />
            <ThemedText type="small" style={styles.rating}>
              {place.rating}
            </ThemedText>
          </View>
          {renderPriceLevel()}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing.lg,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  imageContainer: {
    height: 160,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  saveButton: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  savedIcon: {
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  discountBadge: {
    position: "absolute",
    bottom: Spacing.md,
    left: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: 6,
    shadowColor: FlowstateColors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${FlowstateColors.primary}12`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    overflow: "hidden",
  },
  logoImage: {
    width: 20,
    height: 20,
  },
  name: {
    flex: 1,
    color: FlowstateColors.textPrimary,
    fontSize: 17,
    fontWeight: "700",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  distance: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
  },
  rating: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
  },
  priceLevel: {
    flexDirection: "row",
    gap: 1,
  },
  dollar: {
    color: FlowstateColors.textTertiary,
    fontSize: 12,
    fontWeight: "600",
  },
  dollarActive: {
    color: FlowstateColors.secondary,
  },
});
