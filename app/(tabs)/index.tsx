import React from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, Briefcase, ChevronRight } from 'lucide-react-native';

import { COLORS } from '../../src/constants/colors';
import { LAWYERS, USER_CASES } from '../../src/constants/data';
import { common } from '../../src/styles/common';
import CaseCarouselCard from '@/src/components/case-carousel/caseCarousel';
import LawyerListItem from '@/src/components/lawyer-list-item/lawyerListItem';
const { width } = Dimensions.get('window');

export default function HomeTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={common.container}>
      <StatusBar barStyle="dark-content" />

      <View style={common.headerHome}>
        <Text style={common.logoText}>JurisMatch</Text>
        <Bell color={COLORS.navy} size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={common.padding}>
          <Text style={common.greeting}>Olá, João</Text>
          <Text style={common.subtitle}>
            Confira o andamento dos seus casos hoje
          </Text>

          <View style={common.rowSpaced}>
            <Text style={common.sectionTitle}>Meus Casos</Text>
            <TouchableOpacity style={common.btnNewCase}>
              <Text style={common.btnNewCaseText}>+ Novo caso</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={USER_CASES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const lawyers = LAWYERS.filter((l) =>
              item.interestedLawyerIds.includes(l.id)
            );

            return (
              <CaseCarouselCard
                title={item.title}
                area={item.area}
                status={item.status}
                lawyers={lawyers}
                onPress={() =>
                  router.push({
                    pathname: '/case-detail',
                    params: { caseId: item.id },
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

          {LAWYERS.map((lawyer) => (
            <LawyerListItem
              key={lawyer.id}
              id={lawyer.id}
              name={lawyer.name}
              area={lawyer.area}
              initials={lawyer.initials}
              avatarColor={lawyer.avatarColor}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: width * 0.75,
    marginRight: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.teal,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginVertical: 15,
  },
  avatarMini: {
    // apenas separação para manter consistência
  },
  lawyerCount: {
    fontSize: 10,
    color: COLORS.gray,
    marginLeft: 10,
  },
  carousel: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  lawyerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  lawyerInfo: {
    flex: 1,
    marginLeft: 15,
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
  lawyerCase: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 5,
  },
});