// src/hooks/useRequireAuth.ts

import { useEffect } from 'react';
import { useRouter, Href } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

export function useRequireAuth() {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace(ROUTES.login as Href);
    }
  }, [isAuthenticated, isInitializing]);
}