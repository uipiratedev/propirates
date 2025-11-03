import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@propirates/core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>

        <form (ngSubmit)="login()">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Role</label>
            <select
              [(ngModel)]="role"
              name="role"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          @if (error()) {
          <div class="mb-4 p-3 bg-red-500 text-white rounded">
            {{ error() }}
          </div>
          }

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div class="mt-6 p-4 bg-blue-50 rounded text-sm text-gray-700 text-center">
          <p class="font-semibold">Demo Login:</p>
          <p>This creates a mock JWT token for testing.</p>
          <p>Select a role to test RBAC.</p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = 'demo@example.com';
  password = 'password';
  role: 'admin' | 'user' | 'viewer' = 'user';
  error = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const mockToken = this.createMockToken(this.email, this.role);
    this.authService.login(mockToken);
    this.router.navigate(['/dashboard']);
  }

  private createMockToken(email: string, role: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: '123',
        email: email,
        name: 'Demo User',
        roles: [role],
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      })
    );
    const signature = 'mock-signature';
    return `${header}.${payload}.${signature}`;
  }
}
