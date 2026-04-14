from django.db import models


class ConfigChangeLog(models.Model):
    """
    Registra en base de datos cada cambio hecho al Singleton.
    Sirve como historial de auditoría: quién cambió qué y cuándo.
    """

    key = models.CharField(max_length=100)
    old_value = models.CharField(max_length=255, blank=True)
    new_value = models.CharField(max_length=255)
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-changed_at"]
        verbose_name = "Registro de cambio"
        verbose_name_plural = "Registros de cambios"

    def __str__(self) -> str:
        return f"[{self.changed_at}] {self.key}: {self.old_value} → {self.new_value}"

