from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register():
    return {"message": "Registration endpoint"}

@router.post("/login")
def login():
    return {"message": "Login endpoint"}
