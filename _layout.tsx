import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      />
    </SafeAreaView>
  );
}
