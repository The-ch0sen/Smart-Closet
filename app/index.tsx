import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, RefreshControl } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import ClothingCard from '../components/ClothingCard';
import { getItems, type ClothingItem } from '../lib/storage';

export default function Home() {
  const [data, setData] = useState<ClothingItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    setRefreshing(true);
    const items = await getItems();
    setData(items);
    setRefreshing(false);
  }

  useFocusEffect(React.useCallback(() => { load(); }, []));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>
        我的衣櫥
      </Text>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ClothingCard item={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        ListEmptyComponent={<Text style={{ color: '#666' }}>目前沒有衣物，點右上角新增</Text>}
      />

      <View style={{ position: 'absolute', right: 16, bottom: 24 }}>
        <Link href="/add" asChild>
          <Button title="新增衣物" />
        </Link>
      </View>
    </View>
  );
}
