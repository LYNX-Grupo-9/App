import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  onPress: () => void;
};

export default function AICard({ onPress }: Props) {
  return (
    <View style={common.cardAI}>
      <View style={common.cardAIRow}>
        <Sparkles color={COLORS.tealLight} size={18} />
        <Text style={common.cardAITitle}>
          Análise da IA
        </Text>
      </View>

      <Text style={common.cardAIText}>
        Este caso apresenta alta probabilidade de êxito com base em precedentes de demissão sem
        justa causa revertidos no TRT-2...
      </Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={common.cardAILink}>
          Ver análise completa ➔
        </Text>
      </TouchableOpacity>
    </View>
  );
}