from django.urls import path
from .views import BuildPcView

urlpatterns = [
    path('build/', BuildPcView.as_view(), name='build-pc'),
]
