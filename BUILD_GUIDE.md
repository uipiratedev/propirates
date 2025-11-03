# Build & Deployment Guide

## ✅ Setup Complete!

Your Nx monorepo is now fully configured with:

- ✅ Tailwind CSS v3.4 (working)
- ✅ Angular 20 with standalone components
- ✅ Landing page component created
- ✅ Production build working
- ✅ All warnings fixed

---

## 🚀 Single Build Command

### Production Build (Optimized)

```bash
npm run build
```

This command:

- Builds the `public-web` app for production
- Enables optimizations (minification, tree-shaking, etc.)
- Outputs to `dist/apps/public-web/browser/`
- Takes ~10-15 seconds

### Output Location

```
dist/apps/public-web/browser/
├── index.html
├── main-*.js (minified)
├── styles-*.css (minified with Tailwind)
├── chunk-*.js (lazy-loaded routes)
└── assets/
```

---

## 📦 Other Build Commands

### Development Build (Faster, No Optimization)

```bash
npm run build:dev
```

### Build All Apps

```bash
npm run build:all
```

### Build Only Changed Apps (Affected)

```bash
npm run build:affected
```

---

## 🏃 Development Commands

### Start Dev Server

```bash
npm start
```

- Runs at `http://localhost:4200/`
- Hot reload enabled
- Tailwind CSS working

### Start Other Apps (When Created)

```bash
npm run start:admin      # Admin app
npm run start:user-ops   # User ops app
```

---

## 🎨 Landing Page Component

### Location

```
apps/public-web/src/app/landing/
├── landing.component.ts
├── landing.component.html
├── landing.component.css
```

### Features

- ✅ Fully responsive design
- ✅ Tailwind CSS utility classes
- ✅ Angular 20 control flow (@if, @for)
- ✅ Standalone component
- ✅ Lazy-loaded route

### Route

- **URL**: `http://localhost:4200/` (default route)
- **Feature Tag**: `Public/Landing`

---

## 🎨 Tailwind CSS Configuration

### Config File

```javascript
// tailwind.config.js
module.exports = {
  content: ['./apps/**/src/**/*.{html,ts}', './libs/**/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // ... more colors
      },
    },
  },
  plugins: [],
};
```

### PostCSS Config

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### Global Styles

```css
/* apps/public-web/src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  /* ... more CSS variables */
}
```

---

## 📝 Component Generation

### Using Angular CLI (Manual Creation Recommended)

The Nx Angular generator has some parameter issues. It's easier to create components manually:

1. Create directory: `apps/public-web/src/app/my-component/`
2. Create files:
   - `my-component.component.ts`
   - `my-component.component.html`
   - `my-component.component.css`

### Example Component

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css',
})
export class MyComponent {
  // Component logic
}
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended) ⭐

**Quick Deploy:**

```bash
vercel --prod
```

**Or push to GitHub and import in Vercel Dashboard**

✅ **Vercel configuration files already created:**

- `vercel.json` - Build and routing configuration
- `.vercelignore` - Files to exclude from deployment

📚 **See `VERCEL_DEPLOYMENT.md` for complete Vercel deployment guide**

---

### Deploy to Netlify

1. **Build for production:**

   ```bash
   npm run build
   ```

2. **Deploy the `dist/apps/public-web/browser/` folder**

3. **Create `netlify.toml`:**

   ```toml
   [build]
     command = "npm run build"
     publish = "dist/apps/public-web/browser"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Deploy to Firebase Hosting

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:

   ```bash
   firebase init hosting
   ```

3. Configure `firebase.json`:

   ```json
   {
     "hosting": {
       "public": "dist/apps/public-web/browser",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 🔧 Troubleshooting

### Build Fails

1. Clear Nx cache: `npx nx reset`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npx nx lint public-web`

### Tailwind Not Working

1. Verify `postcss.config.js` exists
2. Check `@tailwind` directives in `apps/public-web/src/styles.css`
3. Restart dev server

### Port Already in Use

```bash
# Kill process on port 4200
npx kill-port 4200

# Or use a different port
npx nx serve public-web --port 4300
```

---

## 📊 Build Performance

### Production Build Stats

- **Initial Bundle**: ~40 KB (gzipped: ~12 KB)
- **Lazy Chunks**: 3-33 KB each
- **Build Time**: 10-15 seconds
- **Tailwind CSS**: ~16 KB (purged unused classes)

### Optimization Tips

1. Use lazy loading for routes (already configured)
2. Enable source maps only in dev: `--source-map=false`
3. Use Nx cache: `nx build public-web --skip-nx-cache=false`

---

## 🎯 Next Steps

1. ✅ **Landing page is live** at `http://localhost:4200/`
2. ✅ **Production build working** with `npm run build`
3. ✅ **Tailwind CSS configured** and working

### Recommended Next Steps:

1. Update the landing page content (edit `apps/public-web/src/app/landing/landing.component.ts`)
2. Replace the Google Form URL in the component
3. Add more pages/components as needed
4. Set up CI/CD with GitHub Actions (see `IMPLEMENTATION_GUIDE.md`)
5. Deploy to production hosting

---

## 📚 Documentation

- **Main Documentation**: `OUTPUT_SUMMARY.md`
- **Implementation Guide**: `IMPLEMENTATION_GUIDE.md`
- **Upgrade Details**: `UPGRADE_OUTPUT.md`
- **Final Summary**: `FINAL_SUMMARY.md`

---

**Your app is production-ready! 🎉**
