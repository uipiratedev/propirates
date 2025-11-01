# Vercel Deployment Guide

## ✅ Files Created

The following files have been created to configure Vercel deployment:

- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to ignore during deployment

---

## 🚀 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended for First Deploy)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/new)**

3. **Import your repository:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure the project:**
   
   Vercel should auto-detect the settings from `vercel.json`, but verify:
   
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/apps/public-web/browser`
   - **Install Command**: `npm install --legacy-peer-deps`

5. **Environment Variables (if needed):**
   - Click "Environment Variables"
   - Add any required variables (e.g., API URLs)

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

---

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time) or **Y** (subsequent deploys)
   - What's your project's name? `propirates` (or your preferred name)
   - In which directory is your code located? `./`

5. **Wait for deployment:**
   - Build will run automatically
   - You'll get a deployment URL when complete

---

## 📋 Vercel Configuration Explained

### `vercel.json`

```json
{
  "buildCommand": "npm run build",           // Runs production build
  "outputDirectory": "dist/apps/public-web/browser",  // Where built files are
  "installCommand": "npm install --legacy-peer-deps", // Handles peer deps
  "rewrites": [                              // SPA routing support
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [                               // Security headers
    // ... security configurations
  ]
}
```

### Key Settings:

- **`buildCommand`**: Uses the npm script that builds for production
- **`outputDirectory`**: Points to the Angular build output
- **`installCommand`**: Uses `--legacy-peer-deps` to avoid peer dependency conflicts
- **`rewrites`**: Ensures all routes redirect to `index.html` for Angular routing
- **`headers`**: Adds security headers and caching for assets

---

## 🔧 Troubleshooting

### Error: "Both project and target have to be specified"

**Cause**: Vercel is running `npx nx build` instead of `npm run build`

**Solution**: The `vercel.json` file fixes this by specifying `buildCommand: "npm run build"`

---

### Error: "Peer dependency conflicts"

**Cause**: npm trying to install with strict peer dependency checking

**Solution**: The `vercel.json` specifies `installCommand: "npm install --legacy-peer-deps"`

---

### Error: "404 on page refresh"

**Cause**: Vercel doesn't know to serve `index.html` for Angular routes

**Solution**: The `vercel.json` includes rewrites configuration to handle SPA routing

---

### Build succeeds but page is blank

**Possible causes:**

1. **Wrong output directory**
   - Verify in Vercel dashboard: Settings → General → Output Directory
   - Should be: `dist/apps/public-web/browser`

2. **Base href issue**
   - Check `apps/public-web/project.json`
   - Ensure `baseHref` is set to `/`

3. **Console errors**
   - Open browser DevTools
   - Check for 404s or JavaScript errors
   - Verify assets are loading correctly

---

### Build takes too long / times out

**Solutions:**

1. **Use Nx cache:**
   - Nx caching is enabled by default
   - Subsequent builds will be faster

2. **Reduce dependencies:**
   - Remove unused packages
   - Use `npm prune`

3. **Upgrade Vercel plan:**
   - Free tier has build time limits
   - Pro tier has longer build times

---

## 🌐 Custom Domain

### Add Custom Domain to Vercel

1. **Go to your project in Vercel Dashboard**

2. **Click "Settings" → "Domains"**

3. **Add your domain:**
   - Enter your domain name (e.g., `propirates.com`)
   - Click "Add"

4. **Configure DNS:**
   
   **Option A: Using Vercel Nameservers (Recommended)**
   - Point your domain's nameservers to Vercel
   - Vercel will manage all DNS records
   
   **Option B: Using CNAME**
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - For root domain, use A record: `76.76.21.21`

5. **Wait for DNS propagation:**
   - Can take up to 48 hours
   - Usually completes in a few minutes

6. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - Your site will be available at `https://yourdomain.com`

---

## 🔄 Automatic Deployments

### Production Deployments

- **Trigger**: Push to `main` branch
- **URL**: Your production domain (e.g., `propirates.vercel.app`)
- **Environment**: Production

### Preview Deployments

- **Trigger**: Push to any other branch or open PR
- **URL**: Unique preview URL (e.g., `propirates-git-feature-branch.vercel.app`)
- **Environment**: Preview

### Configure Branch Deployments

1. **Go to Settings → Git**

2. **Production Branch:**
   - Set to `main` or `master`

3. **Preview Deployments:**
   - Enable/disable preview deployments
   - Configure which branches trigger previews

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics:**
   - Go to your project
   - Click "Analytics" tab
   - Enable Web Analytics

2. **Add to your app:**
   ```bash
   npm install @vercel/analytics
   ```

3. **Update `apps/public-web/src/app/app.config.ts`:**
   ```typescript
   import { inject } from '@vercel/analytics';
   
   export const appConfig: ApplicationConfig = {
     providers: [
       // ... existing providers
     ],
   };
   
   // Initialize analytics
   if (typeof window !== 'undefined') {
     inject();
   }
   ```

### View Deployment Logs

1. **Go to Deployments tab**
2. **Click on a deployment**
3. **View build logs, runtime logs, and errors**

---

## 🔐 Environment Variables

### Add Environment Variables

1. **Go to Settings → Environment Variables**

2. **Add variables:**
   - **Name**: `API_URL`
   - **Value**: `https://api.example.com`
   - **Environment**: Production, Preview, Development

3. **Access in your app:**
   
   Create `apps/public-web/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: process.env['API_URL'] || 'https://api.example.com',
   };
   ```

4. **Redeploy** for changes to take effect

---

## 📈 Performance Optimization

### Enable Vercel Edge Network

- Automatically enabled
- CDN caching for static assets
- Global distribution

### Configure Caching

The `vercel.json` already includes cache headers:
- **Assets**: 1 year cache (`max-age=31536000`)
- **HTML**: No cache (always fresh)

### Enable Compression

- Automatically enabled by Vercel
- Gzip and Brotli compression

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Update `APPLY_LINK` in landing component
- [ ] Update `START_DATE` and `PRICE`
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npx http-server dist/apps/public-web/browser`
- [ ] Verify all routes work
- [ ] Check responsive design on mobile
- [ ] Test on different browsers
- [ ] Set up custom domain (if applicable)
- [ ] Configure environment variables
- [ ] Enable analytics
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Review security headers in `vercel.json`

---

## 🎯 Quick Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Link local project to Vercel project
vercel link

# Pull environment variables
vercel env pull
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Angular on Vercel](https://vercel.com/guides/deploying-angular-with-vercel)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

---

## 🆘 Support

If you encounter issues:

1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review [Vercel Community](https://github.com/vercel/vercel/discussions)
3. Contact [Vercel Support](https://vercel.com/support)

---

**Your app is ready to deploy to Vercel! 🚀**

Just run `vercel --prod` or push to GitHub and import in Vercel Dashboard.

