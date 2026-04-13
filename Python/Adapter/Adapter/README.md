# Adapter (Patrón de Diseño) - Ejemplo en Django

Este proyecto muestra una implementación práctica del **patrón Adapter** usando un caso realista: un proveedor de logging que puede escribir en el logger nativo de Django o en un servicio externo simulado.

## Objetivo

Unificar distintas formas de registrar logs detrás de una **interfaz común** (`LoggerTarget`) para que el código cliente (la vista) no dependa de la API específica de cada sistema de logging.

## Idea del patrón Adapter

- **Target (interfaz esperada)**: `LoggerTarget`
- **Adapters**:
  - `DjangoLoggerAdapter`: adapta llamadas al logging nativo de Django/Python.
  - `ExternalServiceAdapter`: adapta un servicio externo (simulado) `ThirdPartyLogger`.
- **Adaptee (API incompatible que se quiere reutilizar)**: `ThirdPartyLogger`

## Estructura relevante

- `apps/logging_provider/interfaces.py`
  - Define `LoggerTarget`.
- `apps/logging_provider/services.py`
  - Contiene `ThirdPartyLogger` (servicio externo simulado).
- `apps/logging_provider/adapters.py`
  - Implementa `DjangoLoggerAdapter` y `ExternalServiceAdapter`.
- `apps/logging_provider/views.py`
  - Usa el adapter adecuado según el request.
- `apps/logging_provider/urls.py`
  - Expone el endpoint `logs/`.
- `Adapter/urls.py`
  - Incluye las rutas del app bajo `api/`.

## Cómo ejecutar

1. Crea/activa un entorno virtual.
2. Instala dependencias (mínimo):

```bash
pip install django djangorestframework
```

3. Ejecuta migraciones y levanta el servidor:

```bash
python manage.py migrate
python manage.py runserver
```

## Endpoints

Base URL:

- `http://127.0.0.1:8000/api/logs/`

### GET /api/logs/

Devuelve los logs guardados en la base de datos.

### POST /api/logs/

Guarda un log y lo emite usando el adapter seleccionado.

Ejemplo (log usando Django logger):

```bash
curl -X POST "http://127.0.0.1:8000/api/logs/" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Hola desde Django\", \"level\": \"info\", \"use_external\": false}"
```

Ejemplo (log usando servicio externo simulado):

```bash
curl -X POST "http://127.0.0.1:8000/api/logs/" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Hola desde un servicio externo\", \"level\": \"error\", \"use_external\": true}"
```

## Qué observar

- La vista (`LogTestView`) solo habla con `LoggerTarget` (`log_info` / `log_error`).
- Cambiar entre logging interno y externo no requiere cambiar el código cliente, solo elegir el adapter.

