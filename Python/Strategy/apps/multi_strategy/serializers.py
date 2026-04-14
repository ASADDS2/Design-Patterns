from rest_framework import serializers

from .models import ShippingRecord


class ShippingCalculationSerializer(serializers.Serializer):
    """
    Serializer para la entrada de datos del cálculo.
    """
    weight = serializers.FloatField(min_value=0.1)
    distance = serializers.FloatField(min_value=0.1)
    strategy = serializers.ChoiceField(choices=['fedex', 'ups', 'dhl'])


class ShippingRecordSerializer(serializers.ModelSerializer):
    """
    Serializer para el historial de registros.
    """
    class Meta:
        model = ShippingRecord
        fields = '__all__'
        read_only_fields = ('calculated_cost', 'created_at')
