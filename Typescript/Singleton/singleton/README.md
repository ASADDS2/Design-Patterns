# Patron de Diseño: Singleton (Frontend)

## Descripción del Patrón
El patrón **Singleton** es un patrón de diseño creacional que garantiza que una clase tenga **una única instancia** en todo el ciclo de vida de la aplicación y proporciona un punto de acceso global a dicha instancia.

## Problema que resuelve
Resuelve la necesidad de coordinar el acceso a un recurso compartido o a un estado global desde diferentes partes de un sistema, evitando la creación de múltiples instancias que podrían llevar a inconsistencias de datos, consumo innecesario de memoria o conflictos en el acceso a recursos (como una base de datos o un archivo de configuración).

## Cuándo usarlo
- Cuando se necesita un control estricto sobre las variables globales en la aplicación web.
- Para gestionar estados globales que no requieren un framework de manejo de estado complejo (como Redux o Zustand).
- Para centralizar servicios como Clientes de API (Axios/Fetch), Loggers o Gestores de Autenticación.

## Cuándo NO usarlo
- Si el objeto no tiene un estado global que proteger; en su lugar, se pueden usar constantes o simples funciones.
- Si se puede resolver de manera más limpia mediante Inyección de Dependencias o Context API de React.
- Si dificulta la realización de pruebas unitarias debido al estado compartido persistente.

## Implementación en JavaScript / TypeScript
En este proyecto, hemos implementado el Singleton en TypeScript utilizando un constructor privado y un método estático:

```typescript
class ConfigService {
    private static instance: ConfigService | null = null;
    private readonly instanceId: number = Math.floor(Math.random() * 999_999);
    
    private constructor() {}

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public getInstanceId(): number {
        return this.instanceId;
    }
}
```

## Implementación en Python (Referencia)
```python
class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]
```

## Caso de uso propuesto
**Gestor de Configuración del Restaurante**:
Se utiliza para centralizar parámetros como el Nombre del Negocio, IVA, Propina por defecto y horarios. El Singleton garantiza que cualquier componente de React (Panel de Configuración, Formulario, Historial) acceda exactamente a la misma información en tiempo real.

## Ejemplo de ejecución
1. **Ejecutar Frontend**:
   ```bash
   npm start
   ```
2. **Funcionalidad**:
   - En el Dashboard, verás el "Frontend Instance ID". Este número se genera una sola vez. Sin importar cuántos componentes usen el servicio, el ID será idéntico.
   - Al actualizar un valor (ej. IVA), el cambio se refleja en el Singleton y se sincroniza con el Backend a través de la API.
   - El historial muestra los cambios persistidos en la base de datos de Django.
