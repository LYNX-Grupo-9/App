import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MainTitle } from "../../src/components/texts/main-title/main-title";
import { SubTitle } from "@/src/components/texts/subtitle/subtitle";
import { SafeAreaView } from "react-native-safe-area-context";
import MainInput from "@/src/components/inputs/mainInput/mainInput";
import MainButton from "@/src/components/buttons/mainButton";
import { COLORS } from "@/src/constants/colors";
import SecondaryButton from "@/src/components/buttons/secondaryButton";
import { Image } from 'expo-image';
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Erro', e?.response?.data?.message ?? 'E-mail ou senha inválidos.');
    }
  }

  function handleRegister() {
    router.push("/(auth)/register");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/svg/appLogo.svg')}
        style={{ width: 150, height: 150, marginBottom: -20 }}
        contentFit="cover"
      />
      <MainTitle title="JurisMatch" />
      <SubTitle title="Seu direito, ao seu alcance" />

      <MainInput
        title="Email"
        onChange={setEmail}
        value={email}
        placeholder="seu@email.com"
        type="text"
      />

      <View style={{ position: "relative", width: "100%" }}>
        <MainInput
          title="Senha"
          onChange={setPassword}
          value={password}
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((v) => !v)}
          style={styles.eyeIcon}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <MainButton
        title="Entrar"
        onPress={handleLogin}
        isDisabled={isLoading}
      />

      <View style={styles.separator}>
        <View style={styles.line} />
        <SubTitle title="OU" />
        <View style={styles.line} />
      </View>

      <SecondaryButton title="Criar conta" onPress={handleRegister} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
  },
  line: {
    width: '40%',
    height: 1,
    backgroundColor: COLORS.teal,
    opacity: 0.2,
    marginVertical: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    bottom: 18,
  },
});