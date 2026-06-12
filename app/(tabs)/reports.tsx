import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Bell } from 'lucide-react-native';

import { COLORS } from '../../src/constants/colors';
import { common } from '../../src/styles/common';
import endpoints from '../../src/service/api'; // ajuste o path

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardData {
  statusCasos: { total: number; emAndamento: number; aberto: number; encerrado: number };
  casosPorArea: { area: string; quantidade: number }[];
  historicoCasos: { mes: string; quantidade: number }[];
  engajamentoPorCaso: {
    processoId: string;
    titulo: string;
    area: string;
    interessados: number;
  }[];
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  cardBase: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginBottom: 15,
  },
  // Donut
  donutWrapper: { alignItems: 'center', justifyContent: 'center', marginVertical: 15 },
  donutOuter: {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 14, borderColor: '#83C5BE',
    alignItems: 'center', justifyContent: 'center',
  },
  donutNumber: { fontSize: 18, fontWeight: 'bold', color: COLORS.navy, lineHeight: 20 },
  donutLabel: { fontSize: 11, color: COLORS.gray },
  // Legend
  legendContainerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 10, marginTop: 5,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendSquare: { width: 12, height: 12, borderRadius: 2, marginRight: 8 },
  legendText: { fontSize: 12, color: COLORS.gray },
  // Progress bars
  progressRow: { marginBottom: 14 },
  progressLabel: { fontSize: 13, color: COLORS.gray },
  progressValue: { fontSize: 14, fontWeight: 'bold', color: COLORS.navy },
  progressBarTrack: {
    height: 8, backgroundColor: '#F0F2F5',
    borderRadius: 4, marginTop: 6, overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 4 },
  // Chart
  chartContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    height: 120, alignItems: 'flex-end',       // ← flex-end para barras crescerem de baixo
    paddingHorizontal: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.grayBorder,
  },
  chartColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  chartBar: { width: 16, borderRadius: 4, backgroundColor: COLORS.teal },
  chartLabelContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 5, marginTop: 8,
  },
  chartLabel: {
    width: (width - 80) / 6,
    textAlign: 'center', fontSize: 12, color: COLORS.gray,
  },
  // Engajamento
  processTitle: { fontSize: 13, fontWeight: '600', color: COLORS.navy, marginBottom: 4 },
  processSubtitle: { fontSize: 11, color: COLORS.gray, marginBottom: 8 },
  engagementTrackPair: {
    backgroundColor: '#F4F5F7', borderRadius: 6, padding: 8, gap: 6,
  },
  engagementBar: { height: 18, borderRadius: 3 },
  // Empty / loading
  emptyText: { fontSize: 13, color: COLORS.gray, textAlign: 'center', paddingVertical: 10 },
});

const AREA_COLORS = ['#83C5BE', COLORS.navy, '#888888', '#F4A261', '#E76F51'];

// ─── Cards ───────────────────────────────────────────────────────────────────

const CardStatusCasos: React.FC<DashboardData['statusCasos']> = ({
  total, emAndamento, aberto, encerrado,
}) => (
  <View style={styles.cardBase}>
    <Text style={styles.cardTitle}>Status dos Casos</Text>
    <View style={styles.donutWrapper}>
      <View style={styles.donutOuter}>
        <Text style={styles.donutNumber}>{total}</Text>
        <Text style={styles.donutLabel}>Total</Text>
      </View>
    </View>
    <View style={styles.legendContainerRow}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: COLORS.teal }]} />
        <Text style={styles.legendText}>Em andamento ({emAndamento})</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: COLORS.navy }]} />
        <Text style={styles.legendText}>Aberto ({aberto})</Text>
      </View>
    </View>
    <View style={[styles.legendContainerRow, { justifyContent: 'center', marginTop: 8 }]}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: '#888888' }]} />
        <Text style={styles.legendText}>Encerrado ({encerrado})</Text>
      </View>
    </View>
  </View>
);

