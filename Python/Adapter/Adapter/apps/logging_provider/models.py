from django.db import models

class LogEntry(models.Model):
    message = models.CharField(max_length=255)
    level = models.CharField(
        max_length=10,
        choices=[("info", "Info"), ("error", "Error")],
        default="info",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Log Entries"

    def __str__(self):
        return f"{self.level.upper()}: {self.message}"
