import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">About Propirates</h1>
      <div class="prose">
        <p class="mb-4">
          This is a production-grade Nx monorepo featuring:
        </p>
        <ul class="list-disc pl-6 mb-4">
          <li>Three Angular applications (public-web, admin-web, user-ops)</li>
          <li>Core libraries for auth, logging, API, and config</li>
          <li>Domain-driven design with feature libraries</li>
          <li>Strict TypeScript and module boundaries</li>
          <li>Conventional commits and semantic release</li>
          <li>Comprehensive testing with Jest and Cypress</li>
        </ul>
      </div>
    </div>
  `,
})
export class AboutComponent {}

