// src/components/ConversationItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  lawyer: any;
  preview: any;
  isRead: boolean;
  onPress?: () => void;
  showOnline?: boolean;
};

export default function ConversationItem({
  lawyer,
  preview,
  isRead,
  onPress,
  showOnline,
}: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) return onPress();

    router.push({
      pathname: '/chat',
      params: { lawyerId: lawyer.id },
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !isRead && styles.unread,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Avatar */}
      <View>
        <View
          style={[
            common.avatarMd,
            { backgroundColor: lawyer.avatarColor },
          ]}
        >
          <Text style={common.avatarInitialsMd}>
            {lawyer.initials}
          </Text>
        </View>

        {showOnline && <View style={common.onlineIndicator} />}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{lawyer.name}</Text>

          <Text
            style={[
              common.dateText,
              !isRead && styles.unreadDate,
            ]}
          >
            {preview?.time}
          </Text>
        </View>

        <Text style={styles.case} numberOfLines={1}>
          📁 {preview?.caseTitle}
        </Text>

        <Text
          style={[
            styles.message,
            !isRead && styles.unreadMessage,
          ]}
          numberOfLines={1}
        >
          {preview?.text}
        </Text>
      </View>

      {/* Badge */}
      {!isRead && (
        <View style={[common.badge, styles.badge]}>
          <Text style={common.badgeText}>2</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.teal,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 16,
  },
  unreadDate: {
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  case: {
    fontSize: 12,
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#333',
  },
  badge: {
    marginLeft: 8,
  },
});