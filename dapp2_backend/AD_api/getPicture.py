from rest_framework.generics import RetrieveAPIView
from .models import Picture
from .picSerializer import PictureSerializer

class PictureDetailView(RetrieveAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    lookup_field = 'unique_id'