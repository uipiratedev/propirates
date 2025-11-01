export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  correlationId?: string;
  context?: Record<string, any>;
}

export interface HttpLogEntry extends LogEntry {
  method: string;
  url: string;
  status?: number;
  duration?: number;
  error?: string;
}

export interface RouterLogEntry extends LogEntry {
  url: string;
  featureTag?: string;
}

