import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";
import { WardrobeItemCard } from "../components/WardrobeItemCard";
import { WardrobeService, filterWardrobeItems } from "../services/wardrobe";
import type { ClothingCategory, WardrobeItem } from "../types/wardrobe";
import { colors, radius, spacing, typography } from "../theme";

const CATEGORY_OPTIONS: { label: string; value: ClothingCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Tops", value: "top" },
  { label: "Bottoms", value: "bottom" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Footwear", value: "footwear" },
  { label: "Accessories", value: "accessory" },
];

export const WardrobeScreen: React.FC = () => {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | "all">("all");
  const [filtered, setFiltered] = useState<WardrobeItem[]>([]);

  const loadItems = useCallback(async () => {
    const data = await WardrobeService.getAll();
    setItems(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadItems();
    }, [loadItems])
  );

  useEffect(() => {
    const category = selectedCategory === "all" ? undefined : selectedCategory;
    const next = filterWardrobeItems(items, { category, query });
    setFiltered(next);
  }, [items, query, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Wardrobe</Text>
        <TextInput
          placeholder="Search name, color, or tags"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
        <CategoryFilter
          options={CATEGORY_OPTIONS}
          selected={selectedCategory}
          onSelect={(value) => setSelectedCategory(value ?? "all")}
        />
        <FlatList
          contentContainerStyle={styles.listContent}
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WardrobeItemCard item={item} />}
          ListEmptyComponent={
            <EmptyState
              title="Nothing here yet"
              description="Add your first piece to start building your wardrobe."
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
});
