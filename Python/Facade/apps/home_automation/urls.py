from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SmartHomeViewSet
router = DefaultRouter()
router.register(r'control', SmartHomeViewSet, basename='home-control')
urlpatterns = [
    path('', include(router.urls)),
]