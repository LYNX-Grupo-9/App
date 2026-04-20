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
import { LAWYERS } from '../../constants/data';
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

export default function CaseCarouselCard({
  title,
  area,
  status,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Tags */}
      <View style={common.rowSpaced}>
        <View style={common.tagArea}>
          <Text style={common.tagAreaText}>{area}</Text>
        </View>

        <View style={common.tagStatus}>
          <Text style={common.tagStatusText}>{status}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Lawyers */}
      <View style={common.row}>
        {LAWYERS.slice(0, 3).map((l, idx) => (
          <View
            key={l.id}
            style={[
              common.avatarMini,
              styles.avatar,
              {
                backgroundColor: l.avatarColor,
                marginLeft: idx === 0 ? 0 : -8,
              },
            ]}
          >
            <Text style={common.avatarMiniText}>
              {l.initials.charAt(0)}
            </Text>
          </View>
        ))}

        <Text style={styles.lawyersText}>
          {LAWYERS.length} advogados entraram em contato
        </Text>
      </View>
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
    // pode crescer no futuro (ex: borda branca)
  },
  lawyersText: {
    fontSize: 10,
    color: COLORS.gray,
    marginLeft: 10,
  },
});