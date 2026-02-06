import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";

import { SearchBar } from "@/components/SearchBar";
import { CategoryChip } from "@/components/CategoryChip";
import { PlaceCard } from "@/components/PlaceCard";
import { EmptyState } from "@/components/EmptyState";
import { FlowTracker } from "@/components/FlowTracker";
import { FlowStats } from "@/components/FlowStats";
import { CoachPanel } from "@/components/CoachPanel";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { mockPlaces, categories, Place } from "@/data/mockData";
import { getCoachGreeting } from "@/data/coachLines";
import { MainTabParamList } from "@/navigation/MainTabNavigator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type DiscoverScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "DiscoverTab">,
  NativeStackNavigationProp<RootStackParamList>
>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { savedPlaces, toggleSavedPlace, isInFlow, schoolColors, flowToday, currentStreak } = useApp();
  const navigation = useNavigation<DiscoverScreenNavigationProp>();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [coachVisible, setCoachVisible] = useState(false);

  const pillarsComplete =
    (flowToday.nourish ? 1 : 0) +
    (flowToday.move ? 1 : 0) +
    (flowToday.rest ? 1 : 0);

  const filteredPlaces = mockPlaces.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePlacePress = (place: Place) => {
    navigation.navigate("PlaceDetail", { place });
  };

  const getDynamicGreeting = () => {
    if (isInFlow) return `You're in flow.`;
    if (pillarsComplete === 0) return `Lock in today, ${schoolColors.mascotGreeting}.`;
    if (pillarsComplete === 1) return "One down. Keep it moving.";
    return "Almost there. Finish strong.";
  };

  const getSubGreeting = () => {
    if (isInFlow) return "Everything's sharper now";
    return `${filteredPlaces.length} healthy spots near campus`;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.heroSection}>
        <ThemedText type="h1" style={styles.heroTitle} testID="hero-greeting">
          {getDynamicGreeting()}
        </ThemedText>
        <ThemedText type="small" style={styles.heroSubtitle}>
          {getSubGreeting()}
        </ThemedText>
      </View>

      <FlowTracker />
      <FlowStats />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search healthy spots..."
        onFilterPress={() => {}}
      />
      <View style={styles.categories}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
              <CategoryChip
                label={item.label}
                icon={item.icon}
                isSelected={selectedCategory === item.id}
                onPress={() => setSelectedCategory(item.id)}
              />
            </Animated.View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
    </View>
  );

  const renderEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-discover.png")}
      title="No places found"
      description="Try adjusting your search or explore a different category"
    />
  );

  const renderPlace = ({ item, index }: { item: Place; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <PlaceCard
        place={item}
        isSaved={savedPlaces.includes(item.id)}
        onPress={() => handlePlacePress(item)}
        onSavePress={() => toggleSavedPlace(item.id)}
      />
    </Animated.View>
  );

  const coachScale = useSharedValue(1);
  const coachAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: coachScale.value }],
  }));

  return (
    <View style={styles.root}>
      <FlatList
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: headerHeight + Spacing.lg,
            paddingBottom: tabBarHeight + Spacing["5xl"] + 60,
          },
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderPlace}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={FlowstateColors.primary}
          />
        }
      />

      <AnimatedPressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setCoachVisible(true);
        }}
        onPressIn={() => {
          coachScale.value = withSpring(0.9);
        }}
        onPressOut={() => {
          coachScale.value = withSpring(1);
        }}
        style={[styles.coachFab, coachAnimStyle, { bottom: tabBarHeight + 80 }]}
        testID="coach-fab"
      >
        <LinearGradient
          colors={[FlowstateColors.primary, "#1A5276"]}
          style={styles.coachFabInner}
        >
          <Feather name="zap" size={22} color="#FFFFFF" />
        </LinearGradient>
      </AnimatedPressable>

      <CoachPanel visible={coachVisible} onClose={() => setCoachVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  heroSection: {
    marginBottom: Spacing.xl,
  },
  heroTitle: {
    color: FlowstateColors.textPrimary,
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 28,
  },
  heroSubtitle: {
    color: FlowstateColors.textSecondary,
    marginTop: Spacing.xs,
  },
  categories: {
    marginTop: Spacing.lg,
  },
  categoriesList: {
    paddingRight: Spacing.lg,
  },
  coachFab: {
    position: "absolute",
    right: Spacing.xl,
    zIndex: 50,
    shadowColor: FlowstateColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  coachFabInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
  },
});
