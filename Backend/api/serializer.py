from .models import Product, Customer
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'product_price', 'product_category']
    
class CustomerSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(default='No Customer Name', allow_blank=True)
    customer_address = serializers.CharField(default='No Address', allow_blank=True)
    customer_number = serializers.IntegerField(default=0, required=False)

    class Meta:
        model = Customer
        fields = ['customer_id', 'customer_name', 'customer_address', 'customer_number']