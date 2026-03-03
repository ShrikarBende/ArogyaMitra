from fastapi import APIRouter

router = APIRouter(prefix="/workouts", tags=["workouts"])

@router.get("/")
def get_workouts():
    return {"message": "Get user workouts"}

@router.post("/generate")
def generate_workout():
    return {"message": "Generate new workout using AI"}
