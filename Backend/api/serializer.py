from .models import Product, Customer, Category
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    product_category_name = serializers.CharField(source = 'product_category.category_name', read_only=True)
    product_category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'product_price', 'product_category', 'product_category_name', 'product_barcode']
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_id', 'customer_name', 'customer_address', 'customer_number']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name']
