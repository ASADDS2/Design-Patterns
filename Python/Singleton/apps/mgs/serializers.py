from rest_framework import serializers

from apps.mgs.models import ConfigChangeLog


class RestaurantConfigSerializer(serializers.Serializer):
    nombre_negocio = serializers.CharField()
    iva = serializers.FloatField()
    propina_por_defecto = serializers.FloatField()
    moneda = serializers.CharField()
    horario_apertura = serializers.CharField()
    horario_cierre = serializers.CharField()
    abierto = serializers.BooleanField()


class UpdateConfigSerializer(serializers.Serializer):
    key = serializers.CharField()
    value = serializers.JSONField()


class ConfigChangeLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigChangeLog
        fields = ["id", "key", "old_value", "new_value", "changed_at"]
