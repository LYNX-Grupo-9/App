import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Bell } from 'lucide-react-native';

import { COLORS } from '../../src/constants/colors';
import { common } from '../../src/styles/common';

const { width } = Dimensions.get('window');

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
  donutWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  donutOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 14,
    borderColor: '#83C5BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.navy,
    lineHeight: 20,
  },
  donutLabel: {
    fontSize: 11,
    color: COLORS.gray,
  },
  legendContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  progressRow: {
    marginBottom: 14,
  },
  progressLabel: {
    fontSize: 13,
    color: COLORS.gray,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#F0F2F5',
    borderRadius: 4,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayBorder,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  chartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  chartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 8,
  },
  chartLabel: {
    width: (width - 80) / 6,
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.gray,
  },
  processTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: 8,
  },
  engagementTrackPair: {
    backgroundColor: '#F4F5F7',
    borderRadius: 6,
    padding: 8,
    gap: 6,
  },
  engagementBar: {
    height: 18,
    borderRadius: 3,
  },
});

interface CardStatusCasosProps {
  total: number;
  emAndamento: number;
  emAberto: number;
  encerrados: number;
}

interface ProcessoItem {
  num: string;
  area: string;
  intWidth: `${number}%` | number;
  contWidth: `${number}%` | number;
}

const CardStatusCasos: React.FC<CardStatusCasosProps> = ({ total, emAndamento, emAberto, encerrados }) => (
  <View style={styles.cardBase}>
    <Text style={styles.cardTitle}>Status dos Casos</Text>
    
    <View style={styles.donutWrapper}>
      <View style={styles.donutOuter}>
        <View style={styles.donutInner}>
          <Text style={styles.donutNumber}>{total}</Text>
          <Text style={styles.donutLabel}>Total</Text>
        </View>
      </View>
    </View>

    <View style={styles.legendContainerRow}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: COLORS.teal }]} />
        <Text style={styles.legendText}>Em andamento ({emAndamento})</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: COLORS.navy }]} />
        <Text style={styles.legendText}>Aberto ({emAberto})</Text>
      </View>
    </View>
    <View style={[styles.legendContainerRow, { justifyContent: 'center', marginTop: 8 }]}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: '#888888' }]} />
        <Text style={styles.legendText}>Encerrado ({encerrados})</Text>
      </View>
    </View>
  </View>
);

const CardCasosPorArea: React.FC = () => {
  const areas = [
    { label: 'Direito Trabalho', quantidade: 24, porcentagem: '75%' as const, cor: COLORS.teal },
    { label: 'Direito Civil', quantidade: 12, porcentagem: '40%' as const, cor: COLORS.navy },
    { label: 'Direito de Família', quantidade: 6, porcentagem: '20%' as const, cor: '#888888' },
  ];

  return (
    <View style={styles.cardBase}>
      <Text style={styles.cardTitle}>Casos por Área do Direito</Text>
      {areas.map((item, index) => (
        <View key={index} style={styles.progressRow}>
          <View style={common.rowSpaced}>
            <Text style={styles.progressLabel}>{item.label}</Text>
            <Text style={styles.progressValue}>{item.quantidade}</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: item.porcentagem, backgroundColor: item.cor }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const CardHistoricoCasos: React.FC = () => {
  const meses = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'];
  const pontosY = [90, 70, 85, 45, 55, 30];

  return (
    <View style={styles.cardBase}>
      <Text style={styles.cardTitle}>Histórico de Casos (6 Meses)</Text>
      <View style={styles.chartContainer}>
        {pontosY.map((yVal, index) => (
          <View key={index} style={styles.chartColumn}>
            <View style={[styles.chartDot, { marginTop: yVal }]} />
          </View>
        ))}
      </View>
      <View style={styles.chartLabelContainer}>
        {meses.map((mes, index) => (
          <Text key={index} style={styles.chartLabel}>{mes}</Text>
        ))}
      </View>
    </View>
  );
};

const CardEngajamentoCasos: React.FC = () => {
  const processos: ProcessoItem[] = [
    { num: '123', area: 'Trabalhista', intWidth: '55%', contWidth: '85%' },
    { num: '456', area: 'Civil', intWidth: '55%', contWidth: '95%' },
  ];

  return (
    <View style={styles.cardBase}>
      <Text style={styles.cardTitle}>Engajamento por Caso</Text>
      {processos.map((item, index) => (
        <View key={index} style={{ marginBottom: 18 }}>
          <Text style={styles.processTitle}>Processo nº {item.num} ({item.area})</Text>
          <View style={styles.engagementTrackPair}>
            <View style={[styles.engagementBar, { width: item.intWidth, backgroundColor: COLORS.navy }]} />
            <View style={[styles.engagementBar, { width: item.contWidth, backgroundColor: COLORS.teal }]} />
          </View>
        </View>
      ))}
      <View style={[styles.legendItem, { marginTop: 5, marginBottom: 5 }]}>
        <View style={[styles.legendSquare, { backgroundColor: COLORS.navy }]} />
        <Text style={styles.legendText}>Interessados</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendSquare, { backgroundColor: COLORS.teal }]} />
        <Text style={styles.legendText}>Entraram em contato</Text>
      </View>
    </View>
  );
};

export default function RelatoriosScreen() {
  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
        <Text style={common.screenTitle}>Relatórios</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Bell color={COLORS.navy} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={common.padding} showsVerticalScrollIndicator={false}>
        <CardStatusCasos total={42} emAndamento={19} emAberto={15} encerrados={8} />
        <CardCasosPorArea />
        <CardHistoricoCasos />
        <CardEngajamentoCasos />
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}