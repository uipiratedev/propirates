# Single-Project Vercel Deployment Guide

This guide explains how to deploy both the **Angular frontend** and **FastAPI backend** together as a **single Vercel project** from your monorepo.

## 📋 Overview

- **Frontend**: Angular SPA served from root `/`
- **Backend**: FastAPI as serverless functions under `/api`
- **Same Origin**: No CORS configuration needed
- **Single Deployment**: Both deploy together

---

## 🎯 Step 1: Vercel Project Configuration

### Create or Configure Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"** (or use your existing project)
3. Import your GitHub repository
4. Configure with these **exact settings**:

| Setting | Value |
|---------|-------|
| **Project Name** | `propirates` (or your preferred name) |
| **Framework Preset** | **Other** |
| **Root Directory** | `.` (leave empty - use repository root) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist/apps/public-web/browser` |
| **Install Command** | `npm install --legacy-peer-deps` |

### Important Notes:
- ✅ **Root Directory**: Must be empty or `.` (repository root)
- ✅ **Framework Preset**: Must be "Other" (not Angular, not Next.js)
- ✅ **Build Command**: Uses the npm script from package.json
- ✅ **Output Directory**: Points to the Angular build output

---

## 📁 Step 2: Configuration Files

### Use Root vercel.json (Already Configured)

Your repository root `vercel.json` is the **only** configuration file Vercel will use. The files in `apps/backend/vercel.json` and `apps/public-web/vercel.json` are **ignored** for single-project deployment.

**Current Configuration** (`vercel.json` at root):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/apps/public-web/browser",
  "devCommand": "npm start",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": null,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "functions": {
    "api/**/*.py": {"includeFiles": "apps/backend/**"}
  }
}
```

### Key Configuration Explained:

1. **rewrites**: 
   - `/api/(.*)` → `/api/$1` - Routes API requests to serverless functions
   - `/(.*) → /index.html` - Routes all other requests to Angular SPA
   - ⚠️ **Order matters!** API rewrite must come first

2. **functions**:
   - `api/**/*.py` - Tells Vercel to treat Python files in `api/` as serverless functions
   - `includeFiles: "apps/backend/**"` - Bundles your backend code with the functions

3. **headers**: Security headers for the frontend

---

## 🔧 Step 3: Backend Serverless Functions

### Directory Structure

```
api/
├── index.py           # Handles /api and /api/
├── [...path].py       # Handles /api/* (catch-all)
└── requirements.txt   # Python dependencies
```

### How It Works

1. **api/index.py** - Entry point for `/api` requests
   - Imports your FastAPI app from `apps/backend/app/main.py`
   - Exposes it as an ASGI app for Vercel

2. **api/[...path].py** - Catch-all for `/api/*` routes
   - Same implementation as index.py
   - Handles all sub-routes like `/api/health`, `/api/ping`

3. **api/requirements.txt** - Dependencies for serverless functions
   - Must include: `fastapi`, `uvicorn[standard]`, `python-dotenv`

### Backend Routes (apps/backend/app/main.py)

Your backend routes **must** include the `/api` prefix:

```python
@app.get("/api/health")
def api_health():
    return {"status": "ok"}

@app.get("/api/ping")
def ping():
    return {"pong": True}
```

✅ **Current Status**: Your `apps/backend/app/main.py` already has the correct routes with `/api` prefix.

---

## 🎨 Step 4: Frontend Configuration

### Frontend API Configuration

Your Angular app should call the backend using relative `/api` paths (same origin).

**Current Configuration** (`apps/public-web/src/assets/config.json`):

```json
{
  "apiBaseUrl": "/api",
  "loggingEndpoint": "/api/logging",
  "production": false
}
```

✅ **Current Status**: Already configured correctly!

### For Production

You can update `production` to `true` for production deployments, but it's not required:

```json
{
  "apiBaseUrl": "/api",
  "loggingEndpoint": "/api/logging",
  "production": true
}
```

---

## 🌍 Step 5: Environment Variables

### Required Environment Variables in Vercel

Go to Vercel Project → **Settings** → **Environment Variables** and add:

| Variable | Value | Environment | Description |
|----------|-------|-------------|-------------|
| `CORS_ORIGINS` | `*` | Production, Preview, Development | Allow all origins (or specify your domain) |

### Optional Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Not used in serverless, but good for local dev |

### Why CORS_ORIGINS?

