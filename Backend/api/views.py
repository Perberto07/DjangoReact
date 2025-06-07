from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Product, Customer, Category, Transactions
from .serializer import ProductSerializer, CustomerSerializer, CategorySerializer, TransactionSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many= True)
        return Response(serializer.data)
    
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
    queryset = Category.objects.all()  # ✅ must use .all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

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
        
 
class CustomerViewSet(viewsets.ModelViewSet):

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
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

    
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    