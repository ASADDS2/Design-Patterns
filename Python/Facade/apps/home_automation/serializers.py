from rest_framework import serializers
from .models import HomeState
class HomeStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeState
        fields = '__all__'