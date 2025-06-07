# main.py
from fastapi import FastAPI
from auth import auth_router
from bot_controller import bot_router

app = FastAPI()

# Mount routes
app.include_router(auth_router, prefix="/auth")
app.include_router(bot_router, prefix="/bot")

@app.get("/")
def home():
    return {"message": "Welcome to Almeda Bot API"}