const CardCasosPorArea: React.FC<{ areas: DashboardData['casosPorArea'] }> = ({ areas }) => {
  const max = Math.max(...areas.map(a => a.quantidade), 1);
  return (
    <View style={styles.cardBase}>
      <Text style={styles.cardTitle}>Casos por Área do Direito</Text>
      {areas.length === 0
        ? <Text style={styles.emptyText}>Nenhum caso registrado</Text>
        : areas.map((item, index) => {
            const pct = Math.round((item.quantidade / max) * 100);
            return (
              <View key={item.area} style={styles.progressRow}>
                <View style={common.rowSpaced}>
                  <Text style={styles.progressLabel}>{item.area}</Text>
                  <Text style={styles.progressValue}>{item.quantidade}</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${pct}%`, backgroundColor: AREA_COLORS[index % AREA_COLORS.length] },
                    ]}
                  />
                </View>
              </View>
            );
          })}
    </View>
  );
};

const CardHistoricoCasos: React.FC<{ historico: DashboardData['historicoCasos'] }> = ({ historico }) => {
  const max = Math.max(...historico.map(h => h.quantidade), 1);
  const BAR_MAX_HEIGHT = 100; // px dentro do chartContainer de 120px

  return (
    <View style={styles.cardBase}>
      <Text style={styles.cardTitle}>Histórico de Casos (6 Meses)</Text>
      <View style={styles.chartContainer}>
        {historico.map((item) => {
          const barHeight = Math.max((item.quantidade / max) * BAR_MAX_HEIGHT, item.quantidade > 0 ? 4 : 0);
          return (
            <View key={item.mes} style={styles.chartColumn}>
              <View style={[styles.chartBar, { height: barHeight }]} />
            </View>
          );
        })}
      </View>
      <View style={styles.chartLabelContainer}>
        {historico.map((item) => (
          <Text key={item.mes} style={styles.chartLabel}>{item.mes}</Text>
        ))}
      </View>
    </View>
  );
};

const CardEngajamentoCasos: React.FC<{ casos: DashboardData['engajamentoPorCaso'] }> = ({ casos }) => {
  // "interessados" é o único campo de engajamento disponível na API.
  // A barra representa proporção relativa ao máximo de interessados.
  const maxInt = Math.max(...casos.map(c => c.interessados), 1);

  return (
    <View style={styles.cardBase}>
      <Text style={styles.cardTitle}>Engajamento por Caso</Text>
      {casos.length === 0
        ? <Text style={styles.emptyText}>Nenhum caso com engajamento</Text>
        : casos.map((item) => {
            const pct = `${Math.round((item.interessados / maxInt) * 100)}%` as const;
            return (
              <View key={item.processoId} style={{ marginBottom: 18 }}>
                <Text style={styles.processTitle} numberOfLines={2}>{item.titulo}</Text>
                <Text style={styles.processSubtitle}>{item.area}</Text>
                <View style={styles.engagementTrackPair}>
                  <View style={[styles.engagementBar, { width: pct, backgroundColor: COLORS.navy }]} />
                </View>
                <Text style={[styles.legendText, { marginTop: 4 }]}>
                  {item.interessados} advogado{item.interessados !== 1 ? 's' : ''} interessado{item.interessados !== 1 ? 's' : ''}
                </Text>
              </View>
            );
          })}
      <View style={[styles.legendItem, { marginTop: 5 }]}>
        <View style={[styles.legendSquare, { backgroundColor: COLORS.navy }]} />
        <Text style={styles.legendText}>Interessados</Text>
      </View>
    </View>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function RelatoriosScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await endpoints.cases.getDashboard();
        setData(res.data);
      } catch (e) {
        setError('Não foi possível carregar os relatórios.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
        <Text style={common.screenTitle}>Relatórios</Text>

      </View>

      <ScrollView style={common.padding} showsVerticalScrollIndicator={false}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={COLORS.teal}
            style={{ marginTop: 40 }}
          />
        )}

        {error && (
          <Text style={[styles.emptyText, { color: 'red', marginTop: 20 }]}>{error}</Text>
        )}

        {!loading && !error && data && (
          <>
            <CardStatusCasos {...data.statusCasos} />
            <CardCasosPorArea areas={data.casosPorArea} />
            <CardHistoricoCasos historico={data.historicoCasos} />
            <CardEngajamentoCasos casos={data.engajamentoPorCaso} />
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}