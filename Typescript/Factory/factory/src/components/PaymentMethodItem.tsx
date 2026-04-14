import React from 'react';
import { PaymentMethod } from '../types/payment';
import { PaymentUIFactory } from '../factories/PaymentUIFactory';

interface Props {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodItem: React.FC<Props> = ({ method, isSelected, onSelect }) => {
  // Usamos la Factory para obtener los datos de la interfaz
  const config = PaymentUIFactory.getPaymentConfig(method);

  return (
    <div 
      onClick={() => onSelect(method)}
      className={`payment-item ${isSelected ? 'selected' : ''}`}
      style={{ 
        '--accent-color': config.color,
        borderLeft: isSelected ? `4px solid ${config.color}` : '4px solid transparent'
      } as React.CSSProperties}
    >
      <div className="icon-container" style={{ color: config.color }}>
        {config.icon}
      </div>
      <div className="content">
        <h3>{config.title}</h3>
        <p>{config.description}</p>
      </div>
      <div className="radio-circle">
        {isSelected && <div className="inner-circle" style={{ backgroundColor: config.color }}></div>}
      </div>
    </div>
  );
};

export default PaymentMethodItem;
