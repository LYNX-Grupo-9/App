import { Stack } from 'expo-router';
import { useReadStatus } from '../src/hooks/useReadStatus';
import { ReadStatusContext } from './ReadStatusContext';

export default function RootLayout() {
  const { readIds, markAsRead, isRead } = useReadStatus();

  return (
    <ReadStatusContext.Provider value={{ readIds, markAsRead, isRead }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="case-detail" />
        <Stack.Screen name="lawyer-profile" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="rate" />
        <Stack.Screen name="success" />
        <Stack.Screen name="my-cases" />
      </Stack>
    </ReadStatusContext.Provider>
  );
}
