import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  lawyer: any;
};

export default function LawyerCard({ lawyer }: Props) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[common.avatarMd, { backgroundColor: lawyer.avatarColor }]}>
          <Text style={common.avatarInitialsMd}>{lawyer.initials}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{lawyer.name}</Text>
          <Text style={styles.area}>{lawyer.area}</Text>
        </View>
      </View>

      <View style={styles.aboutBox}>
        <Text style={styles.about}>
          "{lawyer.about.substring(0, 80)}..."
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={common.btnSmallChat}
          onPress={() =>
            router.push({ pathname: '/chat', params: { lawyerId: lawyer.id } })
          }
        >
          <Text style={common.txtWhite}>Abrir Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={common.btnTealLight}
          onPress={() =>
            router.push({ pathname: '/lawyer-profile', params: { lawyerId: lawyer.id } })
          }
        >
          <Text style={common.txtTeal}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...common.cardBase,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 16,
  },
  area: {
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
  about: {
    fontSize: 12,
    color: COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});