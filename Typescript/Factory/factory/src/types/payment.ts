import React from 'react';

export type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

export interface PaymentResponse {
  status: string;
  response_message: string;
  method: PaymentMethod;
  amount: number;
}

export interface PaymentConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface PaymentProps {
  amount: number;
  onSuccess: (data: PaymentResponse) => void;
  onError: (error: string) => void;
}
