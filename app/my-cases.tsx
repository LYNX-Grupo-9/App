import { useRouter } from 'expo-router';
import { FileText, MessageSquare, Sparkles } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GoBackButton from '../src/components/go-back/goback';
import { COLORS } from '../src/constants/colors';
import { common } from '../src/styles/common';
import endpoints from '../src/service/api';

type Caso = {
  id: string;
  title: string;
  area: string;
  status: string;
  filedAt: string;
  description: string;
  successProbability: string;
  analiseIa: string;  
  documents: string[];
};

type Advogado = {
  id: string;
  name: string;
  area: string;
  initials: string;
  avatarColor: string;
};

type CasoComAdvogados = Caso & { lawyers: Advogado[] };

const probabilityColors = (p: string) => {
  if (p === 'Alta') return { bg: '#E8F5E9', txt: '#2E7D32' };
  if (p === 'Média') return { bg: '#FFF8E1', txt: '#F57F17' };
  return { bg: '#FFEBEE', txt: '#C62828' };
};

const buildAdvogado = (raw: any): Advogado => {
  // A API retorna { advogado: { idAdvogado, nome, ... }, definitivo: boolean }
  const lawyer = raw.advogado ?? raw;
  const name = lawyer.nome ?? lawyer.name ?? '';

  const words = name.split(' ').filter(Boolean);
  const initials = words.length >= 2
    ? `${words[0][0]}${words[words.length - 1][0]}`
    : words[0]?.slice(0, 2) ?? '??';

  const colors = ['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#4527A0'];
  const id = lawyer.idAdvogado ?? lawyer.id ?? '';
  const avatarColor = colors[id.charCodeAt(0) % colors.length] ?? COLORS.teal;

  return {
    id,
    name,
    area: lawyer.especialidade ?? lawyer.area ?? lawyer.registroOab ?? '',
    initials: initials.toUpperCase(),
    avatarColor,
  };
};
function formatDate(raw: string): string {
  if (!raw) return '';
  // Se já vier formatado (ex: "12 Out. 2024"), devolve como está
  if (!/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw;
  const [y, m, d] = raw.split('T')[0].split('-');
  return `${d}/${m}/${y}`;
}

function normalizeDocuments(docs: any[]): string[] {
  if (!Array.isArray(docs)) return [];
  return docs
    .map((doc) => {
      if (typeof doc === 'string') return doc;
      return doc.nome ?? doc.name ?? doc.titulo ?? doc.filename ?? '';
    })
    .filter(Boolean);
}
const buildCaso = (raw: any): Caso => ({
  id: raw.idCaso,
  title: raw.titulo ?? 'Sem título',
  area: raw.areaDireito ?? '',
  status: raw.status ?? '',
  filedAt: formatDate(raw.dataCriacao ?? ''),
  description: raw.descricao ?? '',
  successProbability: raw.probabilidadeExito ?? '', // analiseIa como fallback
  documents: normalizeDocuments(raw.documentos ?? raw.documents ?? []),
  analiseIa: raw.analiseIa ?? '',
});
export default function MyCasesScreen() {
  const router = useRouter();

  const [cases, setCases] = useState<CasoComAdvogados[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = useCallback(async () => {
    try {
      setError(null);

      const { data: rawCases } = await endpoints.cases.getAll();
      const casosList: Caso[] = (rawCases ?? []).map(buildCaso);

      const casesWithLawyers: CasoComAdvogados[] = await Promise.all(
        casosList.map(async (caso) => {
          try {
            const { data: rawLawyers } = await endpoints.cases.getInterestedLawyers(caso.id);
            const lawyers = (rawLawyers ?? []).map(buildAdvogado);
            return { ...caso, lawyers };
          } catch {
            // Se falhar, retorna sem advogados em vez de quebrar tudo
            return { ...caso, lawyers: [] };
          }
        })
      );

      setCases(casesWithLawyers);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Erro ao carregar os casos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCases();
  }, [fetchCases]);

  // ─── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={common.headerSimple}>
          <GoBackButton />
          <Text style={common.screenTitle}>Meus Casos</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.centerFeedback}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.feedbackText}>Carregando casos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Error ────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <SafeAreaView style={common.container}>
        <View style={common.headerSimple}>
          <GoBackButton />
          <Text style={common.screenTitle}>Meus Casos</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.centerFeedback}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchCases}>
            <Text style={common.txtWhite}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
        <GoBackButton />
        <Text style={common.screenTitle}>Meus Casos</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={common.padding}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.teal]}
            tintColor={COLORS.teal}
          />
        }
      >
        <Text style={common.subtitle}>
          {cases.length} {cases.length === 1 ? 'caso ativo' : 'casos ativos'} no momento
        </Text>

        {cases.length === 0 && (
          <View style={styles.centerFeedback}>
            <Text style={styles.feedbackText}>Nenhum caso encontrado.</Text>
          </View>
        )}

        {cases.map((c) => {
          const clr = probabilityColors(c.successProbability);

          return (
            <View key={c.id} style={styles.card}>
              {/* Header */}
              <View style={common.rowSpaced}>
                <View style={common.tagArea}>
                  <Text style={common.tagAreaText}>{c.area}</Text>
                </View>
                <View style={common.tagStatus}>
                  <Text style={common.tagStatusText}>{c.status}</Text>
                </View>
              </View>

              <Text style={styles.title}>{c.title}</Text>

              <Text style={common.dateText}>Protocolado em {c.filedAt}</Text>

              <Text style={styles.description}>{c.description}</Text>
              {/* Análise da IA — logo abaixo da descrição */}
              {!!c.analiseIa && (
                <View style={styles.analiseBox}>
                  <View style={styles.analiseHeader}>
                    <Sparkles color={COLORS.teal} size={13} />
                    <Text style={styles.analiseTitle}>Análise da IA</Text>
                  </View>
                  <Text style={styles.analiseText}>{c.analiseIa}</Text>
                </View>
              )}
              {/* Probability */}
              {!!c.successProbability && (
                <View style={[common.tagProbability, { backgroundColor: clr.bg }]}>
                  <Sparkles color={clr.txt} size={13} />
                  <Text style={[common.tagProbabilityText, { color: clr.txt }]}>
                    Probabilidade de êxito: {c.successProbability}
                  </Text>
                </View>
              )}

              {/* Documents */}
              {c.documents.length > 0 && (
                <>
                  <Text style={styles.sectionLabel}>DOCUMENTOS</Text>
                  {c.documents.map((doc, i) => (
                    <View key={i} style={common.documentRow}>
                      <FileText color={COLORS.teal} size={14} />
                      <Text style={common.documentText}>{doc}</Text>
                    </View>
                  ))}
                </>
              )}

              {/* Lawyers */}
              <Text style={styles.sectionLabel}>ADVOGADOS INTERESSADOS</Text>

              {c.lawyers.length === 0 ? (
                <Text style={styles.emptyLawyers}>Nenhum advogado interessado ainda.</Text>
              ) : (
                c.lawyers.map((l) => (
                  <TouchableOpacity
                    key={l.id}
                    style={styles.lawyerItem}
                    onPress={() =>
                      router.push({ pathname: '/lawyer-profile', params: { lawyerId: l.id } })
                    }
                  >
                    <View style={[common.avatarSm, { backgroundColor: l.avatarColor }]}>
                      <Text style={styles.avatarText}>{l.initials}</Text>
                    </View>

                    <View style={styles.lawyerInfo}>
                      <Text style={styles.lawyerName}>{l.name}</Text>
                      <Text style={styles.lawyerArea}>{l.area}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}

              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => router.push({ pathname: '/case-detail', params: { caseId: c.id } })}
              >
                <Text style={common.txtWhite}>Ver detalhes do caso</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  headerSpacer: { width: 24 },
  centerFeedback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  feedbackText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#C62828',
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: COLORS.teal,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.teal,
    padding: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginVertical: 8,
  },
  description: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 20,
    marginVertical: 10,
  },
  sectionLabel: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.gray,
    letterSpacing: 0.8,
  },
  emptyLawyers: {
    fontSize: 13,
    color: COLORS.gray,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  lawyerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  lawyerInfo: { flex: 1, marginLeft: 10 },
  lawyerName: { fontWeight: 'bold', color: COLORS.navy, fontSize: 14 },
  lawyerArea: { fontSize: 12, color: COLORS.teal, fontWeight: 'bold' },
  detailsBtn: {
    marginTop: 15,
    backgroundColor: COLORS.teal,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  footerSpacing: { height: 30 },
  analiseBox: {
    backgroundColor: '#F0FAF8',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.teal,
  },
  analiseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  analiseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.teal,
  },
  analiseText: {
    fontSize: 12,
    color: COLORS.gray,
    lineHeight: 18,
  },
});