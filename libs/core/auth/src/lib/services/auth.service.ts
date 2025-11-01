import { Injectable, signal, computed } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly currentUserSignal = signal<User | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly userRoles = computed(() => this.currentUser()?.roles ?? []);

  constructor() {
    this.loadUserFromToken();
  }

  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loadUserFromToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSignal.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasRole(role: UserRole): boolean {
    return this.userRoles().includes(role);
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const userRoles = this.userRoles();
    return roles.some((role) => userRoles.includes(role));
  }

  private loadUserFromToken(): void {
    const token = this.getToken();
    if (!token) {
      this.currentUserSignal.set(null);
      return;
    }

    try {
      const payload = this.decodeToken(token);
      if (this.isTokenExpired(payload)) {
        this.logout();
        return;
      }

      const user: User = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        roles: payload.roles,
      };
      this.currentUserSignal.set(user);
    } catch (error) {
      console.error('Failed to decode token:', error);
      this.logout();
    }
  }

  private decodeToken(token: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  }

  private isTokenExpired(payload: JwtPayload): boolean {
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }
}

