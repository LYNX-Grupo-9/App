// src/components/CaseCarouselCard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

const { width } = Dimensions.get('window');

type Lawyer = {
  id: string;
  initials: string;
  avatarColor: string;
};

type Props = {
  title: string;
  area: string;
  status: string;
  lawyers: Lawyer[];
  onPress: () => void;
};

const MAX_VISIBLE_AVATARS = 3;

export default function CaseCarouselCard({
  title,
  area,
  status,
  lawyers,
  onPress,
}: Props) {
  const visibleLawyers = lawyers.slice(0, MAX_VISIBLE_AVATARS);
  const totalLawyers = lawyers.length;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Tags */}
      <View style={common.rowSpaced}>
        {area ? (
          <View style={common.tagArea}>
            <Text style={common.tagAreaText}>{area}</Text>
          </View>
        ) : (
          <View />
        )}

        <View style={common.tagStatus}>
          <Text style={common.tagStatusText}>{status}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>{title}</Text>

      {/* Lawyers */}
      {totalLawyers === 0 ? (
        <Text style={styles.noLawyersText}>
          Nenhum advogado entrou em contato ainda
        </Text>
      ) : (
        <View style={common.row}>
          {visibleLawyers.map((l, idx) => (
            <View
              key={l.id}
              style={[
                common.avatarMini,
                styles.avatar,
                {
                  backgroundColor: l.avatarColor,
                  marginLeft: idx === 0 ? 0 : -8,
                  zIndex: MAX_VISIBLE_AVATARS - idx,
                },
              ]}
            >
              <Text style={common.avatarMiniText}>
                {l.initials.charAt(0)}
              </Text>
            </View>
          ))}

          {/* +N quando há mais advogados do que os avatares visíveis */}
          {totalLawyers > MAX_VISIBLE_AVATARS && (
            <View
              style={[
                common.avatarMini,
                styles.avatar,
                styles.avatarOverflow,
                { marginLeft: -8 },
              ]}
            >
              <Text style={styles.avatarOverflowText}>
                +{totalLawyers - MAX_VISIBLE_AVATARS}
              </Text>
            </View>
          )}

          <Text style={styles.lawyersText}>
            {totalLawyers === 1
              ? '1 advogado entrou em contato'
              : `${totalLawyers} advogados entraram em contato`}
          </Text>
        </View>
      )}
    </TouchableOpacity>
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
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginVertical: 15,
  },
  avatar: {
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  avatarOverflow: {
    backgroundColor: COLORS.grayBorder,
    zIndex: 0,
  },
  avatarOverflowText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  lawyersText: {
    fontSize: 10,
    color: COLORS.gray,
    marginLeft: 10,
    flexShrink: 1,
  },
  noLawyersText: {
    fontSize: 10,
    color: COLORS.gray,
    fontStyle: 'italic',
  },
});