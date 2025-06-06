#state of the bot will be tracked here
from enum import Enum, auto

class BotState(Enum):
    STOPPED = auto()
    RUNNING = auto()
    PAUSED = auto()

class BotStatus:
    _state = BotState.STOPPED

    @classmethod
    def get_state(cls):
        return cls._state

    @classmethod
    def set_state(cls, new_state):
        cls._state = new_state
