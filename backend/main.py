from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth, workouts, nutrition, health, coach

# Automatically create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ArogyaMitra API", description="AI-Driven Workout and Nutrition Planning")

app.include_router(auth.router)
app.include_router(workouts.router)
app.include_router(nutrition.router)
app.include_router(health.router)
app.include_router(coach.router)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def root():
    return {"message": "Welcome to ArogyaMitra API"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "ArogyaMitra API is running successfully"}
