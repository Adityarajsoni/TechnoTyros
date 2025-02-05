from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

app = FastAPI()

# Load the T5 model
model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Request body model
class QuestionRequest(BaseModel):
    topic: str
    difficulty: str

@app.post("/generate-question")
async def generate_question(req: QuestionRequest):
    try:
        prompt = f"generate a {req.difficulty} question on {req.topic}"
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
        output = model.generate(**inputs, max_length=50)
        question = tokenizer.decode(output[0], skip_special_tokens=True)
        
        return {"question": question}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run this using: uvicorn backend:app --reload
