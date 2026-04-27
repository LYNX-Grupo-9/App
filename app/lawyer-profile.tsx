import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Bell,
  FileText,
  Folder,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import endpoints from '@/src/service/api';

type ApiLawyerProfile = {
  idAdvogado?: string;
  id?: string;
  nome: string;
  registroOab?: string;
  cpf?: string;
  email?: string;
  area?: string;
  sobre?: string;
  descricao?: string;
  rating?: number;
  totalReviews?: number;
  clientesAtendidos?: number;
  especialidades?: string[];
  reviews?: {
    name: string;
    initials?: string;
    rating: number;
    timeAgo?: string;
    text: string;
  }[];
};
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LawyerProfileScreen() {
  const router = useRouter();
  const { lawyerId, caseId } = useLocalSearchParams<{
    lawyerId: string;
    caseId: string;
  }>();

  const [lawyer, setLawyer] = useState<ApiLawyerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  async function handleStartChat() {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (!userId) throw new Error('Usuário não encontrado');

      const response = await endpoints.chat.create({
        idCliente: userId,
        idAdvogado: lawyerIdValue,
        idCaso: caseId,
      });

      const idConversa = response.data.idConversa ?? response.data.id;

      router.push({
        pathname: '/chat',
        params: { idConversa },
      });

    } catch (err: any) {
      if (err?.response?.status === 409) {
        try {
          const conversationsResponse = await endpoints.chat.getAll({
            casoId: caseId,
          });

          const existingConversation = conversationsResponse.data.find((c: any) => {
            const advogadoId =
              c.advogado?.idAdvogado ??
              c.advogadoId ??
              c.idAdvogado;

            return advogadoId === lawyerIdValue;
          });

          if (existingConversation) {
            const idConversa =
              existingConversation.idConversa ??
              existingConversation.id;

            router.push({
              pathname: '/chat',
              params: { idConversa },
            });
          }
        } catch (e) {
          console.log('Erro ao buscar conversa existente:', e);
        }

        return;
      }

      console.log(err);
    }
  }
  async function loadLawyerProfile() {
    if (!lawyerId) return;

    try {
      setLoading(true);
      setError('');

      const response = await endpoints.lawyers.getProfile(lawyerId);

      setLawyer(response.data);
    } catch (err) {
      console.log(err);
      setError('Não foi possível carregar o perfil do advogado.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLawyerProfile();
  }, [lawyerId]);

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={common.headerSimple}>
          <GoBackButton />
          <Bell color={COLORS.navy} size={24} />
        </View>

        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.loadingText}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!lawyer) {
    return (
      <SafeAreaView style={common.container}>
        <View style={common.headerSimple}>
          <GoBackButton />
          <Bell color={COLORS.navy} size={24} />
        </View>

        <View style={styles.center}>
          <Text style={styles.errorText}>
            {error || 'Advogado não encontrado.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const lawyerName = lawyer.nome ?? 'Advogado';
  const lawyerIdValue = lawyer.idAdvogado ?? lawyer.id ?? lawyerId;
  const initials = getInitials(lawyerName);
  const rating = lawyer.rating ?? 0;
  const totalReviews = lawyer.totalReviews ?? 0;
  const clientsServed = lawyer.clientesAtendidos ?? 0;
  const specialties =
    lawyer.especialidades ??
    [lawyer.area ?? 'Direito'];
  const about =
    lawyer.sobre ??
    lawyer.descricao ??
    'Informações profissionais ainda não cadastradas.';

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
        <GoBackButton />
        <Bell color={COLORS.navy} size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={common.padding}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.header}>
          <View style={[common.avatarLg, { backgroundColor: COLORS.teal }]}>
            <Text style={common.avatarInitialsLg}>{initials}</Text>
          </View>

          <Text style={common.nameHighlight}>{lawyerName}</Text>

          <Text style={common.subtitleGray}>
            {lawyer.registroOab ?? 'OAB não informada'}
          </Text>

          <View style={styles.ratingRow}>
            <Star color={COLORS.star} fill={COLORS.star} size={18} />
            <Text style={styles.ratingText}>
              {rating}{' '}
              <Text style={styles.reviewCount}>
                ({totalReviews} avaliações)
              </Text>
            </Text>
          </View>
        </View>

        <View style={common.cardImpact}>
          <View style={common.cardImpactIcon}>
            <Users color={COLORS.navy} size={24} />
          </View>

          <View>
            <Text style={styles.impactLabel}>IMPACTO</Text>
            <Text style={styles.impactValue}>
              {clientsServed} clientes atendidos
            </Text>
          </View>
        </View>

        <Text style={common.sectionLabel}>ESPECIALIDADES</Text>

        <View style={styles.specialties}>
          {specialties.map((item, index) => (
            <View key={`${item}-${index}`} style={common.tagGray}>
              <Text style={common.tagGrayText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.aboutHeader}>
          <FileText color={COLORS.navy} size={20} />
          <Text style={styles.aboutTitle}>Sobre o Profissional</Text>
        </View>

        <View style={common.cardAbout}>
          <Text style={styles.aboutText}>{about}</Text>
        </View>

        <TouchableOpacity
          style={common.btnPrimary}
          onPress={handleStartChat}
        >
          <MessageSquare color={COLORS.white} size={20} />
          <Text style={styles.primaryBtnText}>Iniciar conversa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={common.btnSecondary}>
          <Folder color={COLORS.gray} size={20} />
          <Text style={styles.secondaryBtnText}>Ver documentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={common.btnSecondary}
          onPress={() =>
            router.push({
              pathname: '/rate',
              params: { lawyerId: lawyerIdValue },
            })
          }
        >
          <Star color={COLORS.gray} size={20} />
          <Text style={styles.secondaryBtnText}>Avaliar</Text>
        </TouchableOpacity>

        <View style={styles.reviewHeader}>
          <Text style={common.sectionTitle}>Últimas Avaliações</Text>
          <Text style={styles.viewAll}>Ver todas</Text>
        </View>

        {!lawyer.reviews || lawyer.reviews.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhuma avaliação disponível ainda.
          </Text>
        ) : (
          lawyer.reviews.map((review, index) => (
            <View key={`${review.name}-${index}`} style={styles.reviewCard}>
              <View style={[common.avatarSm, { backgroundColor: COLORS.navy }]}>
                <Text style={common.avatarInitialsSm}>
                  {review.initials ?? getInitials(review.name)}
                </Text>
              </View>

              <View style={styles.reviewContent}>
                <View style={common.rowSpaced}>
                  <Text style={styles.reviewerName}>{review.name}</Text>

                  <View style={common.row}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        color={COLORS.star}
                        fill={star <= review.rating ? COLORS.star : 'transparent'}
                        size={10}
                      />
                    ))}
                  </View>
                </View>

                <Text style={styles.reviewTime}>
                  {review.timeAgo ?? 'Recentemente'}
                </Text>

                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.footerSpacing} />
      </ScrollView>
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
    textAlign: 'center',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 10,
  },
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