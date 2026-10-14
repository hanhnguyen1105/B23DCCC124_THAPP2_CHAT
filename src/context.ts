import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { AppNotification, Chat } from './data';

export type AppContextValue = {
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
  notifications: AppNotification[];
  setNotifications: Dispatch<SetStateAction<AppNotification[]>>;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  notificationsEnabled: boolean;
  setNotificationsEnabled: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContext.Provider');
  }
  return context;
}
