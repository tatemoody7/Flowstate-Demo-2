import React from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  onFilterPress,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Feather
          name="search"
          size={18}
          color={FlowstateColors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={FlowstateColors.textTertiary}
          style={styles.input}
          returnKeyType="search"
        />
        {value.length > 0 ? (
          <Pressable onPress={() => onChangeText("")} hitSlop={8}>
            <Feather name="x" size={16} color={FlowstateColors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
      {onFilterPress ? (
        <Pressable onPress={onFilterPress} style={styles.filterButton}>
          <Feather name="sliders" size={18} color={FlowstateColors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    height: 52,
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: FlowstateColors.textPrimary,
    fontWeight: "500",
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.xl,
    backgroundColor: FlowstateColors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: FlowstateColors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
});
