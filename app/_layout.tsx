import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ReadStatusContext } from '../src/context/ReadStatusContext';
import { useReadStatus } from '../src/hooks/useReadStatus';
import { AuthProvider } from '../src/context/AuthContext';
import { useAuth } from '../src/context/AuthContext';

function AuthGate() {
  const { isAuthenticated, isInitializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return; // aguarda o AsyncStorage carregar

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Não autenticado e fora do grupo de auth → vai pro login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Já autenticado mas ainda na tela de login/register → vai pras tabs
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitializing, segments]);

  return null; // só gerencia navegação, não renderiza nada
}

// ─── AppStack ────────────────────────────────────────────────────────────────

function AppStack() {
  const { readIds, markAsRead, isRead } = useReadStatus();

  return (
    <ReadStatusContext.Provider value={{ readIds, markAsRead, isRead }}>
      <AuthGate />
      <Stack screenOptions={{ headerShown: false }} />
    </ReadStatusContext.Provider>
  );
}

// ─── RootLayout ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}