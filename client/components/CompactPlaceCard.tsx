import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { Place } from "@/data/mockData";

interface CompactPlaceCardProps {
  place: Place;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CompactPlaceCard({ place, onPress }: CompactPlaceCardProps) {
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

  const getCategoryIcon = (): keyof typeof Feather.glyphMap => {
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

  const getCategoryColor = () => {
    switch (place.category) {
      case "restaurant":
        return FlowstateColors.secondary;
      case "gym":
        return FlowstateColors.accent;
      default:
        return FlowstateColors.primary;
    }
  };

  const categoryColor = getCategoryColor();

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, animatedStyle]}
    >
      {/* Thumbnail */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          {place.logo ? (
            <View style={styles.logoBadge}>
              <Image
                source={place.logo}
                style={styles.logoImage}
                contentFit="cover"
              />
            </View>
          ) : (
            <View style={[styles.logoBadge, styles.categoryBadge]}>
              <Feather
                name={getCategoryIcon()}
                size={10}
                color={FlowstateColors.primary}
              />
            </View>
          )}
          <ThemedText type="small" style={styles.name} numberOfLines={1}>
            {place.name}
          </ThemedText>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.ratingRow}>
            <Feather name="star" size={10} color={FlowstateColors.accent} />
            <ThemedText type="caption" style={styles.rating}>
              {place.rating}
            </ThemedText>
          </View>
          {place.studentDiscount && (
            <View style={[styles.dealTag, { backgroundColor: `${categoryColor}15` }]}>
              <Feather name="tag" size={8} color={categoryColor} />
              <ThemedText type="caption" style={[styles.dealText, { color: categoryColor }]}>
                Deal
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      {/* Chevron */}
      <Feather name="chevron-right" size={14} color={FlowstateColors.textTertiary} style={styles.chevron} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    marginBottom: Spacing.sm,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    width: 52,
    height: 52,
    margin: Spacing.sm,
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.xs,
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  logoBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    overflow: "hidden",
    marginRight: 6,
  },
  categoryBadge: {
    backgroundColor: FlowstateColors.primaryLighter,
    borderColor: FlowstateColors.primaryLight,
  },
  logoImage: {
    width: 18,
    height: 18,
  },
  name: {
    flex: 1,
    color: FlowstateColors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginLeft: 26,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  rating: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
    fontSize: 11,
  },
  dealTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  dealText: {
    fontSize: 9,
    fontWeight: "700",
  },
  chevron: {
    marginRight: Spacing.sm,
  },
});
