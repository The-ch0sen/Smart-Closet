import React from 'react';
import { View, Text, Button } from 'react-native';
import { type ClothingItem, removeItem } from '../lib/storage';

export default function ClothingCard({ item }: { item: ClothingItem }) {
  async function onRemove() {
    await removeItem(item.id);
  }

  return (
    <View
      style={{
        padding: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
      <Text style={{ color: '#666', marginTop: 4 }}>{item.category}</Text>
      <View style={{ marginTop: 8, alignSelf: 'flex-start' }}>
        <Button title="刪除" onPress={onRemove} />
      </View>
    </View>
  );
}
