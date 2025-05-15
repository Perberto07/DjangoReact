from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('CG', 'CANNED GOODS'),
        ('COFFEE', 'COFFEE'),
        ('JUICE', 'JUICE'),
        ('BS', 'BODY SOAP'),
        ('SHAMPOO', 'SHAMPOO'),
        ('LAUNDRY', 'LAUNDRY'),
        ('SNACK', 'SNACKS'),
        ('LIQUIR', 'LIQUIR'),
        ('CIGARETTE', 'CIGARETTES'),
    ]

    product_id = models.IntegerField(primary_key=True, auto_created=True)
    product_name = models.CharField(max_length=40)
    product_price = models.DecimalField(max_digits=5, decimal_places=2)
    product_category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)  # Adjusted max_length

    def __str__(self):
        return self.product_name
