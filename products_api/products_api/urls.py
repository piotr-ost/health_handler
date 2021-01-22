from django.urls import path
from django.contrib import admin
from products.views import ProductsList, ProductDetails, health_handler_api
from django.urls.conf import include
from rest_framework import routers


urlpatterns = [
    path('admin', admin.site.urls),
    path('api-auth', include('rest_framework.urls')),

    path('', health_handler_api),
    path('products', ProductsList.as_view(), name='products_list'),
    path('prodcuts/<int:pk>', ProductDetails.as_view(), name='product_details')
]
