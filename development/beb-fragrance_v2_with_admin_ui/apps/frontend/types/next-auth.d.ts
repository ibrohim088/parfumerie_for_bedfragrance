// ============================================
// NEXTAUTH TYPE EXTENSIONS
// ============================================

import { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      phone: string;
      email?: string;
      fullName?: string;
      profileImage?: string;
      role: 'user' | 'admin';
      emailVerified: boolean;
      phoneVerified: boolean;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      lastLogin?: string;
    } & DefaultSession['user'];
    token: string;
    refreshToken: string;
    expiresAt: number;
  }

  interface User extends DefaultUser {
    id: string;
    phone: string;
    email?: string;
    fullName?: string;
    profileImage?: string;
    role: 'user' | 'admin';
    emailVerified: boolean;
    phoneVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
  }

  interface CredentialsProvider {
    name: 'Credentials';
    credentials: {
      phone: { label: string; type: string };
      otp: { label: string; type: string };
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    phone: string;
    email?: string;
    fullName?: string;
    profileImage?: string;
    role: 'user' | 'admin';
    emailVerified: boolean;
    phoneVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
    token: string;
    refreshToken: string;
    expiresAt: number;
    iat: number;
    exp: number;
    jti?: string;
  }
}

// NextAuth Callback Types
export interface NextAuthCallbacks {
  signIn: (props: {
    user: User | null;
    account: Account | null;
    profile?: Profile | undefined;
    email?: {
      verificationRequest?: boolean;
    } | undefined;
    credentials?: Record<string, any> | undefined;
  }) => Promise<string | boolean>;

  redirect: (props: {
    url: string;
    baseUrl: string;
  }) => Promise<string>;

  session: (props: {
    session: Session;
    token: JWT;
    user?: User | undefined;
    newSession?: any;
    trigger?: 'update' | 'getSession' | undefined;
  }) => Promise<Session>;

  jwt: (props: {
    token: JWT;
    user?: User | undefined;
    account?: Account | null | undefined;
    profile?: Profile | undefined;
    trigger?: 'signIn' | 'signUp' | 'update' | undefined;
    isNewUser?: boolean | undefined;
  }) => Promise<JWT>;
}

// NextAuth Events
export interface NextAuthEvents {
  signIn?: (message: { user?: User; account?: Account; profile?: any; isNewUser?: boolean }) => void | Promise<void>;
  signOut?: (message: { token?: JWT }) => void | Promise<void>;
  createUser?: (message: { user?: User }) => void | Promise<void>;
  updateUser?: (message: { user?: User }) => void | Promise<void>;
  linkAccount?: (message: {
    user?: User;
    account?: Account;
    profile?: any;
  }) => void | Promise<void>;
  sessionCallback?: (message: { token?: JWT; session?: Session }) => void | Promise<void>;
}

// NextAuth Account
export interface Account {
  provider: string;
  type: 'oauth' | 'oidc' | 'credentials';
  providerAccountId: string;
  access_token?: string;
  token_type?: string;
  scope?: string;
  expires_at?: number;
  refresh_token?: string;
  id_token?: string;
}

// NextAuth Profile
export interface Profile {
  name?: string;
  email?: string;
  image?: string;
  [key: string]: any;
}

// NextAuth Options
export interface NextAuthConfig {
  providers: any[];
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
    verifyRequest?: string;
    newUser?: string;
  };
  callbacks?: Partial<NextAuthCallbacks>;
  events?: Partial<NextAuthEvents>;
  debug?: boolean;
  useSecureCookies?: boolean;
  trustHost?: boolean;
}
