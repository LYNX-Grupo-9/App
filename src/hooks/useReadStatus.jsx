import { useState } from 'react';
 
/**
 * Tracks which conversation ids the user has already opened.
 *
 * @returns {{
 *   readIds: string[],
 *   markAsRead: (id: string) => void,
 *   isRead: (id: string) => boolean,
 * }}
 */
export function useReadStatus() {
  const [readIds, setReadIds] = useState([]);
 
  const markAsRead = (id) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
 
  const isRead = (id) => readIds.includes(id);
 
  return { readIds, markAsRead, isRead };
}
 