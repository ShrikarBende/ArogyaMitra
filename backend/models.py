from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    health_assessment = relationship("HealthAssessment", back_populates="user", uselist=False)
    workout_plans = relationship("WorkoutPlan", back_populates="user")
    nutrition_plans = relationship("NutritionPlan", back_populates="user")
    progress_records = relationship("ProgressRecord", back_populates="user")

class HealthAssessment(Base):
    __tablename__ = "health_assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    age = Column(Integer)
    weight = Column(Float)
    height = Column(Float)
    fitness_goal = Column(String)
    medical_history = Column(Text, nullable=True)
    allergies = Column(Text, nullable=True)

    user = relationship("User", back_populates="health_assessment")

class WorkoutPlan(Base):
    __tablename__ = "workout_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_data = Column(Text) # Stored as JSON string
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="workout_plans")

class NutritionPlan(Base):
    __tablename__ = "nutrition_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_data = Column(Text) # Stored as JSON string
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="nutrition_plans")

class ProgressRecord(Base):
    __tablename__ = "progress_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=datetime.datetime.utcnow)
    calories_burned = Column(Float, default=0)
    workout_completed = Column(Boolean, default=False)
    weight = Column(Float, nullable=True)

    user = relationship("User", back_populates="progress_records")
