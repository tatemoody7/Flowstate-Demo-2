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
          <ThemedText type="small" style={styles.name} numberOfLines={2}>
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
            <View style={styles.dealTag}>
              <Feather name="tag" size={8} color="#FFFFFF" />
              <ThemedText type="caption" style={styles.dealText}>
                Deal
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      {/* Chevron */}
      <Feather name="chevron-right" size={14} color="rgba(255,255,255,0.5)" style={styles.chevron} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: Spacing.sm,
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
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    marginRight: 6,
  },
  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoImage: {
    width: 18,
    height: 18,
  },
  name: {
    flex: 1,
    color: "#FFFFFF",
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
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
    fontSize: 11,
  },
  dealTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  dealText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
  chevron: {
    marginRight: Spacing.sm,
  },
});
