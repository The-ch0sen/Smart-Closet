import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";

import type { ClothingCategory } from "../types/wardrobe";
import { colors, radius, spacing } from "../theme";

type FilterValue = ClothingCategory | "all" | undefined;

export interface CategoryFilterOption {
  label: string;
  value: FilterValue;
}

interface CategoryFilterProps {
  options: CategoryFilterOption[];
  selected?: FilterValue;
  onSelect: (value: FilterValue) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  options,
  selected,
  onSelect,
}) => (
  <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {options.map((option) => {
        const isActive = option.value === selected;
        return (
          <Pressable
            accessibilityRole="button"
            key={option.label}
            onPress={() => onSelect(option.value)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    marginRight: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: "600",
  },
});
