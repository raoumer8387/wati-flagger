# Troubleshooting 404 Error on Vercel

If you're getting a 404 error, follow these steps:

## Quick Fixes

### 1. Check Build Logs
- Go to Vercel Dashboard → Your Project → Deployments
- Click on the latest deployment
- Check the "Build Logs" tab for any errors

### 2. Verify Build Settings
In Vercel Dashboard → Settings → General:
- **Root Directory**: Should be `.` (root)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `cd frontend && npm install`

### 3. Check Environment Variables
- Go to Settings → Environment Variables
- Verify `OPENROUTER_API_KEY` is set for Production, Preview, and Development

### 4. Test API Endpoint Directly
Try accessing:
- `https://wati-flagger.vercel.app/api/` - Should return `{"message": "WhatsApp Template Classifier API"}`
- If this works, the API is fine, issue is with frontend routing
- If this fails, check API function logs

### 5. Check Function Logs
- Go to Deployments → Functions tab
- Click on `api/index` function
- Check for any import errors or runtime errors

## Common Issues

### Issue: Frontend shows 404
**Solution**: The `vercel.json` rewrites should handle this. Make sure:
- `outputDirectory` is `frontend/dist`
- Rewrite rule for `/(.*)` → `/index.html` exists

### Issue: API returns 404
**Solution**: 
- Verify `api/index.py` exists in your repository
- Check that `requirements.txt` includes `mangum`
- Ensure Python runtime is selected in Vercel

### Issue: Import errors in API
**Solution**: The path resolution might be failing. Check:
- `backend/models.py` exists
- `backend/utils/llama_client.py` exists
- All imports in `api/index.py` are correct

## Manual Verification Steps

1. **Test API locally first** (if possible):
   ```bash
   cd api
   python index.py
   ```

2. **Check file structure**:
   ```
   root/
   ├── api/
   │   └── index.py
   ├── backend/
   │   ├── models.py
   │   └── utils/
   │       └── llama_client.py
   ├── frontend/
   │   └── dist/ (after build)
   ├── vercel.json
   └── requirements.txt
   ```

3. **Redeploy**:
   - Make a small change (like adding a comment)
   - Commit and push
   - Vercel will auto-deploy

## Still Not Working?

1. Check Vercel's function logs for detailed error messages
2. Try accessing `/api/` directly to isolate frontend vs backend issues
3. Verify all files are committed to Git (Vercel only deploys committed files)

