import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Bell,
  FileText,
  Folder,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react-native';
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
import { LAWYERS } from '../src/constants/data';
import { common } from '../src/styles/common';



export default function LawyerProfileScreen() {
  const router = useRouter();
  const { lawyerId } = useLocalSearchParams<{ lawyerId: string }>();
  const lawyer =
    LAWYERS.find((l) => l.id === lawyerId) ?? LAWYERS[0];

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
   <GoBackButton/>
        <Bell color={COLORS.navy} size={24} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={common.padding}
      >
        {/* Avatar + name */}
        <View style={styles.header}>
          <View
            style={[
              common.avatarLg,
              { backgroundColor: lawyer.avatarColor },
            ]}
          >
            <Text style={common.avatarInitialsLg}>
              {lawyer.initials}
            </Text>
          </View>

          <Text style={common.nameHighlight}>
            {lawyer.name}
          </Text>

          <Text style={common.subtitleGray}>
            {lawyer.oab}
          </Text>

          <View style={styles.ratingRow}>
            <Star
              color={COLORS.star}
              fill={COLORS.star}
              size={18}
            />
            <Text style={styles.ratingText}>
              {lawyer.rating}{' '}
              <Text style={styles.reviewCount}>
                ({lawyer.totalReviews} avaliações)
              </Text>
            </Text>
          </View>
        </View>

        {/* Impact card */}
        <View style={common.cardImpact}>
          <View style={common.cardImpactIcon}>
            <Users color={COLORS.navy} size={24} />
          </View>

          <View>
            <Text style={styles.impactLabel}>
              IMPACTO
            </Text>
            <Text style={styles.impactValue}>
              {lawyer.clientsServed} clientes atendidos
            </Text>
          </View>
        </View>

        {/* Specialties */}
        <Text style={common.sectionLabel}>
          ESPECIALIDADES
        </Text>

        <View style={styles.specialties}>
          {lawyer.specialties.map((s, i) => (
            <View key={i} style={common.tagGray}>
              <Text style={common.tagGrayText}>{s}</Text>
            </View>
          ))}
        </View>

        {/* About */}
        <View style={styles.aboutHeader}>
          <FileText color={COLORS.navy} size={20} />
          <Text style={styles.aboutTitle}>
            Sobre o Profissional
          </Text>
        </View>

        <View style={common.cardAbout}>
          <Text style={styles.aboutText}>
            {lawyer.about}
          </Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={common.btnPrimary}
          onPress={() =>
            router.push({
              pathname: '/chat',
              params: { lawyerId: lawyer.id },
            })
          }
        >
          <MessageSquare color={COLORS.white} size={20} />
          <Text style={styles.primaryBtnText}>
            Iniciar conversa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={common.btnSecondary}>
          <Folder color={COLORS.gray} size={20} />
          <Text style={styles.secondaryBtnText}>
            Ver documentos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={common.btnSecondary}
          onPress={() =>
            router.push({
              pathname: '/rate',
              params: { lawyerId: lawyer.id },
            })
          }
        >
          <Star color={COLORS.gray} size={20} />
          <Text style={styles.secondaryBtnText}>
            Avaliar
          </Text>
        </TouchableOpacity>

        {/* Reviews */}
        <View style={styles.reviewHeader}>
          <Text style={common.sectionTitle}>
            Últimas Avaliações
          </Text>
          <Text style={styles.viewAll}>
            Ver todas
          </Text>
        </View>

        {lawyer.reviews.map((review, i) => (
          <View key={i} style={styles.reviewCard}>
            <View
              style={[
                common.avatarSm,
                { backgroundColor: COLORS.navy },
              ]}
            >
              <Text style={common.avatarInitialsSm}>
                {review.initials}
              </Text>
            </View>

            <View style={styles.reviewContent}>
              <View style={common.rowSpaced}>
                <Text style={styles.reviewerName}>
                  {review.name}
                </Text>

                <View style={common.row}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      color={COLORS.star}
                      fill={
                        s <= review.rating
                          ? COLORS.star
                          : 'transparent'
                      }
                      size={10}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.reviewTime}>
                {review.timeAgo}
              </Text>

              <Text style={styles.reviewText}>
                {review.text}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingText: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.navy,
  },
  reviewCount: {
    fontWeight: 'normal',
    color: '#999',
  },
  impactLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  impactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  aboutHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  aboutTitle: {
    fontWeight: 'bold',
    color: COLORS.navy,
    marginLeft: 10,
  },
  aboutText: {
    fontSize: 13,
    color: COLORS.navy,
    lineHeight: 20,
  },
  primaryBtnText: {
    marginLeft: 10,
    color: COLORS.white,
  },
  secondaryBtnText: {
    marginLeft: 10,
    color: COLORS.gray,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  viewAll: {
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 10,
  },
  reviewerName: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  reviewTime: {
    fontSize: 10,
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  footerSpacing: {
    height: 30,
  },
});