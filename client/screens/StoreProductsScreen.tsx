import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import Animated, { FadeInDown } from "react-native-reanimated";

import { ProductCard } from "@/components/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useProducts } from "@/hooks/useProducts";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import type { ScannedFood } from "@/data/mockData";
import type { RootStackParamList } from "@/navigation/RootStackNavigator";

/** Maps Place.name → the store filter string used by useProducts */
const STORE_NAME_MAP: Record<string, string> = {
  "Sprouts Farmers Market": "Sprouts",
  "Whole Foods Market": "Whole Foods",
};

type StoreProductsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StoreProducts">;
  route: RouteProp<RootStackParamList, "StoreProducts">;
};

export default function StoreProductsScreen({
  navigation,
  route,
}: StoreProductsScreenProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { place } = route.params;

  const storeName = STORE_NAME_MAP[place.name] ?? place.name;

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { products, isLoading, isError, refetch } = useProducts(
    searchQuery,
    "green",
    storeName,
  );

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
      {/* Store Info */}
      <View style={styles.storeRow}>
        {place.logo ? (
          <View style={styles.storeLogo}>
            <Image
              source={place.logo}
              style={styles.storeLogoImage}
              contentFit="contain"
            />
          </View>
        ) : (
          <View style={[styles.storeLogo, { backgroundColor: FlowstateColors.primaryLighter }]}>
            <Feather name="shopping-cart" size={20} color={FlowstateColors.primary} />
          </View>
        )}
        <View style={styles.storeInfo}>
          <ThemedText type="h3" style={styles.storeName}>
            {place.name}
          </ThemedText>
          <View style={styles.storeMetaRow}>
            <Feather name="star" size={14} color={FlowstateColors.accent} />
            <ThemedText type="small" style={styles.storeRating}>
              {place.rating}
            </ThemedText>
          </View>
        </View>
      </View>

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
          placeholder={`Search products at ${place.name}...`}
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

      {/* Results count */}
      {!isLoading && products.length > 0 && (
        <ThemedText type="caption" style={styles.resultCount}>
          {products.length} product{products.length !== 1 ? "s" : ""} at{" "}
          {place.name}
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
          No products found at {place.name} yet.
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
      {/* Custom header with back button */}
      <View
        style={[
          styles.navBar,
          {
            paddingTop: insets.top + Spacing.sm,
            backgroundColor: theme.backgroundRoot,
          },
        ]}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={FlowstateColors.textPrimary} />
        </Pressable>
        <ThemedText type="h4" style={styles.navTitle} numberOfLines={1}>
          {place.name}
        </ThemedText>
        <View style={styles.backButton} />
      </View>

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
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    flex: 1,
    textAlign: "center",
    color: FlowstateColors.textPrimary,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  storeLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: FlowstateColors.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  storeLogoImage: {
    width: 32,
    height: 32,
  },
  storeInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  storeName: {
    color: FlowstateColors.textPrimary,
  },
  storeMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  storeRating: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
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
