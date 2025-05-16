from django.contrib import admin
from django.urls import path
from api import views

app_name= 'api'
urlpatterns = [
    path('product/', views.ProductList, name='product_api'),
    path('product/<int:id>/', views.ProductDetail, name='product-detail'),
    path('customer/', views.CustomerList, name='customer_api'),
    path('customer/<int:id>/', views.CustomerDetail, name='customer-detail'),
]   