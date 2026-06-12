import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import endpoints from '@/src/service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConversationItem from '../../src/components/conversation-item/conversationItem';
import EmptyState from '../../src/components/empty-state/emptyState';
import FilterTabs from '../../src/components/filter-tabs/filterTabs';
import SearchBar from '../../src/components/search-bar/searchBar';
import { COLORS } from '../../src/constants/colors';
import { common } from '../../src/styles/common';

type Conversation = {
  idConversa: string;
  idCaso: string;
  criadoEm: string;
  advogado?: {
    idAdvogado: string;
    nome: string;
    registroOab: string;
    cpf: string;
    email: string;
  };
  cliente?: {
    idClienteApp: string;
    nome: string;
    email: string;
    cpf: string;
  };
  lida?: boolean;
};

function formatConversationTime(date?: string) {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

const READ_CONVERSATIONS_KEY = 'readConversations';

export default function ConversationsTab() {
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [caseTitles, setCaseTitles] = useState<Record<string, string>>({});
  const [readIds, setReadIds] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadConversations() {
    try {
      setLoading(true);
      setError('');

      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('Usuário não encontrado');

      const response = await endpoints.chat.getAll({ clienteId: userId });
      const convs: Conversation[] = response.data ?? [];

      // Busca títulos de todos os casos únicos em paralelo
      const uniqueCaseIds = [...new Set(convs.map((c) => c.idCaso))];

      const caseResults = await Promise.allSettled(
        uniqueCaseIds.map((id) => endpoints.cases.getById(id))
      );

      const titleMap: Record<string, string> = {};
      caseResults.forEach((result, index) => {
        const fallback = `Caso ${uniqueCaseIds[index].slice(0, 8)}`;
        if (result.status === 'fulfilled') {
          titleMap[uniqueCaseIds[index]] = result.value.data?.titulo ?? fallback;
        } else {
          titleMap[uniqueCaseIds[index]] = fallback;
        }
      });

      setCaseTitles(titleMap);
      setConversations(convs);
    } catch (err) {
      console.log(err);
      setError('Não foi possível carregar suas conversas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadReadIds() {
      const stored = await AsyncStorage.getItem(READ_CONVERSATIONS_KEY);
      if (stored) setReadIds(JSON.parse(stored));
    }

    loadReadIds();
    loadConversations();
  }, []);

  const formattedConversations = useMemo(() => {
    return conversations.map((conversation) => {
      const lawyerName = conversation.advogado?.nome ?? 'Advogado';
      const lawyerId = conversation.advogado?.idAdvogado ?? '';
      const area = conversation.advogado?.registroOab ?? 'Área não informada';
      const isRead = conversation.lida || readIds.includes(conversation.idConversa);
      const caseTitle = caseTitles[conversation.idCaso] ?? `Caso ${conversation.idCaso.slice(0, 8)}`;

      return {
        conversationId: conversation.idConversa,
        isRead,
        preview: {
          text: 'Toque para abrir a conversa',
          caseTitle,
          time: formatConversationTime(conversation.criadoEm),
        },
        lawyer: {
          id: lawyerId,
          name: lawyerName,
          area,
          initials: getInitials(lawyerName),
          avatarColor: COLORS.teal,
        },
        searchableText: `${lawyerName} ${area} ${caseTitle}`.toLowerCase(),
      };
    });
  }, [conversations, readIds, caseTitles]);

  const filtered = useMemo(() => {
    return formattedConversations.filter((item) => {
      const matchesQuery = item.searchableText.includes(query.toLowerCase());
      const matchesFilter = filter === 'all' || !item.isRead;
      return matchesQuery && matchesFilter;
    });
  }, [formattedConversations, query, filter]);

  const totalUnread = formattedConversations.filter((item) => !item.isRead).length;

  async function markAsRead(conversationId: string) {
    setReadIds((prev) => {
      if (prev.includes(conversationId)) return prev;
      const updated = [...prev, conversationId];
      AsyncStorage.setItem(READ_CONVERSATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.teal} />
          <Text style={styles.loadingText}>Carregando conversas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
        <Text style={common.screenTitle}>Conversas</Text>
      </View>

      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery('')}
        placeholder="Buscar advogado ou caso..."
      />

      <FilterTabs
        filter={filter}
        onChange={setFilter}
        totalUnread={totalUnread}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <ScrollView keyboardShouldPersistTaps="handled">
        {filtered.length === 0 ? (
          <EmptyState
            text={
              query
                ? 'Nenhum resultado encontrado'
                : filter === 'unread'
                  ? 'Nenhuma conversa não lida'
                  : 'Nenhuma conversa encontrada'
            }
            showAction={query.length > 0}
            actionLabel="Limpar busca"
            onAction={() => setQuery('')}
          />
        ) : (
          filtered.map((item) => (
            <ConversationItem
              key={item.conversationId}
              lawyer={item.lawyer}
              preview={item.preview}
              isRead={item.isRead}
              showOnline={false}
              onPress={() => {
                markAsRead(item.conversationId);
                router.push({
                  pathname: '/chat',
                  params: {
                    idConversa: item.conversationId,
                    lawyerId: item.lawyer.id,
                  },
                });
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
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
    marginHorizontal: 20,
    marginBottom: 10,
  },
});