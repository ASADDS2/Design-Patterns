export interface IShippingStrategy {
  name: string;
  calculate(weight: number, distance: number): number;
  description: string;
  icon: string;
}

export class FedExStrategy implements IShippingStrategy {
  name = 'FedEx';
  description = 'Alta confiabilidad y velocidad moderada.';
  icon = 'truck';
  
  calculate(weight: number, distance: number): number {
    const baseFee = 20.0;
    return baseFee + (weight * 0.5) + (distance * 0.1);
  }
}

export class UPSStrategy implements IShippingStrategy {
  name = 'UPS';
  description = 'Eficiente para paquetes pesados.';
  icon = 'package';

  calculate(weight: number, distance: number): number {
    const baseFee = 10.0;
    return baseFee + (weight * 0.8) + (distance * 0.05);
  }
}

export class DHLStrategy implements IShippingStrategy {
  name = 'DHL';
  description = 'Excelente para envíos internacionales y larga distancia.';
  icon = 'globe';

  calculate(weight: number, distance: number): number {
    const baseFee = 15.0;
    return baseFee + (weight * 0.4) + (distance * 0.08);
  }
}

export class ShippingCalculator {
  private strategy: IShippingStrategy;

  constructor(strategy: IShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(weight: number, distance: number): number {
    return this.strategy.calculate(weight, distance);
  }
}
