from abc import ABC, abstractmethod


class Coffee(ABC):
    @abstractmethod
    def get_cost(self) -> float:
        pass

    @abstractmethod
    def get_description(self) -> str:
        pass


class SimpleCoffee(Coffee):
    def get_cost(self) -> float:
        return 2.00

    def get_description(self) -> str:
        return "Café Simple"


class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._decorated_coffee = coffee

    def get_cost(self) -> float:
        return self._decorated_coffee.get_cost()

    def get_description(self) -> str:
        return self._decorated_coffee.get_description()


class MilkDecorator(CoffeeDecorator):
    def get_cost(self) -> float:
        return super().get_cost() + 0.50

    def get_description(self) -> str:
        return f"{super().get_description()}, Leche"

class SugarDecorator(CoffeeDecorator):
    def get_cost(self) -> float:
        return super().get_cost() + 0.20

    def get_description(self) -> str:
        return f"{super().get_description()}, Azúcar"

class VanillaDecorator(CoffeeDecorator):
    def get_cost(self) -> float:
        return super().get_cost() + 0.70

    def get_description(self) -> str:
        return f"{super().get_description()}, Vainilla"
