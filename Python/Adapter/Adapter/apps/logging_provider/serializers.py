from rest_framework import serializers
from .models import LogEntry

class LogEntrySerializer(serializers.ModelSerializer):
    level = serializers.ChoiceField(choices=[("info", "Info"), ("error", "Error")], required=False)

    class Meta:
        model = LogEntry
        fields = ['id', 'message', 'level', 'created_at']
