from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ShippingRecord
from .serializers import ShippingCalculationSerializer, ShippingRecordSerializer
from .services.strategy import (
    DHLStrategy,
    FedExStrategy,
    ShippingCalculator,
    UPSStrategy,
)


class ShippingCalculationView(APIView):
    """
    Vista para realizar cálculos de envío utilizando el patrón Strategy.
    """
    def post(self, request):
        serializer = ShippingCalculationSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        weight = serializer.validated_data['weight']
        distance = serializer.validated_data['distance']
        strategy_name = serializer.validated_data['strategy']
        
        # Selección de la estrategia (Pattern Strategy en acción)
        strategies = {
            'fedex': FedExStrategy(),
            'ups': UPSStrategy(),
            'dhl': DHLStrategy(),
        }
        
        selected_strategy = strategies.get(strategy_name)
        calculator = ShippingCalculator(selected_strategy)
        
        # Ejecución del algoritmo
        cost = calculator.execute_calculation(weight, distance)
        
        # Guardar en base de datos
        record = ShippingRecord.objects.create(
            weight=weight,
            distance=distance,
            strategy_used=strategy_name,
            calculated_cost=cost
        )
        
        return Response({
            'cost': cost,
            'strategy': strategy_name,
            'record_id': record.id
        }, status=status.HTTP_200_OK)


class ShippingHistoryView(APIView):
    """
    Vista para obtener el historial de cálculos realizados.
    """
    def get(self, request):
        records = ShippingRecord.objects.all()
        serializer = ShippingRecordSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
