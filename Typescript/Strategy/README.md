# Patrón de Diseño Strategy - Frontend (React + TS)

Este proyecto implementa el patrón de diseño **Strategy** para un sistema de gestión de logística premium, permitiendo intercambiar algoritmos de cálculo de envío dinámicamente.

## 📖 Descripción del Patrón
El patrón **Strategy** es un patrón de diseño de comportamiento que permite definir una familia de algoritmos, colocar cada uno de ellos en una clase separada y hacer sus objetos intercambiables. En el frontend, esto permite que la UI reaccione a diferentes lógicas de negocio sin complicar los componentes.

## 🧩 Problema que resuelve
Evita la acumulación de lógica compleja y condicionales anidados dentro de los componentes de React. Si tienes varios métodos para procesar datos, el patrón Strategy los desacopla del componente, facilitando el mantenimiento y la escalabilidad.

## ✅ Cuándo usarlo
- Cuando un componente React tiene múltiples formas de procesar una entrada (ej: diferentes métodos de filtrado, ordenamiento o cálculos).
- Cuando quieres implementar previsualizaciones de lógica de negocio en el cliente que coincidan con el backend.
- Cuando quieres seguir el principio de Responsabilidad Única en tus servicios.

## ❌ Cuándo NO usarlo
- Si la lógica es simple y se puede resolver con un ternario o un objeto de mapeo básico.
- Si los algoritmos no van a cambiar ni a aumentar en el futuro.

## 🐍 Implementación en Python (Resumen)
```python
class ShippingStrategy(ABC):
    @abstractmethod
    def calculate(self, weight, distance): pass

class FedExStrategy(ShippingStrategy):
    def calculate(self, weight, distance):
        return 20.0 + (weight * 0.5) + (distance * 0.1)
```

## 📜 Implementación en JavaScript/TypeScript
```typescript
export interface IShippingStrategy {
  calculate(weight: number, distance: number): number;
}

export class UPSStrategy implements IShippingStrategy {
  calculate(weight: number, distance: number): number {
    const baseFee = 10.0;
    return baseFee + (weight * 0.8) + (distance * 0.05);
  }
}

export class ShippingCalculator {
  private strategy: IShippingStrategy;
  constructor(strategy: IShippingStrategy) { this.strategy = strategy; }
  calculate(w, d) { return this.strategy.calculate(w, d); }
}
```

## 🚀 Caso de uso propuesto: Gestión de Logística Premium
Un Dashboard interactivo donde el usuario ingresa datos de un paquete y puede ver en tiempo real cómo varían los costos según el carrier seleccionado (FedEx, UPS, DHL), con una interfaz moderna y animada.

## 💻 Ejemplo de ejecución
1. Iniciar el servidor de desarrollo: `npm run dev`.
2. Ingresar `Peso: 5kg` y `Distancia: 50km`.
3. Seleccionar el icono de **DHL**.
4. El sistema mostrará el costo calculado instantáneamente (Simulación frontend) y permitirá registrarlo en el backend oficial.
