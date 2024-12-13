from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import VerifySignatureSerializer, CryptoLoginSerializer,UserLoginSerializer, UserRegisterSerializer, RequestNonceSerializer, VerifySignatureSerializer,RequestLoginNonceSerializer
import uuid
from .models import Nonce
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
User = get_user_model()


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
    

class RequestNonceView(APIView):
    """
    用戶請求 nonce 以驗證 crypto_address 擁有權
    """
    def post(self, request):
        print(request.data)
        serializer = RequestNonceSerializer(data=request.data)
        if serializer.is_valid():
            crypto_address = serializer.validated_data['crypto_address']
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(crypto_address=crypto_address, email=email)
            except User.DoesNotExist:
                return Response({"error": "未找到對應的用戶。"}, status=status.HTTP_404_NOT_FOUND)

            # 生成唯一 nonce
            nonce = str(uuid.uuid4())
            Nonce.objects.create(user=user, nonce=nonce)

            return Response({"nonce": nonce}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VerifySignatureView(APIView):
    """
    用戶提交簽名以驗證 crypto_address 擁有權
    """
    def post(self, request):
        serializer = VerifySignatureSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "驗證成功。"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RequestLoginNonceView(APIView):
    """
    用戶請求 nonce 以驗證 crypto_address 擁有權並進行登入
    """
    def post(self, request):
        serializer = RequestLoginNonceSerializer(data=request.data)
        if serializer.is_valid():
            crypto_address = serializer.validated_data['crypto_address']
            try:
                user = User.objects.get(crypto_address=crypto_address, is_verify_wallet=True)
            except User.DoesNotExist:
                return Response({"error": "未找到對應的用戶。"}, status=status.HTTP_404_NOT_FOUND)

            # 生成唯一 nonce
            nonce = str(uuid.uuid4())
            Nonce.objects.create(user=user, nonce=nonce)

            return Response({"nonce": nonce}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CryptoLoginView(APIView):
    """
    用戶提交簽名以驗證 crypto_address 擁有權並登入
    """
    def post(self, request):
        serializer = CryptoLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # 生成 JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)