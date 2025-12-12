# Vercel Deployment Guide

This guide will help you deploy your WhatsApp Template Classifier application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for CLI deployment)
3. Your OpenRouter API key

## Project Structure for Vercel

The project has been configured with:
- **Frontend**: React + Vite app in `frontend/` directory
- **Backend**: FastAPI serverless function in `api/index.py`
- **Configuration**: `vercel.json` for routing and build settings

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the project settings

3. **Configure Build Settings** (Expand "Build and Output Settings")
   - **Framework Preset**: Change from "FastAPI" to "Vite" (or "Other")
   - **Root Directory**: `./` (should already be set)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

4. **Configure Environment Variables** (Expand "Environment Variables")
   - Click "Add" to add a new variable:
     - **Name**: `OPENROUTER_API_KEY`
     - **Value**: Your OpenRouter API key
     - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add OPENROUTER_API_KEY
   # Enter your API key when prompted
   # Select: Production, Preview, Development
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

## Configuration Files

### vercel.json
This file configures:
- Frontend build from `frontend/package.json`
- Backend serverless function at `api/index.py`
- Routing rules for API and frontend

### requirements.txt
Contains Python dependencies needed for the FastAPI backend, including:
- FastAPI
- Mangum (ASGI adapter for serverless)
- OpenAI client
- Pydantic

### .vercelignore
Excludes unnecessary files from deployment (node_modules, cache, etc.)

## Environment Variables

### Required
- `OPENROUTER_API_KEY`: Your OpenRouter API key for LLM access

### Optional (Frontend)
- `VITE_API_URL`: Custom API URL (defaults to `/api` in production)

## Post-Deployment

1. **Test the API**
   - Visit `https://your-project.vercel.app/api/` to see the API root
   - Test the classify endpoint: `POST /api/classify`
   - Test the rewrite endpoint: `POST /api/rewrite-utility`

2. **Update CORS (if needed)**
   - If you want to restrict CORS, edit `api/index.py`
   - Change `allow_origins=["*"]` to your specific domain

3. **Monitor Logs**
   - Check Vercel dashboard → "Deployments" → "Functions" tab
   - View real-time logs for debugging

## Troubleshooting

### Build Fails
- Check that all dependencies are in `requirements.txt` and `frontend/package.json`
- Verify Node.js and Python versions in Vercel settings
- Check build logs in Vercel dashboard

### API Returns 500 Errors
- Verify `OPENROUTER_API_KEY` is set correctly in environment variables
- Check function logs in Vercel dashboard
- Ensure the API key has proper permissions

### CORS Errors
- Verify CORS middleware is configured in `api/index.py`
- Check that frontend is using the correct API URL (`/api` in production)

### Frontend Can't Connect to API
- Ensure `VITE_API_URL` is not set in production (should use `/api` relative path)
- Check that routes in `vercel.json` are correct
- Verify API function is deployed successfully

## Custom Domain

1. Go to Vercel project settings → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

## Continuous Deployment

Vercel automatically deploys on every push to your connected Git branch:
- `main`/`master` → Production
- Other branches → Preview deployments

## Cost Considerations

- **Free Tier**: 
  - 100GB bandwidth/month
  - Serverless function execution time limits
  - Sufficient for development and small projects

- **Pro Tier**: 
  - Better for production with higher traffic
  - More serverless function execution time

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [FastAPI on Vercel](https://vercel.com/docs/frameworks/fastapi)
- [Vercel Python Runtime](https://vercel.com/docs/functions/runtimes/python)

