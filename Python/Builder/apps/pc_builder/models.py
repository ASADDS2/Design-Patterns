from django.db import models
class Component(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
class Computer(models.Model):
    name = models.CharField(max_length=100)
    cpu = models.CharField(max_length=100, null=True)
    gpu = models.CharField(max_length=100, null=True)
    ram = models.CharField(max_length=100, null=True)
    storage = models.CharField(max_length=100, null=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)