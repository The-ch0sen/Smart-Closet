import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'smartcloset_items';

export type ClothingItem = {
  id: string;           // uuid
  name: string;         // 品名
  category: string;     // 類別：Tee/外套/褲子...
  color?: string;       // 顏色（可選）
  createdAt: number;    // 建立時間
};

export async function getItems(): Promise<ClothingItem[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addItem(item: Omit<ClothingItem,'id'|'createdAt'>) {
  const list = await getItems();
  const newItem: ClothingItem = {
    id: `${Date.now()}`,
    createdAt: Date.now(),
    ...item,
  };
  const updated = [newItem, ...list];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return newItem;
}
