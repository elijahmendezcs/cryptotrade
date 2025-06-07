# bot_controller.py
from fastapi import APIRouter, Depends
from auth import get_current_user
from bot_state import BotStatus, BotState

bot_router = APIRouter()

@bot_router.post("/start")
def start(user=Depends(get_current_user)):
    if BotStatus.get_state() != BotState.RUNNING:
        BotStatus.set_state(BotState.RUNNING)
        return {"message": f"Bot started by {user['username']}"}
    return {"message": "Bot already running."}

@bot_router.post("/pause")
def pause(user=Depends(get_current_user)):
    if BotStatus.get_state() == BotState.RUNNING:
        BotStatus.set_state(BotState.PAUSED)
        return {"message": "Bot paused."}
    return {"message": "Bot not running or already paused."}

@bot_router.post("/stop")
def stop(user=Depends(get_current_user)):
    if BotStatus.get_state() != BotState.STOPPED:
        BotStatus.set_state(BotState.STOPPED)
        return {"message": "Bot stopped."}
    return {"message": "Bot already stopped."}
