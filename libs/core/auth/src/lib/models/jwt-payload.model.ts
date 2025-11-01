import { UserRole } from './user.model';

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  roles: UserRole[];
  iat: number;
  exp: number;
}

