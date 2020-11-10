from django.urls import path
from django.contrib import admin
from products import views
from django.urls.conf import include
from rest_framework import routers


urlpatterns = [
    path('admin', admin.site.urls),
    path('', views.health_handler_api),

    path('fruit-and-veg', views.FruitVegList.as_view(), name='fnv'),
    path('fruit-and-veg/<int:pk>/', views.FruitVegDetails.as_view()),

    path('meat-and-fish', views.MeatFishList.as_view(), name='mnf'),
    path('meat-and-fish/<int:pk>', views.MeatFishDetails.as_view()),

    path('food-cupboard', views.FoodCupboardList.as_view(), name='fc'),
    path('food-cupboard/<int:pk>', views.FoodCupboardDetails.as_view()),

    path('api-auth', include('rest_framework.urls')),
]
