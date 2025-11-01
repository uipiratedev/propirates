import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptors/logging.interceptor';

export function provideLogging(): EnvironmentProviders {
  return makeEnvironmentProviders([provideHttpClient(withInterceptors([loggingInterceptor]))]);
}
