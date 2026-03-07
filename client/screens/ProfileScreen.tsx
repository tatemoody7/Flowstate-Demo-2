import React, { useState } from "react";
import { StyleSheet, View, Pressable, Image, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { PlaceCard } from "@/components/PlaceCard";
import { FoodCard } from "@/components/FoodCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius, SchoolColors } from "@/constants/theme";
import { mockPlaces, mockScannedFoods, Place, ScannedFood } from "@/data/mockData";
import { useUserLocation } from "@/hooks/useUserLocation";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { ProfileStackParamList } from "@/navigation/ProfileStackNavigator";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, "Profile">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user, schoolColors, logout, savedPlaces, savedFoods, toggleSavedPlace, toggleSavedFood } = useApp();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { coords: userCoords } = useUserLocation();
  const [savedTab, setSavedTab] = useState<"foods" | "places">("places");

  const savedPlacesList = mockPlaces.filter((place) => savedPlaces.includes(place.id));
  const savedFoodsList = mockScannedFoods.filter((food) => savedFoods.includes(food.id));

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            await logout();
          },
        },
      ]
    );
  };

  const settingsItems = [
    {
      icon: "bell" as const,
      label: "Notifications",
      value: "On",
      color: FlowstateColors.accent,
      onPress: () => {},
    },
    {
      icon: "map-pin" as const,
      label: "Location",
      value: user?.locationEnabled ? "Enabled" : "Disabled",
      color: FlowstateColors.secondary,
      onPress: () => {},
    },
    {
      icon: "moon" as const,
      label: "Appearance",
      value: "System",
      color: FlowstateColors.primary,
      onPress: () => {},
    },
  ];

  const aboutItems = [
    {
      icon: "help-circle" as const,
      label: "Help & Support",
      color: FlowstateColors.info,
      onPress: () => {},
    },
    {
      icon: "file-text" as const,
      label: "Privacy Policy",
      color: FlowstateColors.textSecondary,
      onPress: () => {},
    },
    {
      icon: "info" as const,
      label: "Terms of Service",
      color: FlowstateColors.textSecondary,
      onPress: () => {},
    },
  ];

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl,
        },
      ]}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
    >
      {/* Profile Header with Gradient */}
      <LinearGradient
        colors={[FlowstateColors.primary, FlowstateColors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHeader}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/avatar-default.png")}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View
            style={[
              styles.schoolBadge,
              { backgroundColor: schoolColors.primary },
            ]}
          >
            <ThemedText type="caption" style={styles.schoolBadgeText}>
              {schoolColors.shortName}
            </ThemedText>
          </View>
        </View>
        <ThemedText type="h2" style={styles.userName}>
          FGCU Eagle
        </ThemedText>
        <ThemedText type="small" style={styles.userEmail}>
          {user?.email || "student@university.edu"}
        </ThemedText>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <ThemedText type="h3" style={styles.statValue}>
              {savedPlaces.length}
            </ThemedText>
            <ThemedText type="small" style={styles.statLabel}>
              Saved Places
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText type="h3" style={styles.statValue}>
              {savedFoods.length}
            </ThemedText>
            <ThemedText type="small" style={styles.statLabel}>
              Scanned Foods
            </ThemedText>
          </View>
        </View>
      </LinearGradient>

      {/* Saved Items Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionIcon, { backgroundColor: `${FlowstateColors.error}15` }]}>
            <Feather name="heart" size={14} color={FlowstateColors.error} />
          </View>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Saved
          </ThemedText>
        </View>
        <View style={styles.savedSegmentedControl}>
          <Pressable
            onPress={() => setSavedTab("places")}
            style={[
              styles.savedSegment,
              savedTab === "places" && styles.savedSegmentActive,
            ]}
          >
            <Feather
              name="map-pin"
              size={14}
              color={savedTab === "places" ? FlowstateColors.primary : FlowstateColors.textTertiary}
              style={{ marginRight: 4 }}
            />
            <ThemedText
              type="small"
              style={[
                styles.savedSegmentText,
                savedTab === "places" && styles.savedSegmentTextActive,
              ]}
            >
              Places
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setSavedTab("foods")}
            style={[
              styles.savedSegment,
              savedTab === "foods" && styles.savedSegmentActive,
            ]}
          >
            <Feather
              name="package"
              size={14}
              color={savedTab === "foods" ? FlowstateColors.secondary : FlowstateColors.textTertiary}
              style={{ marginRight: 4 }}
            />
            <ThemedText
              type="small"
              style={[
                styles.savedSegmentText,
                savedTab === "foods" && styles.savedSegmentTextActive,
              ]}
            >
              Foods
            </ThemedText>
          </Pressable>
        </View>

        {savedTab === "foods" ? (
          savedFoodsList.length > 0 ? (
            savedFoodsList.map((food, index) => (
              <Animated.View key={food.id} entering={FadeInDown.delay(index * 80).duration(300)}>
                <FoodCard
                  food={food}
                  isSaved={true}
                  onPress={() => {}}
                  onSavePress={() => toggleSavedFood(food.id)}
                />
              </Animated.View>
            ))
          ) : (
            <View style={styles.savedEmpty}>
              <View style={[styles.emptyIcon, { backgroundColor: `${FlowstateColors.secondary}12` }]}>
                <Feather name="package" size={28} color={FlowstateColors.secondary} />
              </View>
              <ThemedText type="small" style={styles.savedEmptyText}>
                No saved foods yet. Scan items to save them!
              </ThemedText>
            </View>
          )
        ) : savedPlacesList.length > 0 ? (
          savedPlacesList.map((place, index) => (
            <Animated.View key={place.id} entering={FadeInDown.delay(index * 80).duration(300)}>
              <PlaceCard
                place={place}
                isSaved={true}
                onPress={() => navigation.navigate("PlaceDetail", { place })}
                onSavePress={() => toggleSavedPlace(place.id)}
                userCoords={userCoords}
              />
            </Animated.View>
          ))
        ) : (
          <View style={styles.savedEmpty}>
            <View style={[styles.emptyIcon, { backgroundColor: `${FlowstateColors.accent}12` }]}>
              <Feather name="map-pin" size={28} color={FlowstateColors.accent} />
            </View>
            <ThemedText type="small" style={styles.savedEmptyText}>
              No saved places yet. Explore and save your favorites!
            </ThemedText>
          </View>
        )}
      </View>

      {/* School Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionIcon, { backgroundColor: `${FlowstateColors.primary}15` }]}>
            <Feather name="book" size={14} color={FlowstateColors.primary} />
          </View>
          <ThemedText type="h4" style={styles.sectionTitle}>
            School
          </ThemedText>
        </View>
        <LinearGradient
          colors={[`${schoolColors.primary}10`, `${schoolColors.secondary}08`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.schoolCard}
        >
          <View
            style={[
              styles.schoolColorPreview,
              { backgroundColor: schoolColors.primary },
            ]}
          >
            <View
              style={[
                styles.schoolColorInner,
                { backgroundColor: schoolColors.secondary },
              ]}
            />
          </View>
          <View style={styles.schoolInfo}>
            <ThemedText type="body" style={styles.schoolName}>
              {schoolColors.name}
            </ThemedText>
            <ThemedText type="small" style={styles.schoolShort}>
              {schoolColors.shortName}
            </ThemedText>
          </View>
          <Feather name="chevron-right" size={20} color={FlowstateColors.textTertiary} />
        </LinearGradient>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionIcon, { backgroundColor: `${FlowstateColors.accent}15` }]}>
            <Feather name="settings" size={14} color={FlowstateColors.accent} />
          </View>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Preferences
          </ThemedText>
        </View>
        <View style={styles.settingsCard}>
          {settingsItems.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={item.onPress}
              style={[
                styles.settingsItem,
                index < settingsItems.length - 1 && styles.settingsItemBorder,
              ]}
            >
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: `${item.color}15` }]}>
                  <Feather
                    name={item.icon}
                    size={18}
                    color={item.color}
                  />
                </View>
                <ThemedText type="body" style={styles.settingsLabel}>
                  {item.label}
                </ThemedText>
              </View>
              <View style={styles.settingsItemRight}>
                <ThemedText type="small" style={styles.settingsValue}>
                  {item.value}
                </ThemedText>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={FlowstateColors.textTertiary}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionIcon, { backgroundColor: `${FlowstateColors.textSecondary}12` }]}>
            <Feather name="info" size={14} color={FlowstateColors.textSecondary} />
          </View>
          <ThemedText type="h4" style={styles.sectionTitle}>
            About
          </ThemedText>
        </View>
        <View style={styles.settingsCard}>
          {aboutItems.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={item.onPress}
              style={[
                styles.settingsItem,
                index < aboutItems.length - 1 && styles.settingsItemBorder,
              ]}
            >
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: `${item.color}12` }]}>
                  <Feather
                    name={item.icon}
                    size={18}
                    color={item.color}
                  />
                </View>
                <ThemedText type="body" style={styles.settingsLabel}>
                  {item.label}
                </ThemedText>
              </View>
              <Feather
                name="chevron-right"
                size={18}
                color={FlowstateColors.textTertiary}
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Feather name="log-out" size={18} color={FlowstateColors.error} />
        <ThemedText type="body" style={styles.logoutText}>
          Sign Out
        </ThemedText>
      </Pressable>

      <ThemedText type="caption" style={styles.version}>
        Flowstate v1.0.0
      </ThemedText>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: Spacing["2xl"],
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
  },
  schoolBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  schoolBadgeText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 10,
  },
  userName: {
    color: "#FFFFFF",
    marginBottom: Spacing.xs,
  },
  userEmail: {
    color: "rgba(255,255,255,0.75)",
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    marginBottom: 2,
  },
  statLabel: {
    color: "rgba(255,255,255,0.75)",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  sectionTitle: {
    color: FlowstateColors.textPrimary,
  },
  schoolCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  schoolColorPreview: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  schoolColorInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  schoolInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  schoolName: {
    color: FlowstateColors.textPrimary,
  },
  schoolShort: {
    color: FlowstateColors.textSecondary,
  },
  settingsCard: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  settingsItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.border,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingsLabel: {
    color: FlowstateColors.textPrimary,
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  settingsValue: {
    color: FlowstateColors.textSecondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${FlowstateColors.error}10`,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  logoutText: {
    color: FlowstateColors.error,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    color: FlowstateColors.textTertiary,
    marginBottom: Spacing.lg,
  },
  savedSegmentedControl: {
    flexDirection: "row",
    backgroundColor: FlowstateColors.backgroundSecondary,
    borderRadius: BorderRadius.sm,
    padding: 4,
    marginBottom: Spacing.lg,
  },
  savedSegment: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.xs,
  },
  savedSegmentActive: {
    backgroundColor: FlowstateColors.surface,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  savedSegmentText: {
    color: FlowstateColors.textTertiary,
  },
  savedSegmentTextActive: {
    color: FlowstateColors.textPrimary,
    fontWeight: "600",
  },
  savedEmpty: {
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
    gap: Spacing.md,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  savedEmptyText: {
    color: FlowstateColors.textTertiary,
    textAlign: "center",
  },
});
