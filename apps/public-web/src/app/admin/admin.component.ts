import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Admin Panel</h1>
      <div class="bg-warning text-white p-4 rounded-lg mb-6">
        <p class="font-semibold">⚠️ Admin Access Only</p>
        <p>This page is only accessible to users with the 'admin' role.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">User Management</h3>
          <p class="text-gray-600">Manage system users</p>
        </div>
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">System Config</h3>
          <p class="text-gray-600">Configure system settings</p>
        </div>
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2">Analytics</h3>
          <p class="text-gray-600">View system analytics</p>
        </div>
      </div>
    </div>
  `,
})
export class AdminComponent {}

