import React, { useState } from 'react';
import { PaymentMethod, PaymentResponse } from '../types/payment';
import { paymentService } from '../services/paymentService';
import PaymentMethodItem from './PaymentMethodItem';

const CheckoutDashboard: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [amount, setAmount] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PaymentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcessPayment = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      const result = await paymentService.processPayment(amount, selectedMethod);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'Error en la conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card glass">
        <div className="checkout-header">
          <h1>Finalizar Compra</h1>
          <p className="subtitle">Selecciona tu método de pago preferido</p>
        </div>

        <div className="amount-section">
          <label>Monto a Pagar</label>
          <div className="amount-input-wrapper">
            <span className="currency">$</span>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="amount-input"
            />
          </div>
        </div>

        <div className="payment-methods-list">
          <PaymentMethodItem 
            method="credit_card" 
            isSelected={selectedMethod === 'credit_card'} 
            onSelect={setSelectedMethod} 
          />
          <PaymentMethodItem 
            method="paypal" 
            isSelected={selectedMethod === 'paypal'} 
            onSelect={setSelectedMethod} 
          />
          <PaymentMethodItem 
            method="bank_transfer" 
            isSelected={selectedMethod === 'bank_transfer'} 
            onSelect={setSelectedMethod} 
          />
        </div>

        <button 
          onClick={handleProcessPayment} 
          disabled={loading}
          className="pay-button"
        >
          {loading ? 'Procesando...' : `Pagar $${amount}`}
        </button>

        {response && (
          <div className="response-message success-glow">
            <p>✅ {response.response_message}</p>
          </div>
        )}

        {error && (
          <div className="response-message error-glow">
            <p>❌ {error}</p>
          </div>
        )}
      </div>

      <div className="background-decorations">
        <div className="red-glow"></div>
        <div className="blue-glow"></div>
      </div>
    </div>
  );
};

export default CheckoutDashboard;
