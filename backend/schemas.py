from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, date

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class HealthAssessmentBase(BaseModel):
    age: int
    weight: float
    height: float
    fitness_goal: str
    medical_history: Optional[str] = None
    allergies: Optional[str] = None

class HealthAssessmentCreate(HealthAssessmentBase):
    pass

class HealthAssessmentResponse(HealthAssessmentBase):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

class WorkoutPlanBase(BaseModel):
    plan_data: str

class WorkoutPlanCreate(WorkoutPlanBase):
    pass

class WorkoutPlanResponse(WorkoutPlanBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
