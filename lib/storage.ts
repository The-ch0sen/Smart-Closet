import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'smart-closet-items';

export type ClothingItem = {
  id: string;
  name: string;
  category: string;
  createdAt: number;
};

export async function getItems(): Promise<ClothingItem[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const arr: ClothingItem[] = JSON.parse(raw);
    return Array.isArray(arr) ? arr.sort((a, b) => b.createdAt - a.createdAt) : [];
  } catch {
    return [];
  }
}

export async function addItem(partial: { name: string; category: string }) {
  const items = await getItems();
  const item: ClothingItem = {
    id: Date.now().toString(),
    name: partial.name,
    category: partial.category,
    createdAt: Date.now(),
  };
  await AsyncStorage.setItem(KEY, JSON.stringify([item, ...items]));
}

export async function removeItem(id: string) {
  const items = await getItems();
  await AsyncStorage.setItem(KEY, JSON.stringify(items.filter(i => i.id !== id)));
}
