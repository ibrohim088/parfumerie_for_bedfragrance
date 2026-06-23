'use client';

import { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import ThemeProvider from './ThemeProvider';
import AuthProvider from './AuthProvider';
import ToastProvider from './ToastProvider';
import ModalProvider from './ModalProvider';
import UIProvider from './UIProvider';
import ResponsiveProvider from './ResponsiveProvider';
import NextAuthProvider from './NextAuthProvider';
import TelegramProvider from './TelegramProvider';

interface AllProvidersProps {
  children: ReactNode;
}

export default function AllProviders({ children }: AllProvidersProps) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <TelegramProvider>
            <AuthProvider>
              <ToastProvider>
                <ModalProvider>
                  <UIProvider>
                    <ResponsiveProvider>
                      {children}
                    </ResponsiveProvider>
                  </UIProvider>
                </ModalProvider>
              </ToastProvider>
            </AuthProvider>
          </TelegramProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}

/*
'use client';

import { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import ThemeProvider from './ThemeProvider';
import AuthProvider from './AuthProvider';
import ToastProvider from './ToastProvider';
import ModalProvider from './ModalProvider';
import UIProvider from './UIProvider';
import ResponsiveProvider from './ResponsiveProvider';
import NextAuthProvider from './NextAuthProvider';

interface AllProvidersProps {
  children: ReactNode;
}

export default function AllProviders({ children }: AllProvidersProps) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <ModalProvider>
                <UIProvider>
                  <ResponsiveProvider>
                    {children}
                  </ResponsiveProvider>
                </UIProvider>
              </ModalProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
*/