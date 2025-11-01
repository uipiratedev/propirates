import { Component } from '@angular/core';
import { AuthService } from '@propirates/core/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      <div class="bg-surface p-6 rounded-lg shadow mb-6">
        <h2 class="text-xl font-semibold mb-4">User Information</h2>
        @if (authService.currentUser(); as user) {
        <div class="space-y-2">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Roles:</strong> {{ user.roles.join(', ') }}</p>
        </div>
        }
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Quick Stats</h3>
          <p class="text-gray-600">Your dashboard statistics will appear here.</p>
        </div>
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Recent Activity</h3>
          <p class="text-gray-600">Your recent activity will appear here.</p>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  constructor(public authService: AuthService) {}
}
