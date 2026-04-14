# Patrón de Diseño: Observer (Observador) - Frontend

## Descripción del Patrón
El patrón **Observer** es un patrón de diseño de comportamiento que permite que un objeto (Sujeto) notifique a otros objetos (Observadores) sobre cambios en su estado. Es fundamental en el desarrollo de interfaces de usuario modernas para mantener sincronizados diferentes componentes.

## Problema que resuelve
Permite que múltiples componentes de la interfaz reaccionen a cambios en los datos globales sin estar acoplados entre sí. En lugar de pasar rellamadas (callbacks) a través de múltiples niveles de componentes (prop drilling), los componentes simplemente se suscriben a una fuente de verdad central.

## Cuándo usarlo
- Para sincronizar el estado entre componentes hermanos que no comparten un padre directo.
- Para implementar sistemas de notificaciones o "feeds" en tiempo real.
- Cuando los datos de una API deben actualizar múltiples partes de la UI simultáneamente.

## Cuándo NO usarlo
- Si la comunicación entre componentes es simple y directa del padre al hijo.
- En aplicaciones muy pequeñas donde un estado local de React es suficiente.
- Si el flujo de datos se vuelve difícil de rastrear debido a demasiadas suscripciones cruzadas.

## Implementación en TypeScript
La lógica base se encuentra en `src/patterns/Observer.ts`:

```typescript
export interface Observer {
  update(data: any): void;
  getId(): string;
}

export abstract class Subject {
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }

  public notify(data: any): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
```

## Caso de Uso Propuesto: Royal Egyptian Trade Hub
Hemos construido un panel de comercio del Antiguo Egipto. 
- **Sujeto**: `MarketStore.ts` gestiona la lista de productos y sus precios.
- **Observador**: El componente `MarketDashboard.tsx` se suscribe al store. 
Cuando se recibe una actualización de precio desde el backend, el store notifica al dashboard para renderizar los nuevos valores y mostrar las alertas visuales (ej. stock bajo en color rojo).

## Ejemplo de Ejecución
Sigue estos pasos para ver el patrón funcionando en tu navegador:

1. Instala las dependencias:
   ```powershell
   npm install axios lucide-react
   ```
2. Asegúrate de que el archivo `.env` exista para evitar conflictos de ESLint:
   ```text
   SKIP_PREFLIGHT_CHECK=true
   ```
3. Inicia la aplicación:
   ```powershell
   npm start
   ```
4. Abre [http://localhost:3000](http://localhost:3000). Verás la lista de productos egipcios. Haz clic en "Update Price" para ver cómo el patrón Observer actualiza la interfaz y el historial.
