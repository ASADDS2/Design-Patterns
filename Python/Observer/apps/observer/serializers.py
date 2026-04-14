from rest_framework import serializers
from .models import Product, PriceHistory

class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['price_at_moment', 'timestamp']

class ProductSerializer(serializers.ModelSerializer):
    history_logs = PriceHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'stock', 'last_updated', 'history_logs']
