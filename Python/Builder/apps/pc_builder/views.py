from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.builder_manager import PCManager, GamingBuilder, OfficeBuilder
from .serializer import ComputerSerializer

class BuildPcView(APIView):
    def post(self, request):
        pc_type = request.data.get('type', 'gaming')
        
        # Seleccionamos el Builder según el tipo
        if pc_type == 'gaming':
            builder = GamingBuilder()
        else:
            builder = OfficeBuilder()
            
        manager = PCManager(builder)
        
        # Ejecutamos la construcción predefinida
        if pc_type == 'gaming':
            pc_data = manager.construct_high_end_gaming()
        else:
            pc_data = manager.construct_budget_office()
            
        # Serializamos y Guardamos
        serializer = ComputerSerializer(data=pc_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
