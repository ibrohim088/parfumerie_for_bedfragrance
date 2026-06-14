'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get saved theme or system preference
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const initial = saved || preferred;
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;

    if (newTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#1f2937');
      root.style.setProperty('--bg-secondary', '#111827');
      root.style.setProperty('--text-primary', '#f3f4f6');
      root.style.setProperty('--text-secondary', '#9ca3af');
      root.style.setProperty('--border-color', '#374151');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--border-color', '#e5e7eb');
    }

    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div
      suppressHydrationWarning
      data-theme={theme}
      style={{
        colorScheme: theme,
      }}
    >
      {children}
    </div>
  );
}
