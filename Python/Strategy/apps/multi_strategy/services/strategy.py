from abc import ABC, abstractmethod


class ShippingStrategy(ABC):

    @abstractmethod
    def calculate(self, weight: float, distance: float) -> float:
        pass


class FedExStrategy(ShippingStrategy):
    """
    Estrategia de cálculo para FedEx.
    Cobra una tarifa base alta + costo por peso y distancia moderate.
    """
    def calculate(self, weight: float, distance: float) -> float:
        base_fee = 20.0
        return base_fee + (weight * 0.5) + (distance * 0.1)


class UPSStrategy(ShippingStrategy):
    """
    Estrategia de cálculo para UPS.
    Cobra una tarifa base baja pero penaliza más el peso.
    """
    def calculate(self, weight: float, distance: float) -> float:
        base_fee = 10.0
        return base_fee + (weight * 0.8) + (distance * 0.05)


class DHLStrategy(ShippingStrategy):
    """
    Estrategia de cálculo para DHL.
    Especializado en larga distancia.
    """
    def calculate(self, weight: float, distance: float) -> float:
        base_fee = 15.0
        return base_fee + (weight * 0.4) + (distance * 0.08)


class ShippingCalculator:
    """
    Contexto que utiliza una estrategia para realizar el cálculo.
    """
    def __init__(self, strategy: ShippingStrategy):
        self._strategy = strategy

    @property
    def strategy(self) -> ShippingStrategy:
        return self._strategy

    @strategy.setter
    def strategy(self, strategy: ShippingStrategy):
        self._strategy = strategy

    def execute_calculation(self, weight: float, distance: float) -> float:
        return self._strategy.calculate(weight, distance)
