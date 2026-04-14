from django.db import models


class ShippingRecord(models.Model):
    """
    Modelo para registrar las consultas de cálculo de envíos.
    """
    STRATEGY_CHOICES = [
        ('fedex', 'FedEx'),
        ('ups', 'UPS'),
        ('dhl', 'DHL'),
    ]

    weight = models.FloatField()
    distance = models.FloatField()
    strategy_used = models.CharField(max_length=10, choices=STRATEGY_CHOICES)
    calculated_cost = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.strategy_used} - {self.calculated_cost}"

    class Meta:
        verbose_name = "Registro de Envío"
        verbose_name_plural = "Registros de Envíos"
        ordering = ['-created_at']
