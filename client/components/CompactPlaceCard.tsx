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

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, animatedStyle]}
    >
      {/* Square Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {/* Logo Badge Overlay */}
        {place.logo ? (
          <View style={styles.logoBadge}>
            <Image
              source={place.logo}
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
        ) : (
          <View style={[styles.logoBadge, styles.categoryBadge]}>
            <Feather
              name={getCategoryIcon()}
              size={11}
              color={FlowstateColors.primary}
            />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <ThemedText type="small" style={styles.name} numberOfLines={1}>
          {place.name}
        </ThemedText>
        <View style={styles.ratingRow}>
          <Feather name="star" size={11} color={FlowstateColors.accent} />
          <ThemedText type="caption" style={styles.rating}>
            {place.rating}
          </ThemedText>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    marginBottom: Spacing.md,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logoBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    overflow: "hidden",
  },
  categoryBadge: {
    backgroundColor: FlowstateColors.primaryLighter,
    borderColor: FlowstateColors.primaryLight,
  },
  logoImage: {
    width: 18,
    height: 18,
  },
  info: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  name: {
    color: FlowstateColors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  rating: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
    fontSize: 11,
  },
});
