import AsyncStorage from "@react-native-async-storage/async-storage";

import type {
  WardrobeFilter,
  WardrobeItem,
  WardrobeItemInput,
} from "../types/wardrobe";

const STORAGE_KEY = "@smart-closet/wardrobe";

export const WardrobeService = {
  async getAll(): Promise<WardrobeItem[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed: WardrobeItem[] = JSON.parse(raw);
      return parsed.map((item) => ({
        ...item,
        seasons: item.seasons ?? [],
        tags: item.tags ?? [],
        usageCount: item.usageCount ?? 0,
      }));
    } catch (error) {
      console.warn("Failed to load wardrobe items", error);
      return [];
    }
  },

  async saveAll(items: WardrobeItem[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  async add(input: WardrobeItemInput): Promise<WardrobeItem> {
    const existing = await this.getAll();
    const newItem: WardrobeItem = {
      ...input,
      id: `wardrobe-${Date.now()}`,
      createdAt: new Date().toISOString(),
      usageCount: 0,
      tags: input.tags ?? [],
    };

    const next = [newItem, ...existing];
    await this.saveAll(next);
    return newItem;
  },
};

export const filterWardrobeItems = (
  items: WardrobeItem[],
  filter: WardrobeFilter
): WardrobeItem[] => {
  const query = filter.query?.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = filter.category ? item.category === filter.category : true;
    const matchesQuery = query
      ? [item.name, item.color, ...(item.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(query)
      : true;
    return matchesCategory && matchesQuery;
  });
};
