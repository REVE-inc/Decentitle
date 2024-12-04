from rest_framework.generics import RetrieveAPIView
from .models import Video
from .videoSerializer import VideoSerializer

class VideoDetailView(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'unique_id'