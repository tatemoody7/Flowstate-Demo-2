import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, RefreshControl, Pressable, Modal, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import { SearchBar } from "@/components/SearchBar";
import { CompactPlaceCard } from "@/components/CompactPlaceCard";
import { EmptyState } from "@/components/EmptyState";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { mockPlaces, Place } from "@/data/mockData";
import { useUserLocation } from "@/hooks/useUserLocation";
import { sortPlacesByDistance } from "@/utils/distance";
import { MainTabParamList } from "@/navigation/MainTabNavigator";
import { DiscoverStackParamList } from "@/navigation/DiscoverStackNavigator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type DiscoverScreenNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, "DiscoverTab">,
    NativeStackNavigationProp<DiscoverStackParamList>
  >,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { schoolColors } = useApp();
  const navigation = useNavigation<DiscoverScreenNavigationProp>();
  const { coords: userCoords } = useUserLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "distance" | "rating" | "price">("default");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const groceryStores = useMemo(
    () => mockPlaces.filter((p) => p.category === "grocery"),
    [],
  );

  const applySort = (places: Place[]) => {
    if (sortBy === "distance") {
      return sortPlacesByDistance(places, userCoords);
    } else if (sortBy === "rating") {
      return [...places].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      return [...places].sort((a, b) => a.priceLevel - b.priceLevel);
    }
    return places;
  };

  const applySearch = (place: Place) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      place.name.toLowerCase().includes(q) ||
      place.description.toLowerCase().includes(q)
    );
  };

  const foodPlaces = useMemo(() => {
    const filtered = mockPlaces.filter(
      (p) => p.category === "restaurant" && applySearch(p),
    );
    return applySort(filtered);
  }, [searchQuery, sortBy, userCoords]);

  const fitnessPlaces = useMemo(() => {
    const filtered = mockPlaces.filter(
      (p) => p.category === "gym" && applySearch(p),
    );
    return applySort(filtered);
  }, [searchQuery, sortBy, userCoords]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePlacePress = (place: Place) => {
    if (place.category === "grocery") {
      navigation.navigate("StoreProducts", { place });
    } else {
      navigation.navigate("PlaceDetail", { place });
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search healthy spots..."
        onFilterPress={() => setShowSortMenu(true)}
      />

      {/* Store Circle Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storeCirclesList}
        style={styles.storeCirclesRow}
      >
        {/* "All" circle — opens full Product Database */}
        <Animated.View entering={FadeInDown.delay(0).duration(300)}>
          <Pressable
            style={styles.storeCircleItem}
            onPress={() => navigation.navigate("ProductDatabase")}
          >
            <View style={[styles.storeCircle, styles.storeCircleAll]}>
              <Feather name="grid" size={24} color={FlowstateColors.primary} />
            </View>
            <ThemedText type="caption" style={styles.storeCircleLabel} numberOfLines={2}>
              All
            </ThemedText>
          </Pressable>
        </Animated.View>

        {groceryStores.map((store, index) => (
          <Animated.View
            key={store.id}
            entering={FadeInDown.delay((index + 1) * 50).duration(300)}
          >
            <Pressable
              style={styles.storeCircleItem}
              onPress={() => navigation.navigate("StoreProducts", { place: store })}
            >
              <View style={styles.storeCircle}>
                {store.logo ? (
                  <Image
                    source={store.logo}
                    style={styles.storeCircleLogo}
                    contentFit="contain"
                  />
                ) : (
                  <Feather name="shopping-cart" size={24} color={FlowstateColors.primary} />
                )}
              </View>
              <ThemedText type="caption" style={styles.storeCircleLabel} numberOfLines={2}>
                {store.name}
              </ThemedText>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>

      {sortBy !== "default" && (
        <View style={styles.sortIndicator}>
          <Feather name="arrow-up" size={14} color={FlowstateColors.primary} />
          <ThemedText type="caption" style={styles.sortIndicatorText}>
            Sorted by {sortBy === "distance" ? "closest" : sortBy === "rating" ? "top rated" : "lowest price"}
          </ThemedText>
          <Pressable onPress={() => setSortBy("default")} hitSlop={8}>
            <Feather name="x" size={14} color={FlowstateColors.textSecondary} />
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.root}>
      <ScrollView
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={FlowstateColors.primary}
          />
        }
      >
        {renderHeader()}

        {/* Two-Column Layout */}
        {foodPlaces.length === 0 && fitnessPlaces.length === 0 ? (
          <EmptyState
            image={require("../../assets/images/empty-discover.png")}
            title="No places found"
            description="Try adjusting your search"
          />
        ) : (
          <View style={styles.columnsContainer}>
            {/* Food Column */}
            <View style={styles.column}>
              <ThemedText type="h3" style={styles.columnHeader}>
                Food
              </ThemedText>
              {foodPlaces.map((place, index) => (
                <Animated.View
                  key={place.id}
                  entering={FadeInDown.delay(Math.min(index, 6) * 80).duration(350)}
                >
                  <CompactPlaceCard
                    place={place}
                    onPress={() => handlePlacePress(place)}
                  />
                </Animated.View>
              ))}
            </View>

            {/* Fitness Column */}
            <View style={styles.column}>
              <ThemedText type="h3" style={styles.columnHeader}>
                Fitness
              </ThemedText>
              {fitnessPlaces.map((place, index) => (
                <Animated.View
                  key={place.id}
                  entering={FadeInDown.delay(Math.min(index, 6) * 80).duration(350)}
                >
                  <CompactPlaceCard
                    place={place}
                    onPress={() => handlePlacePress(place)}
                  />
                </Animated.View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sort Menu Modal */}
      <Modal
        visible={showSortMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortMenu(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowSortMenu(false)}>
          <View style={styles.sortMenu}>
            <ThemedText type="h4" style={styles.sortMenuTitle}>Sort By</ThemedText>
            {([
              { key: "default" as const, label: "Default", icon: "list" as const },
              { key: "distance" as const, label: "Closest First", icon: "navigation" as const },
              { key: "rating" as const, label: "Top Rated", icon: "star" as const },
              { key: "price" as const, label: "Lowest Price", icon: "dollar-sign" as const },
            ]).map((option) => (
              <Pressable
                key={option.key}
                style={[styles.sortOption, sortBy === option.key && styles.sortOptionActive]}
                onPress={() => { setSortBy(option.key); setShowSortMenu(false); }}
              >
                <Feather name={option.icon} size={18} color={sortBy === option.key ? FlowstateColors.primary : FlowstateColors.textSecondary} />
                <ThemedText type="body" style={[styles.sortOptionText, sortBy === option.key && styles.sortOptionTextActive]}>
                  {option.label}
                </ThemedText>
                {sortBy === option.key && <Feather name="check" size={18} color={FlowstateColors.primary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
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
  storeCirclesRow: {
    marginTop: Spacing.lg,
  },
  storeCirclesList: {
    gap: Spacing.md,
  },
  storeCircleItem: {
    alignItems: "center",
    width: 64,
  },
  storeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: FlowstateColors.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  storeCircleAll: {
    backgroundColor: FlowstateColors.primaryLighter,
    borderColor: FlowstateColors.primaryLight,
  },
  storeCircleLogo: {
    width: 36,
    height: 36,
  },
  storeCircleLabel: {
    color: FlowstateColors.textSecondary,
    fontSize: 10,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  sortIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: FlowstateColors.primaryLighter,
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
  },
  sortIndicatorText: {
    color: FlowstateColors.primary,
    fontWeight: "600",
  },
  columnsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    color: FlowstateColors.textPrimary,
    fontWeight: "800",
    marginBottom: Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sortMenu: {
    backgroundColor: FlowstateColors.background,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    padding: Spacing.xl,
    paddingBottom: Spacing["3xl"],
  },
  sortMenuTitle: {
    color: FlowstateColors.textPrimary,
    marginBottom: Spacing.lg,
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sortOptionActive: {
    backgroundColor: FlowstateColors.primaryLighter,
  },
  sortOptionText: {
    flex: 1,
    color: FlowstateColors.textSecondary,
  },
  sortOptionTextActive: {
    color: FlowstateColors.primary,
    fontWeight: "600",
  },
});
