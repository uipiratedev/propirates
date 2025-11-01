# Implementation Guide - Complete the Nx Monorepo Upgrade

## Current Status ✅

### Completed
- ✅ Nx workspace configuration (`nx.json`)
- ✅ ESLint with module boundary enforcement
- ✅ Jest testing setup
- ✅ Tailwind CSS configuration
- ✅ Commit tooling (commitlint, husky, lint-staged, semantic-release)
- ✅ Core libraries:
  - `libs/core/auth` - Full implementation with tests
  - `libs/core/logging` - Full implementation
  - `libs/core/api` - Full implementation
  - `libs/core/config` - Full implementation
- ✅ `apps/public-web` - Complete with all routes and components
- ✅ GitHub Actions CI/CD workflow
- ✅ Comprehensive documentation

### Remaining Work
- ⏳ Install remaining npm dependencies
- ⏳ Create `apps/admin-web`
- ⏳ Create `apps/user-ops`
- ⏳ Create shared libraries (`libs/shared/ui`, `libs/shared/utils`)
- ⏳ Create domain libraries (users, reports, settings)
- ⏳ Create Cypress e2e tests
- ⏳ Update main README.md

---

## Step-by-Step Implementation

### Step 1: Complete Dependency Installation

```bash
# Check if dependencies are still installing
# If the previous npm install failed or is incomplete, run:
npm install --legacy-peer-deps

# Initialize Husky
npx husky install

# Make husky hooks executable (Linux/Mac)
chmod +x .husky/commit-msg
chmod +x .husky/pre-commit

# On Windows, the hooks should work as-is
```

**Verification:**
```bash
# Check that Nx is installed
npx nx --version

# Should show version 22.x.x
```

---

### Step 2: Create admin-web Application

```bash
# Generate admin-web app
npx nx g @nx/angular:application admin-web \
  --directory=apps/admin-web \
  --routing=true \
  --standalone=true \
  --style=css \
  --tags=scope:admin,type:app \
  --no-interactive

# Or manually copy the public-web structure and modify
```

**Manual Creation (Recommended for consistency):**

1. Copy `apps/public-web` to `apps/admin-web`
2. Update `apps/admin-web/project.json`:
   - Change `name` to `"admin-web"`
   - Change `tags` to `["scope:admin", "type:app"]`
   - Update all paths from `public-web` to `admin-web`
3. Update `apps/admin-web/src/index.html`:
   - Change title to "Propirates - Admin Console"
4. Update `apps/admin-web/src/app/app.component.ts`:
   - Change navigation to admin-specific routes
5. Update `apps/admin-web/src/app/app.routes.ts`:
   - Add admin-specific routes with `featureTag: 'Admin/...'`
6. Update `apps/admin-web/README.md` with admin-specific documentation

---

### Step 3: Create user-ops Application

```bash
# Generate user-ops app
npx nx g @nx/angular:application user-ops \
  --directory=apps/user-ops \
  --routing=true \
  --standalone=true \
  --style=css \
  --tags=scope:user-ops,type:app \
  --no-interactive

# Or manually copy and modify
```

**Manual Creation (Recommended):**

1. Copy `apps/public-web` to `apps/user-ops`
2. Update `apps/user-ops/project.json`:
   - Change `name` to `"user-ops"`
   - Change `tags` to `["scope:user-ops", "type:app"]`
   - Update all paths from `public-web` to `user-ops`
3. Update `apps/user-ops/src/index.html`:
   - Change title to "Propirates - User Operations"
4. Update `apps/user-ops/src/app/app.component.ts`:
   - Change navigation to user-ops-specific routes
5. Update `apps/user-ops/src/app/app.routes.ts`:
   - Add user-ops-specific routes with `featureTag: 'UserOps/...'`
6. Update `apps/user-ops/README.md` with user-ops-specific documentation

---

### Step 4: Create Shared Libraries

#### Create shared/ui library

```bash
npx nx g @nx/angular:library ui \
  --directory=libs/shared/ui \
  --standalone=true \
  --tags=scope:shared,type:ui \
  --no-interactive
```

**Add to `tsconfig.base.json` paths:**
```json
"@propirates/shared/ui": ["libs/shared/ui/src/index.ts"]
```

**Create example components:**
- `libs/shared/ui/src/lib/button/button.component.ts`
- `libs/shared/ui/src/lib/card/card.component.ts`
- `libs/shared/ui/src/lib/modal/modal.component.ts`

#### Create shared/utils library

```bash
npx nx g @nx/angular:library utils \
  --directory=libs/shared/utils \
  --standalone=true \
  --tags=scope:shared,type:utils \
  --no-interactive
```

