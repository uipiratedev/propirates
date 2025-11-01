import { Provider, inject, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LogService } from '../services/log.service';

export function provideRouterEventLogger(): Provider[] {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const router = inject(Router);
        const logService = inject(LogService);

        router.events
          .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
          .subscribe((event) => {
            // Get the deepest activated route
            let route = router.routerState.root;
            while (route.firstChild) {
              route = route.firstChild;
            }

            const featureTag = route.snapshot.data['featureTag'];
            
            logService.info('Navigation', {
              url: event.urlAfterRedirects,
              featureTag: featureTag || 'unknown',
            });
          });
      },
    },
  ];
}

