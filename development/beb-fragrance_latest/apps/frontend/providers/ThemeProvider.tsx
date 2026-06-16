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
    // Initialize theme from localStorage or system preference (client-only)
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
    if (mounted && typeof window !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) return <>{children}</>;

  return (
    <div suppressHydrationWarning data-theme={theme} style={{ colorScheme: theme }}>
      {children}
    </div>
  );
}
