from django.db import models
from apps.observer.services.observer import Subject, Observer


class Product(models.Model, Subject):
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        Subject.__init__(self)
        self.attach(PriceHistoryObserver())
        self.attach(StockAlertObserver())

    def update_data(self, new_price=None, new_stock=None):
        changed = False
        if new_price is not None and self.price != new_price:
            self.price = new_price
            changed = True
        if new_stock is not None and self.stock != new_stock:
            self.stock = new_stock
            changed = True
        
        if changed:
            self.save()
            self.notify()

    def __str__(self):
        return self.name


class PriceHistory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='history_logs')
    price_at_moment = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)


class PriceHistoryObserver(Observer):
    def update(self, subject):
        print(f"[Observer] Guardando historial para {subject.name}...")
        PriceHistory.objects.create(
            product=subject,
            price_at_moment=subject.price
        )

class StockAlertObserver(Observer):
    def update(self, subject):
        if subject.stock < 5:
            print(f"[Observer] ALERT: Stock crítico para {subject.name}: {subject.stock} unidades.")
