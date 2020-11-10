from django.db import models


class FruitVeg(models.Model):
    """
    Nutritional values are as grams per 100g of product.
    Energy is given as kcal.
    Prices are in £.
    """
    name = models.fields.CharField(max_length=100)
    store = models.fields.CharField(max_length=20)
    price = models.fields.CharField(max_length=20)
    price_per_unit = models.fields.CharField(max_length=20)
    energy = models.fields.CharField(max_length=20)
    fat = models.fields.CharField(max_length=20)
    saturates = models.fields.CharField(max_length=20)
    carbohydrate = models.fields.CharField(max_length=20)
    sugars = models.fields.CharField(max_length=20)
    fibre = models.fields.CharField(max_length=20)
    protein = models.fields.CharField(max_length=20)
    salt = models.fields.CharField(max_length=20)


class MeatFish(models.Model):
    name = models.fields.CharField(max_length=100)
    store = models.fields.CharField(max_length=20)
    price = models.fields.CharField(max_length=20)
    price_per_unit = models.fields.CharField(max_length=20)
    energy = models.fields.CharField(max_length=20)
    fat = models.fields.CharField(max_length=20)
    saturates = models.fields.CharField(max_length=20)
    mono_saturates = models.fields.CharField(max_length=20)
    polyunsaturates = models.fields.CharField(max_length=20)
    carbohydrate = models.fields.CharField(max_length=20)
    sugars = models.fields.CharField(max_length=20)
    fibre = models.fields.CharField(max_length=20)
    protein = models.fields.CharField(max_length=20)
    salt = models.fields.CharField(max_length=20)


class FoodCupboard(models.Model):
    name = models.fields.CharField(max_length=90)
    store = models.fields.CharField(max_length=20)
    price = models.fields.CharField(max_length=20)
    price_per_unit = models.fields.CharField(max_length=20)
    energy = models.fields.CharField(max_length=20)
    fat = models.fields.CharField(max_length=20)
    saturates = models.fields.CharField(max_length=20)
    carbohydrate = models.fields.CharField(max_length=20)
    sugars = models.fields.CharField(max_length=20)
    fibre = models.fields.CharField(max_length=20)
    protein = models.fields.CharField(max_length=20)
    salt = models.fields.CharField(max_length=20)

