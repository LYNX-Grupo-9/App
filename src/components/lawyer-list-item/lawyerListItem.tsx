// src/components/LawyerListItem.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Briefcase, ChevronRight } from 'lucide-react-native';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  id: string;
  name: string;
  area: string;
  initials: string;
  avatarColor: string;
  caseId?: string;
  description?: string;
  onPress?: () => void;
  showChevron?: boolean;
};

export default function LawyerListItem({
  id,
  name,
  area,
  initials,
  avatarColor,
  caseId,
  description,
  onPress,
  showChevron = true,
}: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) return onPress();
  
    router.push({
      pathname: '/lawyer-profile',
      params: {
        lawyerId: id,
        ...(caseId ? { caseId } : {}),
      },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Avatar */}
      <View
        style={[
          common.avatarMd,
          { backgroundColor: avatarColor },
        ]}
      >
        <Text style={common.avatarInitialsMd}>
          {initials}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.area}>{area}</Text>

        <View style={common.row}>
          <Briefcase size={14} color={COLORS.gray} />
          <Text style={styles.caseText}>
            Sobre: {description}
          </Text>
        </View>
      </View>

      {/* Chevron */}
      {showChevron && (
        <ChevronRight color="#CCC" size={20} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  info: {
    flex: 1,
    marginLeft: 15,
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
  caseText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 5,
  },
});