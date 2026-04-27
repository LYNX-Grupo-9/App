import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS } from '@/src/constants/colors';

type Props = {
  title: string,
  onPress?: () => void;
  isDisabled?: boolean;
};

export default function MainButton({
  onPress,
  title,
  isDisabled
}: Props) {
  return (
      <TouchableOpacity style={isDisabled ? styles.buttonDisabled : styles.button} onPress={onPress} disabled={isDisabled}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: COLORS.mainText,
        borderRadius: 8,
        height: 60,
        marginTop: 30,
    },
    buttonDisabled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: COLORS.mainText,
        opacity: 0.5,
        borderRadius: 8,
        height: 60,
        marginTop: 30,
    },
})