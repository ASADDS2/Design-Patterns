# Patrón de Diseño: Factory (Frontend - TypeScript/React)

Este proyecto implementa el patrón **Factory** para gestionar la interfaz de usuario y la configuración de diferentes métodos de pago de forma dinámica en una aplicación React.

## Contenido del Patrón

### Descripción del patrón
El patrón Factory es un patrón creacional que permite centralizar la lógica de creación de objetos (en este caso, configuraciones de UI) basándose en una clave o tipo. En el frontend, es extremadamente útil para renderizar componentes o estilos de forma condicional sin llenar la vista de lógica `if/else`.

### Problema que resuelve
Evita la dispersión de lógica condicional en los componentes de la interfaz. Si mañana se añade un nuevo método de pago, no es necesario tocar el componente de la lista de pagos, solo se añade la nueva configuración en la **Factory**.

### Cuándo usarlo
- Cuando tienes múltiples variantes de un componente o configuración que comparten una estructura común.
- Cuando la lógica para determinar qué variante usar es compleja o depende de datos externos (API).
- Cuando quieres desacoplar la vista de la configuración técnica de los elementos.

### Cuándo NO usarlo
- Para cambios de estilo menores que se pueden manejar con props simples.
- Si solo tienes dos estados (ej. habilitado/deshabilitado), donde un ternario es más limpio.

---

### Implementación en JavaScript / TypeScript
La implementación principal se encuentra en `src/factories/PaymentUIFactory.tsx`.

```typescript
import { PaymentMethod, PaymentConfig } from '../types/payment';

// Factory centralizada para configuraciones de UI de pago
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
      case 'bank_transfer':
        return {
          title: 'Transferencia Bancaria',
          description: 'Depósito manual con instrucciones',
          icon: <BankIcon />,
          color: '#10436c'
        };
      default:
        throw new Error(`Método '${method}' no soportado.`);
    }
  }
};
```

---

### Implementación en Python
Referencia de la implementación en el Backend (`apps/payments/services/factory.py`).

```python
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

### Caso de uso propuesto
**Selector de Métodos de Pago**: El componente de la UI utiliza la Factory para obtener los iconos, colores y textos descriptivos basándose en los métodos de pago que el backend devuelve como disponibles. Esto permite que el componente sea genérico y "estúpido", delegando la inteligencia de configuración a la Factory.

### Ejemplo de ejecución
```typescript
// En un componente de React
const PaymentMethodCard = ({ type }: { type: PaymentMethod }) => {
  const config = PaymentUIFactory.getPaymentConfig(type);

  return (
    <div style={{ borderColor: config.color }}>
      {config.icon}
      <h3>{config.title}</h3>
      <p>{config.description}</p>
    </div>
  );
};
```

---

## Scripts Disponibles
En el directorio `factory`, puedes ejecutar:
- `npm start`: Inicia la aplicación en modo desarrollo.
- `npm run build`: Genera el bundle de producción.
