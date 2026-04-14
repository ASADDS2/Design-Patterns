# Patrón de Diseño: Factory (Backend - Python)

Este repositorio contiene la implementación del patrón **Factory Method** aplicado a un sistema de procesamiento de pagos dinámico utilizando Django.

## Contenido del Patrón

### Descripción del patrón
El patrón Factory Method es un patrón de diseño creacional que proporciona una interfaz para crear objetos en una superclase, pero permite a las subclases alterar el tipo de objetos que se crearán. En lugar de instanciar objetos directamente, se utiliza un "método fábrica" centralizado.

### Problema que resuelve
Resuelve el acoplamiento fuerte entre el cliente y las clases concretas. Facilita la extensión del sistema (por ejemplo, añadir un nuevo método de pago) sin necesidad de modificar el código que orquesta el proceso, cumpliendo con el principio de **Abierto/Cerrado**.

### Cuándo usarlo
- Cuando el código no sabe de antemano con qué tipos exactos de objetos trabajará.
- Cuando quieres centralizar la lógica de creación de objetos complejos.
- Cuando quieres permitir que otros desarrolladores extiendan los componentes internos de tu sistema.

### Cuándo NO usarlo
- Para instanciaciones simples donde no hay variabilidad ni lógica de decisión compleja.
- Si el número de subclases es pequeño y no se prevé un crecimiento futuro, ya que introduce clases adicionales.

---

### Implementación en Python
La implementación se encuentra en `apps/payments/services/factory.py`.

```python
from abc import ABC, abstractmethod

# Producto Abstracto
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float):
        pass

# Productos Concretos
class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        return f"Procesando ${amount} mediante Tarjeta de Crédito (Stripe Mock)."

class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        return f"Redirigiendo a PayPal para procesar ${amount}."

class BankTransferProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        return f"Generando instrucciones de transferencia para ${amount}."

# Creador / Factory
class PaymentFactory:
    _processors = {
        'credit_card': CreditCardProcessor,
        'paypal': PayPalProcessor,
        'bank_transfer': BankTransferProcessor
    }

    @staticmethod
    def get_processor(method_type: str) -> PaymentProcessor:
        processor_class = PaymentFactory._processors.get(method_type)
        if not processor_class:
            raise ValueError(f"Método de pago '{method_type}' no soportado.")
        
        return processor_class()
```

---

### Implementación en JavaScript / TypeScript
Referencia de la implementación en el Frontend (`src/factories/PaymentUIFactory.tsx`).

```typescript
export const PaymentUIFactory = {
  getPaymentConfig: (method: PaymentMethod): PaymentConfig => {
    switch (method) {
      case 'credit_card':
        return {
          title: 'Tarjeta de Crédito',
          description: 'Pago seguro vía pasarela Stripe',
          icon: <CreditCardIcon />,
          color: '#dc2b2b'
        };
      case 'paypal':
        return {
          title: 'PayPal',
          description: 'Transferencia instantánea con tu cuenta',
          icon: <PayPalIcon />,
          color: '#156085'
        };
      // ... otros casos
      default:
        throw new Error(`Método '${method}' no existe en la Factory.`);
    }
  }
};
```

---

### Caso de uso propuesto
**Sistema de Pagos Multi-Pasarela**: Un sistema que permite integrar múltiples proveedores de pago (Stripe, PayPal, Transferencias locales) de forma intercambiable. La lógica de negocio principal solo pide un "procesador" a la fábrica basándose en la elección del usuario, sin importar los detalles técnicos de cada integración.

### Ejemplo de ejecución
```python
# Uso en el servicio o vista
try:
    factory = PaymentFactory()
    processor = factory.get_processor('paypal')
    resultado = processor.process_payment(250.00)
    print(resultado) # "Redirigiendo a PayPal para procesar $250.0."
except ValueError as e:
    print(f"Error: {e}")
```
