from django.db import models

    
class Category(models.Model):
    category_name = models.CharField(max_length=50, primary_key=True, unique=True)
    def __str__(self):
        return self.category_name    

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=40)
    product_price = models.DecimalField(max_digits=5, decimal_places=2)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE )  

    def __str__(self):
        return self.product_name
    
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=40)
    customer_address = models.CharField(max_length=100, null=True, blank=True)
    customer_number = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.customer_name