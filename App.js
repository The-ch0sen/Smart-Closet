import React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar />
      <Text style={{ fontSize: 18 }}>Hello Smart Closet 👕</Text>
    </View>
  );
}
