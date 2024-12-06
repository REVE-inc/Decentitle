from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Video
from .videoSerializer import VideoSerializer
from django.http import HttpResponse


class VideoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def options(self, request, *args, **kwargs):
        return HttpResponse(status=200)
    def post(self, request, *args, **kwargs):
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            unique_id = serializer.data.get('unique_id')
            return Response({'unique_id': unique_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)