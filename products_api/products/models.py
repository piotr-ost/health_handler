from django.db.models import Model, CharField, FloatField


class Product(Model):
    """
    price is per unit, e.g.
     price: 5, unit: kg <==> $5 per kg
    """
    name = CharField(max_length=100)
    store = CharField(max_length=20)
    amount = FloatField(max_length=20)
    price = FloatField(max_length=20)
    price_per_unit = FloadField(max_length=20)
    unit = CharField(max_length=20)
    img_url = CharField(max_length=200)
