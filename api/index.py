from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os
import sys

# Add backend directory to path - handle both local and Vercel deployment
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_path = os.path.join(current_dir, '..', 'backend')
backend_path = os.path.normpath(os.path.abspath(backend_path))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from models import ClassifyRequest, ClassifyResponse, RewriteRequest, RewriteResponse
from utils.llama_client import LlamaClient

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
        llama_client = LlamaClient()
    return llama_client


@app.get("/")
def root():
    return {"message": "WhatsApp Template Classifier API"}


@app.post("/classify", response_model=ClassifyResponse)
async def classify_message(request: ClassifyRequest):
    """Classify a WhatsApp message template."""
    try:
        client = get_llama_client()
        result = client.classify_message(request.message)
        return ClassifyResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
handler = Mangum(app)
