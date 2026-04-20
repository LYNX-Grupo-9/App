import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  CheckCircle2,
  Home,
  MessageSquare,
  Star,
} from 'lucide-react-native';

import { COLORS } from '../src/constants/colors';
import { STAR_LABELS } from '../src/constants/data';
import { common } from '../src/styles/common';

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    lawyerName: string;
    rating: string;
    comment: string;
    isAnonymous: string;
  }>();

  const rating = Number(params.rating ?? 0);
  const isAnonymous = params.isAnonymous === 'true';
  const comment = params.comment ?? '';
  const lawyerName = params.lawyerName ?? '';

  return (
    <SafeAreaView style={[common.container, styles.container]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={common.successCircle}>
          <CheckCircle2 color="#33A3F2" size={80} />
        </View>

        <Text style={[common.greeting, styles.centerText]}>
          Avaliação enviada!
        </Text>

        <Text style={[common.subtitle, styles.centerText]}>
          Obrigado pelo seu feedback. Ele é muito importante para nossa comunidade.
        </Text>

        {rating > 0 && (
          <View style={common.ratingResultCard}>
            <Text style={styles.label}>
              SUA AVALIAÇÃO
            </Text>

            {lawyerName ? (
              <Text style={styles.lawyerName}>
                {lawyerName}
              </Text>
            ) : null}

            <View style={[common.row, styles.starsRow]}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  color={COLORS.star}
                  fill={i <= rating ? COLORS.star : 'transparent'}
                  size={22}
                />
              ))}
              <Text style={styles.starLabel}>
                {STAR_LABELS[rating]}
              </Text>
            </View>

            {comment ? (
              <View style={styles.commentBox}>
                <Text style={styles.commentText}>
                  "{comment}"
                </Text>
              </View>
            ) : null}

            <Text style={styles.footerText}>
              Enviado como:{' '}
              <Text style={styles.footerName}>
                {isAnonymous
                  ? 'Usuário anônimo'
                  : 'João Vitor'}
              </Text>
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[common.btnPrimary, styles.fullWidth]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Home color={COLORS.white} size={20} />
          <Text style={[common.txtWhite, styles.btnText]}>
            Voltar ao início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[common.btnSecondary, styles.fullWidth]}
          onPress={() =>
            router.replace('/(tabs)/explore')
          }
        >
          <MessageSquare
            color={COLORS.gray}
            size={20}
          />
          <Text style={[common.txtGray, styles.btnText]}>
            Ver minhas conversas
          </Text>
        </TouchableOpacity>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 30,
  },
  centerText: {
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  lawyerName: {
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 15,
    marginBottom: 10,
  },
  starsRow: {
    gap: 4,
    marginBottom: 8,
  },
  starLabel: {
    marginLeft: 8,
    color: COLORS.navy,
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentBox: {
    backgroundColor: '#F8F9FB',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
  },
  commentText: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  footerName: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  fullWidth: {
    width: '100%',
  },
  btnText: {
    marginLeft: 10,
  },
  footerSpacing: {
    height: 20,
  },
});