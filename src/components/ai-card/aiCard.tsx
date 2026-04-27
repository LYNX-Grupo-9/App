import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

const PREVIEW_LENGTH = 100;

type Props = {
  text?: string;
  onPress: () => void;
};

export default function AICard({ text, onPress }: Props) {
  if (!text) return null;

  const preview = text.length > PREVIEW_LENGTH
    ? text.slice(0, PREVIEW_LENGTH).trimEnd() + '...'
    : text;

  return (
    <View style={common.cardAI}>
      <View style={common.cardAIRow}>
        <Sparkles color={COLORS.tealLight} size={18} />
        <Text style={common.cardAITitle}>Análise da IA</Text>
      </View>

      <Text style={common.cardAIText}>{preview}</Text>

      {text.length > PREVIEW_LENGTH && (
        <TouchableOpacity onPress={onPress}>
          <Text style={common.cardAILink}>Ver análise completa ➔</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}