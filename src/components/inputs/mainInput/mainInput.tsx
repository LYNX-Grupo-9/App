import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { common } from '../../../styles/common';
import { COLORS } from '@/src/constants/colors';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  title: string,
  type?: 'text' | 'password';
};

export default function MainInput({
  value,
  onChange,
  placeholder,
  title,
  type,
}: Props) {
  return (
    <View style={styles.inputBar}>
        <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#AAA"
        secureTextEntry={type === 'password'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    inputTitle: {
        fontSize: 12,
        fontWeight: 'regular',
        color: COLORS.subText,
    },

    inputBar: { 
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginTop: 20,
        width: '100%',
    },
    input: {
        backgroundColor: COLORS.input,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.mainText,
        height: 50,
    },
})