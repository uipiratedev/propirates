export interface AppConfig {
  apiBaseUrl: string;
  loggingEndpoint: string;
  production: boolean;
  [key: string]: any;
}

