# Contributing Guide

## Table of Contents
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Adding New Features](#adding-new-features)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Development Setup

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd propirates

# Install dependencies
npm install

# Initialize git hooks
npx husky install
```

### Running Applications
```bash
# Serve public-web app
npm start
# or
nx serve public-web

# Serve admin-web app
nx serve admin-web

# Serve user-ops app
nx serve user-ops
```

### Building Applications
```bash
# Build specific app
nx build public-web

# Build all apps
nx run-many --target=build --all

# Build only affected apps
nx affected --target=build
```

## Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files

### Scopes
Use kebab-case for scopes:
- `core-auth`
- `core-logging`
- `public-web`
- `admin-web`
- `user-ops`
- `domains-users`
- etc.

### Examples
```bash
feat(core-auth): add role-based access control

fix(public-web): resolve navigation issue on dashboard

docs(contributing): update commit guidelines

test(core-logging): add unit tests for LogService
```

### Pre-commit Hooks
The following checks run automatically before each commit:
- **Lint-staged**: Runs ESLint on affected files
- **Prettier**: Formats code automatically
- **Commitlint**: Validates commit message format

If any check fails, the commit will be rejected.

## Adding New Features

### Creating a New Domain Feature

1. **Generate libraries**:
```bash
# Data-access library
nx g @nx/angular:library \
  --name=data-access \
  --directory=libs/domains/my-feature \
  --tags=scope:shared,type:data-access \
  --standalone

# Feature library
nx g @nx/angular:library \
  --name=feature \
  --directory=libs/domains/my-feature \
  --tags=scope:shared,type:feature \
  --standalone

# UI library
nx g @nx/angular:library \
  --name=ui \
  --directory=libs/domains/my-feature \
  --tags=scope:shared,type:ui \
  --standalone
```

2. **Update tsconfig.base.json**:
```json
{
  "paths": {
    "@propirates/domains/my-feature/data-access": ["libs/domains/my-feature/data-access/src/index.ts"],
    "@propirates/domains/my-feature/feature": ["libs/domains/my-feature/feature/src/index.ts"],
    "@propirates/domains/my-feature/ui": ["libs/domains/my-feature/ui/src/index.ts"]
  }
}
```

3. **Implement the feature**:
   - **data-access**: Create API service extending `BaseApiService`
   - **feature**: Create smart components and routes
   - **ui**: Create presentational components

4. **Add routes with featureTag**:
```typescript
// In your app routes
{
  path: 'my-feature',
  loadChildren: () => import('@propirates/domains/my-feature/feature').then(m => m.ROUTES),
  canActivate: [authGuard],
  data: { featureTag: 'MyDomain/MyFeature' }
}
```

### Module Boundary Rules

Libraries must respect the following dependency constraints:

- **Apps** (public, admin, user-ops):
  - Can depend on: `scope:shared`, `scope:core`, and their own scope

- **type:feature**:
  - Can depend on: `type:ui`, `type:data-access`, `type:utils`, `type:auth`, `type:api`, `type:logging`, `type:config`

- **type:ui**:
  - Can depend on: `type:ui`, `type:utils`

- **type:data-access**:
  - Can depend on: `type:data-access`, `type:api`, `type:utils`, `type:auth`

- **type:utils**:
  - Can depend on: `type:utils` only

ESLint will enforce these rules automatically.

## Testing

### Unit Tests
```bash
# Run tests for specific project
nx test core-auth

# Run all tests
nx run-many --target=test --all

# Run affected tests
nx affected --target=test

# Run tests with coverage
nx test core-auth --code-coverage
```

### E2E Tests
```bash
# Run e2e for specific app
nx e2e public-web-e2e

# Run all e2e tests
nx run-many --target=e2e --all

# Run affected e2e tests
nx affected --target=e2e
```

### Writing Tests

#### Unit Test Example
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

  it('should perform expected behavior', () => {
    const result = service.myMethod();
    expect(result).toBe(expectedValue);
  });
});
```

#### Component Test with Testing Library
```typescript
import { render, screen } from '@testing-library/angular';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  it('should render title', async () => {
    await render(MyComponent, {
      componentProperties: { title: 'Test Title' }
    });
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

## Pull Request Process

### Before Submitting
1. ✅ Ensure all tests pass: `nx affected --target=test`
2. ✅ Ensure linting passes: `nx affected --target=lint`
3. ✅ Ensure builds succeed: `nx affected --target=build`
4. ✅ Update documentation if needed
5. ✅ Add tests for new features
6. ✅ Follow commit message conventions

### PR Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated and passing
- [ ] Dependent changes merged
- [ ] Conventional commit messages used

### PR Title Format
Use the same format as commit messages:
```
feat(scope): add new feature
fix(scope): resolve bug
```

### Review Process
1. At least one approval required
2. All CI checks must pass
3. No merge conflicts
4. Branch up to date with base branch

### After Merge
- Semantic-release will automatically:
  - Determine version bump based on commits
  - Generate changelog
  - Create GitHub release
  - Publish packages (if configured)

## Code Style

### TypeScript
- Use strict mode
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Use async/await over promises
- Avoid `any` type (use `unknown` if needed)

### Angular
- Use standalone components
- Use signals for reactive state
- Use new control flow syntax (`@if`, `@for`)
- Prefer functional guards and interceptors
- Use `inject()` function in constructors

### Naming Conventions
- **Files**: kebab-case (e.g., `my-component.ts`)
- **Classes**: PascalCase (e.g., `MyComponent`)
- **Interfaces**: PascalCase (e.g., `User`)
- **Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## Getting Help

- Check existing documentation
- Review similar implementations in the codebase
- Ask questions in pull requests
- Consult the team

## License

By contributing, you agree that your contributions will be licensed under the project's license.

