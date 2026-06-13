import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  phone: string;
  email?: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
}

export class AuthUtils {
  static TOKEN_KEY = 'token';
  static REFRESH_TOKEN_KEY = 'refreshToken';

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static removeRefreshToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  static isTokenExpired(token?: string): boolean {
    const t = token || this.getToken();
    if (!t) return true;

    const decoded = this.decodeToken(t);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp <= currentTime;
  }

  static getCurrentUser(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    return this.decodeToken(token);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  static logout(): void {
    this.removeToken();
    this.removeRefreshToken();
  }

  static hasRole(role: 'user' | 'admin'): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  static isAdmin(): boolean {
    return this.hasRole('admin');
  }
}

export default AuthUtils;
