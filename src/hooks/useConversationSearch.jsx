import { useState, useMemo } from 'react';
import { LAWYERS, MESSAGE_PREVIEWS } from '../constants/data';

/**
 * Provides search query, active filter, and the filtered conversations list
 * for the Conversations screen.
 *
 * @param {string[]} readIds  - ids already marked as read (from useReadStatus)
 * @returns {{
 *   query: string,
 *   setQuery: (v: string) => void,
 *   filter: 'all' | 'unread',
 *   setFilter: (v: 'all' | 'unread') => void,
 *   filtered: typeof LAWYERS,
 *   totalUnread: number,
 * }}
 */
export function useConversationSearch(readIds) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const totalUnread = useMemo(
    () => LAWYERS.filter((l) => !readIds.includes(l.id)).length,
    [readIds],
  );

  const filtered = useMemo(() => {
    const term = query.toLowerCase();

    return LAWYERS.filter((lawyer) => {
      const preview = MESSAGE_PREVIEWS[lawyer.id];
      const isUnread = !readIds.includes(lawyer.id);

      const matchesQuery =
        term === '' ||
        lawyer.name.toLowerCase().includes(term) ||
        lawyer.area.toLowerCase().includes(term) ||
        preview?.caseTitle.toLowerCase().includes(term) ||
        preview?.text.toLowerCase().includes(term);

      const matchesFilter =
        filter === 'all' || (filter === 'unread' && isUnread);

      return matchesQuery && matchesFilter;
    });
  }, [query, filter, readIds]);

  return { query, setQuery, filter, setFilter, filtered, totalUnread };
}