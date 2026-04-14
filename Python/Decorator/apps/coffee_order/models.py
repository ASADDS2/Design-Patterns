from django.db import models

class CoffeeOrder(models.Model):
    description = models.CharField(max_length=255, verbose_name="Descripción del Pedido")
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Costo Total")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Orden de Café"
        verbose_name_plural = "Órdenes de Café"
        ordering = ['-created_at']

    def __str__(self):
        return f"Orden #{self.id} - {self.description}"
