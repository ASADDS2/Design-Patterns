from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LogEntry
from .serializers import LogEntrySerializer
from .adapters import DjangoLoggerAdapter, ExternalServiceAdapter
from .services import ThirdPartyLogger

class LogTestView(APIView):

    def get(self, request):
        logs = LogEntry.objects.all().order_by('-created_at')
        serializer = LogEntrySerializer(logs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LogEntrySerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data.get("message")
            level = serializer.validated_data.get("level", "info")
            use_external = request.data.get("use_external", False)

            if use_external:
                adaptee = ThirdPartyLogger()
                adapter = ExternalServiceAdapter(adaptee)
            else:
                adapter = DjangoLoggerAdapter()
            if level == "error":
                adapter.log_error(message)
            else:
                adapter.log_info(message)
            serializer.save()

            return Response(
                {"status": "Log procesado y guardado", "adapter": adapter.__class__.__name__, "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
