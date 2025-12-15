from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import traceback

# Import from local api directory (files are copied here for Vercel deployment)
import os
import sys

# Add current directory to Python path (Vercel puts files in /var/task/api/)
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

try:
    from models import ClassifyRequest, ClassifyResponse, RewriteRequest, RewriteResponse
    from utils.llama_client import LlamaClient
except ImportError as e:
    # Better error message for debugging
    print(f"Import error: {e}", file=sys.stderr)
    print(f"Python path: {sys.path}", file=sys.stderr)
    print(f"Current dir: {current_dir}", file=sys.stderr)
    print(f"Files in current dir: {os.listdir(current_dir) if os.path.exists(current_dir) else 'DIR NOT FOUND'}", file=sys.stderr)
    raise

app = FastAPI(title="WhatsApp Template Classifier API")

# Configure CORS - allow all origins for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you might want to restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Llama client (will be initialized on first request)
llama_client = None

def get_llama_client():
    global llama_client
    if llama_client is None:
        try:
            llama_client = LlamaClient()
        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to initialize Llama client: {str(e)}. Please check OPENROUTER_API_KEY environment variable."
            )
    return llama_client


@app.get("/api/")
@app.get("/")
def root():
    """Health check endpoint that doesn't require LlamaClient initialization."""
    return {
        "message": "WhatsApp Template Classifier API",
        "status": "running"
    }


@app.get("/api/health")
@app.get("/health")
def health_check():
    """Health check endpoint that verifies API key is configured."""
    api_key_set = bool(os.getenv("OPENROUTER_API_KEY"))
    return {
        "status": "healthy" if api_key_set else "unhealthy",
        "api_key_configured": api_key_set,
        "message": "API key is configured" if api_key_set else "WARNING: OPENROUTER_API_KEY environment variable is not set"
    }


@app.post("/api/classify", response_model=ClassifyResponse)
@app.post("/classify", response_model=ClassifyResponse)
async def classify_message(request: ClassifyRequest):
    """Classify a WhatsApp message template."""
    try:
        client = get_llama_client()
        result = client.classify_message(request.message)
        return ClassifyResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/rewrite-utility", response_model=RewriteResponse)
@app.post("/rewrite-utility", response_model=RewriteResponse)
async def rewrite_utility(request: RewriteRequest):
    """Rewrite a message as a Utility-compliant WhatsApp template."""
    try:
        client = get_llama_client()
        rewritten = client.rewrite_as_utility(request.message)
        return RewriteResponse(rewritten=rewritten)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Vercel serverless function handler
# Export only 'app' - Vercel's Python runtime automatically detects and handles FastAPI/ASGI apps
# Do NOT export 'handler' as it confuses Vercel's handler detection
