from django.urls import path
from .views import LogTestView

urlpatterns = [
    path('logs/', LogTestView.as_view(), name='log-test'),
]
