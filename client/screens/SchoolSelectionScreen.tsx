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

type SchoolSelectionScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "SchoolSelection">;
  route: RouteProp<AuthStackParamList, "SchoolSelection">;
};

interface School {
  id: keyof typeof SchoolColors;
  name: string;
  shortName: string;
  colors: typeof SchoolColors.fgcu;
}

const schools: School[] = [
  {
    id: "fgcu",
    name: "Florida Gulf Coast University",
    shortName: "FGCU",
    colors: SchoolColors.fgcu,
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SchoolCard({
  school,
  isSelected,
  onPress,
}: {
  school: School;
  isSelected: boolean;
  onPress: () => void;
}) {
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

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.schoolCard,
        isSelected && {
          borderColor: school.colors.primary,
          borderWidth: 2,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.schoolCardContent}>
        <View
          style={[
            styles.colorPreview,
            { backgroundColor: school.colors.primary },
          ]}
        >
          <View
            style={[
              styles.colorPreviewInner,
              { backgroundColor: school.colors.secondary },
            ]}
          />
        </View>
        <View style={styles.schoolInfo}>
          <ThemedText type="h4" style={styles.schoolName}>
            {school.name}
          </ThemedText>
          <ThemedText type="small" style={styles.schoolShortName}>
            {school.shortName}
          </ThemedText>
        </View>
        {isSelected ? (
          <View
            style={[
              styles.checkmark,
              { backgroundColor: school.colors.primary },
            ]}
          >
            <Feather name="check" size={16} color="#FFFFFF" />
          </View>
        ) : null}
      </View>
      <View style={styles.colorBar}>
        <View style={[styles.colorSegment, { backgroundColor: school.colors.primary }]} />
        <View style={[styles.colorSegment, { backgroundColor: school.colors.secondary }]} />
        <View style={[styles.colorSegment, { backgroundColor: school.colors.accent }]} />
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
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSchoolSelect = (school: School) => {
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
