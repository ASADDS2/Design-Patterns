from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from .serializers import PaymentSerializer
from .services.factory import PaymentFactory

class ProcessPaymentView(APIView):
    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        
        if serializer.is_valid():
            amount = serializer.validated_data['amount']
            method = serializer.validated_data['method']
            
            try:
                processor = PaymentFactory.get_processor(method)
                result_message = processor.process_payment(float(amount))
                
                payment_record = serializer.save(
                    status='COMPLETED',
                    response_message=result_message
                )
                
                return Response(PaymentSerializer(payment_record).data, status=status.HTTP_201_CREATED)
            
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": "Falló el procesamiento técnica"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        payments = Payment.objects.all().order_by('-created_at')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
