from products.models import FruitVeg, MeatFish, FoodCupboard
from products.serializers import (FruitVegSerializer,
                                  MeatFishSerializer,
                                  FoodCupboardSerializer)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.reverse import reverse


@api_view(['GET'])
def health_handler_api(request, format=None):
    return Response({
        'Fruit and Vegetables': reverse('fnv',
                                        request=request,
                                        format=format),
        'Meat and Fish': reverse('mnf', request=request, format=format),
        'Food Cupboard': reverse('fc', request=request, format=format)
    })


class FruitVegList(ListAPIView):
    queryset = FruitVeg.objects.all()
    serializer_class = FruitVegSerializer


class FruitVegDetails(RetrieveAPIView):
    queryset = FruitVeg.objects.all()
    serializer_class = FruitVegSerializer


class MeatFishList(ListAPIView):
    queryset = MeatFish.objects.all()
    serializer_class = MeatFishSerializer


class MeatFishDetails(RetrieveAPIView):
    queryset = MeatFish.objects.all()
    serializer_class = MeatFishSerializer


class FoodCupboardList(ListAPIView):
    queryset = FoodCupboard.objects.all()
    serializer_class = FoodCupboardSerializer


class FoodCupboardDetails(RetrieveAPIView):
    queryset = FoodCupboard.objects.all()
    serializer_class = FoodCupboardSerializer
