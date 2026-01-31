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
    gap: Spacing.sm,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: FlowstateColors.textPrimary,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    backgroundColor: FlowstateColors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
});
