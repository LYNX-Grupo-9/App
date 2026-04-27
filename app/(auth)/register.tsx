import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constants/colors";
import { StepDadosPessoais } from "@/src/components/register-steps/registerStepOne";
import { StepDescricao } from "@/src/components/register-steps/registerStepTwo";
import { StepAnalise } from "@/src/components/register-steps/registerStepThree";
import endpoints from "@/src/service/api";

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  // Step 2
  const [area, setArea] = useState("");
  const [descricao, setDescricao] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      await endpoints.auth.register({ nome, email, cpf, senha });
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Erro", e?.response?.data?.message ?? "Erro ao cadastrar.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 1 ? router.back() : setStep(step - 1)}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.stepLabel}>PASSO {step} DE 3</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
          </View>
        </View>
        <Text style={styles.logo}>JurisMatch</Text>
      </View>

      {step === 1 ? (
        <StepDadosPessoais
          nome={nome} setNome={setNome}
          email={email} setEmail={setEmail}
          cpf={cpf} setCpf={setCpf}
          senha={senha} setSenha={setSenha}
          onNext={() => setStep(2)}
        />
      ) : step === 2 ? (
        <StepDescricao
          area={area} setArea={setArea}
          descricao={descricao} setDescricao={setDescricao}
          onNext={() => setStep(3)}
        />
      ) : (
        <StepAnalise
          area={area}
          onConfirm={handleConfirm}
          onUpdate={() => {}}
          isLoading={isLoading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 28 },
  backArrow: { fontSize: 22, color: COLORS.teal },
  stepLabel: { fontSize: 10, fontWeight: "bold", color: COLORS.teal, marginBottom: 4 },
  progressBar: { height: 4, backgroundColor: COLORS.tealLight, borderRadius: 99 },
  progressFill: { height: 4, backgroundColor: COLORS.teal, borderRadius: 99 },
  logo: { fontSize: 16, fontWeight: "bold", color: COLORS.navy },
});