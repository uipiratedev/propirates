import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '@propirates/core/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-background">
      <nav class="bg-primary text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Propirates</h1>
            <div class="flex gap-4">
              <a routerLink="/" class="hover:underline">Home</a>
              <a routerLink="/about" class="hover:underline">About</a>
              @if (authService.isAuthenticated()) {
                <a routerLink="/dashboard" class="hover:underline">Dashboard</a>
                @if (authService.hasRole('admin')) {
                  <a routerLink="/admin" class="hover:underline">Admin</a>
                }
                <button (click)="logout()" class="hover:underline">Logout</button>
              } @else {
                <a routerLink="/login" class="hover:underline">Login</a>
              }
            </div>
          </div>
        </div>
      </nav>
      <main class="container mx-auto px-4 py-8">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}

