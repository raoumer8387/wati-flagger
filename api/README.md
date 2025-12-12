# API Directory

This directory contains the serverless function for Vercel deployment.

## File Structure

- `index.py` - Main FastAPI application and Vercel handler
- `models.py` - Pydantic models (copied from `backend/models.py`)
- `utils/llama_client.py` - Llama client (copied from `backend/utils/llama_client.py`)

## Why Duplicate Files?

The backend files are duplicated here because Vercel serverless functions can only access files within their own directory. The `api/` directory is isolated, so we need the models and utilities to be local to the function.

**Note**: If you update `backend/models.py` or `backend/utils/llama_client.py`, you should also update the corresponding files in this directory to keep them in sync.

