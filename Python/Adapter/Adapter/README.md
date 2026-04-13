# Adapter Pattern (Django Example)

## Pattern description

The **Adapter** pattern allows objects with **incompatible interfaces** to work together by introducing an adapter that translates one interface into another.

## Problem it solves

You want to reuse an existing component (a *third-party* or *legacy* API), but your application expects a different interface. Without an adapter, the client code becomes tightly coupled to the external API.

In this project, the API endpoint can log using:

- Django/Python logging (native)
- A simulated external logging service (`ThirdPartyLogger`)

Both are unified behind the same interface (`LoggerTarget`).

## When to use it

- When integrating third-party libraries with interfaces you cannot change.
- When migrating from one implementation to another without rewriting client code.
- When you want to standardize multiple implementations under a single contract.

## When NOT to use it

- When you can change the original class/interface directly (no translation needed).
- When the translation logic becomes too complex (it may indicate a design mismatch).
- When you only need simple data mapping (a small helper function may be enough).

## Python implementation (as in this repo)

**Target interface** (`LoggerTarget`) defines what the client expects:

```python
from abc import ABC, abstractmethod


class LoggerTarget(ABC):

    @abstractmethod
    def log_info(self, message: str) -> None:
        pass

    @abstractmethod
    def log_error(self, message: str) -> None:
        pass
```

**Adaptee** (external API you want to reuse):

```python
class ThirdPartyLogger:

    def send_log(self, text: str, severity: str) -> None:
        print(f"[EXTERNAL SERVICE - {severity.upper()}]: {text}")
```

**Adapters** translate the target interface into the adaptee API:

```python
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
```

## JavaScript implementation (example)

```js
// Target interface (conceptual in JS)
class LoggerTarget {
  logInfo(message) {
    throw new Error("Not implemented");
  }
  logError(message) {
    throw new Error("Not implemented");
  }
}

// Adaptee: third-party logger with a different API
class ThirdPartyLogger {
  sendLog(text, severity) {
    console.log(`[EXTERNAL SERVICE - ${severity.toUpperCase()}]: ${text}`);
  }
}

// Adapter: translates Target calls into Adaptee calls
class ExternalServiceAdapter extends LoggerTarget {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }
  logInfo(message) {
    this.adaptee.sendLog(message, "info");
  }
  logError(message) {
    this.adaptee.sendLog(message, "error");
  }
}
```

## Proposed use case

You expose an API endpoint that records log entries in the database, but depending on the request, you can:

- Use Django logging for local diagnostics.
- Switch to an external service for centralized logging (production).

The controller/view only depends on `LoggerTarget`, so switching logging providers does not require changing the client logic.

## Example of execution

### Relevant project structure

- `apps/logging_provider/interfaces.py` (Target)
- `apps/logging_provider/services.py` (Adaptee)
- `apps/logging_provider/adapters.py` (Adapters)
- `apps/logging_provider/views.py` (Client)
- `apps/logging_provider/urls.py`
- `Adapter/urls.py` (includes app routes under `api/`)

### Run the server

```bash
pip install django djangorestframework
python manage.py migrate
python manage.py runserver
```

### API endpoint

Base URL:

- `http://127.0.0.1:8000/api/logs/`

Create a log using Django logger:

```bash
curl -X POST "http://127.0.0.1:8000/api/logs/" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Hello from Django\", \"level\": \"info\", \"use_external\": false}"
```

Create a log using the simulated external service:

```bash
curl -X POST "http://127.0.0.1:8000/api/logs/" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Hello from an external service\", \"level\": \"error\", \"use_external\": true}"
```

List stored logs:

```bash
curl -X GET "http://127.0.0.1:8000/api/logs/"
```

