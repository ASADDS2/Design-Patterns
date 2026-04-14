from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .services.facade import SmartHomeFacade
from .models import HomeState
from .serializers import HomeStateSerializer
class SmartHomeViewSet(viewsets.ModelViewSet):
    queryset = HomeState.objects.all()
    serializer_class = HomeStateSerializer
    facade = SmartHomeFacade()
    @action(detail=False, methods=['post'])
    def movie_mode(self, request):
        result = self.facade.activate_movie_mode()
        state = HomeState.objects.create(
            last_action=result['action'],
            details=result['details']
        )
        return Response(HomeStateSerializer(state).data, status=status.HTTP_201_CREATED)
    @action(detail=False, methods=['post'])
    def wake_up(self, request):
        result = self.facade.activate_wake_up_mode()
        state = HomeState.objects.create(
            last_action=result['action'],
            details=result['details']
        )
        
        return Response(HomeStateSerializer(state).data, status=status.HTTP_201_CREATED)
