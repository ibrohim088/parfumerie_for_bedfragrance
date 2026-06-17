'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useUIStore } from '@/store/uiStore';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ui-store');
        if (!saved) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
        }
      } catch (e) {
        console.debug('Theme initialization error:', e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    // <div> emas, to'g'ridan-to'g'ri <html> ga — barcha elementlar oladi
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }, [theme]);

  if (!mounted) return <>{children}</>;

  // <div> wrapper yo'q — faqat children
  return <>{children}</>;
}