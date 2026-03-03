import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

def generate_workout_plan(fitness_goal: str, age: int, weight: float, height: float):
    if not client:
        return {"error": "Groq API Key not configured."}
        
    prompt = f"Create a personalized 7-day workout plan for an individual with the following details:\n" \
             f"Age: {age}\nWeight: {weight}kg\nHeight: {height}cm\nGoal: {fitness_goal}\n\n" \
             f"Please provide daily exercises, reps, sets, and rest periods in JSON format."

    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": "You are a professional fitness coach."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=2048,
    )
    
    return completion.choices[0].message.content
