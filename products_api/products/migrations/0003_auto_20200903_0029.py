# Generated by Django 3.1 on 2020-09-02 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20200824_1206'),
    ]

    operations = [
        migrations.CreateModel(
            name='FruitVeg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('store', models.CharField(max_length=20)),
                ('price', models.CharField(max_length=20)),
                ('price_per_unit', models.CharField(max_length=20)),
                ('energy', models.CharField(max_length=20)),
                ('fat', models.CharField(max_length=20)),
                ('saturates', models.CharField(max_length=20)),
                ('carbohydrate', models.CharField(max_length=20)),
                ('sugars', models.CharField(max_length=20)),
                ('fibre', models.CharField(max_length=20)),
                ('protein', models.CharField(max_length=20)),
                ('salt', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MeatFish',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('store', models.CharField(max_length=20)),
                ('price', models.CharField(max_length=20)),
                ('price_per_unit', models.CharField(max_length=20)),
                ('energy', models.CharField(max_length=20)),
                ('fat', models.CharField(max_length=20)),
                ('saturates', models.CharField(max_length=20)),
                ('mono_saturates', models.CharField(max_length=20)),
                ('polyunsaturates', models.CharField(max_length=20)),
                ('carbohydrate', models.CharField(max_length=20)),
                ('sugars', models.CharField(max_length=20)),
                ('fibre', models.CharField(max_length=20)),
                ('protein', models.CharField(max_length=20)),
                ('salt', models.CharField(max_length=20)),
            ],
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]
