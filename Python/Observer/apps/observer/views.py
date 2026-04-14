from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['post'])
    def change_market_data(self, request, pk=None):
        product = self.get_object()
        new_price = request.data.get('price')
        new_stock = request.data.get('stock')
        
        product.update_data(new_price=new_price, new_stock=new_stock)
        
        return Response({
            'message': 'Data updated',
            'product': ProductSerializer(product).data
        }, status=status.HTTP_200_OK)
