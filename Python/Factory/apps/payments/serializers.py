from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['amount', 'method', 'status', 'response_message', 'created_at']
        read_only_fields = ['status', 'response_message', 'created_at']
