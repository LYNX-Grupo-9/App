import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import GoBackButton from '../go-back/goback';
import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  lawyer: any;
};

export default function ChatHeader({ lawyer }: Props) {
  const router = useRouter();

  return (
    <View style={common.headerChat}>
      <GoBackButton />

      <View
        style={[
          common.avatarSm,
          styles.avatar,
          { backgroundColor: lawyer.avatarColor },
        ]}
      >
        <Text style={common.avatarInitialsMd}>
          {lawyer.initials}
        </Text>
      </View>

      <View style={styles.headerInfo}>
        <Text style={common.chatName}>
          {lawyer.name}
        </Text>
        <Text style={common.chatStatus}>
          Online
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/lawyer-profile',
            params: { lawyerId: lawyer.id },
          })
        }
      >
        <Text style={styles.profileLink}>
          Ver perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 10,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  profileLink: {
    color: COLORS.teal,
    fontWeight: 'bold',
    fontSize: 12,
  },
});