Even though frontend and backend are on the same origin in production, you might want to:
- Allow requests from preview deployments
- Allow local development (http://localhost:4200)
- Set to `*` for simplicity, or specify exact origins

**Recommended for production:**
```
CORS_ORIGINS=https://your-domain.vercel.app,http://localhost:4200
```

---

## 🚀 Step 6: Deploy

### Deployment Process

1. **Commit and Push** your code to GitHub:
   ```bash
   git add .
   git commit -m "Configure single-project Vercel deployment"
   git push
   ```

2. **Vercel Auto-Deploy**:
   - Vercel will automatically detect the push
   - Build process:
     1. Runs `npm install --legacy-peer-deps`
     2. Runs `npm run build` (builds Angular app)
     3. Detects Python functions in `api/` directory
     4. Installs Python dependencies from `api/requirements.txt`
     5. Bundles `apps/backend/**` with the functions
     6. Deploys frontend to root and backend to `/api`

3. **Monitor Deployment**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment to see logs
   - Wait for "Deployment completed" status

### Build Output

You should see logs like:
```
✓ Building Angular application
✓ Detected Python functions in api/
✓ Installing Python dependencies
✓ Deployment completed
```

---

## 🧪 Step 7: Testing After Deployment

### Test Backend API

After deployment, your site will be at: `https://your-project.vercel.app`

**Test these endpoints:**

```bash
# API Health Check
curl https://your-project.vercel.app/api/health
# Expected: {"status":"ok"}

# API Ping
curl https://your-project.vercel.app/api/ping
# Expected: {"pong":true}

# Interactive API Docs (Swagger UI)
# Open in browser:
https://your-project.vercel.app/api/docs
```

### Test Frontend

1. **Open your deployed site**: `https://your-project.vercel.app`
2. **Open Browser DevTools** → Network tab
3. **Make API calls** from your Angular app
4. **Verify**:
   - API calls go to `/api/*` (same origin)
   - No CORS errors
   - Responses are successful

### Test from Browser Console

Open your deployed site and run in the browser console:

```javascript
// Test API health
fetch('/api/health')
  .then(r => r.json())
  .then(console.log);
// Expected: {status: "ok"}

// Test API ping
fetch('/api/ping')
  .then(r => r.json())
  .then(console.log);
// Expected: {pong: true}
```

---

## 🔍 Step 8: Verify Configuration

### Checklist

- [ ] Root `vercel.json` exists with correct configuration
- [ ] `api/index.py` and `api/[...path].py` exist
- [ ] `api/requirements.txt` has all dependencies
- [ ] `apps/backend/app/main.py` routes have `/api` prefix
- [ ] `apps/public-web/src/assets/config.json` has `"apiBaseUrl": "/api"`
- [ ] Vercel project Root Directory is empty (repository root)
- [ ] Vercel project Build Command is `npm run build`
- [ ] Vercel project Output Directory is `dist/apps/public-web/browser`
- [ ] Environment variable `CORS_ORIGINS` is set in Vercel
- [ ] Deployment successful
- [ ] Frontend loads at `https://your-project.vercel.app`
- [ ] Backend responds at `https://your-project.vercel.app/api/health`
- [ ] No CORS errors in browser console

---

## 🚨 Troubleshooting

### Frontend Issues

**Problem**: Frontend doesn't load / 404 errors
- **Solution**: Check Output Directory is `dist/apps/public-web/browser`
- **Solution**: Verify build command completed successfully in deployment logs

**Problem**: Assets not loading
- **Solution**: Check that `assets/` folder is in the build output
- **Solution**: Verify cache headers in `vercel.json`

### Backend Issues

**Problem**: `/api/health` returns 404
- **Solution**: Check that `api/index.py` and `api/[...path].py` exist
- **Solution**: Verify `functions` configuration in `vercel.json`
- **Solution**: Check deployment logs for Python function errors

**Problem**: "Module not found" errors
- **Solution**: Verify `api/requirements.txt` has all dependencies
- **Solution**: Check that `includeFiles: "apps/backend/**"` is in `vercel.json`
- **Solution**: Ensure `apps/backend/app/main.py` imports are correct

**Problem**: CORS errors
- **Solution**: Set `CORS_ORIGINS=*` in Vercel environment variables
- **Solution**: Verify frontend is calling `/api` (relative path, same origin)

### Build Issues

**Problem**: Build fails with npm errors
- **Solution**: Use `npm install --legacy-peer-deps` as install command
- **Solution**: Check that `package.json` has correct scripts

**Problem**: Python build fails
- **Solution**: Check `api/requirements.txt` syntax
- **Solution**: Verify Python version compatibility (Vercel uses Python 3.12)

---

## 📝 Local Development

### Run Backend Locally

```bash
cd apps/backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

Backend will be at: `http://localhost:8000`

### Run Frontend Locally

```bash
# From repository root
npm start
```

Frontend will be at: `http://localhost:4200`

### Local Configuration

For local development, update `apps/public-web/src/assets/config.json`:

```json
{
  "apiBaseUrl": "http://localhost:8000/api",
  "loggingEndpoint": "http://localhost:8000/api/logging",
  "production": false
}
```

**Important**: Don't commit this change! Keep it as `/api` for production.

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Project                        │
│  https://your-project.vercel.app                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ├─── / (root)
                          │    └─→ Angular SPA
                          │        (dist/apps/public-web/browser)
                          │
                          └─── /api/*
                               └─→ Python Serverless Functions
                                   (api/index.py, api/[...path].py)
                                   └─→ FastAPI App
                                       (apps/backend/app/main.py)
```

---

## ✅ Summary

### What You Have Now

1. ✅ **Root vercel.json** - Configured for single-project deployment
2. ✅ **API serverless functions** - `api/index.py` and `api/[...path].py`
3. ✅ **Backend with /api routes** - `apps/backend/app/main.py`
4. ✅ **Frontend configured for /api** - `apps/public-web/src/assets/config.json`

### What You Need to Do

1. Set `CORS_ORIGINS` environment variable in Vercel
2. Deploy (push to GitHub or click Deploy in Vercel)
3. Test endpoints after deployment

### Expected Result

- Frontend: `https://your-project.vercel.app/`
- Backend API: `https://your-project.vercel.app/api/health`
- API Docs: `https://your-project.vercel.app/api/docs`
- No CORS errors (same origin)
- Single deployment for both frontend and backend

---

## 🎯 Next Steps

1. **Set Environment Variables** in Vercel Dashboard
2. **Push to GitHub** to trigger deployment
3. **Monitor deployment** in Vercel Dashboard
4. **Test all endpoints** after deployment
5. **Verify frontend** can call backend API

Your configuration is ready! Just deploy and test. 🚀

