from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Picture
from .picSerializer import PictureSerializer

class PictureUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = PictureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            unique_id = serializer.data.get('unique_id')
            return Response({'unique_id': unique_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
