# Patron de Diseño: Singleton

## Descripción del Patrón
El patrón **Singleton** es un patrón de diseño creacional que garantiza que una clase tenga **una única instancia** en todo el ciclo de vida de la aplicación y proporciona un punto de acceso global a dicha instancia.

## Problema que resuelve
Resuelve la necesidad de coordinar el acceso a un recurso compartido o a un estado global desde diferentes partes de un sistema, evitando la creación de múltiples instancias que podrían llevar a inconsistencias de datos, consumo innecesario de memoria o conflictos en el acceso a recursos (como una base de datos o un archivo de configuración).

## Cuándo usarlo
- Cuando se necesita un control estricto sobre las variables globales.
- Para gestionar recursos compartidos como conexiones a bases de datos, sistemas de logs o gestores de configuración.
- Cuando una instancia debe estar disponible para muchos clientes a través de un punto de acceso conocido.

## Cuándo NO usarlo
- Si el objeto no tiene un estado global que proteger; en su lugar, se pueden usar clases estáticas o simples módulos.
- En pruebas unitarias, ya que el estado persistente del Singleton puede dificultar el aislamiento de los tests (se recomienda usar Inyección de Dependencias en su lugar).
- Si viola el Principio de Responsabilidad Única (SRP) al controlar su propio ciclo de vida y además realizar su lógica de negocio.

## Implementación en Python
En Python, el Singleton se implementa comúnmente usando una **Metaclase**:

```python
class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class DatabaseConnection(metaclass=SingletonMeta):
    def __init__(self):
        self.connection_id = "DB-12345"
```

## Implementación en JavaScript / TypeScript
En TypeScript, se utiliza un constructor privado y un método estático:

```typescript
class ConfigService {
    private static instance: ConfigService | null = null;
    private constructor() {}

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }
}
```

## Caso de uso propuesto
**Gestor de Configuración de Entorno (Environment Configuration Manager)**:
Se utiliza para centralizar parámetros críticos (URLs de API, tasas de impuestos, horarios de atención) tanto en el Backend (Django) como en el Frontend (React), asegurando que todos los componentes consulten la misma instancia en memoria.

## Ejemplo de ejecución
1. **Backend**:
   ```bash
   python manage.py runserver
   ```
   Al acceder a `/api/mgs/config/`, el `instance_id` devuelto será siempre el mismo sin importar cuántas veces se refresque la página, demostrando la existencia de una única instancia en memoria.

2. **Frontend**:
   ```bash
   npm start
   ```
   En el Dashboard, el "Frontend Instance ID" se genera al arrancar la app y permanece constante durante todo el uso, permitiendo que múltiples componentes compartan el mismo estado de configuración.
