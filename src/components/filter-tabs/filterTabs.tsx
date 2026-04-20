// src/components/FilterTabs.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  filter: 'all' | 'unread';
  onChange: (value: 'all' | 'unread') => void;
  totalUnread: number;
};

export default function FilterTabs({
  filter,
  onChange,
  totalUnread,
}: Props) {
  return (
    <View style={common.filtersRow}>
      {/* Todos */}
      <TouchableOpacity
        style={filter === 'all' ? common.filterActive : common.filterInactive}
        onPress={() => onChange('all')}
      >
        <Text style={filter === 'all' ? common.txtWhite : common.txtGray}>
          Todos
        </Text>
      </TouchableOpacity>

      {/* Não lidas */}
      <TouchableOpacity
        style={filter === 'unread' ? common.filterActive : common.filterInactive}
        onPress={() => onChange('unread')}
      >
        <View style={styles.row}>
          <Text style={filter === 'unread' ? common.txtWhite : common.txtGray}>
            Não lidas
          </Text>

          {totalUnread > 0 && (
            <View
              style={[
                common.badge,
                {
                  width: 18,
                  height: 18,
                  backgroundColor:
                    filter === 'unread'
                      ? COLORS.tealLight
                      : COLORS.teal,
                },
              ]}
            >
              <Text style={styles.badgeText}>{totalUnread}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 9,
    color: '#FFF',
    fontWeight: 'bold',
  },
});