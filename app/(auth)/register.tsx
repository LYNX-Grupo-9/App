import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '@/src/constants/colors';
import GoBackButton from '@/src/components/go-back/goback';
import { StepDadosPessoais } from '@/src/components/register-steps/registerStepOne';
import { StepDescricao } from '@/src/components/register-steps/registerStepTwo';
import { StepAnalise } from '@/src/components/register-steps/registerStepThree';
import endpoints from '@/src/service/api';
import { useAuth } from '@/src/context/AuthContext';

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, signIn } = useAuth();
  const [step, setStep] = useState(1);

  const [nome, setNome]         = useState('');
  const [email, setEmail]       = useState('');
  const [cpf, setCpf]           = useState('');
  const [senha, setSenha]       = useState('');

  const [area, setArea]         = useState('');
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo]     = useState('');
  const [analise, setAnalise]   = useState('');

  const [isLoadingAnalise, setIsLoadingAnalise] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate]   = useState(false);

  function handleBack() {
    if (step === 1) router.back();
    else setStep((s) => s - 1);
  }

  async function handleAnalise() {
    setIsLoadingAnalise(true);
    try {
      const { data } = await endpoints.ai.analisarCaso({ area, descricao });
      const tituloExtraido = data.analise.match(/\*\*(.+?)\*\*/)?.[1] ?? 'Análise Jurídica';
      setAnalise(data.analise);
      setTitulo(tituloExtraido);
      setStep(3);
    } catch {
      Alert.alert('Erro', 'Não foi possível analisar o caso. Tente novamente.');
    } finally {
      setIsLoadingAnalise(false);
    }
  }

  async function handleConfirm() {
    setIsLoadingCreate(true);
    try {
      await signUp(nome, email, senha, cpf.replace(/\D/g, ''));
      await signIn(email, senha);

      const clienteId = await AsyncStorage.getItem('userId');
      if (clienteId) {
        await endpoints.cases.create({
          areaDireito: area,
          titulo,
          descricao,
          analiseIa: analise,
          idCliente: clienteId,
        });
      }

      router.replace('/(tabs)');
    } catch (e: any) {
      console.log('Erro completo:', e?.response?.data ?? e);
      Alert.alert('Erro', e?.response?.data?.message ?? 'Erro ao cadastrar.');
    } finally {
      setIsLoadingCreate(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GoBackButton onPress={handleBack} color={COLORS.teal} />
        <View style={styles.progressWrapper}>
          <Text style={styles.stepLabel}>PASSO {step} DE {TOTAL_STEPS}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / TOTAL_STEPS) * 100}%` }]} />
          </View>
        </View>
        <Text style={styles.logo}>JurisMatch</Text>
      </View>

      {step === 1 && (
        <StepDadosPessoais
          nome={nome} setNome={setNome}
          email={email} setEmail={setEmail}
          cpf={cpf} setCpf={setCpf}
          senha={senha} setSenha={setSenha}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepDescricao
          area={area} setArea={setArea}
          descricao={descricao} setDescricao={setDescricao}
          onNext={handleAnalise}
          isLoading={isLoadingAnalise}
        />
      )}
      {step === 3 && (
        <StepAnalise
          area={area}
          analise={analise}
          onConfirm={handleConfirm}
          onUpdate={setAnalise}
          isLoading={isLoadingCreate}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  progressWrapper: { flex: 1, marginLeft: 12 },
  stepLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.teal, marginBottom: 4 },
  progressBar: { height: 4, backgroundColor: COLORS.tealLight, borderRadius: 99 },
  progressFill: { height: 4, backgroundColor: COLORS.teal, borderRadius: 99 },
  logo: { fontSize: 16, fontWeight: 'bold', color: COLORS.navy },
});