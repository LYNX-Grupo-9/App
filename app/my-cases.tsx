import { useRouter } from 'expo-router';
import { FileText, MessageSquare, Sparkles } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GoBackButton from '../src/components/go-back/goback';
import { COLORS } from '../src/constants/colors';
import { LAWYERS, USER_CASES } from '../src/constants/data';
import { common } from '../src/styles/common';



const probabilityColors = (p: string) => {
  if (p === 'Alta') return { bg: '#E8F5E9', txt: '#2E7D32' };
  if (p === 'Média') return { bg: '#FFF8E1', txt: '#F57F17' };
  return { bg: '#FFEBEE', txt: '#C62828' };
};

export default function MyCasesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
   <GoBackButton/>

        <Text style={common.screenTitle}>Meus Casos</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={common.padding}
        showsVerticalScrollIndicator={false}
      >
        <Text style={common.subtitle}>
          {USER_CASES.length} casos ativos no momento
        </Text>

        {USER_CASES.map((c) => {
          const lawyers = LAWYERS.filter((l) =>
            c.interestedLawyerIds.includes(l.id)
          );
          const clr = probabilityColors(c.successProbability);

          return (
            <View key={c.id} style={styles.card}>
              {/* Header */}
              <View style={common.rowSpaced}>
                <View style={common.tagArea}>
                  <Text style={common.tagAreaText}>
                    {c.area}
                  </Text>
                </View>
                <View style={common.tagStatus}>
                  <Text style={common.tagStatusText}>
                    {c.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.title}>
                {c.title}
              </Text>

              <Text style={common.dateText}>
                Protocolado em {c.filedAt}
              </Text>

              <Text style={styles.description}>
                {c.description}
              </Text>

              {/* Probability */}
              <View
                style={[
                  common.tagProbability,
                  { backgroundColor: clr.bg },
                ]}
              >
                <Sparkles color={clr.txt} size={13} />
                <Text
                  style={[
                    common.tagProbabilityText,
                    { color: clr.txt },
                  ]}
                >
                  Probabilidade de êxito: {c.successProbability}
                </Text>
              </View>

              {/* Documents */}
              <Text style={styles.sectionLabel}>
                DOCUMENTOS
              </Text>

              {c.documents.map((doc, i) => (
                <View key={i} style={common.documentRow}>
                  <FileText color={COLORS.teal} size={14} />
                  <Text style={common.documentText}>
                    {doc}
                  </Text>
                </View>
              ))}

              {/* Lawyers */}
              <Text style={styles.sectionLabel}>
                ADVOGADOS INTERESSADOS
              </Text>

              {lawyers.map((l) => (
                <TouchableOpacity
                  key={l.id}
                  style={styles.lawyerItem}
                  onPress={() =>
                    router.push({
                      pathname: '/lawyer-profile',
                      params: { lawyerId: l.id },
                    })
                  }
                >
                  <View
                    style={[
                      common.avatarSm,
                      { backgroundColor: l.avatarColor },
                    ]}
                  >
                    <Text style={styles.avatarText}>
                      {l.initials}
                    </Text>
                  </View>

                  <View style={styles.lawyerInfo}>
                    <Text style={styles.lawyerName}>
                      {l.name}
                    </Text>
                    <Text style={styles.lawyerArea}>
                      {l.area}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={common.btnMiniChat}
                    onPress={() =>
                      router.push({
                        pathname: '/chat',
                        params: { lawyerId: l.id },
                      })
                    }
                  >
                    <MessageSquare
                      color={COLORS.white}
                      size={14}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() =>
                  router.push('/case-detail')
                }
              >
                <Text style={common.txtWhite}>
                  Ver detalhes do caso
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSpacer: {
    width: 24,
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
  lawyerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  lawyerName: {
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 14,
  },
  lawyerArea: {
    fontSize: 12,
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  detailsBtn: {
    marginTop: 15,
  },
  footerSpacing: {
    height: 30,
  },
});