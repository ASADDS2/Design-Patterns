export interface Coffee {
  getCost(): number;
  getDescription(): string;
}

export class SimpleCoffee implements Coffee {
  getCost(): number {
    return 2.0;
  }
  getDescription(): string {
    return "Café Simple";
  }
}

export abstract class CoffeeDecorator implements Coffee {
  protected decoratedCoffee: Coffee;

  constructor(coffee: Coffee) {
    this.decoratedCoffee = coffee;
  }

  getCost(): number {
    return this.decoratedCoffee.getCost();
  }

  getDescription(): string {
    return this.decoratedCoffee.getDescription();
  }
}


export class MilkDecorator extends CoffeeDecorator {
  getCost(): number {
    return super.getCost() + 0.5;
  }
  getDescription(): string {
    return `${super.getDescription()}, Leche`;
  }
}

export class SugarDecorator extends CoffeeDecorator {
  getCost(): number {
    return super.getCost() + 0.2;
  }
  getDescription(): string {
    return `${super.getDescription()}, Azúcar`;
  }
}

export class VanillaDecorator extends CoffeeDecorator {
  getCost(): number {
    return super.getCost() + 0.7;
  }
  getDescription(): string {
    return `${super.getDescription()}, Vainilla`;
  }
}
