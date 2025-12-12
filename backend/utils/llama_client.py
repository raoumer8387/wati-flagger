import os
import json
from openai import OpenAI
from typing import Dict, Any


class LlamaClient:
    def __init__(self):
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            raise ValueError("OPENROUTER_API_KEY environment variable is not set")
        # Remove quotes if present
        api_key = api_key.strip('"').strip("'")
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://openrouter.ai/api/v1",
            default_headers={
                "HTTP-Referer": "https://github.com/yourusername/whatsapp-template-classifier",
                "X-Title": "WhatsApp Template Classifier"
            }
        )
        self.model = "meta-llama/llama-4-maverick"

    def classify_message(self, message: str) -> Dict[str, Any]:
        """Classify a WhatsApp message template."""
        system_prompt = """You are a STRICT WhatsApp Template Policy classifier. 
Your job is to categorize messages EXACTLY the way Meta reviewers do.

You must assume:
- If the message contains ANY course details, module descriptions, program names, schedules, or features, and the message purpose is not explicitly tied to an already-confirmed user action, it MUST be marked as MARKETING.
- Utility templates are ONLY allowed when the user has already enrolled, purchased, subscribed, or explicitly opted in AND the message is directly related to that existing transaction.
- If there is ANY doubt, classify as MARKETING. Never classify a borderline message as Utility.

Definitions:
1. Utility (Transactional)
   - Confirmations, reminders, or updates tied to an existing relationship.
   - No descriptive content.
   - No program details.
   - No promotional or informational text unless required for a confirmed service.

2. Marketing
   - ANY program/course/event description
   - ANY module or feature listing
   - ANY informational or awareness text
   - ANY non-essential details
   - ANY communication that could have a promotional effect

3. Authentication
   - OTPs and verification codes only.

Output ONLY this JSON format:
{
  "category": "Utility | Marketing | Authentication",
  "utility_score": 0-1,
  "marketing_score": 0-1,
  "auth_score": 0-1,
  "explanation": "short text"
}

Be very strict. When in doubt, mark as Marketing.
"""

        user_prompt = f"Classify the following message: {message}"

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.3
            )

            content = response.choices[0].message.content
            result = json.loads(content)

            # Validate and normalize the response
            category = result.get("category", "Utility")
            if category not in ["Utility", "Marketing", "Authentication"]:
                category = "Utility"

            return {
                "category": category,
                "utility_score": float(result.get("utility_score", 0.0)),
                "marketing_score": float(result.get("marketing_score", 0.0)),
                "auth_score": float(result.get("auth_score", 0.0)),
                "explanation": result.get("explanation", "No explanation provided")
            }
        except Exception as e:
            raise Exception(f"Error classifying message: {str(e)}")

    def rewrite_as_utility(self, message: str) -> str:
        """Rewrite a message as a Utility-compliant WhatsApp template."""
        system_prompt = """You are a WhatsApp Template rewriting assistant.
Rewrite the message to be compliant with WhatsApp Utility template rules:
- strictly transactional
- administrative tone only
- no promotional or descriptive wording
- content must be tied to an existing relationship or enrollment."""

        user_prompt = f"Rewrite this as a Utility message: {message}"

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.5
            )

            return response.choices[0].message.content.strip()
        except Exception as e:
            raise Exception(f"Error rewriting message: {str(e)}")
