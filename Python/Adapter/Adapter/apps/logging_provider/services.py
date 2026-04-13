class ThirdPartyLogger:

    def send_log(self, text: str, severity: str) -> None:
        print(f"[SERVICIO EXTERNO - {severity.upper()}]: {text}")
