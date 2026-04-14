import { CoffeeResponse, ExtraIngredient } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/coffee';

export const coffeeService = {
  // Solo calcula (Simulación via Patrón Decorator en Backend)
  previewCoffee: async (extras: ExtraIngredient[]): Promise<CoffeeResponse> => {
    const response = await fetch(`${API_BASE_URL}/preview/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extras }),
    });
    
    if (!response.ok) {
        throw new Error('Error al sincronizar vista previa');
    }
    
    return response.json();
  },

  // Guarda definitivamente en la Base de Datos
  orderCoffee: async (extras: ExtraIngredient[]): Promise<CoffeeResponse> => {
    const response = await fetch(`${API_BASE_URL}/order/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extras }),
    });
    
    if (!response.ok) {
      throw new Error('Error al procesar la orden');
    }
    
    return response.json();
  },
};
