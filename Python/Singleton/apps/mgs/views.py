import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from apps.mgs.models import ConfigChangeLog
from apps.mgs.serializers import (
    ConfigChangeLogSerializer,
    RestaurantConfigSerializer,
    UpdateConfigSerializer,
)
from apps.mgs.services.config_manager import RestaurantConfigManager

logger = logging.getLogger("app")


class RestaurantConfigView(APIView):
    """
    GET /api/mgs/config/
    Retorna la configuración global actual del Singleton.
    El campo 'instance_id' demuestra que siempre es la misma instancia.
    """

    def get(self, request):
        config = RestaurantConfigManager()
        serializer = RestaurantConfigSerializer(data=config.get_all())
        serializer.is_valid()
        return Response({
            "instance_id": id(config),
            "config": serializer.data,
        })


class UpdateConfigView(APIView):
    """
    POST /api/mgs/config/update/
    Modifica un parámetro del Singleton y deja trazabilidad en BD.
    Body esperado: { "key": "abierto", "value": false }
    """

    def post(self, request):
        serializer = UpdateConfigSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        key = serializer.validated_data["key"]
        value = serializer.validated_data["value"]
        config = RestaurantConfigManager()

        try:
            old_value = config.get(key)
            config.set(key, value)

            ConfigChangeLog.objects.create(
                key=key,
                old_value=str(old_value),
                new_value=str(value),
            )

            logger.info(f"Config actualizada: {key} = {value}")
            return Response({
                "instance_id": id(config),
                "updated": {key: value},
                "config": config.get_all(),
            })
        except KeyError as e:
            return Response({"error": str(e)}, status=400)


class ConfigChangeLogView(APIView):
    """
    GET /api/mgs/config/logs/
    Retorna el historial de cambios hechos al Singleton.
    """

    def get(self, request):
        logs = ConfigChangeLog.objects.all()[:20]
        serializer = ConfigChangeLogSerializer(logs, many=True)
        return Response(serializer.data)
