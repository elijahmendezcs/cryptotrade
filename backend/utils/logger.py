# utils/logger.py

import logging
from logging.handlers import RotatingFileHandler

# Rotating log: 10 logs max, each max 10 KB
file_handler = RotatingFileHandler(
    "almeda.log", maxBytes=10_000, backupCount=10
)

file_handler.setFormatter(logging.Formatter(
    '%(asctime)s [%(levelname)s] %(message)s'
))

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(logging.Formatter(
    '%(asctime)s [%(levelname)s] %(message)s'
))

logger = logging.getLogger("AlmedaBot")
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)
logger.addHandler(stream_handler)
# Prevent duplicate logs if root logger is used
logger.propagate = False