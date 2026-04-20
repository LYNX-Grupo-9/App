import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AIModal({ visible, onClose }: Props) {
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
            O caso apresenta fortes indícios de rescisão indireta devido ao atraso reiterado no
            pagamento de salários e ausência de depósitos de FGTS...
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