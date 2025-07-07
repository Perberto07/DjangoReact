from django.db.models import F, Sum, ExpressionWrapper, DecimalField
from django.shortcuts import get_object_or_404
from .models import Product, Customer, Category, Transactions, Order
from .serializer import ProductSerializer, CustomerSerializer, CategorySerializer, TransactionSerializer, TopCustomerSerializer, MostBoughtProductSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models.functions import Upper
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.utils.timezone import now
from datetime import datetime, timedelta
from django.db.models.functions import TruncDate
from django.utils.dateparse import parse_date


class ProtectedViewSet(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response('This is a protected view. You are authenticated.', status=status.HTTP_200_OK)
    

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        product = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def partial_update(self, request, pk=None):
        product = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)        
        
    def destroy(self, request, pk=None):
        product = get_object_or_404(self.queryset, pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='by-barcode')
    def get_by_barcode(self, request):
        barcode = request.query_params.get('barcode')
        if not barcode:
            return Response({'error': 'Barcode is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(product_barcode=barcode)      
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset= self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        category = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def partial_update(self, request, pk= None):
        category = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=True)
    
    def destroy(self, request, pk=None):
        category = get_object_or_404(self.queryset, pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
 
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().annotate(
    upper_name=Upper('customer_name')).order_by('upper_name')
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        customer = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
            
    def partial_update(self, request, pk=None):
        customer = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response (serializer.errors, status=400)
        
    def destroy(self, request, pk=None):
        customer = get_object_or_404(self.queryset, pk=pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
   
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    # All http method are automatically created using ModelViewSet     
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
# Below is views for chart-display dashboard in Frontend

@api_view(['GET'])
def top_customers(request):
    # Get optional query parameters
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    # Default to current month if no date filters are provided
    today = now().date()
    if not start_date or not end_date:
        start_date = today.replace(day=1)
        # First day of next month - 1 day = last day of this month
        next_month = (today.replace(day=28) + timedelta(days=4)).replace(day=1)
        end_date = next_month - timedelta(days=1)
    else:
        # Convert string to date object
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()

    # Calculate subtotal for each order
    subtotal_expr = ExpressionWrapper(
        F('product__product_price') * F('quantity'),
        output_field=DecimalField()
    )

    data = (
        Order.objects
        .filter(transaction__create_at__range=(start_date, end_date))
        .values('transaction__customer__customer_name')
        .annotate(total_spent=Sum(subtotal_expr))
        .order_by('-total_spent')[:5]
    )

    serializer = TopCustomerSerializer(data, many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def most_bought_products(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    filters = {}
    if start_date and end_date:
        filters['transaction__create_at__range'] = [start_date, end_date]

    data = (
        Order.objects
        .filter(**filters)
        .values('product__product_name')
        .annotate(total_quantity=Sum('quantity'))
        .order_by('-total_quantity')[:5]  # Top 5 most bought
    )

    serializer = MostBoughtProductSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def daily_sales(request):
    today = now().date()
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    # Fallback to current month if dates aren't provided
    if start_date and end_date:
        try:
            start_date =    (start_date)
            end_date = parse_date(end_date)
        except ValueError:
            return Response({"error": "Invalid date format."}, status=400)
    else:
        start_date = today.replace(day=1)
        end_date = today

    # Expression to calculate subtotal per item
    subtotal_expr = ExpressionWrapper(
        F('product__product_price') * F('quantity'),
        output_field=DecimalField()
    )

    # Group sales by date
    daily_sales = (
        Order.objects
        .filter(transaction__create_at__date__range=[start_date, end_date])
        .annotate(date=TruncDate('transaction__create_at'))
        .values('date')
        .annotate(total_sales=Sum(subtotal_expr))
        .order_by('date')
    )

    return Response(daily_sales)