import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { LogService } from '../services/log.service';

let correlationIdCounter = 0;

function generateCorrelationId(): string {
  return `${Date.now()}-${++correlationIdCounter}`;
}

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const logService = inject(LogService);
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  // Clone request with correlation ID header
  const clonedReq = req.clone({
    headers: req.headers.set('X-Correlation-ID', correlationId),
  });

  logService.debug(`HTTP Request: ${req.method} ${req.url}`, {
    correlationId,
    method: req.method,
    url: req.url,
  });

  return next(clonedReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const duration = Date.now() - startTime;
        logService.info(`HTTP Response: ${req.method} ${req.url}`, {
          correlationId,
          method: req.method,
          url: req.url,
          status: event.status,
          duration,
        });
      }
    }),
    catchError((error) => {
      const duration = Date.now() - startTime;
      logService.error(`HTTP Error: ${req.method} ${req.url}`, {
        correlationId,
        method: req.method,
        url: req.url,
        status: error.status,
        duration,
        error: error.message,
      });
      return throwError(() => error);
    })
  );
};

