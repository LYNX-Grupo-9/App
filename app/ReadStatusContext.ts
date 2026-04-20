import { createContext } from 'react';

export const ReadStatusContext = createContext({
  readIds:    [] as string[],
  markAsRead: (_id: string) => {},
  isRead:     (_id: string) => false as boolean,
});
