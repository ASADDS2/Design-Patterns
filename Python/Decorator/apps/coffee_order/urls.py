from django.urls import path
from .views import CoffeeOrderView, CoffeePreviewView

urlpatterns = [
    path('order/', CoffeeOrderView.as_view(), name='coffee-order'),
    path('preview/', CoffeePreviewView.as_view(), name='coffee-preview'),
]
