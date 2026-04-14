from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float):
        pass


class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        return f"Procesando ${amount} mediante Tarjeta de Crédito (Stripe Mock)."

class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        return f"Redirigiendo a PayPal para procesar ${amount}."

class BankTransferProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        return f"Generando instrucciones de transferencia para ${amount}."

class PaymentFactory:
    _processors = {
        'credit_card': CreditCardProcessor,
        'paypal': PayPalProcessor,
        'bank_transfer': BankTransferProcessor
    }

    @staticmethod
    def get_processor(method_type: str) -> PaymentProcessor:
        processor_class = PaymentFactory._processors.get(method_type)
        if not processor_class:
            raise ValueError(f"Método de pago '{method_type}' no soportado.")
        
        return processor_class()
