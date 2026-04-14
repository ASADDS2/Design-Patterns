from django.core.management.base import BaseCommand
from apps.observer.models import Product

class Command(BaseCommand):
    help = 'Seeds the database with initial Egyptian commodities'

    def handle(self, *args, **kwargs):
        commodities = [
            {'name': 'Golden Papyrus', 'price': 150.00, 'stock': 25},
            {'name': 'Luxor Linen', 'price': 85.50, 'stock': 40},
            {'name': 'Pharaohs Grain', 'price': 45.00, 'stock': 120},
            {'name': 'Nile Incense', 'price': 210.00, 'stock': 4}, # Stock bajo para ver la alerta
            {'name': 'Obsidian Blades', 'price': 340.00, 'stock': 12},
        ]

        for item in commodities:
            product, created = Product.objects.get_or_create(
                name=item['name'],
                defaults={'price': item['price'], 'stock': item['stock']}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created: {product.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Already exists: {product.name}'))
