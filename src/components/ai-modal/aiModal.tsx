import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';

import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  visible: boolean;
  onClose: () => void;
  analysis?: string;
};

export default function AIModal({ visible, onClose, analysis }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={common.modalOverlay}>
        <View style={common.modalBody}>
          <View style={common.modalHeader}>
            <Sparkles color={COLORS.blue} size={20} />

            <Text style={common.modalTitle}>
              Análise da IA
            </Text>
          </View>

          <Text style={common.modalText}>
            {analysis || 'Ainda não há uma análise disponível para este caso.'}
          </Text>

          <Text style={common.modalWarning}>
            Esta análise é automática e serve apenas para triagem inicial.
          </Text>

          <TouchableOpacity style={common.btnOk} onPress={onClose}>
            <Text style={common.txtWhite}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}