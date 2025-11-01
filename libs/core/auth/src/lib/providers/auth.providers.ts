import { Provider } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';

export function provideAuth(): Provider[] {
  return [
    provideHttpClient(withInterceptors([authInterceptor])),
  ];
}

