from django.db.models import Model, CharField, FloatField


class Product(Model):
    """
    price is per one of the product, e.g.
     price: 5, amount: 100, unit: g <==> $5 per this product of 100g
    unit as 'unit' means for one unit of the product
    """
    store = CharField(max_length=20)
    name = CharField(max_length=100)
    img_url = CharField(max_length=200)
    price = FloatField(max_length=20)
    currency = CharField(max_length=5)
    amount = CharField(max_length=20)
    unit = CharField(max_length=10)
