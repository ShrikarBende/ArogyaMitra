from fastapi import APIRouter

router = APIRouter(prefix="/nutrition", tags=["nutrition"])

@router.get("/")
def get_nutrition_plan():
    return {"message": "Get user nutrition plan"}

@router.post("/generate")
def generate_nutrition_plan():
    return {"message": "Generate new nutrition plan using AI and Spoonacular"}
