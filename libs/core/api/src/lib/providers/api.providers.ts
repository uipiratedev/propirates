import { Provider } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { authInterceptor } from '@propirates/core/auth';
import { loggingInterceptor } from '@propirates/core/logging';

export function provideApi(): Provider[] {
  return [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loggingInterceptor,
        errorInterceptor,
      ])
    ),
  ];
}

