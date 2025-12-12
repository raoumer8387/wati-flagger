from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from models import ClassifyRequest, ClassifyResponse, RewriteRequest, RewriteResponse
from utils.llama_client import LlamaClient

# Load environment variables
load_dotenv()

app = FastAPI(title="WhatsApp Template Classifier API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Llama client
llama_client = LlamaClient()


@app.get("/")
def root():
    return {"message": "WhatsApp Template Classifier API"}


@app.post("/classify", response_model=ClassifyResponse)
async def classify_message(request: ClassifyRequest):
    """Classify a WhatsApp message template."""
    try:
        result = llama_client.classify_message(request.message)
        return ClassifyResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/rewrite-utility", response_model=RewriteResponse)
async def rewrite_utility(request: RewriteRequest):
    """Rewrite a message as a Utility-compliant WhatsApp template."""
    try:
        rewritten = llama_client.rewrite_as_utility(request.message)
        return RewriteResponse(rewritten=rewritten)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

