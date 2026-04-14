import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/shipping';

export interface CalculationResponse {
  cost: number;
  strategy: string;
  record_id: number;
}

export interface ShippingHistory {
  id: number;
  weight: number;
  distance: number;
  strategy_used: string;
  calculated_cost: number;
  created_at: string;
}

export const shippingService = {
  calculate: async (weight: number, distance: number, strategy: string): Promise<CalculationResponse> => {
    const response = await axios.post<CalculationResponse>(`${API_BASE_URL}/calculate/`, {
      weight,
      distance,
      strategy
    });
    return response.data;
  },

  getHistory: async (): Promise<ShippingHistory[]> => {
    const response = await axios.get<ShippingHistory[]>(`${API_BASE_URL}/history/`);
    return response.data;
  }
};
