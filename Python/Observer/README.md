# Patrón de Diseño: Observer (Observador)

## Descripción del Patrón
El patrón **Observer** es un patrón de diseño de comportamiento que permite definir un mecanismo de suscripción para notificar a múltiples objetos sobre cualquier evento que le suceda al objeto que están observando (el "Sujeto").

## Problema que resuelve
Resuelve el problema de la dependencia entre objetos. En lugar de que un objeto esté constantemente consultando a otro si ha cambiado su estado (polling), el objeto "Sujeto" avisa automáticamente a todos sus "Observadores" registrados cuando ocurre un cambio relevante. Esto evita el acoplamiento fuerte entre los componentes.

## Cuándo usarlo
- Cuando un cambio en un objeto requiere cambiar otros, y no sabemos cuántos objetos necesitan cambiar.
- Cuando un objeto debe ser capaz de notificar a otros sin hacer suposiciones sobre quiénes son esos objetos.
- Para implementar sistemas de manejo de eventos o notificaciones.

## Cuándo NO usarlo
- Si la relación de dependencia es simple y estática.
- Si el número de observadores es muy pequeño y no cambiará, el patrón puede añadir complejidad innecesaria.
- Si los observadores necesitan realizar cambios en el Sujeto que a su vez disparen más notificaciones (riesgo de bucles infinitos).

## Implementación en Python
En este proyecto, la lógica base se encuentra en `apps/observer/services/observer.py`:

```python
from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, subject):
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer: Observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def notify(self):
        for observer in self._observers:
            observer.update(self)
```

## Caso de Uso Propuesto: Royal Egyptian Trade Hub
Hemos implementado un sistema de monitoreo de mercado para el Antiguo Egipto. El modelo `Product` es el **Sujeto**. Cuando el precio o el stock de una mercancía (Papiro, Lino, Grano) cambia, se activan los siguientes **Observadores**:
1.  **PriceHistoryObserver**: Registra automáticamente el cambio en la tabla de historial `PriceHistory`.
2.  **StockAlertObserver**: Emite una alerta en la consola si el stock cae por debajo de un nivel crítico.

## Ejemplo de Ejecución
Para poblar el mercado inicial y ver el patrón en acción:

1. Ejecuta las migraciones:
   ```powershell
   python manage.py migrate
   ```
2. Ejecuta el comando de siembra (seed):
   ```powershell
   python manage.py seed_market
   ```
3. Inicia el servidor:
   ```powershell
   python manage.py runserver
   ```
4. Al realizar un cambio de precio desde la API o el frontend, verás los logs en la consola del servidor y nuevos registros en el historial.
