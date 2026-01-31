import React from "react";
import { StyleSheet, View, Pressable, Image, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius, SchoolColors } from "@/constants/theme";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user, schoolColors, logout, savedPlaces, savedFoods } = useApp();

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
      onPress: () => {},
    },
    {
      icon: "map-pin" as const,
      label: "Location",
      value: user?.locationEnabled ? "Enabled" : "Disabled",
      onPress: () => {},
    },
    {
      icon: "moon" as const,
      label: "Appearance",
      value: "System",
      onPress: () => {},
    },
  ];

  const aboutItems = [
    {
      icon: "help-circle" as const,
      label: "Help & Support",
      onPress: () => {},
    },
    {
      icon: "file-text" as const,
      label: "Privacy Policy",
      onPress: () => {},
    },
    {
      icon: "info" as const,
      label: "Terms of Service",
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
      {/* Profile Header */}
      <View style={styles.profileHeader}>
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
          {user?.email || "student@eagle.fgcu.edu"}
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
      </View>

      {/* School Section */}
      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          School
        </ThemedText>
        <View style={styles.schoolCard}>
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
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Preferences
        </ThemedText>
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
                <View style={styles.settingsIconContainer}>
                  <Feather
                    name={item.icon}
                    size={18}
                    color={FlowstateColors.primary}
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
        <ThemedText type="h4" style={styles.sectionTitle}>
          About
        </ThemedText>
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
                <View style={styles.settingsIconContainer}>
                  <Feather
                    name={item.icon}
                    size={18}
                    color={FlowstateColors.textSecondary}
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
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.border,
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
    backgroundColor: FlowstateColors.backgroundSecondary,
  },
  schoolBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    borderWidth: 2,
    borderColor: FlowstateColors.background,
  },
  schoolBadgeText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 10,
  },
  userName: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    color: FlowstateColors.textSecondary,
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  statValue: {
    color: FlowstateColors.primary,
    marginBottom: 2,
  },
  statLabel: {
    color: FlowstateColors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: FlowstateColors.border,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: FlowstateColors.textSecondary,
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  schoolCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
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
    backgroundColor: `${FlowstateColors.primary}10`,
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
});
