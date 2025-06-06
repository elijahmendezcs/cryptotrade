# Terminal logging file to track actions
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(messages)s',
    handlers=[
        logging.FileHandler("almeda.log"),
        logging.StreamHandler()
    ]
    )

logger = logging.getLogger("AlmedaBot")