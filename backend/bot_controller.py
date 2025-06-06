# bot_controller
from bot_state import BotState, BotStatus
from utils.logger import logger

def start_bot():
    if BotStatus.get_state() != BotState.RUNNING:
        BotStatus.set_state(BotState.RUNNING)
        logger.info("Bot started.")
        return "Bot started."
    logger.warning("Start called, but was laready running.")
    return "Bot is already running."

def stop_bot():
    if BotStatus.get_state() != BotState.STOPPED:
        BotStatus.set_state(BotState.STOPPED)
        logger.info("Bot stopped.")
        return "Bot stopped."
    logger.warning("Stop called, but was already stopped.")
    return "Bot is already stopped."

def pause_bot():
    if BotStatus.get_state() == BotState.RUNNING:
        BotStatus.set_state(BotState.PAUSED)
        logger.info("Bot paused.")
        return "Bot paused."
    elif BotStatus.get_state() == BotState.PAUSED:
        logger.warning("Paused called, but was already paused.")
        return "Bot is already paused."
    logger.error("Pause attempted while bot was stopped.")
    return "Cannot pause a stopped bot."