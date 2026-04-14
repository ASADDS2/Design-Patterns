import { PaymentMethod, PaymentResponse } from '../types/payment';

const API_BASE_URL = 'http://localhost:8000/api/payments';

export const paymentService = {
  processPayment: async (amount: number, method: PaymentMethod): Promise<PaymentResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/process/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, method }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al procesar el pago');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment API Error:', error);
      throw error;
    }
  },

  getPaymentHistory: async (): Promise<PaymentResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/process/`);
      if (!response.ok) throw new Error('Error al obtener el historial');
      return await response.json();
    } catch (error) {
      console.error('History API Error:', error);
      throw error;
    }
  }
};
