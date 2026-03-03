import os
import requests
from dotenv import load_dotenv

load_dotenv()

SPOONACULAR_KEY = os.getenv("SPOONACULAR_KEY")
BASE_URL = "https://api.spoonacular.com"

def generate_meal_plan(target_calories: int, diet: str = None, exclude: str = None):
    if not SPOONACULAR_KEY:
        return {"error": "Spoonacular API key not configured."}
        
    url = f"{BASE_URL}/mealplanner/generate"
    params = {
        "apiKey": SPOONACULAR_KEY,
        "timeFrame": "week",
        "targetCalories": target_calories,
    }
    if diet:
        params["diet"] = diet
    if exclude:
        params["exclude"] = exclude
        
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch meal plan", "details": response.text}
