# Quick Reference Card

## 🚀 Essential Commands

### Development
```bash
npm start                    # Start dev server (http://localhost:4200)
npm run build               # Production build
npm run build:dev           # Development build
npm test                    # Run tests
npm run lint                # Lint code
```

### Build Output
```
dist/apps/public-web/browser/   # Production files ready to deploy
```

---

## 📁 Project Structure

```
propirates/
├── apps/
│   └── public-web/              # Main public-facing app
│       ├── src/
│       │   ├── app/
│       │   │   ├── landing/     # ✅ Landing page component
│       │   │   ├── home/        # Home page
│       │   │   ├── about/       # About page
│       │   │   ├── login/       # Login page
│       │   │   ├── dashboard/   # Dashboard (auth required)
│       │   │   ├── admin/       # Admin page (admin role)
│       │   │   └── app.routes.ts
│       │   ├── styles.css       # Global styles + Tailwind
│       │   └── main.ts
│       └── project.json
│
├── libs/
│   └── core/
│       ├── auth/                # Authentication & RBAC
│       ├── logging/             # Logging service
│       ├── api/                 # HTTP client + interceptors
│       └── config/              # Runtime configuration
│
├── tailwind.config.js           # ✅ Tailwind CSS config
├── postcss.config.js            # ✅ PostCSS config
├── tsconfig.base.json           # TypeScript paths
├── nx.json                      # Nx configuration
└── package.json                 # Dependencies & scripts
```

---

## 🎨 Landing Page

### Files
```
apps/public-web/src/app/landing/
├── landing.component.ts         # Component logic
├── landing.component.html       # Template (Tailwind classes)
└── landing.component.css        # Component styles
```

### Route
- **URL**: `/` (default)
- **Feature Tag**: `Public/Landing`

### Customization
Edit `landing.component.ts` to update:
- `APPLY_LINK` - Google Form URL
- `START_DATE` - Program start date
- `PRICE` - Program price

---

## 🎨 Tailwind CSS

### Usage in Templates
```html
<div class="flex items-center justify-between">
  <h1 class="text-4xl font-bold text-emerald-600">Hello</h1>
  <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
    Click me
  </button>
</div>
```

### Custom Colors (CSS Variables)
```css
/* Defined in apps/public-web/src/styles.css */
--color-primary: #3b82f6;
--color-secondary: #8b5cf6;
--color-accent: #f59e0b;
```

### Use in Tailwind
```html
<div class="bg-primary text-white">
  Primary color background
</div>
```

---

## 🔐 Authentication

### Auth Service
```typescript
import { AuthService } from '@propirates/core/auth';

constructor(private authService: AuthService) {}

// Check if user is logged in
this.authService.isAuthenticated()

// Check user role
this.authService.hasRole('admin')

// Get current user
this.authService.currentUser()

// Login
this.authService.login(username, password, role)

// Logout
this.authService.logout()
```

### Route Guards
```typescript
// In app.routes.ts
{
  path: 'dashboard',
  canActivate: [authGuard],  // Requires login
  loadComponent: () => import('./dashboard/dashboard.component')
}

{
  path: 'admin',
  canActivate: [roleGuard(['admin'])],  // Requires admin role
  loadComponent: () => import('./admin/admin.component')
}
```

---

## 🛣️ Routing

### Add New Route
```typescript
// apps/public-web/src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'my-page',
    loadComponent: () => import('./my-page/my-page.component').then(m => m.MyPageComponent),
    data: { featureTag: 'Public/MyPage' },
  },
];
```

### Navigate in Code
```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToPage() {
  this.router.navigate(['/my-page']);
}
```

### Navigate in Template
```html
<a routerLink="/my-page">Go to My Page</a>
```

---

## 🧪 Testing

### Run Tests
```bash
npm test                    # Run all tests
npm run test:coverage       # With coverage report
```

### Create Test
```typescript
// my-component.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## 🌐 Deployment

### 1. Build
```bash
npm run build
```

### 2. Deploy Folder
```
dist/apps/public-web/browser/
```

### 3. Popular Platforms

**Netlify**
```bash
# Drag & drop dist/apps/public-web/browser/ to Netlify
# Or use CLI:
netlify deploy --prod --dir=dist/apps/public-web/browser
```

**Vercel**
```bash
vercel --prod
# Build command: npm run build
# Output directory: dist/apps/public-web/browser
```

**Firebase**
```bash
firebase deploy
```

---

## 🐛 Common Issues

### Port in Use
```bash
npx kill-port 4200
```

### Clear Cache
```bash
npx nx reset
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Working
1. Check `postcss.config.js` exists
2. Verify `@tailwind` directives in `styles.css`
3. Restart dev server

---

## 📦 Package Management

### Add Dependency
```bash
npm install package-name --legacy-peer-deps
```

### Add Dev Dependency
```bash
npm install -D package-name --legacy-peer-deps
```

### Update Dependencies
```bash
npm update
```

---

## 🎯 Current Status

✅ **Working**
- Nx monorepo structure
- Angular 20 with standalone components
- Tailwind CSS v3.4
- Landing page component
- Authentication & RBAC
- Logging service
- HTTP interceptors
- Production build
- Development server

⚠️ **Warnings (Non-blocking)**
- Console Ninja compatibility (can be ignored)

🚀 **Ready for**
- Development
- Production deployment
- Adding new features
- Creating more apps (admin-web, user-ops)

---

**Happy coding! 🎉**

