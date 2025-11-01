import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated initially', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should set user on login with valid token', () => {
    const mockToken = createMockToken({
      sub: '123',
      email: 'test@example.com',
      name: 'Test User',
      roles: ['user'],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    service.login(mockToken);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.currentUser()?.email).toBe('test@example.com');
  });

  it('should clear user on logout', () => {
    const mockToken = createMockToken({
      sub: '123',
      email: 'test@example.com',
      name: 'Test User',
      roles: ['user'],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    service.login(mockToken);
    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

  it('should check roles correctly', () => {
    const mockToken = createMockToken({
      sub: '123',
      email: 'admin@example.com',
      name: 'Admin User',
      roles: ['admin', 'user'],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    service.login(mockToken);

    expect(service.hasRole('admin')).toBe(true);
    expect(service.hasRole('user')).toBe(true);
    expect(service.hasRole('viewer')).toBe(false);
    expect(service.hasAnyRole(['admin'])).toBe(true);
    expect(service.hasAnyRole(['viewer'])).toBe(false);
  });
});

function createMockToken(payload: any): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const signature = 'mock-signature';
  return `${header}.${body}.${signature}`;
}

