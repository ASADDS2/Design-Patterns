from rest_framework import serializers
from .models import CoffeeOrder

class CoffeeOrderSerializer(serializers.ModelSerializer):
    extras = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True, 
        required=False
    )

    class Meta:
        model = CoffeeOrder
        fields = ['id', 'description', 'total_cost', 'extras', 'created_at']
        read_only_fields = ['id', 'description', 'total_cost', 'created_at']

    def create(self, validated_data):
        return super().create(validated_data)
