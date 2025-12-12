from pydantic import BaseModel
from typing import Literal


class ClassifyRequest(BaseModel):
    message: str


class ClassifyResponse(BaseModel):
    category: Literal["Utility", "Marketing", "Authentication"]
    utility_score: float
    marketing_score: float
    auth_score: float
    explanation: str


class RewriteRequest(BaseModel):
    message: str


class RewriteResponse(BaseModel):
    rewritten: str

