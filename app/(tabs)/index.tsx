import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';

import { COLORS } from '../../src/constants/colors';
import { common } from '../../src/styles/common';
import CaseCarouselCard from '@/src/components/case-carousel/caseCarousel';
import LawyerListItem from '@/src/components/lawyer-list-item/lawyerListItem';
import endpoints from '@/src/service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
type ApiCase = {
  idCaso: string;
  areaDireito: string;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao: string;
  analiseIa: string;
};

type ApiLawyer = {
  idCaso?: string;
  descricaoCaso?: string;
  advogado: {
    idAdvogado: string;
    nome: string;
    registroOab: string;
    cpf: string;
    email: string;
  };
  definitivo: boolean;
};

export default function HomeTab() {

  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [cases, setCases] = useState<ApiCase[]>([]);
  const [lawyersByCase, setLawyersByCase] =
    useState<Record<string, ApiLawyer[]>>({});
  const [allInterestedLawyers, setAllInterestedLawyers] =
    useState<ApiLawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      if (name) setUserName(name);
   
    }
    loadUser();
  }, []);
  async function loadHomeData() {
    try {
      setLoading(true);
      setError('');

      const casesResponse = await endpoints.cases.getAll();
      const apiCases: ApiCase[] = casesResponse.data ?? [];

      setCases(apiCases);

      const interestedResponses = await Promise.all(
        apiCases.map(async (item) => {
          const response = await endpoints.cases.getInterestedLawyers(item.idCaso);

          return {
            caseId: item.idCaso,
            lawyers: response.data ?? [],
          };
        })
      );

      const lawyersMap: Record<string, ApiLawyer[]> = {};
      const uniqueLawyersMap = new Map<string, ApiLawyer>();

      interestedResponses.forEach(({ caseId, lawyers }) => {
        const caseData = apiCases.find((item) => item.idCaso === caseId);

        lawyersMap[caseId] = lawyers;

        lawyers.forEach((item: ApiLawyer) => {
          const lawyerId = item.advogado.idAdvogado;

          if (lawyerId) {
            uniqueLawyersMap.set(lawyerId, {
              ...item,
              idCaso: caseId,
              descricaoCaso: caseData?.titulo ?? '',
            });
          }
        });
      });

      setLawyersByCase(lawyersMap);
      setAllInterestedLawyers(Array.from(uniqueLawyersMap.values()));
    } catch (err) {
      console.log(err);
      setError('Não foi possível carregar os dados da tela inicial.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHomeData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={common.container}>
      <StatusBar barStyle="dark-content" />

      <View style={common.headerHome}>
        <Text style={common.logoText}>JurisMatch</Text>
        <Bell color={COLORS.navy} size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={common.padding}>
          <Text style={common.greeting}>Olá, {userName}</Text>
          <Text style={common.subtitle}>
            Confira o andamento dos seus casos hoje
          </Text>

          <View style={common.rowSpaced}>
            <Text style={common.sectionTitle}>Meus Casos</Text>

            <TouchableOpacity
              style={common.btnNewCase}
              onPress={() => router.push('/new-case')}
            >
              <Text style={common.btnNewCaseText}>+ Novo caso</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={cases}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          keyExtractor={(item) => item.idCaso}
          renderItem={({ item }) => {
            const lawyers = lawyersByCase[item.idCaso] ?? [];

            const formattedLawyers = lawyers.map((item) => {
              const name = item.advogado.nome;

              return {
                id: item.advogado.idAdvogado,
                initials: getInitials(name),
                avatarColor: COLORS.teal,
              };
            });

            return (
              <CaseCarouselCard
                title={item.titulo}
                area={item.areaDireito}
                status={item.status}
                lawyers={formattedLawyers}
                onPress={() =>
                  router.push({
                    pathname: '/case-detail',
                    params: { caseId: item.idCaso },
                  })
                }
              />
            );
          }}
        />
        <View style={common.padding}>
          <Text style={common.sectionTitle}>Advogados interessados</Text>
          <Text style={common.subtitle}>
            Advogados que desejam falar com você
          </Text>

          {allInterestedLawyers.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum advogado interessado até o momento.
            </Text>
          ) : (
            allInterestedLawyers.map((item) => {
              const lawyer = item.advogado;
              const name = lawyer.nome;

              return (
                <LawyerListItem
                  key={`${lawyer.idAdvogado}-${item.idCaso}`}
                  id={lawyer.idAdvogado}
                  name={name}
                  area={lawyer.registroOab}
                  initials={getInitials(name)}
                  avatarColor={COLORS.teal}
                  caseId={item.idCaso}
                  description={item.descricaoCaso}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

const styles = StyleSheet.create({
  carousel: {
    paddingLeft: 20,
    paddingRight: 10,
  },
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
    marginVertical: 12,
    color: 'red',
    fontSize: 13,
  },
  emptyCard: {
    width: width * 0.75,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    backgroundColor: COLORS.white,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 10,
  },
});