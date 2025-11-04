# Propirates Developer Guide

**Last Updated:** 2025-11-04  
**Version:** 1.0.0

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Organization](#code-organization)
6. [Common Development Tasks](#common-development-tasks)
7. [Testing](#testing)
8. [Build & Deployment](#build--deployment)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)

---

## 🎯 Project Overview

### What is Propirates?

Propirates is a modern web application built with Angular 20 and organized as an Nx monorepo. The project uses standalone components, signals for reactive state management, and Tailwind CSS for styling.

### Technology Stack

- **Framework:** Angular 20 (standalone components)
- **Build Tool:** Nx 22.x (monorepo management)
- **Styling:** Tailwind CSS v3.4
- **Testing:** Jest (unit tests), Cypress (e2e)
- **Language:** TypeScript (strict mode)
- **Package Manager:** npm
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel (configured)

### Key Features

- ✅ Monorepo architecture with Nx
- ✅ Role-based access control (RBAC)
- ✅ Centralized logging system
- ✅ HTTP interceptors for auth and error handling
- ✅ Runtime configuration management
- ✅ Lazy-loaded routes
- ✅ Responsive design with Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** 20.x or higher
- **npm:** 10.x or higher
- **Git:** Latest version

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd propirates

# Install dependencies
npm install

# Initialize git hooks (for commit linting)
npx husky install
```

### Running the Application

```bash
# Start development server
npm start

# App will be available at http://localhost:4200/
```

### Essential Commands

```bash
# Development
npm start                    # Start dev server
npm run build               # Production build
npm run build:dev           # Development build
npm test                    # Run all tests
npm run lint                # Lint code

# Nx-specific commands
npx nx serve public-web     # Serve specific app
npx nx build public-web     # Build specific app
npx nx test core-auth       # Test specific library
npx nx affected --target=build  # Build only affected projects
```

### Build Output

Production builds are output to:
```
dist/apps/public-web/browser/
```

---

## 📁 Project Structure

### Monorepo Organization

```
propirates/
├── apps/                    # Applications
│   └── public-web/         # Public-facing web app
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/           # App-specific core services
│       │   │   ├── shared/         # App-specific shared components
│       │   │   ├── layouts/        # Layout components
│       │   │   ├── pages/          # Page components
│       │   │   │   ├── public/     # Public pages (no auth)
│       │   │   │   ├── app/        # Protected pages (auth required)
│       │   │   │   └── auth/       # Auth pages (login, etc.)
│       │   │   ├── app.component.ts
│       │   │   └── app.routes.ts
│       │   ├── assets/
│       │   ├── styles.css          # Global styles + Tailwind
│       │   └── main.ts
│       └── project.json
│
├── libs/                    # Shared libraries
│   ├── core/               # Monorepo-wide core libraries
│   │   ├── auth/          # Authentication & RBAC
│   │   ├── api/           # HTTP client services
│   │   ├── config/        # Configuration management
│   │   └── logging/       # Logging system
│   │
│   ├── shared/            # Shared UI and utilities (future)
│   │   ├── ui/           # Shared UI components
│   │   └── utils/        # Shared utility functions
│   │
│   └── domains/          # Domain-specific features (future)
│       ├── users/        # User management domain
│       ├── reports/      # Reports domain
│       └── settings/     # Settings domain
│
├── .github/
│   └── workflows/
│       └── ci.yml         # CI/CD pipeline
│
├── .husky/                # Git hooks
├── dist/                  # Build output
├── node_modules/
│
├── angular.json           # Angular workspace config
├── nx.json               # Nx workspace config
├── tsconfig.base.json    # Base TypeScript config with path mappings
├── tsconfig.json         # Root TypeScript config
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── .eslintrc.json        # ESLint configuration
├── jest.config.ts        # Jest configuration
├── commitlint.config.js  # Commit message linting
├── vercel.json           # Vercel deployment config
│
├── DEVELOPER_GUIDE.md    # This file
├── README.md             # Project README
├── CONTRIBUTING.md       # Contribution guidelines
└── QUICK_REFERENCE.md    # Quick reference card
```

---

## 🏗️ Code Organization

### Three-Tier Architecture

The project follows a three-tier architecture for organizing code:

#### **Tier 1: `libs/core/` - Monorepo-Wide Libraries**

**When to use:**
- Code used by **multiple apps** in the monorepo
- Core business logic shared across apps
- Infrastructure services (auth, logging, API)

**Current libraries:**
- `@propirates/core/auth` - Authentication & authorization
- `@propirates/core/api` - HTTP client and interceptors
- `@propirates/core/config` - Runtime configuration
- `@propirates/core/logging` - Logging system

**Import example:**
```typescript
import { AuthService } from '@propirates/core/auth';
import { LogService } from '@propirates/core/logging';
import { BaseApiService } from '@propirates/core/api';
```

#### **Tier 2: `apps/public-web/src/app/core/` - App-Specific Core**

**When to use:**
- Services specific to **this app only**
- App-level state management
- App-specific API wrappers

**Examples:**
- SEO service (only used by public-web)
- Analytics service (only used by public-web)
- App-specific state management

**Import example:**
```typescript
import { SeoService } from '../../core/services/seo.service';
```

#### **Tier 3: `apps/public-web/src/app/shared/` - App-Specific Shared Code**

**When to use:**
- Reusable UI components (buttons, cards, modals)
- Custom directives (tooltips, highlights)
- Custom pipes (date formatting, currency)
- Utility functions specific to this app

**Structure:**
```
apps/public-web/src/app/shared/
├── components/    # Reusable UI components
├── directives/    # Custom directives
├── pipes/         # Custom pipes
└── utils/         # Utility functions
```

**Import example:**
```typescript
import { ButtonComponent } from '../../../shared/components/button/button.component';
```

### Decision Tree: Where Should My Code Go?

```
Is it used by multiple apps?
├─ YES → libs/core/
└─ NO → Is it a service?
    ├─ YES → apps/[app]/src/app/core/
    └─ NO → apps/[app]/src/app/shared/
```

---

## 💻 Development Workflow

### Creating a New Page Component

1. **Create the component directory:**
```bash
mkdir -p apps/public-web/src/app/pages/public/my-page
```

2. **Create component files:**
```typescript
// my-page.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold">My Page</h1>
    </div>
  `,
})
export class MyPageComponent {}
```

3. **Add route:**
```typescript
// apps/public-web/src/app/app.routes.ts
{
  path: 'my-page',
  loadComponent: () => import('./pages/public/my-page/my-page.component')
    .then(m => m.MyPageComponent),
  data: { featureTag: 'Public/MyPage' }
}
```

### Creating a Backend Integration Service

**For app-specific API calls:**

1. **Create service in app core:**
```bash
# Create directory
mkdir -p apps/public-web/src/app/core/services
```

2. **Create the service:**
```typescript
// apps/public-web/src/app/core/services/user-api.service.ts
import { Injectable, inject } from '@angular/core';
import { BaseApiService } from '@propirates/core/api';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private api = inject(BaseApiService);

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>('/users');
  }

  getUserById(id: string): Observable<User> {
    return this.api.get<User>(`/users/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.api.post<User>('/users', user);
  }
}
```

3. **Use in component:**
```typescript
import { UserApiService } from '../../core/services/user-api.service';

export class MyComponent {
  private userApi = inject(UserApiService);

  loadUsers() {
    this.userApi.getUsers().subscribe(users => {
      console.log(users);
    });
  }
}
```

**For monorepo-wide API services:**

Create in `libs/core/api/` or create a new domain library in `libs/domains/`.

### Creating Utility Functions

**For app-specific utilities:**

```typescript
// apps/public-web/src/app/shared/utils/date-helpers.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}
```

**Usage:**
```typescript
import { formatDate } from '../../../shared/utils/date-helpers';

const formatted = formatDate(new Date());
```

### Creating Reusable Components

```bash
# Create component directory
mkdir -p apps/public-web/src/app/shared/components/button
```

```typescript
// button.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [class]="'px-4 py-2 rounded ' + variant + ' ' + customClass"
      [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() customClass = '';
}
```

**Usage:**
```html
<app-button variant="primary">Click Me</app-button>
```

---

## 🎯 Common Development Tasks

### Adding Authentication to a Route

```typescript
import { authGuard, roleGuard } from '@propirates/core/auth';

// Require login
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/app/dashboard/dashboard.component')
}

// Require specific role
{
  path: 'admin',
  canActivate: [roleGuard(['admin'])],
  loadComponent: () => import('./pages/app/admin/admin.component')
}
```

### Using the Auth Service

```typescript
import { AuthService } from '@propirates/core/auth';

export class MyComponent {
  authService = inject(AuthService);

  // Check if logged in
  isLoggedIn = this.authService.isAuthenticated();

  // Get current user
  currentUser = this.authService.currentUser();

  // Check role
  isAdmin = this.authService.hasRole('admin');

  // Login
  login(token: string) {
    this.authService.login(token);
  }

  // Logout
  logout() {
    this.authService.logout();
  }
}
```

### Working with Tailwind CSS

```html
<!-- Responsive layout -->
<div class="container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="bg-white p-6 rounded-lg shadow">
      Card content
    </div>
  </div>
</div>

<!-- Custom colors (defined in styles.css) -->
<button class="bg-primary text-white hover:bg-primary-dark">
  Primary Button
</button>
```

### Logging

```typescript
import { LogService } from '@propirates/core/logging';

export class MyComponent {
  private log = inject(LogService);

  someMethod() {
    this.log.info('User action', { userId: '123' });
    this.log.error('Error occurred', { error: 'details' });
    this.log.warn('Warning message');
  }
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests for specific project
npx nx test core-auth

# Run tests with coverage
npx nx test core-auth --code-coverage

# Run affected tests only
npx nx affected --target=test
```

### Writing Unit Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected value', () => {
    const result = service.myMethod();
    expect(result).toBe('expected');
  });
});
```

---

## 🚀 Build & Deployment

### Building for Production

```bash
# Build production bundle
npm run build

# Output location
dist/apps/public-web/browser/
```

### Deployment to Vercel

```bash
# Deploy to production
vercel --prod

# Or push to GitHub and auto-deploy via Vercel integration
```

### Deployment to Other Platforms

**Netlify:**
```bash
netlify deploy --prod --dir=dist/apps/public-web/browser
```

**Firebase:**
```bash
firebase deploy
```

### Environment Configuration

Runtime configuration is managed via `apps/public-web/src/assets/config.json`:

```json
{
  "apiUrl": "https://api.example.com",
  "environment": "production",
  "features": {
    "enableAnalytics": true
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
npx kill-port 4200
```

**Clear Nx cache:**
```bash
npx nx reset
```

**Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tailwind CSS not working:**
1. Verify `postcss.config.js` exists
2. Check `@tailwind` directives in `apps/public-web/src/styles.css`
3. Restart dev server

**TypeScript path resolution issues:**
1. Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Verify `tsconfig.base.json` has correct path mappings
3. Check that app's `tsconfig.json` extends `tsconfig.base.json`

---

## 🤝 Contributing

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

Examples:
feat(core-auth): add role-based access control
fix(public-web): resolve navigation issue
docs(readme): update installation instructions
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Commit with conventional commits
6. Push and create PR
7. Wait for CI checks to pass
8. Request review

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📚 Additional Resources

- **Quick Reference:** See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for command cheat sheet
- **Contributing Guide:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
- **Nx Documentation:** https://nx.dev
- **Angular Documentation:** https://angular.dev
- **Tailwind CSS:** https://tailwindcss.com

---

**Happy coding! 🎉**

