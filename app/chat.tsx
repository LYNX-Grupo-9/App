import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../src/constants/colors';
import { common } from '../src/styles/common';
import ChatHeader from '../src/components/chat-header/chatHeader';
import DocumentRequestCard from '@/src/components/document-request-card/documentRequest';
import endpoints from '@/src/service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatInput from '@/src/components/inputs/chat-input/chatInput';
import AudioBubble from '@/src/components/audio-bubble/audioBubble';

type ApiMessage = {
  idMensagem?: string;
  idConversa?: string;
  conteudo: string;
  remetenteTipo: 'CLIENTE' | 'ADVOGADO';
  remetenteId: string;
  enviadoEm: string;
  audioUri?: string;
};

type ApiConversation = {
  id: string;
  advogado?: {
    idAdvogado?: string;
    id?: string;
    nome?: string;
    name?: string;
    area?: string;
  };
};


export default function ChatScreen() {
  const { idConversa } = useLocalSearchParams<{ idConversa: string }>();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [conversation, setConversation] = useState<ApiConversation | null>(null);
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const hasDocumentRequest = false;
  async function handleSendMessage() {
    if (!idConversa || !message.trim()) return;

    try {
      setSending(true);

      const userId = await AsyncStorage.getItem('userId');

      if (!userId) throw new Error('Usuário não encontrado');

      const response = await endpoints.chat.sendMessage({
        idConversa,
        conteudo: message.trim(),
        remetenteTipo: 'CLIENTE',
        remetenteId: userId,
      });

      setMessages((prev) => [
        ...prev,
        response.data ?? {
          id: String(Date.now()),
          texto: message.trim(),
          conteudo: message.trim(),
          remetenteTipo: 'CLIENTE',
          dataEnvio: new Date().toISOString(),
        },
      ]);

      setMessage('');
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  }

  // handleSendAudio — adicione junto ao handleSendMessage
  async function handleSendAudio(uri: string) {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;

    // Adiciona localmente já — sem esperar API
    setMessages((prev) => [
      ...prev,
      {
        conteudo: '',
        audioUri: uri,
        remetenteTipo: 'CLIENTE',
        remetenteId: userId,
        enviadoEm: new Date().toISOString(),
      },
    ]);

    // Opcional: transcrever e enviar via API
    // const { data } = await endpoints.ai.transcreverAudio({ uri, name: 'audio.m4a', type: 'audio/m4a' });
    // await endpoints.chat.sendMessage({ idConversa, conteudo: data.transcricao, ... });
  }

  async function loadChat() {
    if (!idConversa) return;

    try {
      setLoading(true);
      setError('');

      const [conversationResponse, messagesResponse] = await Promise.all([
        endpoints.chat.getById(idConversa),
        endpoints.chat.getMessages(idConversa),
      ]);

      setConversation(conversationResponse.data);
      setMessages(messagesResponse.data ?? []);
    } catch (err) {
      console.log(err);
      setError('Não foi possível carregar a conversa.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadChat();
  }, [idConversa]);

  const lawyerName =
    conversation?.advogado?.nome ??
    conversation?.advogado?.name ??
    'Advogado';

  const lawyer = {
    id: conversation?.advogado?.idAdvogado ?? conversation?.advogado?.id ?? '',
    name: lawyerName,
    area: conversation?.advogado?.area ?? 'Área não informada',
    initials: getInitials(lawyerName),
    avatarColor: COLORS.teal,
    specialties: [conversation?.advogado?.area ?? 'Direito'],
  };

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.loadingText}>Carregando conversa...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={common.container}>
      <ChatHeader lawyer={lawyer} />

      <ScrollView style={common.padding}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={common.chatDateSeparator}>
          <Text style={common.smallGrayText}>Hoje</Text>
        </View>

        {messages.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhuma mensagem enviada ainda.
          </Text>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.remetenteTipo === 'CLIENTE';

            return (
              <View key={msg.idMensagem ?? `msg-${index}`}>
                {msg.audioUri ? (
                  <AudioBubble
                    uri={msg.audioUri}
                    isUser={isUser}
                    time={formatMessageTime(msg.enviadoEm)}
                  />
                ) : (
                  <View style={isUser ? common.bubbleRight : common.bubbleLeft}>
                    <Text style={isUser ? common.txtWhite : common.txtBlack}>
                      {msg.conteudo}
                    </Text>
                    <Text style={isUser ? common.bubbleTimeWhite : common.bubbleTime}>
                      {formatMessageTime(msg.enviadoEm)}
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        )}

        {hasDocumentRequest && <DocumentRequestCard />}
      </ScrollView>
      <ChatInput
        value={message}
        onChangeText={setMessage}
        onSend={handleSendMessage}
        onSendAudio={handleSendAudio} 
        disabled={sending}
      />
    </SafeAreaView>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatMessageTime(date?: string) {
  if (!date) return '';

  const parsedDate = new Date(date);

  return parsedDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.gray,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 20,
  },
});