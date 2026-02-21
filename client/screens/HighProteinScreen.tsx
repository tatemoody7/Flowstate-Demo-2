import React, { useState, useMemo } from "react";
import { StyleSheet, View, FlatList, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import HighProteinItemCard from "@/components/HighProteinItemCard";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { HIGH_PROTEIN_STORES, getHighProteinItems } from "@/data/highProteinData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type SortBy = "protein" | "price" | "calories";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "meat", label: "Meat" },
  { key: "dairy", label: "Dairy" },
  { key: "plant", label: "Plant" },
  { key: "bar", label: "Bars" },
  { key: "seafood", label: "Seafood" },
  { key: "other", label: "Other" },
];

export default function HighProteinScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedStore, setSelectedStore] = useState(HIGH_PROTEIN_STORES[0].storeKey);
  const [sortBy, setSortBy] = useState<SortBy>("protein");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const items = useMemo(
    () => getHighProteinItems(selectedStore, { category: selectedCategory, sortBy }),
    [selectedStore, selectedCategory, sortBy]
  );

  const selectedStoreData = HIGH_PROTEIN_STORES.find((s) => s.storeKey === selectedStore);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={FlowstateColors.textPrimary} />
        </Pressable>
        <ThemedText type="h2" style={styles.headerTitle}>
          High Protein Picks
        </ThemedText>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Store Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storeList}
        style={styles.storeScroll}
      >
        {HIGH_PROTEIN_STORES.map((store) => {
          const isSelected = store.storeKey === selectedStore;
          return (
            <Pressable
              key={store.storeKey}
              onPress={() => setSelectedStore(store.storeKey)}
              style={[
                styles.storeCard,
                isSelected && { borderColor: store.color, backgroundColor: `${store.color}10` },
              ]}
            >
              <ThemedText
                type="small"
                style={[
                  styles.storeName,
                  isSelected && { color: store.color, fontWeight: "700" },
                ]}
                numberOfLines={1}
              >
                {store.storeName}
              </ThemedText>
              <ThemedText type="caption" style={styles.storeDistance}>
                {store.distance}
              </ThemedText>
              <ThemedText type="caption" style={styles.storeCount}>
                {store.items.length} items
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Sort and Filter */}
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {/* Sort chips */}
          {(["protein", "price", "calories"] as SortBy[]).map((sort) => (
            <Pressable
              key={sort}
              onPress={() => setSortBy(sort)}
              style={[styles.filterChip, sortBy === sort && styles.filterChipActive]}
            >
              <ThemedText
                type="caption"
                style={[styles.filterChipText, sortBy === sort && styles.filterChipTextActive]}
              >
                By {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </ThemedText>
            </Pressable>
          ))}

          <View style={styles.filterDivider} />

          {/* Category chips */}
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.key}
              onPress={() => setSelectedCategory(cat.key)}
              style={[styles.filterChip, selectedCategory === cat.key && styles.filterChipActive]}
            >
              <ThemedText
                type="caption"
                style={[styles.filterChipText, selectedCategory === cat.key && styles.filterChipTextActive]}
              >
                {cat.label}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 60).duration(300)}
            style={styles.itemWrapper}
          >
            <HighProteinItemCard item={item} index={index} />
          </Animated.View>
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={40} color={FlowstateColors.textTertiary} />
            <ThemedText type="body" style={styles.emptyText}>
              No items match your filters
            </ThemedText>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FlowstateColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FlowstateColors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: FlowstateColors.textPrimary,
  },
  headerPlaceholder: {
    width: 44,
  },
  storeScroll: {
    flexGrow: 0,
    marginBottom: Spacing.md,
  },
  storeList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  storeCard: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: FlowstateColors.border,
    backgroundColor: FlowstateColors.surface,
    alignItems: "center",
    minWidth: 90,
  },
  storeName: {
    color: FlowstateColors.textPrimary,
    fontSize: 13,
  },
  storeDistance: {
    color: FlowstateColors.textTertiary,
    marginTop: 1,
  },
  storeCount: {
    color: FlowstateColors.textSecondary,
    marginTop: 2,
  },
  filterRow: {
    marginBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xs,
    alignItems: "center",
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: FlowstateColors.surface,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  filterChipActive: {
    backgroundColor: FlowstateColors.primary,
    borderColor: FlowstateColors.primary,
  },
  filterChipText: {
    color: FlowstateColors.textSecondary,
    fontSize: 12,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  filterDivider: {
    width: 1,
    height: 20,
    backgroundColor: FlowstateColors.border,
    marginHorizontal: Spacing.xs,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  itemWrapper: {},
  emptyContainer: {
    alignItems: "center",
    paddingTop: Spacing["5xl"],
    gap: Spacing.md,
  },
  emptyText: {
    color: FlowstateColors.textTertiary,
  },
});
