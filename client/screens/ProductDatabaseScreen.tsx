import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import Animated, { FadeInDown } from "react-native-reanimated";

import { ProductCard } from "@/components/ProductCard";
import { CategoryChip } from "@/components/CategoryChip";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useProducts } from "@/hooks/useProducts";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import type { ScannedFood } from "@/data/mockData";
import type { RootStackParamList } from "@/navigation/RootStackNavigator";

const TIER_FILTERS = [
  { id: "all", label: "All", icon: "grid" as const },
  { id: "green", label: "Solid Pick", icon: "check-circle" as const },
  { id: "yellow", label: "Not Bad", icon: "alert-circle" as const },
  { id: "red", label: "Be Honest", icon: "x-circle" as const },
];

const STORE_FILTERS = [
  { id: "all", label: "All Stores", icon: "shopping-bag" as const },
  { id: "Publix", label: "Publix", icon: "shopping-cart" as const },
  { id: "Walmart", label: "Walmart", icon: "shopping-cart" as const },
  { id: "Target", label: "Target", icon: "shopping-cart" as const },
  { id: "Whole Foods", label: "Whole Foods", icon: "shopping-cart" as const },
  { id: "Costco", label: "Costco", icon: "shopping-cart" as const },
  { id: "Trader Joe's", label: "Trader Joe's", icon: "shopping-cart" as const },
  { id: "ALDI", label: "ALDI", icon: "shopping-cart" as const },
  { id: "Sprouts", label: "Sprouts", icon: "shopping-cart" as const },
  { id: "The Fresh Market", label: "Fresh Market", icon: "shopping-cart" as const },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductDatabaseScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");

  const { products, isLoading, isError, refetch } = useProducts(
    searchQuery,
    selectedTier,
    selectedStore,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleProductPress = (product: ScannedFood) => {
    navigation.navigate("ProductDetail", { product });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={18}
          color={FlowstateColors.textTertiary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor={FlowstateColors.textTertiary}
        />
        {searchQuery.length > 0 && (
          <Feather
            name="x"
            size={18}
            color={FlowstateColors.textTertiary}
            onPress={() => setSearchQuery("")}
            style={styles.clearIcon}
          />
        )}
      </View>

      {/* Tier Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsList}
        style={styles.chipsRow}
      >
        {TIER_FILTERS.map((filter, index) => (
          <Animated.View
            key={filter.id}
            entering={FadeInDown.delay(index * 50).duration(300)}
          >
            <CategoryChip
              label={filter.label}
              icon={filter.icon}
              isSelected={selectedTier === filter.id}
              onPress={() => setSelectedTier(filter.id)}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* Store Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsList}
        style={styles.chipsRow}
      >
        {STORE_FILTERS.map((filter, index) => (
          <Animated.View
            key={filter.id}
            entering={FadeInDown.delay(index * 40).duration(300)}
          >
            <CategoryChip
              label={filter.label}
              icon={filter.icon}
              isSelected={selectedStore === filter.id}
              onPress={() => setSelectedStore(filter.id)}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* Results count */}
      {!isLoading && products.length > 0 && (
        <ThemedText type="caption" style={styles.resultCount}>
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </ThemedText>
      )}
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={FlowstateColors.primary} />
          <ThemedText type="body" style={styles.loadingText}>
            Loading products...
          </ThemedText>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.centered}>
          <Feather
            name="wifi-off"
            size={48}
            color={FlowstateColors.textTertiary}
          />
          <ThemedText type="h4" style={styles.emptyTitle}>
            Connection Issue
          </ThemedText>
          <ThemedText type="body" style={styles.emptyDescription}>
            Couldn't load products. Pull down to retry.
          </ThemedText>
        </View>
      );
    }

    return (
      <View style={styles.centered}>
        <Feather
          name="archive"
          size={48}
          color={FlowstateColors.textTertiary}
        />
        <ThemedText type="h4" style={styles.emptyTitle}>
          No products yet
        </ThemedText>
        <ThemedText type="body" style={styles.emptyDescription}>
          Start scanning barcodes to build your product database!
        </ThemedText>
      </View>
    );
  };

  const renderProduct = ({
    item,
    index,
  }: {
    item: ScannedFood;
    index: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(index * 80).duration(400)}>
      <ProductCard product={item} onPress={() => handleProductPress(item)} />
    </Animated.View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: headerHeight + Spacing.lg,
            paddingBottom: tabBarHeight + Spacing["3xl"],
          },
        ]}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: FlowstateColors.border,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: FlowstateColors.textPrimary,
    fontWeight: "500",
  },
  clearIcon: {
    padding: 4,
  },
  chipsRow: {
    marginTop: Spacing.md,
    marginHorizontal: -Spacing.lg,
  },
  chipsList: {
    paddingHorizontal: Spacing.lg,
  },
  resultCount: {
    color: FlowstateColors.textSecondary,
    marginTop: Spacing.md,
    fontWeight: "500",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Spacing["5xl"],
    paddingHorizontal: Spacing.xl,
  },
  loadingText: {
    color: FlowstateColors.textSecondary,
    marginTop: Spacing.md,
  },
  emptyTitle: {
    color: FlowstateColors.textPrimary,
    marginTop: Spacing.lg,
    textAlign: "center",
  },
  emptyDescription: {
    color: FlowstateColors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: "center",
    lineHeight: 20,
  },
});
