import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold text-primary mb-4">Welcome to Pro pirates</h1>
      <p class="text-xl text-gray-600 mb-8">A production-grade Nx monorepo with Angular</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">🔐 Authentication</h3>
          <p class="text-gray-600">JWT-based auth with role-based access control</p>
        </div>
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">📊 Logging</h3>
          <p class="text-gray-600">Comprehensive logging with HTTP interceptors</p>
        </div>
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">⚙️ Configuration</h3>
          <p class="text-gray-600">Runtime config loading without rebuilds</p>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
