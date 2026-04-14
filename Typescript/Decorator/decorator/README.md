# Patrón de Diseño: Decorator (Decorador)

## Descripción del Patrón
El patrón **Decorator** es un patrón de diseño estructural que permite añadir funcionalidades a objetos de manera dinámica, envolviéndolos en objetos "decoradores". Proporciona una alternativa flexible a la herencia para extender la funcionalidad de una clase.

## Problema que Resuelve
Evita la creación de un número excesivo de subclases para cubrir todas las combinaciones posibles de extensiones. Permite añadir responsabilidades a objetos individuales en lugar de a toda la clase.

## Cuándo Usarlo
- Cuando necesites añadir responsabilidades a objetos individuales de forma dinámica y transparente.
- Cuando la extensión mediante herencia sea imposible o ineficiente.
- Cuando quieras que el objeto original no tenga conocimiento del decorador.

## Cuándo NO Usarlo
- Si el sistema tiene decoradores que dependen de otros decoradores (orden específico muy rígido).
- Si el código resultante se vuelve demasiado complejo de seguir debido a muchas capas de envoltura.

---

## Implementación en Python (Backend)
El backend implementa una estructura de clases donde cada decorador mantiene una referencia al objeto decorado y delega las llamadas.

```python
# Ubicación: apps/coffee_order/services/decorators.py

class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._decorated_coffee = coffee

    def get_cost(self):
        return self._decorated_coffee.get_cost()
```

---

## Implementación en JavaScript / TypeScript (Frontend)
El frontend utiliza TypeScript para asegurar que todos los decoradores cumplan con la interfaz `Coffee`.

```typescript
// Ubicación: src/lib/patterns/CoffeeDecorator.ts

export abstract class CoffeeDecorator implements Coffee {
  protected decoratedCoffee: Coffee;

  constructor(coffee: Coffee) {
    this.decoratedCoffee = coffee;
  }

  getCost(): number {
    return this.decoratedCoffee.getCost();
  }
}
```

---

## Caso de Uso Propuesto: Coffee Shop Order System
Un sistema de pedidos donde un café base puede ser "decorado" con Leche, Azúcar, o Vainilla. Cada decoración incrementa el precio y actualiza la descripción del pedido.

## Ejemplo de Ejecución

### Frontend (TypeScript)
```typescript
const basicCoffee = new SimpleCoffee();
const milkCoffee = new MilkDecorator(basicCoffee);
const vanillaMilkCoffee = new VanillaDecorator(milkCoffee);

console.log(vanillaMilkCoffee.getCost()); // 3.20
console.log(vanillaMilkCoffee.getDescription()); // Café Simple, Leche, Vainilla
```

### Backend (Python)
```python
order = SimpleCoffee()
order = MilkDecorator(order)
order = SugarDecorator(order)

print(f"Total: ${order.get_cost()}") # Total: $2.70
```
