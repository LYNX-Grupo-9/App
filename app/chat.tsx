import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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
  const socketRef = useRef<WebSocket | null>(null);
  const hasDocumentRequest = false;

  function appendMessage(newMessage: ApiMessage) {
    setMessages((prev) => {
      if (newMessage.idMensagem && prev.some((item) => item.idMensagem === newMessage.idMensagem)) {
        return prev;
      }

      return [...prev, newMessage];
    });
  }
  async function handleSendMessage() {
    if (!idConversa || !message.trim()) return;

    try {
      setSending(true);

      const userId = await AsyncStorage.getItem('userId');

      if (!userId) throw new Error('Usuário não encontrado');

      const payload = {
        idConversa,
        conteudo: message.trim(),
        remetenteTipo: 'CLIENTE' as const,
      };

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          type: 'SEND',
          ...payload,
        }));
        setMessage('');
        return;
      }

      const response = await endpoints.chat.sendMessage({
        ...payload,
        remetenteId: userId,
      });

      appendMessage(
        response.data ?? {
          idMensagem: String(Date.now()),
          idConversa,
          conteudo: message.trim(),
          remetenteTipo: 'CLIENTE',
          remetenteId: userId,
          enviadoEm: new Date().toISOString(),
        }
      );

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

  useEffect(() => {
    let active = true;

    async function connectChatSocket() {
      if (!idConversa) return;

      const token = await AsyncStorage.getItem('token');
      if (!token || !active) return;

      const socket = new WebSocket(endpoints.chat.getWebSocketUrl(token));
      socketRef.current = socket;

      socket.onopen = () => {
        socket.send(JSON.stringify({
          type: 'SUBSCRIBE',
          idConversa,
        }));
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload?.type === 'MESSAGE' && payload.data?.idConversa === idConversa) {
            appendMessage(payload.data);
          }
        } catch (err) {
          console.log('Erro ao processar mensagem do chat:', err);
        }
      };

      socket.onerror = (event) => {
        console.log('Erro no WebSocket do chat:', event);
      };
    }

    connectChatSocket();

    return () => {
      active = false;
      socketRef.current?.close();
      socketRef.current = null;
    };
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

function formatMessageTime(date?: string | number[]) {
  if (!date) return '';

  let parsedDate: Date;

  if (Array.isArray(date)) {
    // [2026, 6, 10, 19, 15, 29, 421769000]
    // Mês no JS é 0-indexed, no array vem 1-indexed
    const [year, month, day, hour, minute, second] = date;
    parsedDate = new Date(year, month - 1, day, hour, minute, second);
  } else {
    parsedDate = new Date(isNaN(Number(date)) ? date : Number(date));
  }

  if (isNaN(parsedDate.getTime())) return '--:--';

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
