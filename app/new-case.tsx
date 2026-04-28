// app/new-case.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../src/constants/colors';
import { common } from '../src/styles/common';
import GoBackButton from '../src/components/go-back/goback';
import { StepDescricao } from '@/src/components/register-steps/registerStepTwo';
import { StepAnalise } from '@/src/components/register-steps/registerStepThree';
import endpoints from '@/src/service/api';

type Step = 'descricao' | 'analise';

export default function NewCaseScreen() {
  const router = useRouter();
  const [area, setArea] = useState('');
  const [descricao, setDescricao] = useState('');
  const [step, setStep] = useState<Step>('descricao');
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [analise, setAnalise] = useState('');
  const [isLoadingAnalise, setIsLoadingAnalise] = useState(false);
  const [titulo, setTitulo] = useState('');

  async function handleConfirmar() {
    setIsLoadingCreate(true);

    try {
      const clienteId = await AsyncStorage.getItem('userId');

      if (!clienteId) {
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        return;
      }

        await endpoints.cases.create({
            areaDireito: area,
            titulo: titulo,
            descricao,
            analiseIa: analise,
            idCliente: clienteId
        });
      Alert.alert(
        'Caso criado!',
        'Seu caso foi cadastrado com sucesso. Advogados da área serão notificados.',
        [{ text: 'OK', onPress: () => router.replace('/my-cases') }]
      );
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? 'Não foi possível criar o caso.';
      Alert.alert('Erro', msg);
    } finally {
      setIsLoadingCreate(false);
    }
  }

 async function handleSetTwo() {
  if (!area) {
    Alert.alert('Atenção', 'Selecione uma área do direito para continuar.');
    return;
  }
  if (!descricao || descricao.length < 20) {
    Alert.alert('Atenção', 'Forneça uma descrição detalhada (mínimo 20 caracteres).');
    return;
  }

  setIsLoadingAnalise(true);
  try {
    const { data } = await endpoints.ai.analisarCaso({ area, descricao });
    const titulo = data.analise.match(/\*\*(.+?)\*\*/)?.[1] ?? 'Análise Jurídica'
    setAnalise(data.analise); 
    setTitulo(titulo);
    setStep('analise');         
  } catch (err: any) {
    Alert.alert('Erro', 'Não foi possível analisar o caso. Tente novamente.');
  } finally {
    setIsLoadingAnalise(false);
  }
}

  const steps: Step[] = ['descricao', 'analise'];
  const currentIndex = steps.indexOf(step);

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
        <GoBackButton
          onPress={step === 'analise' ? () => setStep('descricao') : undefined}
        />
        <Text style={common.screenTitle}>Novo Caso</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {step === 'descricao' && (
          <StepDescricao
            area={area}
            setArea={setArea}
            descricao={descricao}
            setDescricao={setDescricao}
            onNext={handleSetTwo}
            isLoading={isLoadingAnalise}
          />
        )}

        {step === 'analise' && (
          <StepAnalise
            area={area}
            analise={analise}
            onConfirm={handleConfirmar}
            onUpdate={setAnalise}
            isLoading={isLoadingCreate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSpacer: { width: 24 },
  content: { flex: 1, paddingHorizontal: 20 },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDotActive: { borderColor: COLORS.teal, backgroundColor: COLORS.teal },
  progressDotText: { fontSize: 12, fontWeight: 'bold', color: COLORS.gray },
  progressDotTextActive: { color: COLORS.white },
  progressLine: { flex: 1, height: 2, backgroundColor: COLORS.grayBorder, marginHorizontal: 4 },
  progressLineActive: { backgroundColor: COLORS.teal },
});