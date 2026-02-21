import React, { useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { FlowstateColors, Spacing, BorderRadius, SchoolColors } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";
import { D1_SCHOOLS } from "@/data/d1Schools";

type SchoolSelectionScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "SchoolSelection">;
  route: RouteProp<AuthStackParamList, "SchoolSelection">;
};

interface ActiveSchool {
  type: "active";
  id: keyof typeof SchoolColors;
  name: string;
  shortName: string;
  colors: typeof SchoolColors.fgcu;
}

interface ComingSoonSchool {
  type: "comingSoon";
  id: string;
  name: string;
  shortName: string;
}

type DisplaySchool = ActiveSchool | ComingSoonSchool;

const activeSchools: ActiveSchool[] = [
  {
    type: "active",
    id: "fgcu",
    name: "Florida Gulf Coast University",
    shortName: "FGCU",
    colors: SchoolColors.fgcu,
  },
];

const comingSoonSchools: ComingSoonSchool[] = D1_SCHOOLS.map((school) => ({
  type: "comingSoon" as const,
  id: school.id,
  name: school.name,
  shortName: school.shortName,
}));

const allSchools: DisplaySchool[] = [...activeSchools, ...comingSoonSchools];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SchoolCard({
  school,
  isSelected,
  onPress,
}: {
  school: DisplaySchool;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const isComingSoon = school.type === "comingSoon";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isComingSoon) {
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    if (!isComingSoon) {
      scale.value = withSpring(1);
    }
  };

  const primaryColor = school.type === "comingSoon" ? "#CBD5E1" : school.colors.primary;
  const secondaryColor = school.type === "comingSoon" ? "#E2E8F0" : school.colors.secondary;
  const accentColor = school.type === "comingSoon" ? "#F1F5F9" : school.colors.accent;

  return (
    <AnimatedPressable
      onPress={isComingSoon ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.schoolCard,
        isSelected && !isComingSoon && {
          borderColor: primaryColor,
          borderWidth: 2,
        },
        isComingSoon && styles.comingSoonCard,
        animatedStyle,
      ]}
    >
      <View style={styles.schoolCardContent}>
        <View
          style={[
            styles.colorPreview,
            { backgroundColor: primaryColor },
          ]}
        >
          <View
            style={[
              styles.colorPreviewInner,
              { backgroundColor: secondaryColor },
            ]}
          />
        </View>
        <View style={styles.schoolInfo}>
          <ThemedText type="h4" style={[styles.schoolName, isComingSoon && styles.comingSoonText]}>
            {school.name}
          </ThemedText>
          <ThemedText type="small" style={styles.schoolShortName}>
            {school.shortName}
          </ThemedText>
        </View>
        {isComingSoon ? (
          <View style={styles.comingSoonBadge}>
            <ThemedText type="caption" style={styles.comingSoonBadgeText}>
              Coming Soon
            </ThemedText>
          </View>
        ) : isSelected ? (
          <View
            style={[
              styles.checkmark,
              { backgroundColor: primaryColor },
            ]}
          >
            <Feather name="check" size={16} color="#FFFFFF" />
          </View>
        ) : null}
      </View>
      <View style={styles.colorBar}>
        <View style={[styles.colorSegment, { backgroundColor: primaryColor }]} />
        <View style={[styles.colorSegment, { backgroundColor: secondaryColor }]} />
        <View style={[styles.colorSegment, { backgroundColor: accentColor }]} />
      </View>
    </AnimatedPressable>
  );
}

export default function SchoolSelectionScreen({
  navigation,
  route,
}: SchoolSelectionScreenProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<ActiveSchool | null>(null);

  const filteredSchools = allSchools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSchoolSelect = (school: DisplaySchool) => {
    if (school.type === "comingSoon") return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSchool(school);
  };

  const handleContinue = () => {
    if (selectedSchool) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      navigation.navigate("LocationPermission", {
        email: route.params.email,
        school: selectedSchool.id,
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View
        style={[
          styles.header,
          { paddingTop: headerHeight + Spacing.xl },
        ]}
      >
        <ThemedText type="h1" style={styles.title}>
          Choose Your School
        </ThemedText>
        <ThemedText type="body" style={styles.subtitle}>
          Your app will match your school's colors
        </ThemedText>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search schools..."
          />
        </View>
      </View>

      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SchoolCard
            school={item}
            isSelected={selectedSchool?.id === item.id}
            onPress={() => handleSchoolSelect(item)}
          />
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={15}
        windowSize={5}
      />

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + Spacing.lg },
        ]}
      >
        <Button
          onPress={handleContinue}
          disabled={!selectedSchool}
          style={styles.continueButton}
        >
          Continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing["2xl"],
    paddingBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
    color: FlowstateColors.textPrimary,
  },
  subtitle: {
    color: FlowstateColors.textSecondary,
    marginBottom: Spacing.xl,
  },
  searchContainer: {
    marginTop: Spacing.sm,
  },
  list: {
    paddingHorizontal: Spacing["2xl"],
    paddingTop: Spacing.lg,
  },
  schoolCard: {
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  schoolCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  colorPreview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  colorPreviewInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  schoolInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  schoolName: {
    color: FlowstateColors.textPrimary,
    marginBottom: 2,
  },
  schoolShortName: {
    color: FlowstateColors.textSecondary,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  colorBar: {
    flexDirection: "row",
    height: 4,
  },
  colorSegment: {
    flex: 1,
  },
  comingSoonCard: {
    opacity: 0.55,
  },
  comingSoonText: {
    color: FlowstateColors.textTertiary,
  },
  comingSoonBadge: {
    backgroundColor: FlowstateColors.borderLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  comingSoonBadgeText: {
    color: FlowstateColors.textTertiary,
    fontSize: 11,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing["2xl"],
    paddingTop: Spacing.lg,
    backgroundColor: FlowstateColors.background,
    borderTopWidth: 1,
    borderTopColor: FlowstateColors.border,
  },
  continueButton: {
    backgroundColor: FlowstateColors.primary,
  },
});
