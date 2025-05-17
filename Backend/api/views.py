from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Product, Customer
from .serializer import ProductSerializer, CustomerSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response



class ProductViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    

    def list(self, request):
        queryset = self.queryset
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
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        product = self.queryset(pk=pk)
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def delete(self, request, pk=None):
        product = self.queryset(pk=pk)
        product.delete()

    





class CustomerViewSet(viewsets.ViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer(queryset, many= True)
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = self.queryset
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
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass