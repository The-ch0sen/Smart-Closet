import React from 'react';
import { View, Text, Button, FlatList, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import ClothingCard from '../components/ClothingCard';
import { getItems, type ClothingItem } from '../lib/storage';

export default function Home() {
  const [data, setData] = React.useState<ClothingItem[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const load = React.useCallback(async () => {
    setRefreshing(true);
    const items = await getItems();
    setData(items);
    setRefreshing(false);
  }, []);

  useFocusEffect(React.useCallback(() => { load(); }, [load]));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>
          我的衣櫥
        </Text>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <ClothingCard item={item} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
          ListEmptyComponent={<Text style={{ color: '#666' }}>目前沒有衣物，點右下角新增</Text>}
          contentContainerStyle={data.length === 0 ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : undefined}
        />

        <View style={{ position: 'absolute', right: 16, bottom: 24 }}>
          <Link href="/add" asChild>
            <Button title="新增衣物" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
