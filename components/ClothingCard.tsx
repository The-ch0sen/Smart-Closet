import React from 'react';
import { View, Text } from 'react-native';
import type { ClothingItem } from '../lib/storage';

export default function ClothingCard({ item }: { item: ClothingItem }) {
  return (
    <View style={{
      padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd',
      marginBottom: 10, backgroundColor: 'white'
    }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
      <Text style={{ color: '#666' }}>{item.category}{item.color ? ` · ${item.color}` : ''}</Text>
    </View>
  );
}
