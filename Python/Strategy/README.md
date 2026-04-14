# Patrón de Diseño Strategy - Backend (Django)

Este proyecto implementa el patrón de diseño **Strategy** para un sistema de cálculo de costos de envío.

## 📖 Descripción del Patrón
El patrón **Strategy** es un patrón de diseño de comportamiento que permite definir una familia de algoritmos, colocar cada uno de ellos en una clase separada y hacer sus objetos intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.

## 🧩 Problema que resuelve
Resuelve el problema de tener múltiples condicionales (`if-else` o `switch`) para seleccionar un comportamiento específico. Sin este patrón, agregar una nueva variante del algoritmo requiere modificar la clase principal, lo que viola el **Principio de Abierto/Cerrado (Open/Closed Principle)**.

## ✅ Cuándo usarlo
- Cuando tienes muchas clases similares que solo difieren en la forma en que ejecutan algún comportamiento.
- Cuando necesitas distintas variantes de un algoritmo y quieres poder cambiarlas en tiempo de ejecución.
- Cuando quieres aislar la lógica de negocio de un algoritmo de los detalles de implementación del mismo.

## ❌ Cuándo NO usarlo
- Si solo tienes un par de algoritmos que raramente cambian.
- Si los algoritmos son extremadamente simples y no justifican la creación de múltiples clases.
- Si el cliente no necesita conocer las diferencias entre las estrategias.

## 🐍 Implementación en Python
```python
from abc import ABC, abstractmethod

# Interfaz Estrategia
class ShippingStrategy(ABC):
    @abstractmethod
    def calculate(self, weight: float, distance: float) -> float:
        pass

# Estrategias Concretas
class FedExStrategy(ShippingStrategy):
    def calculate(self, weight: float, distance: float) -> float:
        return 20.0 + (weight * 0.5) + (distance * 0.1)

class UPSStrategy(ShippingStrategy):
    def calculate(self, weight: float, distance: float) -> float:
        return 10.0 + (weight * 0.8) + (distance * 0.05)

# Contexto
class ShippingCalculator:
    def __init__(self, strategy: ShippingStrategy):
        self._strategy = strategy

    def execute(self, weight, distance):
        return self._strategy.calculate(weight, distance)
```

## 📜 Implementación en JavaScript/TypeScript
```typescript
interface IShippingStrategy {
  calculate(weight: number, distance: number): number;
}

class DHLStrategy implements IShippingStrategy {
  calculate(weight: number, distance: number): number {
    return 15.0 + (weight * 0.4) + (distance * 0.08);
  }
}
```

## 🚀 Caso de uso propuesto: Calculadora de Envíos
Manejo dinámico de costos de envío para una plataforma de E-commerce. Dependiendo del carrier seleccionado (FedEx, UPS, DHL), el sistema aplica una fórmula diferente sin cambiar la lógica del controlador.

## 💻 Ejemplo de ejecución
**Request:**
```json
POST /api/shipping/calculate/
{
    "weight": 10.5,
    "distance": 100,
    "strategy": "fedex"
}
```

**Response:**
```json
{
    "cost": 35.25,
    "strategy": "fedex",
    "record_id": 1
}
```
