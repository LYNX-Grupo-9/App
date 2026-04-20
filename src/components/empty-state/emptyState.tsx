// src/components/EmptyState.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

import { COLORS } from '../../constants/colors';

type Props = {
  text: string;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  text,
  showAction,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View style={styles.container}>
      <Search color="#CCC" size={40} />

      <Text style={styles.text}>{text}</Text>

      {showAction && (
        <TouchableOpacity onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
  },
  text: {
    color: '#AAA',
    fontSize: 15,
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.teal,
    fontWeight: 'bold',
  },
});