**Add to `tsconfig.base.json` paths:**
```json
"@propirates/shared/utils": ["libs/shared/utils/src/index.ts"]
```

**Create example utilities:**
- `libs/shared/utils/src/lib/date-utils.ts`
- `libs/shared/utils/src/lib/string-utils.ts`
- `libs/shared/utils/src/lib/validators.ts`

---

### Step 5: Create Domain Libraries

For each domain (users, reports, settings), create three libraries:

#### Example: Users Domain

```bash
# Data-access library
npx nx g @nx/angular:library data-access \
  --directory=libs/domains/users/data-access \
  --standalone=true \
  --tags=scope:shared,type:data-access,domain:users \
  --no-interactive

# Feature library
npx nx g @nx/angular:library feature \
  --directory=libs/domains/users/feature \
  --standalone=true \
  --tags=scope:shared,type:feature,domain:users \
  --no-interactive

# UI library
npx nx g @nx/angular:library ui \
  --directory=libs/domains/users/ui \
  --standalone=true \
  --tags=scope:shared,type:ui,domain:users \
  --no-interactive
```

**Add to `tsconfig.base.json` paths:**
```json
"@propirates/domains/users/data-access": ["libs/domains/users/data-access/src/index.ts"],
"@propirates/domains/users/feature": ["libs/domains/users/feature/src/index.ts"],
"@propirates/domains/users/ui": ["libs/domains/users/ui/src/index.ts"]
```

**Repeat for reports and settings domains.**

#### Implementation Pattern

