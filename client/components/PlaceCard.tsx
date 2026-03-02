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
import { Place } from "@/data/mockData";
import { Coordinates, getNearestLocation, formatDistance } from "@/utils/distance";

interface PlaceCardProps {
  place: Place;
  isSaved: boolean;
  onPress: () => void;
  onSavePress: () => void;
  userCoords: Coordinates;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PlaceCard({ place, isSaved, onPress, onSavePress, userCoords }: PlaceCardProps) {
  const scale = useSharedValue(1);
  const nearest = getNearestLocation(place, userCoords);

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
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Content */}
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
                size={11}
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
            <Feather name="map-pin" size={11} color={FlowstateColors.textSecondary} />
            <ThemedText type="small" style={styles.distance}>
              {formatDistance(nearest.distance)}
            </ThemedText>
            {nearest.locationCount > 1 && (
              <ThemedText type="small" style={styles.locationCount}>
                · {nearest.locationCount} loc
              </ThemedText>
            )}
          </View>
          <View style={styles.infoRow}>
            <Feather name="star" size={11} color={FlowstateColors.accent} />
            <ThemedText type="small" style={styles.rating}>
              {place.rating}
            </ThemedText>
          </View>
          {renderPriceLevel()}
          {place.studentDiscount ? (
            <View style={styles.dealTag}>
              <Feather name="tag" size={9} color={FlowstateColors.secondary} />
              <ThemedText type="caption" style={styles.dealText}>
                Deal
              </ThemedText>
            </View>
          ) : null}
        </View>
      </View>

      {/* Save Button */}
      <Pressable
        onPress={handleSavePress}
        style={styles.saveButton}
        hitSlop={8}
      >
        <Feather
          name="heart"
          size={16}
          color={isSaved ? FlowstateColors.error : FlowstateColors.textTertiary}
          style={isSaved && styles.savedIcon}
        />
      </Pressable>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.xl,
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
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingRight: 44,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: FlowstateColors.primaryLighter,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  logoBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    overflow: "hidden",
  },
  logoImage: {
    width: 18,
    height: 18,
  },
  name: {
    flex: 1,
    color: FlowstateColors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flexWrap: "wrap",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distance: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
    fontSize: 12,
  },
  locationCount: {
    color: FlowstateColors.textTertiary,
    fontWeight: "500",
    fontSize: 10,
  },
  rating: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
    fontSize: 12,
  },
  priceLevel: {
    flexDirection: "row",
    gap: 1,
  },
  dollar: {
    color: FlowstateColors.textTertiary,
    fontSize: 11,
    fontWeight: "600",
  },
  dollarActive: {
    color: FlowstateColors.secondary,
  },
  dealTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: `${FlowstateColors.secondary}15`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  dealText: {
    color: FlowstateColors.secondary,
    fontSize: 10,
    fontWeight: "700",
  },
  saveButton: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: FlowstateColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  savedIcon: {
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
