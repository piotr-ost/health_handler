from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['store', 'name', 'img_url', 'price',
                  'currency', 'amount', 'unit']
