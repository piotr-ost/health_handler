from products.models import Product
from products.serializers import ProductSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.reverse import reverse


@api_view(['GET'])
def health_handler_api(request, format=None):
    return Response({
        'Products': reverse('products_list', request=request, format=format),
    })


class ProductsList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetails(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
