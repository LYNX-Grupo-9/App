import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { COLORS } from '../src/constants/colors';
import { common } from '../src/styles/common';
import LawyerCard from '@/src/components/lawyer-card/lawyerCard';
import AICard from '@/src/components/ai-card/aiCard';
import AIModal from '@/src/components/ai-modal/aiModal';
import SectionHeader from '@/src/components/section-header/sectionHeader';
import CaseHeader from '@/src/components/case-header/caseHeader';
import endpoints from '@/src/service/api';

type ApiCase = {
  dataCriacao: string;
  idCaso: string;
  area: string;
  descricao: string;
  status?: string;
  analiseIa: string;
};

type ApiLawyer = {
  advogado: {
    idAdvogado: string;
    nome: string;
    registroOab: string;
    cpf: string;
    email: string;
  };
  definitivo: boolean;
};

export default function CaseDetailScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();

  const [modalVisible, setModalVisible] = useState(false);
  const [caseData, setCaseData] = useState<ApiCase | null>(null);
  const [lawyers, setLawyers] = useState<ApiLawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadCaseDetail() {
    if (!caseId) return;

    try {
      setLoading(true);
      setError('');

      const [caseResponse, lawyersResponse] = await Promise.all([
        endpoints.cases.getById(caseId),
        endpoints.cases.getInterestedLawyers(caseId),
      ]);

      setCaseData(caseResponse.data);
      setLawyers(lawyersResponse.data ?? []);
    } catch (err) {
      console.log(err);
      setError('Não foi possível carregar os detalhes do caso.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCaseDetail();
  }, [caseId]);

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <SectionHeader />

        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.loadingText}>Carregando caso...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={common.container}>
      <SectionHeader />

      <ScrollView style={common.padding}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {caseData && (
          <CaseHeader
            createdAt={caseData?.dataCriacao}
            status={caseData.status}
          />
        )}

        <AICard
          onPress={() => setModalVisible(true)}
          text={caseData?.analiseIa}
        />

        <View style={common.rowSpaced}>
          <Text style={common.sectionTitle}>Advogados interessados</Text>

          <Text style={styles.lawyerCount}>{lawyers.length}</Text>
        </View>

        {lawyers.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum advogado demonstrou interesse neste caso ainda.
          </Text>
        ) : (
          lawyers.map((item) => {
            const lawyer = item.advogado;
            const name = lawyer.nome;
          
            const formattedLawyer = {
              id: lawyer.idAdvogado,
              name,
              area: lawyer.registroOab,
              initials: getInitials(name),
              avatarColor: COLORS.teal,
              about: item.definitivo
                ? 'Este advogado foi selecionado como definitivo para acompanhar o caso.'
                : 'Advogado interessado em conversar sobre este caso.',
            };
          
            return (
              <LawyerCard
                key={lawyer.idAdvogado}
                lawyer={formattedLawyer}
                caseId={caseData.idCaso}
              />
            );
          })
        )}
      </ScrollView>

      <AIModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        analysis={caseData?.analiseIa}
      />
    </SafeAreaView>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.gray,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 12,
  },
  lawyerCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.teal,
  },
});