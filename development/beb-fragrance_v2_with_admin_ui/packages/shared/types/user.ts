export type UserRole = 'customer' | 'admin' | 'super_admin';

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  phone: string;
  otp: string;
}

export interface RegisterPayload {
  phone: string;
  firstName: string;
  lastName: string;
  email?: string;
}