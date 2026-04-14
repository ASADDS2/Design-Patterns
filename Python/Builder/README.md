# Patrón de Diseño: Builder (Constructor)

## Descripción del Patrón
El patrón **Builder** es un patrón de diseño creacional que permite construir objetos complejos paso a paso. Este patrón separa la construcción de un objeto complejo de su representación, de modo que el mismo proceso de construcción pueda crear diferentes representaciones.

## Problema que Resuelve
Cuando un objeto requiere muchos parámetros en su constructor (especialmente si muchos son opcionales o tienen valores por defecto), el código se vuelve difícil de leer y propenso a errores (el llamado "Constructor Telescópico"). Builder resuelve esto permitiendo una construcción granular y legible.

## Cuándo Usarlo
- Cuando la creación de un objeto implica muchos pasos y componentes opcionales.
- Cuando se desea que el mismo proceso de construcción pueda crear diferentes tipos y representaciones de un objeto (por ejemplo, PCs de gaming vs. PCs de oficina).
- Para evitar constructores gigantes con muchos parámetros.

## Cuándo NO Usarlo
- Si el objeto es simple y tiene pocos parámetros.
- Si la construcción del objeto no requiere pasos secuenciales o variaciones significativas.

---

## Implementación en Python
En el backend, utilizamos una estructura clásica con una interfaz abstracta y un Director.

### Componentes:
- **IComputerBuilder**: Clase base abstracta que define los pasos.
- **GamingBuilder / OfficeBuilder**: Implementaciones concretas.
- **PCManager**: El "Director" que orquestra los pasos predefinidos.

```python
# Ubicación: apps/pc_builder/services/builder_manager.py

class IComputerBuilder(ABC):
    @abstractmethod
    def build_cpu(self, model): pass
    # ... otros pasos ...

class GamingBuilder(IComputerBuilder):
    def build_cpu(self, model):
        self._pc['cpu'] = f"Gaming Pro {model}"
    # ... implementación ...
```

---

## Implementación en JavaScript / TypeScript
En el frontend, utilizamos una interfaz fluida (Fluent Interface) para una mejor experiencia de desarrollo.

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
El aplicativo permite a los usuarios configurar su propia computadora. Dependiendo de las selecciones del usuario, el `PCBuilder` va "ensamblando" virtualmente los componentes elegidos.

## Ejemplo de Ejecución

### Backend (Python)
```python
builder = GamingBuilder()
director = PCManager(builder)
configuracion = director.construct_high_end_gaming()
print(configuracion) 
# Resultado: {'name': 'Alpha Gaming', 'cpu': 'Gaming Pro i9', ...}
```

### Frontend (TypeScript)
```typescript
const builder = new PCBuilder();
const myPc = builder
    .setName("Beast Mode")
    .setCPU("Intel i9")
    .setGPU("RTX 4090")
    .build();
```
