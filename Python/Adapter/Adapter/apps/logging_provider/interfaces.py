from abc import ABC, abstractmethod

class LoggerTarget(ABC):

    @abstractmethod
    def log_info(self, message: str) -> None:
        pass

    @abstractmethod
    def log_error(self, message: str) -> None:
        pass
