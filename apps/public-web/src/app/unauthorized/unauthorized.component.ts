import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-2xl mx-auto text-center">
      <div class="bg-error text-white p-8 rounded-lg shadow-lg">
        <h1 class="text-4xl font-bold mb-4">🚫 Unauthorized</h1>
        <p class="text-xl mb-6">
          You don't have permission to access this page.
        </p>
        <p class="mb-6">
          Please contact your administrator if you believe this is an error.
        </p>
        <a
          routerLink="/"
          class="inline-block bg-white text-error px-6 py-3 rounded font-semibold hover:bg-gray-100"
        >
          Go to Home
        </a>
      </div>
    </div>
  `,
})
export class UnauthorizedComponent {}

