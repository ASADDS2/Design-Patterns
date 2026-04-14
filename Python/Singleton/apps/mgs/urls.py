from django.urls import path

from apps.mgs.views import ConfigChangeLogView, RestaurantConfigView, UpdateConfigView

urlpatterns = [
    path("config/", RestaurantConfigView.as_view(), name="config-get"),
    path("config/update/", UpdateConfigView.as_view(), name="config-update"),
    path("config/logs/", ConfigChangeLogView.as_view(), name="config-logs"),
]
