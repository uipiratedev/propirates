# Quick Reference - Single-Project Deployment

## 🎯 Vercel Project Settings

| Setting | Value |
|---------|-------|
| **Framework Preset** | Other |
| **Root Directory** | `.` (empty - repository root) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist/apps/public-web/browser` |
| **Install Command** | `npm install --legacy-peer-deps` |

## 🌍 Environment Variables

| Variable | Value |
|----------|-------|
| `CORS_ORIGINS` | `*` (or your specific domains) |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `vercel.json` (root) | Main Vercel configuration |
| `api/index.py` | Serverless function entry point |
| `api/[...path].py` | Catch-all for /api/* routes |
| `api/requirements.txt` | Python dependencies |
| `apps/backend/app/main.py` | FastAPI application |
| `apps/public-web/src/assets/config.json` | Frontend API configuration |

## 🧪 Test Endpoints

After deployment at `https://your-project.vercel.app`:

```bash
# Frontend
https://your-project.vercel.app/

# Backend Health
https://your-project.vercel.app/api/health

# Backend Ping
https://your-project.vercel.app/api/ping

# API Docs
https://your-project.vercel.app/api/docs
```

## 🔧 Configuration Files

### vercel.json (root)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/apps/public-web/browser",
  "installCommand": "npm install --legacy-peer-deps",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "functions": {
    "api/**/*.py": {"includeFiles": "apps/backend/**"}
  }
}
```

### config.json (frontend)
```json
{
  "apiBaseUrl": "/api",
  "loggingEndpoint": "/api/logging",
  "production": false
}
```

## ✅ Deployment Checklist

- [ ] Vercel project configured with correct settings
- [ ] `CORS_ORIGINS` environment variable set
- [ ] Code pushed to GitHub
- [ ] Deployment successful
- [ ] Frontend loads at root `/`
- [ ] Backend responds at `/api/health`
- [ ] No CORS errors
- [ ] API docs accessible at `/api/docs`

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Frontend 404 | Check Output Directory: `dist/apps/public-web/browser` |
| Backend 404 | Verify `api/` folder exists with Python files |
| CORS errors | Set `CORS_ORIGINS=*` in Vercel env vars |
| Build fails | Use `npm install --legacy-peer-deps` |
| Module not found | Check `includeFiles: "apps/backend/**"` in vercel.json |

## 📝 Local Development

### Backend
```bash
cd apps/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
npm start
```

### Local Config
```json
{
  "apiBaseUrl": "http://localhost:8000/api",
  "loggingEndpoint": "http://localhost:8000/api/logging",
  "production": false
}
```

## 🎯 Architecture

```
Vercel Project (Single)
├── / → Angular SPA (frontend)
└── /api/* → Python Functions (backend)
    └── FastAPI App
```

## 📚 Full Documentation

See [SINGLE_PROJECT_DEPLOYMENT.md](./SINGLE_PROJECT_DEPLOYMENT.md) for complete guide.

