from django.contrib import admin
from django.urls import path
from api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product', ProductViewSet, basename='product' )
router.register('customer', CustomerViewSet, basename='customer' )
router.register('category', CategoryViewSet, basename='category' )
urlpatterns = router.urls

#app_name= 'api'
#urlpatterns = [
#    path('product/', views.ProductList, name='product_api'),
#    path('product/<int:id>/', views.ProductDetail, name='product-detail'),
#    path('customer/', views.CustomerList, name='customer_api'),
#    path('customer/<int:id>/', views.CustomerDetail, name='customer-detail'),
#]  