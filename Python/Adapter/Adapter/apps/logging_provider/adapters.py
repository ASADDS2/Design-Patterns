import logging
from .interfaces import LoggerTarget
from .services import ThirdPartyLogger

logger = logging.getLogger(__name__)

class DjangoLoggerAdapter(LoggerTarget):
    def log_info(self, message: str) -> None:
        logger.info(message)
        print(f"[DJANGO LOG - INFO]: {message}")

    def log_error(self, message: str) -> None:
        logger.error(message)
        print(f"[DJANGO LOG - ERROR]: {message}")

class ExternalServiceAdapter(LoggerTarget):

    def __init__(self, adaptee: ThirdPartyLogger):
        self.adaptee = adaptee

    def log_info(self, message: str) -> None:
        self.adaptee.send_log(message, "info")

    def log_error(self, message: str) -> None:
        self.adaptee.send_log(message, "error")
