from fastapi import APIRouter

router = APIRouter(prefix="/health_assessment", tags=["health"])

@router.get("/")
def get_health_assessment():
    return {"message": "Get user health assessment"}

@router.post("/")
def save_health_assessment():
    return {"message": "Save health assessment"}
