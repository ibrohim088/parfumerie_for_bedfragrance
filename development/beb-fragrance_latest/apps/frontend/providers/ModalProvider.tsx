'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  content: React.ReactNode;
  title?: string;
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const openModal = (newContent: React.ReactNode, newTitle?: string) => {
    setContent(newContent);
    setTitle(newTitle);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setContent(null);
      setTitle(undefined);
    }, 300); // Wait for animation
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, title, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
