import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { addItem } from '../lib/storage';

export default function Add() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');

  async function onSave() {
    if (!name || !category) {
      Alert.alert('請輸入名稱與類別');
      return;
    }
    await addItem({ name, category, color });
    router.back();
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>新增衣物</Text>

      <Text>名稱</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="例如：Uniqlo U 圓領 Tee"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
      />

      <Text>類別</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Tee / 外套 / 褲子 / 襯衫…"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
      />

      <Text>顏色（可選）</Text>
      <TextInput
        value={color}
        onChangeText={setColor}
        placeholder="黑 / 白 / 藍…"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
      />

      <Button title="儲存" onPress={onSave} />
    </View>
  );
}
