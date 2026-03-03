from fastapi import APIRouter
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/coach", tags=["coach"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def aromi_chat(request: ChatRequest):
    if not client:
        return {"response": "AROMI is offline right now (Groq API Key missing)."}
    
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are AROMI, an encouraging, intelligent AI wellness and fitness coach for the ArogyaMitra platform. Keep your responses concise, friendly, and highly actionable."},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=512,
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"response": f"AROMI encountered an error: {str(e)}"}
