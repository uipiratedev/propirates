import { Injectable, signal } from '@angular/core';
import { AppConfig } from '../models/app-config.model';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly configSignal = signal<AppConfig>({
    apiBaseUrl: '',
    loggingEndpoint: '/api/logging',
    production: false,
  });

  readonly config = this.configSignal.asReadonly();

  setConfig(config: Partial<AppConfig>): void {
    this.configSignal.update((current) => ({ ...current, ...config }));
  }

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config()[key];
  }
}

