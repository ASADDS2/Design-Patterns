class SecuritySystem:
    def arm(self): return "Sistema de seguridad ARMADO."
    def disarm(self): return "Sistema de seguridad DESARMADO."
class LightingSystem:
    def set_brightness(self, level): return f"Luces ajustadas al {level}%."
    def turn_off(self): return "Luces APAGADAS."
class ClimateControl:
    def set_temperature(self, temp): return f"Temperatura establecida en {temp}°C."
class EntertainmentSystem:
    def play_movie(self, movie): return f"Reproduciendo: {movie}."
    def stop(self): return "Sistema de entretenimiento detenido."

class SmartHomeFacade:
    def __init__(self):
        self.security = SecuritySystem()
        self.lights = LightingSystem()
        self.climate = ClimateControl()
        self.entertainment = EntertainmentSystem()
    def activate_movie_mode(self):
        results = [
            self.security.arm(),
            self.lights.set_brightness(10),
            self.climate.set_temperature(22),
            self.entertainment.play_movie("Inception")
        ]
        return {"action": "Modo Cine Activado", "details": results}
    def activate_wake_up_mode(self):
        results = [
            self.security.disarm(),
            self.lights.set_brightness(100),
            self.climate.set_temperature(24),
            self.entertainment.stop()
        ]
        return {"action": "Modo Despertar Activado", "details": results}