**data-access** - Create API service:
```typescript
// libs/domains/users/data-access/src/lib/services/users-api.service.ts
import { Injectable } from '@angular/core';
import { BaseApiService } from '@propirates/core/api';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersApiService extends BaseApiService {
  getUsers(): Observable<User[]> {
    return this.get<User[]>('/users');
  }

  getUser(id: string): Observable<User> {
    return this.get<User>(`/users/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.post<User>('/users', user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.put<User>(`/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.delete<void>(`/users/${id}`);
  }
}
```

**feature** - Create smart components and routes:
```typescript
// libs/domains/users/feature/src/lib/users-list/users-list.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersApiService, User } from '@propirates/domains/users/data-access';

@Component({
  selector: 'lib-users-list',
  standalone: true,
  template: `
    <div>
      <h2>Users</h2>
      @for (user of users(); track user.id) {
        <div>{{ user.name }} - {{ user.email }}</div>
      }
    </div>
  `,
})
export class UsersListComponent implements OnInit {
  private usersApi = inject(UsersApiService);
  users = signal<User[]>([]);

  ngOnInit() {
    this.usersApi.getUsers().subscribe(users => this.users.set(users));
  }
}
```

**ui** - Create presentational components:
```typescript
// libs/domains/users/ui/src/lib/user-card/user-card.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-user-card',
  standalone: true,
  template: `
    <div class="bg-surface p-4 rounded shadow">
      <h3>{{ name() }}</h3>
      <p>{{ email() }}</p>
    </div>
  `,
})
export class UserCardComponent {
  name = input.required<string>();
  email = input.required<string>();
}
```

---

### Step 6: Create Cypress E2E Tests

For each app, create a Cypress e2e project:

```bash
# Generate e2e project for public-web
npx nx g @nx/angular:cypress-e2e-configuration \
  --project=public-web \
  --no-interactive
```

**Example test:**
```typescript
// apps/public-web-e2e/src/e2e/app.cy.ts
describe('public-web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.contains('Welcome to Propirates');
  });

  it('should navigate to about page', () => {
    cy.contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('About Propirates');
  });

  it('should require authentication for dashboard', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('should login and access dashboard', () => {
    cy.visit('/login');
    cy.get('select[name="role"]').select('user');
    cy.contains('Login').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard');
  });

  it('should block non-admin from admin page', () => {
    cy.visit('/login');
    cy.get('select[name="role"]').select('user');
    cy.contains('Login').click();
    cy.visit('/admin');
    cy.url().should('include', '/unauthorized');
  });

  it('should allow admin to access admin page', () => {
    cy.visit('/login');
    cy.get('select[name="role"]').select('admin');
    cy.contains('Login').click();
    cy.visit('/admin');
    cy.contains('Admin Panel');
  });
});
```

---

### Step 7: Update Main README

Update the root `README.md` with:

```markdown
# Propirates - Production-Grade Nx Monorepo

## Overview
A production-grade Nx monorepo featuring three Angular applications with comprehensive authentication, logging, and configuration management.

## Applications
- **public-web**: Public marketing site
- **admin-web**: Admin console (requires admin role)
- **user-ops**: User operations dashboard (requires user role)

## Quick Start

### Installation
\`\`\`bash
npm install
npx husky install
\`\`\`

### Development
\`\`\`bash
# Serve public-web
npm start

# Serve admin-web
npm run start:admin

# Serve user-ops
npm run start:user-ops
\`\`\`

### Testing
\`\`\`bash
# Run all tests
npm run test:all

# Run affected tests
npm run test:affected
\`\`\`

### Building
\`\`\`bash
# Build all apps
npm run build:all

# Build affected apps
npm run build:affected
\`\`\`

## Documentation
- [Contributing Guide](./CONTRIBUTING.md)
- [Upgrade Output](./UPGRADE_OUTPUT.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [Apps Overview](./apps/README.md)

## Architecture
- **Nx Monorepo**: Efficient build caching and task orchestration
- **Angular 20**: Latest standalone APIs, signals, new control flow
- **Strict TypeScript**: Full type safety
- **Module Boundaries**: Enforced via ESLint
- **Conventional Commits**: Automated versioning and changelog
- **CI/CD**: GitHub Actions with nx affected

## License
MIT
\`\`\`

---

### Step 8: Verification & Testing

#### 1. Verify Nx Graph
```bash
nx graph
```
This should open a browser showing the dependency graph.

#### 2. Test Builds
```bash
# Build public-web
nx build public-web

# Should complete without errors
```

#### 3. Test Linting
```bash
# Lint all projects
nx run-many --target=lint --all

# Should pass with no errors
```

#### 4. Test Unit Tests
```bash
# Run core-auth tests
nx test core-auth

# Should pass all tests
```

#### 5. Test Affected Commands
```bash
# Make a change to core/auth
# Then run:
nx affected:test

# Should only run tests for core-auth and dependent projects
```

#### 6. Test Commit Hooks
```bash
# Try an invalid commit
git add .
git commit -m "invalid commit"

# Should be rejected by commitlint
```

#### 7. Serve and Test Apps
```bash
# Serve public-web
nx serve public-web

# Open http://localhost:4200
# Test:
# - Navigate to different pages
# - Check console for navigation logs
# - Login with different roles
# - Test RBAC (admin vs user access)
```

---

## Acceptance Criteria Checklist

- [ ] All three apps build successfully
- [ ] All three apps serve independently
- [ ] Navigation logs show `{ url, featureTag }` in console
- [ ] Unauthorized roles are blocked by guards
- [ ] Changing `/assets/config.json` updates API base URL without rebuild
- [ ] Conventional commits are enforced
- [ ] Pre-commit hooks run lint/format
- [ ] `nx affected` works correctly
- [ ] Example unit tests exist and pass
- [ ] Example e2e tests exist and pass
- [ ] Module boundaries are enforced
- [ ] Dependency graph is correct

---

## Troubleshooting

### Issue: npm install fails with peer dependency conflicts
**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue: Husky hooks not executing
**Solution (Linux/Mac):**
```bash
chmod +x .husky/commit-msg
chmod +x .husky/pre-commit
```

**Solution (Windows):**
Hooks should work automatically. If not, check Git configuration:
```bash
git config core.hooksPath .husky
```

### Issue: Nx commands not found
**Solution:**
```bash
npm install
# Or use npx
npx nx <command>
```

### Issue: Module not found errors
**Solution:**
```bash
# Clear Nx cache
nx reset

# Reinstall dependencies
npm install
```

### Issue: ESLint module boundary errors
**Solution:**
Check that:
1. Library tags are correct in `project.json`
2. Import paths match `tsconfig.base.json`
3. Dependency constraints in `.eslintrc.json` are correct

---

## Next Steps After Completion

1. **Integrate with Backend API**
   - Replace mock JWT tokens with real authentication
   - Connect to actual API endpoints

2. **Add More Features**
   - Implement domain features (users, reports, settings)
   - Add more shared UI components

3. **Enhance Testing**
   - Increase test coverage
   - Add more e2e scenarios
   - Add visual regression testing

4. **Setup Deployment**
   - Configure deployment pipelines
   - Setup staging and production environments
   - Configure CDN and hosting

5. **Add Monitoring**
   - Integrate error tracking (e.g., Sentry)
   - Add analytics
   - Setup performance monitoring

---

## Support

For questions or issues:
1. Check existing documentation
2. Review similar implementations in the codebase
3. Consult the team
4. Create an issue in the repository

---

**Estimated Time to Complete**: 2-4 hours

**Priority Order**:
1. Complete dependency installation (15 min)
2. Create admin-web and user-ops apps (1 hour)
3. Create shared libraries (30 min)
4. Create domain libraries (1 hour)
5. Create e2e tests (30 min)
6. Update README and verify (30 min)

