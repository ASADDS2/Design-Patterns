from django.urls import path

from .views import ShippingCalculationView, ShippingHistoryView


urlpatterns = [
    path('calculate/', ShippingCalculationView.as_view(), name='shipping-calculate'),
    path('history/', ShippingHistoryView.as_view(), name='shipping-history'),
]
