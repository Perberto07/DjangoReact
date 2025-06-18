from django.contrib import admin
from django.urls import path
from api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product', ProductViewSet, basename='product' )
router.register('customer', CustomerViewSet, basename='customer' )
router.register('category', CategoryViewSet, basename='category' )
router.register('transaction', TransactionViewSet, basename='transaction' )
#router.register('protected', ProtectedViewSet, basename='protected' )
urlpatterns = [
    path('protected/', ProtectedViewSet.as_view(), name='protected'),
    path('top-customers/', top_customers, name='top-customers'),
    path('top-products/', most_bought_products, name='top-products'),
    path('daily-sales/', daily_sales, name='daily_sales'),
]       


#app_name= 'api'
#urlpatterns = 
urlpatterns= urlpatterns +router.urls