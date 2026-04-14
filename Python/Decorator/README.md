# Patrón de Diseño: Decorator (Decorador)

## Descripción del Patrón
El patrón **Decorator** es un patrón de diseño estructural que permite añadir funcionalidades a objetos de manera dinámica, envolviéndolos en objetos "decoradores". A diferencia de la herencia tradicional, la decoración permite combinar múltiples comportamientos en tiempo de ejecución de una forma flexible y escalable.

## Problema que Resuelve
Cuando necesitamos añadir múltiples funcionalidades opcionales a un objeto básico, el uso de herencia genera una explosión de subclases (ej: `CafeConLeche`, `CafeConAzucar`, `CafeConLecheYAzucar`). El Decorator resuelve esto permitiendo "envolver" el objeto base con tantas capas de funcionalidad como sea necesario.

## Cuándo Usarlo
- Cuando quieres añadir o eliminar responsabilidades de un objeto en tiempo de ejecución sin afectar a otros objetos de la misma clase.
- Cuando la herencia no es viable debido a la gran cantidad de combinaciones posibles.
- Para seguir el principio de Responsabilidad Única (SRP), dividiendo funcionalidades complejas en clases más pequeñas.

## Cuándo NO Usarlo
- Si tienes pocas combinaciones y la herencia es más simple.
- Si el objeto que vas a decorar tiene muchos métodos (el decorador tendría que implementarlos todos para mantener la interfaz).

---

## Implementación en Python (Backend)
En el backend, definimos una clase base abstracta `Coffee` y decoradores que heredan de una base común `CoffeeDecorator`.

```python
# Ubicación: apps/coffee_order/services/decorators.py

class SimpleCoffee(Coffee):
    def get_cost(self): return 2.00
    def get_description(self): return "Café Simple"

class MilkDecorator(CoffeeDecorator):
    def get_cost(self):
        return super().get_cost() + 0.50
    def get_description(self):
        return f"{super().get_description()}, Leche"
```

---

## Implementación en JavaScript / TypeScript (Frontend)
En el frontend, utilizamos interfaces y clases para replicar la estructura de envoltura, permitiendo un cálculo dinámico en la interfaz de usuario.

```typescript
// Ubicación: src/lib/patterns/CoffeeDecorator.ts

export class MilkDecorator extends CoffeeDecorator {
  getCost(): number {
    return super.getCost() + 0.5;
  }
  getDescription(): string {
    return `${super.getDescription()}, Leche`;
  }
}
```

---

## Caso de Uso Propuesto: Coffee Shop Order System
El sistema permite al usuario pedir un café base y añadirle tantos complementos como desee (Leche, Azúcar, Vainilla). El costo total y la descripción final se calculan automáticamente al "desenvolver" la cadena de decoradores.

## Ejemplo de Ejecución

### Backend (Python)
```python
mi_cafe = SimpleCoffee()
mi_cafe = MilkDecorator(mi_cafe)
mi_cafe = SugarDecorator(mi_cafe)

print(mi_cafe.get_description()) # Café Simple, Leche, Azúcar
print(mi_cafe.get_cost())        # 2.70
```

### Frontend (TypeScript)
```typescript
let myCoffee: Coffee = new SimpleCoffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new VanillaDecorator(myCoffee);

console.log(myCoffee.getDescription()); // Café Simple, Leche, Vainilla
console.log(myCoffee.getCost());        // 3.20
```
