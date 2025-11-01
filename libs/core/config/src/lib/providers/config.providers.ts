import { APP_INITIALIZER, Provider, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EnvironmentService } from '../services/environment.service';
import { AppConfig } from '../models/app-config.model';

export function loadRuntimeConfig(buildTimeConfig: Partial<AppConfig> = {}) {
  const http = inject(HttpClient);
  const envService = inject(EnvironmentService);

  return (): Promise<void> => {
    return firstValueFrom(http.get<AppConfig>('/assets/config.json'))
      .then((runtimeConfig) => {
        // Merge build-time and runtime config (runtime takes precedence)
        const mergedConfig = { ...buildTimeConfig, ...runtimeConfig };
        envService.setConfig(mergedConfig);
      })
      .catch((error) => {
        console.warn('Failed to load runtime config, using build-time config:', error);
        envService.setConfig(buildTimeConfig);
      });
  };
}

export function provideRuntimeConfig(buildTimeConfig: Partial<AppConfig> = {}): Provider[] {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: () => loadRuntimeConfig(buildTimeConfig),
      multi: true,
      deps: [],
    },
  ];
}
