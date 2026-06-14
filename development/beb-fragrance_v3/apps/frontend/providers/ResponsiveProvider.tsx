'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ResponsiveContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
}

interface ResponsiveProviderProps {
  children: ReactNode;
}

export default function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    setMounted(true);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile,
        isTablet,
        isDesktop,
        screenWidth,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}
