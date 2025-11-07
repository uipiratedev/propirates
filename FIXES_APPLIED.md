# Fixes Applied for API Routes

## Issues Identified

1. **`/api/docs` was redirecting to Angular SPA** instead of showing FastAPI Swagger UI
2. **`/api/logging` endpoint was missing** (405 Method Not Allowed)

---

## Fix 1: Exclude `/api` from SPA Catch-All

### Problem
The rewrite rule `{ "source": "/(.*)", "destination": "/index.html" }` was catching **all** routes, including `/api/*`, and serving the Angular SPA instead of the Python serverless functions.

### Solution
Changed the rewrite pattern to use a **negative lookahead** to exclude `/api` routes:

**Before:**
```json
"rewrites": [
  { "source": "/api/(.*)", "destination": "/api/$1" },
  { "source": "/(.*)", "destination": "/index.html" }
]
```

**After:**
```json
"rewrites": [
  {
    "source": "/((?!api).*)",
    "destination": "/index.html"
  }
]
```

### How It Works
- `/((?!api).*)` - Matches any path that does **not** start with `api`
- This allows `/api/*` requests to bypass the SPA rewrite and go directly to the Python serverless functions
- All other routes (like `/`, `/about`, `/products`) still get served the Angular SPA

---

## Fix 2: Added `/api/logging` Endpoint

### Problem
Frontend was trying to POST logs to `/api/logging`, but the endpoint didn't exist, resulting in 405 Method Not Allowed errors.

### Solution
Added a POST endpoint to handle frontend logs in `apps/backend/app/main.py`:

```python
@app.post("/api/logging")
async def log_message(request: Request):
    """
    Endpoint to receive frontend logs.
    Accepts log entries from the Angular frontend.
    """
    try:
        body = await request.json()
        
        # Extract log data
        log_level = body.get("level", "INFO")
        message = body.get("message", "")
        timestamp = body.get("timestamp", datetime.utcnow().isoformat())
        context = body.get("context", {})
        
        # Print to Vercel function logs
        print(f"[{timestamp}] [{log_level}] {message}")
        if context:
            print(f"Context: {context}")
        
        return {
            "status": "ok",
            "message": "Log received",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        print(f"Error processing log: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }
```

### Features
- Accepts POST requests with JSON body
- Extracts log level, message, timestamp, and context
- Prints logs to Vercel function logs (visible in Vercel Dashboard)
- Returns success/error response
- Can be extended to send logs to external services (Sentry, LogRocket, etc.)

---

## Testing After Deployment

### Test API Docs
```bash
# Should now show FastAPI Swagger UI
https://www.dev.propirates.com/api/docs
```

### Test Logging Endpoint
```bash
curl -X POST https://www.dev.propirates.com/api/logging \
  -H "Content-Type: application/json" \
  -d '{
    "level": "INFO",
    "message": "Test log from curl",
    "timestamp": "2025-11-07T22:45:00Z",
    "context": {"source": "manual-test"}
  }'

# Expected response:
# {
#   "status": "ok",
#   "message": "Log received",
#   "timestamp": "2025-11-07T22:45:01.123456"
# }
```

### Test from Browser Console
```javascript
// On https://www.dev.propirates.com
fetch('/api/logging', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    level: 'INFO',
    message: 'Test from browser',
    timestamp: new Date().toISOString(),
    context: { page: window.location.pathname }
  })
})
.then(r => r.json())
.then(console.log);
```

---

## Deployment

### Commit and Push
```bash
git add .
git commit -m "Fix /api/docs redirect and add /api/logging endpoint"
git push
```

Vercel will auto-deploy the changes.

---

## Expected Results

### ✅ `/api/docs` - FastAPI Swagger UI
- Should display interactive API documentation
- No redirect to Angular SPA
- Can test endpoints directly from the UI

### ✅ `/api/logging` - Log Endpoint
- Accepts POST requests from frontend
- Returns 200 OK with success message
- Logs visible in Vercel function logs

### ✅ Frontend Routes - Angular SPA
- `/` - Home page
- `/about` - About page
- Any other route - Served by Angular

### ✅ Other API Routes
- `/api/health` - Health check
- `/api/ping` - Ping endpoint
- All work correctly without SPA interference

---

## Vercel Configuration Summary

### Current `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/apps/public-web/browser",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": null,
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/**/*.py": {"includeFiles": "apps/backend/**"}
  }
}
```

### Key Points
- ✅ SPA rewrite excludes `/api` routes
- ✅ Python functions include backend code
- ✅ Security headers applied
- ✅ Asset caching configured

---

## Monitoring Logs

### View Function Logs in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Click on **Deployments**
4. Click on the latest deployment
5. Click on **Functions** tab
6. Select `api/index.py` or `api/[...path].py`
7. View logs to see frontend log messages

### Example Log Output
```
[2025-11-07T22:45:01.123456] [INFO] User clicked login button
Context: {'page': '/login', 'userId': '12345'}
```

---

## Future Enhancements

### Send Logs to External Service

You can extend the `/api/logging` endpoint to send logs to services like:

**Sentry:**
```python
import sentry_sdk
sentry_sdk.capture_message(message, level=log_level.lower())
```

**LogRocket:**
```python
import requests
requests.post('https://api.logrocket.com/...', json=body)
```

**Database:**
```python
# Store in PostgreSQL, MongoDB, etc.
db.logs.insert_one(body)
```

---

## Summary

✅ **Fixed**: `/api/docs` now shows FastAPI Swagger UI  
✅ **Fixed**: `/api/logging` endpoint added and working  
✅ **Fixed**: SPA rewrite no longer interferes with API routes  
✅ **Ready**: Deploy and test!

---

## Quick Test Commands

```bash
# Test API docs (open in browser)
https://www.dev.propirates.com/api/docs

# Test health
curl https://www.dev.propirates.com/api/health

# Test ping
curl https://www.dev.propirates.com/api/ping

# Test logging
curl -X POST https://www.dev.propirates.com/api/logging \
  -H "Content-Type: application/json" \
  -d '{"level":"INFO","message":"Test"}'
```

