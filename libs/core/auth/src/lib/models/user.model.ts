export type UserRole = 'admin' | 'user' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}

