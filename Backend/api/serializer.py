from .models import *
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

class OrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.product_name')
    product_price = serializers.DecimalField(max_digits=10, 
                                             decimal_places=2,
                                             source='product.product_price')
    class Meta:
        model = Order
        fields = ['id','product_name', 'product_price', 'quantity', 'item_subtotal']

class TransactionSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(
                    queryset=Customer.objects.all(),
                    slug_field='customer_name')
    order_items = OrderSerializer(many=True)
    
    total_price = serializers.SerializerMethodField(method_name='total')
    
    def total(self, obj):
        order_items =obj.order_items.all()
        return sum(order_item.item_subtotal for order_item in order_items)
    
    class Meta:
        model = Transactions
        fields = ['transaction_id', 'customer', 'create_at','order_items', 'total_price' ]   
        