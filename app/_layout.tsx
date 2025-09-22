import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: '我的衣櫥' }} />
        <Stack.Screen name="add" options={{ title: '新增衣物' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
