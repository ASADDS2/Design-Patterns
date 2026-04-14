import React from 'react';
import { PaymentMethod, PaymentConfig } from '../types/payment';

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);

const PayPalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 18V5h4a4 4 0 0 1 0 8H7"></path>
    <path d="M11 15v5a2 2 0 0 1-2 2H7"></path>
  </svg>
);

const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"></path>
    <path d="M3 10h18"></path>
    <path d="M5 6l7-3 7 3"></path>
    <path d="M4 10v11"></path>
    <path d="M20 10v11"></path>
    <path d="M8 14v3"></path>
    <path d="M12 14v3"></path>
    <path d="M16 14v3"></path>
  </svg>
);

export const PaymentUIFactory = {
  getPaymentConfig: (method: PaymentMethod): PaymentConfig => {
    switch (method) {
      case 'credit_card':
        return {
          title: 'Tarjeta de Crédito',
          description: 'Pago seguro vía pasarela Stripe',
          icon: <CreditCardIcon />,
          color: '#dc2b2b' // Rojo de la paleta Cyberpunk
        };
      case 'paypal':
        return {
          title: 'PayPal',
          description: 'Transferencia instantánea con tu cuenta',
          icon: <PayPalIcon />,
          color: '#156085' // Azul claro de la paleta
        };
      case 'bank_transfer':
        return {
          title: 'Transferencia Bancaria',
          description: 'Depósito manual con instrucciones',
          icon: <BankIcon />,
          color: '#10436c' // Azul oscuro de la paleta
        };
      default:
        throw new Error(`Método '${method}' no existe en la Factory.`);
    }
  }
};
