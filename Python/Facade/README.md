# Patrón de Diseño: Facade (Fachada) - Backend

## Descripción del Patrón
El patrón **Facade** proporciona una interfaz simplificada a un conjunto complejo de clases, una biblioteca o un framework. En este proyecto, la fachada centraliza la lógica de múltiples subsistemas de un hogar inteligente (seguridad, luces, clima y entretenimiento) en una sola clase controladora.

## Problema que resuelve
Resuelve el problema de la **complejidad estructural** y el **acoplamiento**. Sin la fachada, cualquier cliente del sistema tendría que conocer cómo instanciar e interactuar con cada uno de los subsistemas por separado, duplicando lógica de coordinación en cada vista o controlador.

## Cuándo usarlo
- Cuando necesites proporcionar una interfaz simple para un subsistema sofisticado.
- Cuando quieras desacoplar el código de los controladores del acceso a clases complejas.
- Para agrupar funciones relacionadas en un solo punto de entrada lógico (Escenas).

## Cuándo NO usarlo
- Si la fachada se convierte en un centro de control demasiado grande que viola el principio de responsabilidad única.
- Si el cliente necesita un control fino y personalizado que la fachada oculta por brevedad.

## Implementación en Python (Django)

La lógica reside en una capa de servicios dentro de la aplicación:

```python
# apps/home_automation/services/facade.py

class SmartHomeFacade:
    def __init__(self):
        self.security = SecuritySystem()
        self.lights = LightingSystem()
        self.climate = ClimateControl()
        self.entertainment = EntertainmentSystem()

    def activate_movie_mode(self):
        # Orquesta múltiples subsistemas en una sola operación atómica
        return {
            "action": "Modo Cine Activado",
            "details": [
                self.security.arm(),
                self.lights.set_brightness(10),
                self.climate.set_temperature(22),
                self.entertainment.play_movie("Inception")
            ]
        }
```

## Caso de Uso Propuesto
Se utiliza para la coordinación de un **Hogar Inteligente**. La Fachada expone "Escenas" (Wake Up, Movie Mode, Leave Home) que ejecutan comandos en serie sobre dispositivos de hardware simulados.

## Ejemplo de Ejecución
Al recibir una petición de red, el ViewSet llama a la fachada:

```python
# apps/home_automation/views.py
@action(detail=False, methods=['post'])
def movie_mode(self, request):
    result = self.facade.activate_movie_mode()
    # Se persiste el log en el modelo HomeState y se retorna la respuesta
    state = HomeState.objects.create(...)
    return Response(...)
```
