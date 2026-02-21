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
import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import { SearchBar } from "@/components/SearchBar";
import { CategoryChip } from "@/components/CategoryChip";
import { PlaceCard } from "@/components/PlaceCard";
import { EmptyState } from "@/components/EmptyState";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { mockPlaces, categories, Place } from "@/data/mockData";
import { MainTabParamList } from "@/navigation/MainTabNavigator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type DiscoverScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "DiscoverTab">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { savedPlaces, toggleSavedPlace, schoolColors } = useApp();
  const navigation = useNavigation<DiscoverScreenNavigationProp>();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

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
    return `Lock in today, ${schoolColors.mascotGreeting}.`;
  };

  const getSubGreeting = () => {
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

      {/* High Protein Picks Banner */}
      <Pressable
        onPress={() => navigation.navigate("HighProtein")}
        style={styles.highProteinBanner}
      >
        <LinearGradient
          colors={[FlowstateColors.secondary, "#059669"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.highProteinGradient}
        >
          <View style={styles.highProteinContent}>
            <Feather name="zap" size={20} color="#FFFFFF" />
            <View style={styles.highProteinText}>
              <ThemedText type="h4" style={{ color: "#FFFFFF" }}>
                High Protein Picks
              </ThemedText>
              <ThemedText type="caption" style={{ color: "rgba(255,255,255,0.8)" }}>
                Curated lists from 9 stores near campus
              </ThemedText>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color="#FFFFFF" />
        </LinearGradient>
      </Pressable>

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

  return (
    <View style={styles.root}>
      <FlatList
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
        testID="discover-list"
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
  highProteinBanner: {
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  highProteinGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  highProteinContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  highProteinText: {
    flex: 1,
  },
  categories: {
    marginTop: Spacing.lg,
  },
  categoriesList: {
    paddingRight: Spacing.lg,
  },
});
