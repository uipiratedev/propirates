import { Provider } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptors/logging.interceptor';

export function provideLogging(): Provider[] {
  return [
    provideHttpClient(withInterceptors([loggingInterceptor])),
  ];
}

