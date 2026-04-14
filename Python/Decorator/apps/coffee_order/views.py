# apps/coffee_order/views.py
from rest_framework import generics
from .models import CoffeeOrder
from .serializers import CoffeeOrderSerializer
from .services.decorators import SimpleCoffee, MilkDecorator, SugarDecorator, VanillaDecorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CoffeeOrderView(generics.CreateAPIView):
    queryset = CoffeeOrder.objects.all()
    serializer_class = CoffeeOrderSerializer

    def perform_create(self, serializer):
        extras = self.request.data.get('extras', [])
        
        coffee = SimpleCoffee()
        for extra in extras:
            if extra == 'milk':
                coffee = MilkDecorator(coffee)
            elif extra == 'sugar':
                coffee = SugarDecorator(coffee)
            elif extra == 'vanilla':
                coffee = VanillaDecorator(coffee)
        
        serializer.save(
            description=coffee.get_description(),
            total_cost=coffee.get_cost()
        )


class CoffeePreviewView(APIView):
    def post(self, request):
        extras = request.data.get('extras', [])
        coffee = SimpleCoffee()

        for extra in extras:
            if extra == 'milk':
                coffee = MilkDecorator(coffee)
            elif extra == 'sugar':
                coffee = SugarDecorator(coffee)
            elif extra == 'vanilla':
                coffee = VanillaDecorator(coffee)
        
        return Response({
            "description": coffee.get_description(),
            "total_cost": round(coffee.get_cost(), 2)
        }, status=status.HTTP_200_OK)
