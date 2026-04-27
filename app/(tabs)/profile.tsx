import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  Briefcase,
  ChevronRight,
  FileText,
  MessageSquare,
  Star,
  User,
} from 'lucide-react-native';

import { COLORS } from '../../src/constants/colors';
import { common } from '../../src/styles/common';
import endpoints from '@/src/service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/src/context/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type ApiCase = {
  idCaso: string;       // ✅ campo real da API
  areaDireito: string;
  titulo: string;
  descricao?: string;
  status?: string;
  analiseIa?: string;
  dataCriacao?: string;
};

type ApiConversation = {
  id: string;
  lida?: boolean;
  visualizada?: boolean; // fallback caso o campo tenha outro nome
};

type ApiLawyer = {
  id: string;
  nome?: string;
  name?: string;
  area?: string;
  rating?: number;
  avaliacao?: number;
  specialties?: string[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileTab() {
  const router = useRouter();
  const { signOut } = useAuth();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const [cases, setCases] = useState<ApiCase[]>([]);
  const [conversations, setConversations] = useState<ApiConversation[]>([]);
  const [recentLawyers, setRecentLawyers] = useState<ApiLawyer[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    async function loadUser() {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      if (name) {
        setUserName(name);
        setInitials(getUserInitials(name));
      }
      if (email) setUserEmail(email);
    }
    loadUser();
  }, []);

  function getUserInitials(name: string) {
    if (!name) return '';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  async function loadProfileData() {
    try {
      setLoading(true);
      setError('');
  
      const [casesResult, conversationsResult] = await Promise.allSettled([
        endpoints.cases.getAll(),
        endpoints.chat.getAll(),
      ]);
  
      const apiCases: ApiCase[] =
        casesResult.status === 'fulfilled' ? casesResult.value.data ?? [] : [];
  
      const apiConversations: ApiConversation[] =
        conversationsResult.status === 'fulfilled'
          ? conversationsResult.value.data ?? []
          : [];
  
      if (casesResult.status === 'rejected')
        console.log('❌ cases error:', casesResult.reason);
      if (conversationsResult.status === 'rejected')
        console.log('❌ conversations error:', conversationsResult.reason);
  
      setCases(apiCases);
      setConversations(apiConversations);
  
      // Advogados só se tiver casos
      if (apiCases.length > 0) {
        const interestedResponses = await Promise.allSettled(
          apiCases.map((item) =>
            endpoints.cases.getInterestedLawyers(item.idCaso)
          )
        );
  
        const uniqueLawyersMap = new Map<string, ApiLawyer>();
  
        interestedResponses.forEach((result) => {
          if (result.status === 'rejected') return;
          const data = result.value.data ?? [];
          data.forEach((raw: any) => {
            const lawyer = raw.advogado ?? raw;
            const id = lawyer.idAdvogado ?? lawyer.id;
            if (id) {
              uniqueLawyersMap.set(id, {
                id,
                nome: lawyer.nome ?? lawyer.name,
                area: lawyer.especialidade ?? lawyer.area ?? lawyer.registroOab ?? '',
                rating: lawyer.rating ?? lawyer.avaliacao ?? 0,
              });
            }
          });
        });
  
        setRecentLawyers(Array.from(uniqueLawyersMap.values()));
      }
  
    } catch (err) {
      console.log('❌ loadProfileData fatal:', err);
      setError('Não foi possível carregar os dados do perfil.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfileData();
  }, []);

  // ✅ fallback para os dois nomes possíveis do campo
  const totalCases = cases.length;
  const totalLawyersContacted = recentLawyers.length;
  const totalUnread = useMemo(() => {
    return conversations.filter((item) => !item.lida && !item.visualizada).length;
  }, [conversations]);

  // ─── Loading ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.loadingText}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={common.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={common.profileBanner}>
          <View style={common.profileAvatarLarge}>
            <Text style={common.avatarInitialsLg}>{initials}</Text>
          </View>
          <Text style={styles.name}>{userName || 'Usuário'}</Text>
          <Text style={styles.email}>{userEmail || 'email@exemplo.com'}</Text>
        </View>

        <View style={common.padding}>
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <View style={common.statsRow}>
            <View style={common.statCard}>
              <Text style={common.statNumber}>{totalCases}</Text>
              <Text style={common.statLabel}>Casos ativos</Text>
            </View>

            <View style={[common.statCard, styles.statCardMiddle]}>
              <Text style={common.statNumber}>{totalLawyersContacted}</Text>
              <Text style={common.statLabel}>Advogados</Text>
            </View>

            <View style={common.statCard}>
              <Text style={common.statNumber}>{totalUnread}</Text>
              <Text style={common.statLabel}>Não lidas</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>ACESSO RÁPIDO</Text>

          <TouchableOpacity
            style={common.menuItem}
            onPress={() => router.push('/my-cases')}
          >
            <View style={[common.menuIcon, styles.iconBlueBg]}>
              <Briefcase color={COLORS.blue} size={20} />
            </View>
            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>Meus casos</Text>
              <Text style={common.menuItemSubtitle}>{totalCases} casos ativos</Text>
            </View>
            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <TouchableOpacity
            style={common.menuItem}
            onPress={() => router.push('/(tabs)/message')}
          >
            <View style={[common.menuIcon, styles.iconTealBg]}>
              <MessageSquare color={COLORS.teal} size={20} />
            </View>
            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>Minhas conversas</Text>
              <Text style={common.menuItemSubtitle}>
                {totalUnread} mensagens não lidas
              </Text>
            </View>
            <View style={styles.rowWithGap}>
              {totalUnread > 0 && (
                <View style={common.badge}>
                  <Text style={common.badgeText}>{totalUnread}</Text>
                </View>
              )}
              <ChevronRight color="#CCC" size={18} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={common.menuItem}>
            <View style={[common.menuIcon, styles.iconYellowBg]}>
              <FileText color="#F57F17" size={20} />
            </View>
            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>Meus documentos</Text>
              <Text style={common.menuItemSubtitle}>Documentos enviados</Text>
            </View>
            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={common.menuItem}>
            <View style={[common.menuIcon, styles.iconPinkBg]}>
              <Star color="#D4537E" size={20} />
            </View>
            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>Minhas avaliações</Text>
              <Text style={common.menuItemSubtitle}>Avaliações enviadas</Text>
            </View>
            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <Text style={styles.sectionLabel}>ADVOGADOS RECENTES</Text>

          {recentLawyers.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum advogado recente encontrado.</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recentScroll}
            >
              {recentLawyers.map((lawyer) => {
                const name = lawyer.nome ?? lawyer.name ?? 'Advogado';
                const rating = lawyer.rating ?? lawyer.avaliacao ?? 0;

                return (
                  <TouchableOpacity
                    key={lawyer.id}
                    style={common.recentLawyerCard}
                    onPress={() =>
                      router.push({
                        pathname: '/lawyer-profile',
                        params: { lawyerId: lawyer.id },
                      })
                    }
                  >
                    <View
                      style={[
                        common.avatarMd,
                        styles.recentAvatar,
                        { backgroundColor: COLORS.teal },
                      ]}
                    >
                      <Text style={common.avatarInitialsMd}>
                        {getInitials(name)}
                      </Text>
                    </View>
                    <Text style={common.recentLawyerName} numberOfLines={1}>
                      {name.replace('Dr. ', '').replace('Dra. ', '')}
                    </Text>
                    <Text style={common.recentLawyerArea} numberOfLines={1}>
                      {lawyer.area ?? lawyer.specialties?.[0] ?? 'Área'}
                    </Text>
                    <View style={styles.row}>
                      <Star color={COLORS.star} fill={COLORS.star} size={10} />
                      <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          <Text style={styles.sectionLabel}>NOTIFICAÇÕES</Text>

          <View style={common.menuItem}>
            <View style={[common.menuIcon, styles.iconGrayBg]}>
              <Bell color={COLORS.gray} size={20} />
            </View>
            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>Notificações push</Text>
              <Text style={common.menuItemSubtitle}>Avisos de novas mensagens</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: '#DDD', true: COLORS.teal }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={[common.menuItem, styles.noBorder]}>
            <View style={[common.menuIcon, styles.iconGrayBg]}>
              <User color={COLORS.gray} size={20} />
            </View>
            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>Resumo por e-mail</Text>
              <Text style={common.menuItemSubtitle}>Receba atualizações semanais</Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: '#DDD', true: COLORS.teal }}
              thumbColor={COLORS.white}
            />
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>

          <View style={styles.footerSpacing} />
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12, color: COLORS.gray },
  errorText: { color: 'red', fontSize: 13, marginBottom: 12 },
  name: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  email: { color: COLORS.white, fontSize: 13, marginTop: 2 },
  statCardMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.grayBorder,
  },
  sectionLabel: { marginTop: 24 },
  menuText: { flex: 1, marginLeft: 14 },
  rowWithGap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: { flexDirection: 'row', marginTop: 4 },
  ratingText: { fontSize: 11, color: COLORS.gray, marginLeft: 3 },
  emptyText: { fontSize: 13, color: COLORS.gray, marginTop: 10 },
  iconBlueBg: { backgroundColor: '#E8F4FF' },
  iconTealBg: { backgroundColor: '#E8F9F5' },
  iconYellowBg: { backgroundColor: '#FFF4E0' },
  iconPinkBg: { backgroundColor: '#FFF0F5' },
  iconGrayBg: { backgroundColor: '#F0F2F5' },
  recentScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  recentAvatar: { width: 44, height: 44, borderRadius: 22 },
  noBorder: { borderBottomWidth: 0 },
  logoutBtn: {
    marginTop: 28,
    borderColor: '#FFCDD2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  logoutText: { color: '#E53935', fontWeight: 'bold' },
  footerSpacing: { height: 30 },
});