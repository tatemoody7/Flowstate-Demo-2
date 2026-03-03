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
import { Feather } from "@expo/vector-icons";

import Animated, { FadeInDown } from "react-native-reanimated";

import { ProductCard } from "@/components/ProductCard";
import { CategoryChip } from "@/components/CategoryChip";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useProducts } from "@/hooks/useProducts";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import type { ScannedFood } from "@/data/mockData";

const TIER_FILTERS = [
  { id: "all", label: "All", icon: "grid" as const },
  { id: "green", label: "Solid Pick", icon: "check-circle" as const },
  { id: "yellow", label: "Not Bad", icon: "alert-circle" as const },
  { id: "red", label: "Be Honest", icon: "x-circle" as const },
];

export default function ProductDatabaseScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");

  // Debounced search — pass raw values to the hook which handles API call
  const { products, isLoading, isError, refetch } = useProducts(
    searchQuery,
    selectedTier,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleProductPress = (product: ScannedFood) => {
    // For now, no-op — in the future could navigate to a detail screen
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
            paddingBottom: insets.bottom + Spacing["3xl"],
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
    paddingTop: Spacing.lg,
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
  },
  chipsList: {
    paddingRight: Spacing.lg,
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
