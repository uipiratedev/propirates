import { Injectable, inject, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogEntry, LogLevel } from '../models/log-entry.model';
import { catchError, of, Subject, bufferTime, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly http = inject(HttpClient);
  private readonly logBuffer$ = new Subject<LogEntry>();
  private loggingEndpoint = '/api/logging';

  constructor() {
    this.setupBatchLogging();
  }

  setLoggingEndpoint(endpoint: string): void {
    this.loggingEndpoint = endpoint;
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.log('error', message, context);
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    // Always log to console in dev mode
    if (isDevMode()) {
      this.logToConsole(entry);
    }

    // Buffer for batch sending in production
    if (!isDevMode()) {
      this.logBuffer$.next(entry);
    }
  }

  private logToConsole(entry: LogEntry): void {
    const logFn = console[entry.level] || console.log;
    logFn(`[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`, entry.context || '');
  }

  private setupBatchLogging(): void {
    this.logBuffer$
      .pipe(
        bufferTime(5000), // Batch every 5 seconds
        filter((logs) => logs.length > 0)
      )
      .subscribe((logs) => {
        this.sendLogsToServer(logs);
      });
  }

  private sendLogsToServer(logs: LogEntry[]): void {
    this.http
      .post(this.loggingEndpoint, { logs })
      .pipe(
        catchError((error) => {
          console.error('Failed to send logs to server:', error);
          return of(null);
        })
      )
      .subscribe();
  }
}

