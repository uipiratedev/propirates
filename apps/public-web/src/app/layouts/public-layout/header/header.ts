import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@propirates/core/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  currentYear = new Date().getFullYear();
  isrouteApplyNow = false;
  authService = inject(AuthService);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isrouteApplyNow = event.urlAfterRedirects === '/apply-now';
      }
    });
  }

  /**
   * Get user initials from name for avatar display
   */
  getUserInitials(): string {
    const user = this.authService.currentUser();
    if (!user || !user.name) return '';

    const names = user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  }
}
