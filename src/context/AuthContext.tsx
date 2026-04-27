import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import endpoints from '../service/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;   // ← novo: true enquanto lê o AsyncStorage
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, cpf: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEYS = {
  token:     'token',
  userId:    'userId',
  userName:  'userName',
  userEmail: 'userEmail',
} as const;

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<User | null>(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [isInitializing, setIsInitializing] = useState(true); // ← começa true

  // ── Restaura sessão ao abrir o app ───────────────────────────────────────
  useEffect(() => {
    async function restoreSession() {
      try {
        const [[, token], [, userId], [, userName], [, userEmail]] =
          await AsyncStorage.multiGet([
            STORAGE_KEYS.token,
            STORAGE_KEYS.userId,
            STORAGE_KEYS.userName,
            STORAGE_KEYS.userEmail,
          ]);

        if (token && userId && userName && userEmail) {
          setUser({ id: userId, name: userName, email: userEmail, token });
        }
      } catch {
        // falha silenciosa — usuário será redirecionado ao login
      } finally {
        setIsInitializing(false); // ← libera a navegação
      }
    }

    restoreSession();
  }, []);

  // ── Sign-in ───────────────────────────────────────────────────────────────
  async function signIn(email: string, password: string): Promise<void> {
    setIsLoading(true);
    try {
      const response = await endpoints.auth.login({ email, senha: password });
      const data = response.data;

      const loggedUser: User = {
        id:    data.id,
        name:  data.nome,
        email: data.email,
        token: data.token,
      };

      // Persiste no AsyncStorage
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.token,     loggedUser.token],
        [STORAGE_KEYS.userId,    loggedUser.id],
        [STORAGE_KEYS.userName,  loggedUser.name],
        [STORAGE_KEYS.userEmail, loggedUser.email],
      ]);

      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Sign-up ───────────────────────────────────────────────────────────────
  async function signUp(name: string, email: string, password: string, cpf: string): Promise<void> {
    setIsLoading(true);
    try {
      // Adapte para o seu endpoint real de cadastro
      const response = await endpoints.auth.register({ nome: name, email, senha: password, cpf});
      const data = response.data;

      const newUser: User = {
        id:    data.id,
        name:  data.nome,
        email: data.email,
        token: data.token,
      };

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.token,     newUser.token],
        [STORAGE_KEYS.userId,    newUser.id],
        [STORAGE_KEYS.userName,  newUser.name],
        [STORAGE_KEYS.userEmail, newUser.email],
      ]);

      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Sign-out ──────────────────────────────────────────────────────────────
  async function signOut(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isInitializing,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}