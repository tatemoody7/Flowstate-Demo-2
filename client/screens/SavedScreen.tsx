import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Animated, { FadeInDown } from "react-native-reanimated";

import { PlaceCard } from "@/components/PlaceCard";
import { FoodCard } from "@/components/FoodCard";
import { EmptyState } from "@/components/EmptyState";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { mockPlaces, mockScannedFoods, Place, ScannedFood } from "@/data/mockData";
import { MainTabParamList } from "@/navigation/MainTabNavigator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type SavedScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "SavedTab">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { savedPlaces, savedFoods, toggleSavedPlace, toggleSavedFood } = useApp();
  const navigation = useNavigation<SavedScreenNavigationProp>();

  const [activeTab, setActiveTab] = useState<"places" | "foods">("places");
  const [refreshing, setRefreshing] = useState(false);

  const savedPlacesList = mockPlaces.filter((place) => savedPlaces.includes(place.id));
  const savedFoodsList = mockScannedFoods.filter((food) => savedFoods.includes(food.id));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePlacePress = (place: Place) => {
    navigation.navigate("PlaceDetail", { place });
  };

  const handleFoodPress = (food: ScannedFood) => {
    navigation.navigate("FoodDetail", { food });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.segmentedControl}>
        <Pressable
          onPress={() => setActiveTab("places")}
          style={[
            styles.segment,
            activeTab === "places" && styles.segmentActive,
          ]}
        >
          <ThemedText
            type="body"
            style={[
              styles.segmentText,
              activeTab === "places" && styles.segmentTextActive,
            ]}
          >
            Places ({savedPlacesList.length})
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("foods")}
          style={[
            styles.segment,
            activeTab === "foods" && styles.segmentActive,
          ]}
        >
          <ThemedText
            type="body"
            style={[
              styles.segmentText,
              activeTab === "foods" && styles.segmentTextActive,
            ]}
          >
            Foods ({savedFoodsList.length})
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );

  const renderPlacesEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-saved.png")}
      title="No saved places yet"
      description="Tap the heart icon on any place to save it for quick access later"
      actionLabel="Explore Places"
      onAction={() => navigation.navigate("DiscoverTab")}
    />
  );

  const renderFoodsEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-saved.png")}
      title="No saved foods yet"
      description="Scan food items and save them to track nutrition and ingredients"
      actionLabel="Start Scanning"
      onAction={() => navigation.navigate("Scanner")}
    />
  );

  const renderPlace = ({ item, index }: { item: Place; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <PlaceCard
        place={item}
        isSaved={true}
        onPress={() => handlePlacePress(item)}
        onSavePress={() => toggleSavedPlace(item.id)}
      />
    </Animated.View>
  );

  const renderFood = ({ item, index }: { item: ScannedFood; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <FoodCard
        food={item}
        isSaved={true}
        onPress={() => handleFoodPress(item)}
        onSavePress={() => toggleSavedFood(item.id)}
      />
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      {activeTab === "places" ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: headerHeight + Spacing.lg,
              paddingBottom: tabBarHeight + Spacing.xl,
            },
          ]}
          scrollIndicatorInsets={{ bottom: insets.bottom }}
          data={savedPlacesList}
          keyExtractor={(item) => item.id}
          renderItem={renderPlace}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderPlacesEmpty}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={FlowstateColors.primary}
            />
          }
        />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: headerHeight + Spacing.lg,
              paddingBottom: tabBarHeight + Spacing.xl,
            },
          ]}
          scrollIndicatorInsets={{ bottom: insets.bottom }}
          data={savedFoodsList}
          keyExtractor={(item) => item.id}
          renderItem={renderFood}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderFoodsEmpty}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={FlowstateColors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: FlowstateColors.backgroundSecondary,
    borderRadius: BorderRadius.sm,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
    borderRadius: BorderRadius.xs,
  },
  segmentActive: {
    backgroundColor: FlowstateColors.surface,
  },
  segmentText: {
    color: FlowstateColors.textSecondary,
  },
  segmentTextActive: {
    color: FlowstateColors.textPrimary,
    fontWeight: "600",
  },
});
