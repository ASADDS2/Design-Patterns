# Patrón de Diseño: Facade (Fachada) - Frontend

## Descripción del Patrón
En el desarrollo de interfaces (Frontend), el patrón **Facade** se utiliza para simplificar el acceso a servicios externos y ocultar la complejidad de la gestión de estados y peticiones asíncronas detrás de una interfaz limpia para los componentes de UI.

## Problema que resuelve
Resuelve la **dispersión de la lógica de red**. Sin una fachada (implementada aquí a través de servicios y hooks personalizados), cada componente tendría que gestionar sus propias peticiones Axios, manejar errores de forma individual y lidiar con la asincronía, lo que ensucia la capa visual.

## Cuándo usarlo
- Para centralizar las llamadas a un API complejo (como nuestra fachada de Django).
- Para abstraer la biblioteca de peticiones (Axios, Fetch) de los componentes de React.
- Para simplificar la manipulación de estados globales relacionados con una entidad de negocio.

## Cuándo NO usarlo
- Si los componentes necesitan un control granular sobre cada paso del ciclo de vida de una petición que la fachada oculta.
- Si el "servicio fachada" se vuelve demasiado grande y difícil de testear por separado.

## Implementación en JavaScript / TypeScript (React)

La fachada se implementa a través de un servicio de API que simplifica la interacción con el backend:

```typescript
// src/api/homeService.ts
export const homeService = {
  activateMovieMode: async (): Promise<HomeState> => {
    // Abstrae la URL, el método y la transformación de datos
    const response = await axios.post(`${API_URL}movie_mode/`);
    return response.data;
  }
};
```

Y un hook que simplifica el uso para los componentes:

```typescript
// src/hooks/useHomeControl.ts
export const useHomeControl = () => {
  // Manejo de carga, estado e historial en un solo lugar
  const activateMovie = () => runScene(homeService.activateMovieMode);
  return { history, loading, activateMovie };
};
```

## Caso de Uso Propuesto
Se implementó un **Dashboard de Hogar Inteligente** con estética Cyberpunk Premium. Los componentes de UI (botones de escena) no saben qué sucede en el servidor; simplemente llaman a una función de la "Fachada Frontend" (el hook) para cambiar el ambiente del hogar.

## Ejemplo de Ejecución
1. El usuario presiona el botón en `SceneControl.tsx`.
2. El componente llama a `activateMovie()` del hook `useHomeControl`.
3. El hook dispara la petición a través de `homeService`.
4. Los componentes se actualizan automáticamente cuando el historial cambia en el estado del hook.
