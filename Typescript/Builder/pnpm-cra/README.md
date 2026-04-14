# Patrón de Diseño: Builder (Constructor)

## Descripción del Patrón
El patrón **Builder** es un patrón de diseño creacional que permite construir objetos complejos paso a paso. Este patrón separa la construcción de un objeto complejo de su representación, de modo que el mismo proceso de construcción pueda crear diferentes representaciones.

## Problema que Resuelve
Cuando un objeto requiere muchos parámetros en su constructor (especialmente si muchos son opcionales o tienen valores por defecto), el código se vuelve difícil de leer y propenso a errores. Builder resuelve esto permitiendo una construcción granular y legible.

## Cuándo Usarlo
- Cuando la creación de un objeto implica muchos pasos y componentes opcionales.
- Cuando se desea que el mismo proceso de construcción pueda crear diferentes tipos y representaciones de un objeto.
- Para evitar constructores gigantes con muchos parámetros.

## Cuándo NO Usarlo
- Si el objeto es simple y tiene pocos parámetros.
- Si la construcción del objeto no requiere pasos secuenciales o variaciones significativas.

---

## Implementación en Python (Backend)
En el backend, utilizamos una estructura clásica con una interfaz abstracta y un Director.

```python
# Ubicación: apps/pc_builder/services/builder_manager.py

class IComputerBuilder(ABC):
    @abstractmethod
    def build_cpu(self, model): pass

class GamingBuilder(IComputerBuilder):
    def build_cpu(self, model):
        self._pc['cpu'] = f"Gaming Pro {model}"
```

---

## Implementación en JavaScript / TypeScript (Frontend)
En el frontend, la clase `PCBuilder` utiliza una interfaz fluida para facilitar la configuración paso a paso en el Wizard.

```typescript
// Ubicación: src/lib/patterns/pcBuilder.ts

export class PCBuilder {
  private pc: Partial<IPC> = {};

  setCPU(cpu: string): this {
    this.pc.cpu = cpu;
    return this;
  }

  build(): IPC {
    const result = { ...this.pc } as IPC;
    this.reset();
    return result;
  }
}
```

---

## Caso de Uso Propuesto: PC Custom Configurator
El sistema guía al usuario a través de una serie de pasos (Nombre, CPU, GPU, RAM, Disco) para armar su equipo ideal. Cada selección del usuario llama a un método del Builder.

## Ejemplo de Ejecución

### Frontend (TypeScript)
```typescript
const builder = new PCBuilder();
const myPc = builder
    .setName("Workstation 2024")
    .setCPU("Intel i7")
    .setRAM("32GB")
    .build();
```

### Backend (Python)
```python
builder = OfficeBuilder()
director = PCManager(builder)
pc_office = director.construct_budget_office()
# Resultado: {'name': 'Office Entry', 'cpu': 'Efficient i3', ...}
```
