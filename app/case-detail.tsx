import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../src/constants/colors';
import { LAWYERS } from '../src/constants/data';
import { common } from '../src/styles/common';
import LawyerCard from '@/src/components/lawyer-card/lawyerCard';
import AICard from '@/src/components/ai-card/aiCard';
import AIModal from '@/src/components/ai-modal/aiModal';
import SectionHeader from '@/src/components/section-header/sectionHeader';
import CaseHeader from '@/src/components/case-header/caseHeader';
export default function CaseDetailScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={common.container}>
     <SectionHeader />
      <ScrollView style={common.padding}>
      <CaseHeader/>

        <AICard 
        onPress={() => setModalVisible(true)}
        />

        <View style={common.rowSpaced}>
          <Text style={common.sectionTitle}>
            Advogados interessados
          </Text>

          <Text style={styles.lawyerCount}>
            {LAWYERS.length}
          </Text>
        </View>

        {LAWYERS.map((lawyer) => (
           <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </ScrollView>
    <AIModal
    onClose={() => setModalVisible(false)}
    visible={modalVisible}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lawyerCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.teal,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardHeaderText: {
    marginLeft: 12,
  },
  lawyerName: {
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 16,
  },
  lawyerArea: {
    fontSize: 12,
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  aboutBox: {
    backgroundColor: '#F8F9FB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
});