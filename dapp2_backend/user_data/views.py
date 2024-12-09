from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserLoginSerializer, UserRegisterSerializer

class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': '註冊成功',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'crypto_address': user.crypto_address,
                    'role': user.role,
                    'avatar': request.build_absolute_uri(user.avatar.url) if user.avatar else None
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)