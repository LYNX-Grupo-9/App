import { useLocalSearchParams, useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../src/constants/colors';
import { LAWYERS } from '../src/constants/data';
import { common } from '../src/styles/common';
import ChatHeader from '../src/components/chat-header/chatHeader';
import DocumentRequestCard from '@/src/components/document-request-card/documentRequest';

export default function ChatScreen() {
  const { lawyerId } = useLocalSearchParams<{ lawyerId: string }>();
  const lawyer =
    LAWYERS.find((l) => l.id === lawyerId) ?? LAWYERS[0];

  return (
    <SafeAreaView style={common.container}>
      <ChatHeader lawyer={lawyer} />
      <ScrollView style={common.padding}>
        <View style={common.chatDateSeparator}>
          <Text style={common.smallGrayText}>
            Hoje
          </Text>
        </View>

        <View style={common.bubbleLeft}>
          <Text style={common.txtBlack}>
            Olá João! Sou especialista em{' '}
            {lawyer.specialties[0].toLowerCase()}. Vi sua análise de IA
            e gostaria de ajudar.
          </Text>
          <Text style={common.bubbleTime}>
            09:41
          </Text>
        </View>

        <View style={common.bubbleRight}>
          <Text style={common.txtWhite}>
            Olá {lawyer.name.split(' ')[1]}, obrigado! O que precisamos fazer agora?
          </Text>
          <Text style={common.bubbleTimeWhite}>
            09:43
          </Text>
        </View>

      <DocumentRequestCard/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 10,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  profileLink: {
    color: COLORS.teal,
    fontWeight: 'bold',
    fontSize: 12,
  },
  documentInfo: {
    marginLeft: 10,
  },
});