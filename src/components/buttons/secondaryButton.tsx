import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS } from '@/src/constants/colors';

type Props = {
  title: string,
  onPress?: () => void;
};

export default function SecondaryButton({
  onPress,
  title,
}: Props) {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.teal,
        opacity: 1,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: COLORS.tealLight,
        borderRadius: 8,
        height: 60,
        marginTop: 30,
    },
})