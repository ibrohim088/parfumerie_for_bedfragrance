'use client';

import { useEffect, createContext, useContext, useState, ReactNode } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    start_param?: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  platform: string;
  version: string;
}

interface TelegramContextType {
  tg: TelegramWebApp | null;
  user: TelegramUser | null;
  isTelegram: boolean;
  colorScheme: 'light' | 'dark';
}

const TelegramContext = createContext<TelegramContextType>({
  tg: null,
  user: null,
  isTelegram: false,
  colorScheme: 'light',
});

export function useTelegram() {
  return useContext(TelegramContext);
}

interface TelegramProviderProps {
  children: ReactNode;
}

export default function TelegramProvider({ children }: TelegramProviderProps) {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const telegramApp = (window as any).Telegram?.WebApp as TelegramWebApp | undefined;

    if (telegramApp) {
      // Telegramga tayyor ekanligini bildiradi
      telegramApp.ready();

      // To'liq ekranda ochadi
      telegramApp.expand();

      setTg(telegramApp);
      setIsTelegram(true);
      setColorScheme(telegramApp.colorScheme || 'light');

      // Telegram dan kelgan user ma'lumotlari
      if (telegramApp.initDataUnsafe?.user) {
        setUser(telegramApp.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ tg, user, isTelegram, colorScheme }}>
      {children}
    </TelegramContext.Provider>
  );
}