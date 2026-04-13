from rest_framework import serializers
from .models import Computer, Component

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class ComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = [
            'id', 
            'name', 
            'cpu', 
            'gpu', 
            'ram', 
            'storage', 
            'total_price'
        ]
        read_only_fields = ['id', 'total_price']
