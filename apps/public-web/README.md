# Public Web Application

## Overview
The public-facing marketing and informational website for Propirates.

## Target Audience
- Anonymous users
- Potential customers
- Users seeking information

## Features
- ✅ Marketing pages (Home, About)
- ✅ User authentication (Login)
- ✅ Protected dashboard (requires authentication)
- ✅ Admin panel (requires admin role)
- ✅ Runtime configuration loading
- ✅ Comprehensive logging with featureTag
- ✅ Role-based access control

## Development

### Serve
```bash
nx serve public-web
# or
npm start
```

The app will be available at `http://localhost:4200`

### Build
```bash
# Development build
nx build public-web

# Production build
nx build public-web --configuration=production
```

### Test
```bash
# Unit tests
nx test public-web

# E2E tests
nx e2e public-web-e2e

# Test with coverage
nx test public-web --code-coverage
```

### Lint
```bash
nx lint public-web
```

## Routes

All routes include `data.featureTag` for logging and analytics:

| Path | Component | Guard | Feature Tag | Description |
|------|-----------|-------|-------------|-------------|
| `/` | HomeComponent | - | `Public/Home` | Landing page |
| `/about` | AboutComponent | - | `Public/About` | About page |
| `/login` | LoginComponent | - | `Public/Login` | Login page |
| `/dashboard` | DashboardComponent | authGuard | `Public/Dashboard` | User dashboard |
| `/admin` | AdminComponent | roleGuard(['admin']) | `Public/Admin` | Admin panel |
| `/unauthorized` | UnauthorizedComponent | - | `Public/Unauthorized` | Unauthorized access |

## Authentication

### Demo Login
The login page creates mock JWT tokens for testing:

1. Navigate to `/login`
2. Select a role (user, admin, or viewer)
3. Click "Login"

This will create a mock JWT token and redirect to the dashboard.

### Testing RBAC
- Login as **user**: Can access dashboard, cannot access admin panel
- Login as **admin**: Can access both dashboard and admin panel
- Login as **viewer**: Can access dashboard, cannot access admin panel

## Configuration

### Runtime Configuration
Edit `src/assets/config.json` to change configuration without rebuilding:

```json
{
  "apiBaseUrl": "http://localhost:3000/api",
  "loggingEndpoint": "/api/logging",
  "production": false
}
```

### Build-time Configuration
Edit `src/app/app.config.ts` to change build-time defaults:

```typescript
provideRuntimeConfig({
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  loggingEndpoint: '/api/logging',
})
```

## Logging

### Console Logging (Development)
In development mode, all logs appear in the browser console:

```
[2025-11-01T...] INFO: Navigation { url: '/dashboard', featureTag: 'Public/Dashboard' }
[2025-11-01T...] DEBUG: HTTP Request: GET /api/users { correlationId: '...' }
[2025-11-01T...] INFO: HTTP Response: GET /api/users { status: 200, duration: 123 }
```

### Batch Logging (Production)
In production mode, logs are batched and sent to the logging endpoint every 5 seconds.

## Styling

### Tailwind CSS
This app uses Tailwind CSS with custom theme tokens:

```html
<div class="bg-primary text-white">Primary colored background</div>
<div class="bg-surface p-4 rounded shadow">Card with surface color</div>
```

### Theme Tokens
Available CSS variables:
- `--color-primary`: Primary brand color
- `--color-secondary`: Secondary brand color
- `--color-accent`: Accent color
- `--color-background`: Page background
- `--color-surface`: Card/surface background
- `--color-error`: Error state
- `--color-warning`: Warning state
- `--color-success`: Success state
- `--color-info`: Info state

## Dependencies

### Core Libraries
- `@propirates/core/auth` - Authentication and RBAC
- `@propirates/core/logging` - Logging system
- `@propirates/core/api` - Base API service
- `@propirates/core/config` - Runtime configuration

### Shared Libraries
- (To be added as needed)

### Domain Libraries
- (To be added as needed)

## Project Structure

```
apps/public-web/
├── src/
│   ├── app/
│   │   ├── home/              # Home page
│   │   ├── about/             # About page
│   │   ├── login/             # Login page
│   │   ├── dashboard/         # Dashboard (auth required)
│   │   ├── admin/             # Admin panel (admin role required)
│   │   ├── unauthorized/      # Unauthorized access page
│   │   ├── app.component.ts   # Root component with navigation
│   │   ├── app.config.ts      # App configuration
│   │   └── app.routes.ts      # Route definitions
│   ├── assets/
│   │   └── config.json        # Runtime configuration
│   ├── styles.css             # Global styles with Tailwind
│   ├── main.ts                # Bootstrap entry point
│   └── index.html             # HTML entry point
├── project.json               # Nx project configuration
├── tsconfig.app.json          # TypeScript config for app
├── tsconfig.spec.json         # TypeScript config for tests
├── jest.config.ts             # Jest configuration
└── README.md                  # This file
```

## Troubleshooting

### Port Already in Use
```bash
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

## Next Steps

1. Add more feature pages
2. Integrate with backend API
3. Add domain feature libraries
4. Implement real authentication
5. Add comprehensive e2e tests

## Related Documentation

- [Main README](../../README.md)
- [Contributing Guide](../../CONTRIBUTING.md)
- [Apps Overview](../README.md)
- [Upgrade Output](../../UPGRADE_OUTPUT.md)

