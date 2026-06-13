'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface UIContextType {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeSidebar: () => void;
  closeMobileMenu: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
}

interface UIProviderProps {
  children: ReactNode;
}

export default function UIProvider({ children }: UIProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen,
        mobileMenuOpen,
        toggleSidebar,
        toggleMobileMenu,
        closeSidebar,
        closeMobileMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
