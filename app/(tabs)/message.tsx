import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { COLORS } from '../../src/constants/colors';
import { MESSAGE_PREVIEWS } from '../../src/constants/data';
import { common } from '../../src/styles/common';
import { useConversationSearch } from '../../src/hooks/useConversationSearch';
import { ReadStatusContext } from '../ReadStatusContext';
import SearchBar from '../../src/components/search-bar/searchBar';
import ConversationItem from '../../src/components/conversation-item/conversationItem';
import FilterTabs from '../../src/components/filter-tabs/filterTabs';
import EmptyState from '../../src/components/empty-state/emptyState';

export default function ConversationsTab() {
  const router = useRouter();

  const { readIds, markAsRead } = useContext(ReadStatusContext);

  const {
    query,
    setQuery,
    filter,
    setFilter,
    filtered,
    totalUnread,
  } = useConversationSearch(readIds);

  return (
    <SafeAreaView style={common.container}>
      {/* Header */}
      <View style={common.headerSimple}>
        <Text style={common.screenTitle}>Conversas</Text>
        <Bell color={COLORS.navy} size={24} />
      </View>

      {/* 🔍 Search */}
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery('')}
        placeholder="Buscar advogado ou caso..."
      />

      {/* 🎛️ Filters */}
      <FilterTabs
        filter={filter}
        onChange={setFilter}
        totalUnread={totalUnread}
      />

      {/* 📃 List */}
      <ScrollView keyboardShouldPersistTaps="handled">
        {filtered.length === 0 ? (
          <EmptyState
            text={
              query
                ? 'Nenhum resultado encontrado'
                : 'Nenhuma conversa não lida'
            }
            showAction={query.length > 0}
            actionLabel="Limpar busca"
            onAction={() => setQuery('')}
          />
        ) : (
          filtered.map((lawyer) => {
            const isRead = readIds.includes(lawyer.id);
            const preview = MESSAGE_PREVIEWS[lawyer.id as keyof typeof MESSAGE_PREVIEWS];

            return (
              <ConversationItem
                key={lawyer.id}
                lawyer={lawyer}
                preview={preview}
                isRead={isRead}
                showOnline={lawyer.id === '1'}
                onPress={() => {
                  markAsRead(lawyer.id);
                  router.push({
                    pathname: '/chat',
                    params: { lawyerId: lawyer.id },
                  });
                }}
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}