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
          <View style={styles.categoryBadge}>
            <Feather
              name={getCategoryIcon()}
              size={12}
              color={FlowstateColors.primary}
            />
          </View>
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
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  imageContainer: {
    height: 140,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  saveButton: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  savedIcon: {
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  discountBadge: {
    position: "absolute",
    bottom: Spacing.sm,
    left: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
    gap: 4,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${FlowstateColors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  name: {
    flex: 1,
    color: FlowstateColors.textPrimary,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distance: {
    color: FlowstateColors.textSecondary,
  },
  rating: {
    color: FlowstateColors.textSecondary,
  },
  priceLevel: {
    flexDirection: "row",
  },
  dollar: {
    color: FlowstateColors.textTertiary,
    fontSize: 12,
  },
  dollarActive: {
    color: FlowstateColors.secondary,
  },
});
