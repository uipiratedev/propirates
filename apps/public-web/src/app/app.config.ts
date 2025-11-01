import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApi } from '@propirates/core/api';
import { provideRuntimeConfig } from '@propirates/core/config';
import { provideRouterEventLogger } from '@propirates/core/logging';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideApi(),
    provideRuntimeConfig({
      production: false,
      apiBaseUrl: 'http://localhost:3000/api',
      loggingEndpoint: '/api/logging',
    }),
    provideRouterEventLogger(),
  ],
};

