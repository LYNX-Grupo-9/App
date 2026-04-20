import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FileText } from 'lucide-react-native';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

export default function DocumentRequestCard() {
  return (
    <View style={common.cardDocument}>
      <View style={common.documentRowInChat}>
        <FileText color={COLORS.teal} size={24} />

        <View style={styles.documentInfo}>
          <Text style={common.documentLabel}>
            Documento solicitado
          </Text>
          <Text style={common.documentName}>
            Contrato de trabalho
          </Text>
        </View>
      </View>

      <TouchableOpacity style={common.btnSendDoc}>
        <Text style={common.txtWhite}>
          📄 Enviar documento
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  documentInfo: {
    marginLeft: 10,
  },
});