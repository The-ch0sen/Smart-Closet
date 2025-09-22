import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addItem } from '../lib/storage';

export default function AddItemScreen() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');

  async function onSave() {
    if (!name.trim()) return Alert.alert('請輸入名稱');
    await addItem({ name: name.trim(), category: category.trim() || '未分類' });
    router.back(); // 回到列表，useFocusEffect 會自動重新載入
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 16 }}>名稱</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="例如：白色T恤"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
        />

        <Text style={{ fontSize: 16, marginTop: 8 }}>分類</Text>
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="例如：上衣"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
        />

        <View style={{ marginTop: 16 }}>
          <Button title="儲存" onPress={onSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}
