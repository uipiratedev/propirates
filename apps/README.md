# Applications

This directory contains all applications in the Propirates monorepo.

## Applications

### 🌐 public-web
**Purpose**: Public-facing marketing and informational website

**Target Audience**: Anonymous users, potential customers

**Key Features**:
- Marketing pages
- Product information
- Public documentation
- User registration/login

**Serve**: `nx serve public-web`
**Build**: `nx build public-web`
**Test**: `nx test public-web`

---

### 🔐 admin-web
**Purpose**: Administrative console for system management

**Target Audience**: System administrators

**Key Features**:
- User management
- System configuration
- Analytics and reporting
- Audit logs

**Required Role**: `admin`

**Serve**: `nx serve admin-web`
**Build**: `nx build admin-web`
**Test**: `nx test admin-web`

---

### 👤 user-ops
**Purpose**: Authenticated user operations and dashboard

**Target Audience**: Authenticated users

**Key Features**:
- User dashboard
- Profile management
- User-specific operations
- Personal settings

**Required Role**: `user` or `admin`

**Serve**: `nx serve user-ops`
**Build**: `nx build user-ops`
**Test**: `nx test user-ops`

---

## Common Commands

### Development
```bash
# Serve all apps concurrently (requires nx-cloud or run-many)
nx run-many --target=serve --projects=public-web,admin-web,user-ops --parallel=3

# Serve specific app
nx serve <app-name>

# Serve with specific configuration
nx serve public-web --configuration=production
```

### Building
```bash
# Build all apps
nx run-many --target=build --all

# Build specific app
nx build <app-name>

# Build for production
nx build <app-name> --configuration=production
```

### Testing
```bash
# Test all apps
nx run-many --target=test --projects=public-web,admin-web,user-ops

# Test specific app
nx test <app-name>

# E2E test
nx e2e <app-name>-e2e
```

### Linting
```bash
# Lint all apps
nx run-many --target=lint --projects=public-web,admin-web,user-ops

# Lint specific app
nx lint <app-name>
```

## App Structure

Each app follows this structure:

```
apps/<app-name>/
├── src/
│   ├── app/
│   │   ├── app.config.ts          # App configuration with providers
│   │   ├── app.routes.ts          # Route definitions with featureTag
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Root template
│   │   └── app.component.css      # Root styles
│   ├── assets/
│   │   ├── config.json            # Runtime configuration
│   │   └── ...                    # Images, fonts, etc.
│   ├── environments/
│   │   ├── environment.ts         # Development environment
│   │   └── environment.prod.ts    # Production environment
│   ├── styles.css                 # Global styles with Tailwind
│   ├── main.ts                    # Bootstrap entry point
│   └── index.html                 # HTML entry point
├── project.json                   # Nx project configuration
├── tsconfig.app.json              # TypeScript config for app
├── tsconfig.spec.json             # TypeScript config for tests
├── jest.config.ts                 # Jest configuration
└── README.md                      # App-specific documentation
```

## Configuration

### Runtime Configuration
Each app loads runtime configuration from `/assets/config.json`:

```json
{
  "apiBaseUrl": "https://api.example.com",
  "loggingEndpoint": "/api/logging",
  "production": true
}
```

This allows changing configuration without rebuilding the app.

### Build-time Configuration
Build-time configuration is provided in `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRuntimeConfig({
      production: false,
      apiBaseUrl: 'http://localhost:3000'
    }),
    // ... other providers
  ],
};
```

## Routing

All routes must include `data.featureTag` for logging and analytics:

```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate: [authGuard],
    data: { featureTag: 'App/Dashboard' }
  },
];
```

## Authentication & Authorization

### Authentication
Use `authGuard` to protect routes requiring authentication:

```typescript
{
  path: 'protected',
  canActivate: [authGuard],
  // ...
}
```

### Authorization
Use `roleGuard` to protect routes requiring specific roles:

```typescript
{
  path: 'admin',
  canActivate: [roleGuard(['admin'])],
  data: { roles: ['admin'] },
  // ...
}
```

## Styling

### Tailwind CSS
All apps use Tailwind CSS configured at the workspace root.

### Theme Tokens
Use CSS variables for theming:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #f59e0b;
  --color-background: #ffffff;
  --color-surface: #f3f4f6;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-success: #10b981;
  --color-info: #3b82f6;
}
```

Use in templates:
```html
<div class="bg-primary text-white">...</div>
```

## Deployment

### Build for Production
```bash
nx build <app-name> --configuration=production
```

Output will be in `dist/apps/<app-name>/`.

### Environment-specific Builds
Configure different environments in `project.json`:

```json
{
  "configurations": {
    "production": { ... },
    "staging": { ... },
    "development": { ... }
  }
}
```

Build with:
```bash
nx build <app-name> --configuration=staging
```

## Troubleshooting

### Port Already in Use
```bash
# Serve on different port
nx serve public-web --port=4201
```

### Clear Cache
```bash
nx reset
```

### Dependency Issues
```bash
npm install
nx reset
```

## Additional Resources

- [Nx Documentation](https://nx.dev)
- [Angular Documentation](https://angular.dev)
- [Contributing Guide](../CONTRIBUTING.md)
- [Main README](../README.md)

