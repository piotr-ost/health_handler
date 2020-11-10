from rest_framework import serializers
from .models import FruitVeg, MeatFish, FoodCupboard


class FruitVegSerializer(serializers.ModelSerializer):

    class Meta:
        model = FruitVeg
        fields = ['name', 'store', 'price', 'price_per_unit',
                  'energy', 'fat', 'saturates', 'carbohydrate',
                  'sugars', 'fibre', 'protein', 'salt']


class MeatFishSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeatFish
        fields = ['name', 'store', 'price', 'price_per_unit',
                  'energy', 'fat', 'saturates', 'mono_saturates',
                  'polyunsaturates', 'carbohydrate', 'sugars',
                  'fibre', 'protein', 'salt']


class FoodCupboardSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodCupboard
        fields = ['name', 'store', 'price', 'price_per_unit',
                  'energy', 'fat', 'saturates', 'carbohydrate',
                  'sugars', 'fibre', 'protein', 'salt']
