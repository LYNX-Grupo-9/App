import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { common } from '../../styles/common';
import endpoints from '@/src/service/api';

type Lawyer = {
  id: string;
  name: string;
  area: string;
  initials: string;
  avatarColor: string;
  about?: string;
};

type Props = {
  lawyer: Lawyer;
  caseId: string;
};
function getPreview(text?: string) {
  if (!text) {
    return 'Advogado interessado em conversar sobre este caso.';
  }

  const max = 80;

  if (text.length <= max) return `"${text}"`;

  return `"${text.slice(0, max).trim()}..."`;
}

export default function LawyerCard({ lawyer, caseId }: Props) {
  const router = useRouter();



  async function handleOpenChat() {
    try {
      const userId = await AsyncStorage.getItem('userId');
  
      if (!userId) throw new Error('Usuário não encontrado');
  
      const response = await endpoints.chat.create({
        idCliente: userId,
        idAdvogado: lawyer.id,
        idCaso: caseId,
      });
  
      const idConversa = response.data.idConversa ?? response.data.id;
  
      router.push({
        pathname: '/chat',
        params: { idConversa },
      });
    } catch (err: any) {
      if (err?.response?.status === 409) {
        const conversationsResponse = await endpoints.chat.getAll({
          casoId: caseId,
        });
      
        const existingConversation = conversationsResponse.data.find((conversation: any) => {
          const conversationLawyerId =
            conversation.advogado?.idAdvogado ??
            conversation.advogadoId ??
            conversation.idAdvogado;
      
          return conversationLawyerId === lawyer.id;
        });
      
        if (existingConversation) {
          const idConversa =
            existingConversation.idConversa ??
            existingConversation.id;
      
          router.push({
            pathname: '/chat',
            params: { idConversa },
          });
        }
      
        return;
      }
  
      console.log(err);
    }
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[common.avatarMd, { backgroundColor: lawyer.avatarColor }]}>
          <Text style={common.avatarInitialsMd}>
            {lawyer.initials}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{lawyer.name}</Text>
          <Text style={styles.area}>{lawyer.area}</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.aboutBox}>
        <Text style={styles.about}>
          {getPreview(lawyer.about)}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={common.btnSmallChat}
          onPress={handleOpenChat}
        >
          <Text style={common.txtWhite}>Abrir Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={common.btnTealLight}
          onPress={() =>
            router.push({
              pathname: '/lawyer-profile',
              params: { lawyerId: lawyer.id },
            })
          }
        >
          <Text style={common.txtTeal}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  card: {
  ...common.cardBase, 
}, 
header: {
  flexDirection: 'row', marginBottom: 12, 
}, 
info: { marginLeft: 12, }, 
name: { fontWeight: 'bold', color: COLORS.navy, fontSize: 16, }, 
area: { fontSize: 12, color: COLORS.teal, fontWeight: 'bold', }, 
aboutBox: { backgroundColor: '#F8F9FB', padding: 10, borderRadius: 8, marginBottom: 15, }, 
about: { fontSize: 12, color: COLORS.gray, }, actions: { flexDirection: 'row', gap: 10, }, });