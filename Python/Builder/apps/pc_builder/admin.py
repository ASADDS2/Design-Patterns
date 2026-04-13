from django.contrib import admin
from .models import Component, Computer

@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price')

@admin.register(Computer)
class ComputerAdmin(admin.ModelAdmin):
    list_display = ('name', 'cpu', 'gpu', 'total_price')
