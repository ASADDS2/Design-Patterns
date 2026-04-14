from django.db import models
class HomeState(models.Model):
    last_action = models.CharField(max_length=100, verbose_name="Acción Realizada")
    activated_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha/Hora")
    details = models.JSONField(verbose_name="Detalles de ejecución")
    class Meta:
        verbose_name = "Estado del Hogar"
        verbose_name_plural = "Estados del Hogar"
        ordering = ['-activated_at']
    def __str__(self):
        return f"{self.last_action} - {self.activated_at.strftime('%Y-%m-%d %H:%M')}"