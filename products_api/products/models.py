from django.db import models


class Product(models.Model):
    """
    Nutritional values are as grams per 100g of product.
    Energy is given as kcal.
    Prices are in £.
    """
    name = models.fields.CharField(max_length=100)
    store = models.fields.CharField(max_length=20)
    amount = models.fields.FloatField(max_length=20)
    unit = models.fields.CharField(max_length=20)
    price = models.fields.FloatField(max_length=20)
