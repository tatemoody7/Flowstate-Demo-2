import React from "react";
import { StyleSheet, View, ScrollView, Pressable, Linking, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { useUserLocation } from "@/hooks/useUserLocation";
import { getNearestLocation, formatDistance } from "@/utils/distance";
import { FlowstateColors, Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type PlaceDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "PlaceDetail">;
  route: RouteProp<RootStackParamList, "PlaceDetail">;
};

export default function PlaceDetailScreen({ navigation, route }: PlaceDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { savedPlaces, toggleSavedPlace } = useApp();
  const { coords: userCoords } = useUserLocation();
  const { place } = route.params;

  const nearest = getNearestLocation(place, userCoords);
  const isSaved = savedPlaces.includes(place.id);

  const handleSavePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleSavedPlace(place.id);
  };

  const handleGetDirections = () => {
    const { latitude, longitude } = nearest.location.coords;
    const label = encodeURIComponent(place.name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}&ll=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${label}`,
      default: `https://maps.google.com/?q=${latitude},${longitude}`,
    });
    Linking.openURL(url);
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

  const getCategoryLabel = () => {
    switch (place.category) {
      case "restaurant":
        return "Restaurant";
      case "gym":
        return "Fitness";
      case "grocery":
        return "Grocery";
      default:
        return "Place";
    }
  };

  const renderPriceLevel = () => {
    const dollars = [];
    for (let i = 0; i < 4; i++) {
      dollars.push(
        <ThemedText
          key={i}
          type="body"
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
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: place.image }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={[styles.heroOverlay, { paddingTop: insets.top + Spacing.lg }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable onPress={handleSavePress} style={styles.saveButton}>
              <Feather
                name="heart"
                size={24}
                color={isSaved ? FlowstateColors.error : "#FFFFFF"}
              />
            </Pressable>
          </View>
        </View>

        {/* Content */}
        <View style={styles.mainContent}>
          <Animated.View entering={FadeInDown.delay(100).duration(400)}>
            {/* Category Badge */}
            <View style={styles.categoryRow}>
              <View style={styles.categoryBadge}>
                <Feather
                  name={getCategoryIcon()}
                  size={14}
                  color={FlowstateColors.primary}
                />
                <ThemedText type="caption" style={styles.categoryText}>
                  {getCategoryLabel()}
                </ThemedText>
              </View>
              {renderPriceLevel()}
            </View>

            {/* Title and Rating */}
            <ThemedText type="h1" style={styles.title}>
              {place.name}
            </ThemedText>
            <View style={styles.ratingRow}>
              <Feather name="star" size={18} color={FlowstateColors.accent} />
              <ThemedText type="body" style={styles.rating}>
                {place.rating}
              </ThemedText>
              <ThemedText type="small" style={styles.reviewCount}>
                ({place.reviewCount} reviews)
              </ThemedText>
            </View>
          </Animated.View>

          {/* Student Discount */}
          {place.studentDiscount ? (
            <Animated.View
              entering={FadeInDown.delay(200).duration(400)}
              style={styles.discountCard}
            >
              <View style={styles.discountIcon}>
                <Feather name="tag" size={20} color={FlowstateColors.secondary} />
              </View>
              <View style={styles.discountInfo}>
                <ThemedText type="h4" style={styles.discountTitle}>
                  Student Discount
                </ThemedText>
                <ThemedText type="body" style={styles.discountText}>
                  {place.studentDiscount}
                </ThemedText>
              </View>
            </Animated.View>
          ) : null}

          {/* Info Section */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.infoSection}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Feather name="map-pin" size={18} color={FlowstateColors.primary} />
              </View>
              <View style={styles.infoContent}>
                <ThemedText type="small" style={styles.infoLabel}>
                  {nearest.locationCount > 1 ? "Nearest Location" : "Address"}
                </ThemedText>
                <ThemedText type="body" style={styles.infoValue}>
                  {nearest.location.address}
                </ThemedText>
                {nearest.locationCount > 1 && (
                  <ThemedText type="caption" style={styles.locationCountLabel}>
                    {nearest.locationCount} locations nearby
                  </ThemedText>
                )}
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Feather name="clock" size={18} color={FlowstateColors.primary} />
              </View>
              <View style={styles.infoContent}>
                <ThemedText type="small" style={styles.infoLabel}>
                  Hours
                </ThemedText>
                <ThemedText type="body" style={styles.infoValue}>
                  {place.hours}
                </ThemedText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Feather name="navigation" size={18} color={FlowstateColors.primary} />
              </View>
              <View style={styles.infoContent}>
                <ThemedText type="small" style={styles.infoLabel}>
                  Distance
                </ThemedText>
                <ThemedText type="body" style={styles.infoValue}>
                  {formatDistance(nearest.distance)} away
                </ThemedText>
              </View>
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.descriptionSection}>
            <ThemedText type="h3" style={styles.sectionTitle}>
              About
            </ThemedText>
            <ThemedText type="body" style={styles.description}>
              {place.description}
            </ThemedText>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Floating CTA */}
      <View
        style={[
          styles.ctaContainer,
          { paddingBottom: insets.bottom + Spacing.lg },
        ]}
      >
        <View style={styles.ctaRow}>
          {place.phone ? (
            <Pressable
              onPress={() => Linking.openURL(`tel:${place.phone}`)}
              style={styles.ctaSecondary}
            >
              <Feather name="phone" size={20} color={FlowstateColors.primary} />
            </Pressable>
          ) : null}
          {place.website ? (
            <Pressable
              onPress={() => Linking.openURL(place.website!)}
              style={styles.ctaSecondary}
            >
              <Feather name="globe" size={20} color={FlowstateColors.primary} />
            </Pressable>
          ) : null}
          <Button onPress={handleGetDirections} style={[styles.ctaButton, { flex: 1 }]}>
            <View style={styles.ctaContent}>
              <Feather name="navigation" size={18} color="#FFFFFF" />
              <ThemedText type="button" style={styles.ctaText}>
                Get Directions
              </ThemedText>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  heroContainer: {
    height: 280,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.lg,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: {
    padding: Spacing.xl,
    marginTop: -BorderRadius["2xl"],
    backgroundColor: FlowstateColors.background,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  categoryText: {
    color: FlowstateColors.primary,
    fontWeight: "600",
  },
  priceLevel: {
    flexDirection: "row",
  },
  dollar: {
    color: FlowstateColors.textTertiary,
    fontSize: 16,
  },
  dollarActive: {
    color: FlowstateColors.secondary,
  },
  title: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  rating: {
    color: FlowstateColors.textPrimary,
    fontWeight: "600",
    marginLeft: Spacing.xs,
  },
  reviewCount: {
    color: FlowstateColors.textSecondary,
    marginLeft: Spacing.sm,
  },
  discountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.cream,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: `${FlowstateColors.secondary}25`,
  },
  discountIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FlowstateColors.primaryLightest,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  discountInfo: {
    flex: 1,
  },
  discountTitle: {
    color: FlowstateColors.secondary,
    marginBottom: 2,
  },
  discountText: {
    color: FlowstateColors.textPrimary,
  },
  infoSection: {
    marginBottom: Spacing.xl,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: FlowstateColors.primaryLighter,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: FlowstateColors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    color: FlowstateColors.textPrimary,
  },
  locationCountLabel: {
    color: FlowstateColors.primary,
    marginTop: 4,
    fontWeight: "500",
  },
  descriptionSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    color: FlowstateColors.textSecondary,
    lineHeight: 24,
  },
  ctaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    backgroundColor: FlowstateColors.background,
    borderTopWidth: 1,
    borderTopColor: FlowstateColors.border,
    ...Shadows.medium,
  },
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  ctaSecondary: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    backgroundColor: FlowstateColors.primaryLighter,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: FlowstateColors.primaryLight,
  },
  ctaButton: {
    backgroundColor: FlowstateColors.primary,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  ctaText: {
    color: "#FFFFFF",
  },
});
