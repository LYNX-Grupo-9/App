import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  StyleSheet,
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
import { LAWYERS, USER_CASES } from '../../src/constants/data';
import { common } from '../../src/styles/common';

export default function ProfileTab() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const totalLawyersContacted = LAWYERS.length;
  const totalCases = USER_CASES.length;
  const totalUnread = 3;

  return (
    <SafeAreaView style={common.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={common.profileBanner}>
          <View style={common.profileAvatarLarge}>
            <Text style={common.avatarInitialsLg}>JV</Text>
          </View>

          <Text style={styles.name}>João Vitor</Text>

          <Text style={styles.email}>
            joao.vitor@email.com
          </Text>

          <View style={common.profileSinceTag}>
            <Text style={styles.sinceText}>
              ✦ Cliente desde Out. 2024
            </Text>
          </View>
        </View>

        <View style={common.padding}>
          {/* Stats */}
          <View style={common.statsRow}>
            <View style={common.statCard}>
              <Text style={common.statNumber}>{totalCases}</Text>
              <Text style={common.statLabel}>Casos ativos</Text>
            </View>

            <View style={[common.statCard, styles.statCardMiddle]}>
              <Text style={common.statNumber}>
                {totalLawyersContacted}
              </Text>
              <Text style={common.statLabel}>Advogados</Text>
            </View>

            <View style={common.statCard}>
              <Text style={common.statNumber}>{totalUnread}</Text>
              <Text style={common.statLabel}>Não lidas</Text>
            </View>
          </View>

          {/* Quick access */}
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
              <Text style={common.menuItemSubtitle}>
                {totalCases} casos ativos
              </Text>
            </View>

            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <TouchableOpacity
            style={common.menuItem}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <View style={[common.menuIcon, styles.iconTealBg]}>
              <MessageSquare color={COLORS.teal} size={20} />
            </View>

            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>
                Minhas conversas
              </Text>
              <Text style={common.menuItemSubtitle}>
                {totalUnread} mensagens não lidas
              </Text>
            </View>

            <View style={styles.rowWithGap}>
              <View style={common.badge}>
                <Text style={common.badgeText}>
                  {totalUnread}
                </Text>
              </View>
              <ChevronRight color="#CCC" size={18} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={common.menuItem}>
            <View style={[common.menuIcon, styles.iconYellowBg]}>
              <FileText color="#F57F17" size={20} />
            </View>

            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>
                Meus documentos
              </Text>
              <Text style={common.menuItemSubtitle}>
                5 arquivos enviados
              </Text>
            </View>

            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={common.menuItem}>
            <View style={[common.menuIcon, styles.iconPinkBg]}>
              <Star color="#D4537E" size={20} />
            </View>

            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>
                Minhas avaliações
              </Text>
              <Text style={common.menuItemSubtitle}>
                2 avaliações enviadas
              </Text>
            </View>

            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          {/* Recent lawyers */}
          <Text style={styles.sectionLabel}>
            ADVOGADOS RECENTES
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recentScroll}
          >
            {LAWYERS.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={common.recentLawyerCard}
                onPress={() =>
                  router.push({
                    pathname: '/lawyer-profile',
                    params: { lawyerId: l.id },
                  })
                }
              >
                <View
                  style={[
                    common.avatarMd,
                    styles.recentAvatar,
                    { backgroundColor: l.avatarColor },
                  ]}
                >
                  <Text style={common.avatarInitialsMd}>
                    {l.initials}
                  </Text>
                </View>

                <Text
                  style={common.recentLawyerName}
                  numberOfLines={1}
                >
                  {l.name.replace('Dr. ', '').replace('Dra. ', '')}
                </Text>

                <Text
                  style={common.recentLawyerArea}
                  numberOfLines={1}
                >
                  {l.specialties[0].split(' ').slice(-1)[0]}
                </Text>

                <View style={styles.row}>
                  <Star
                    color={COLORS.star}
                    fill={COLORS.star}
                    size={10}
                  />
                  <Text style={styles.ratingText}>
                    {l.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Notifications */}
          <Text style={styles.sectionLabel}>NOTIFICAÇÕES</Text>

          <View style={common.menuItem}>
            <View style={[common.menuIcon, styles.iconGrayBg]}>
              <Bell color={COLORS.gray} size={20} />
            </View>

            <View style={styles.menuText}>
              <Text style={common.menuItemTitle}>
                Notificações push
              </Text>
              <Text style={common.menuItemSubtitle}>
                Avisos de novas mensagens
              </Text>
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
              <Text style={common.menuItemTitle}>
                Resumo por e-mail
              </Text>
              <Text style={common.menuItemSubtitle}>
                Receba atualizações semanais
              </Text>
            </View>

            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: '#DDD', true: COLORS.teal }}
              thumbColor={COLORS.white}
            />
          </View>

          {/* Sign out */}
          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutText}>
              Sair da conta
            </Text>
          </TouchableOpacity>

          <View style={styles.footerSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: COLORS.tealLight,
    fontSize: 13,
    marginTop: 2,
  },
  sinceText: {
    fontSize: 11,
    color: COLORS.tealLight,
    fontWeight: 'bold',
  },
  statCardMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.grayBorder,
  },
  sectionLabel: {
    marginTop: 24,
  },
  menuText: {
    flex: 1,
    marginLeft: 14,
  },
  rowWithGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.gray,
    marginLeft: 3,
  },
  iconBlueBg: { backgroundColor: '#E8F4FF' },
  iconTealBg: { backgroundColor: '#E8F9F5' },
  iconYellowBg: { backgroundColor: '#FFF4E0' },
  iconPinkBg: { backgroundColor: '#FFF0F5' },
  iconGrayBg: { backgroundColor: '#F0F2F5' },
  recentScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  recentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  logoutBtn: {
    marginTop: 28,
    borderColor: '#FFCDD2',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  footerSpacing: {
    height: 30,
  },
});