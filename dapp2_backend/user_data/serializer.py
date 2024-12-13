from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Nonce
from eth_account import Account
from eth_account.messages import encode_defunct

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'crypto_address', 'role', 'avatar']

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # 驗證使用者
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError('無此使用者或密碼錯誤')
            
            if not user.check_password(password):
                raise serializers.ValidationError('密碼錯誤')
            
            if not user.is_active:
                raise serializers.ValidationError('帳號已被停用')
            
            # 驗證通過後產生 JWT Token
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }
        else:
            raise serializers.ValidationError('請提供 Email 與 Password')
        

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'crypto_address', 'role', 'avatar']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'required': True}
        }

    def create(self, validated_data):
        # 使用自訂的 create_user 方法建立新用戶
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data.get('username'),
            crypto_address=validated_data.get('crypto_address'),
            role=validated_data.get('role', 0),
            avatar=validated_data.get('avatar')
        )

class RequestLoginNonceSerializer(serializers.Serializer):
    crypto_address = serializers.CharField(max_length=255)

    def validate_crypto_address(self, value):
        if not value.startswith('0x') or len(value) != 42:
            raise serializers.ValidationError("無效的 crypto_address 格式。")
        return value.lower()

class RequestNonceSerializer(serializers.Serializer):
    crypto_address = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    def validate_crypto_address(self, value):
        if not value.startswith('0x') or len(value) != 42:
            raise serializers.ValidationError("無效的 crypto_address 格式。")
        return value.lower()

class VerifySignatureSerializer(serializers.Serializer):
    crypto_address = serializers.CharField(max_length=255)
    nonce = serializers.CharField(max_length=255)
    signature = serializers.CharField(max_length=255)
    email = serializers.EmailField()

    def validate(self, attrs):
        crypto_address = attrs.get('crypto_address').lower()
        nonce = attrs.get('nonce')
        signature = attrs.get('signature')
        email = attrs.get('email')
        print(attrs)
        try:
            user = User.objects.get(crypto_address=crypto_address, email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("未找到對應的用戶。")

        try:
            nonce_record = Nonce.objects.get(user=user, nonce=nonce)
        except Nonce.DoesNotExist:
            raise serializers.ValidationError("無效的 nonce。")

        # 驗證簽名
        try:
            message_hash = encode_defunct(text=nonce)
            recovered_address = Account.recover_message(message_hash, signature=signature)
            user = User.objects.get(email=email)
            user.is_verify_wallet = True
            user.save()
            if recovered_address.lower() != crypto_address:
                raise serializers.ValidationError("簽名驗證失敗。")
            unverified_users = User.objects.filter(is_verify_wallet=False, crypto_address=crypto_address)
            unverified_users.update(crypto_address=None)
        except Exception as e:
            print(e)
            raise serializers.ValidationError(f"簽名驗證過程中出錯: {str(e)}")

        # 刪除 nonce 以避免重複使用
        nonce_record.delete()

        return attrs
    

class RequestLoginNonceSerializer(serializers.Serializer):
    crypto_address = serializers.CharField(max_length=255)

    def validate_crypto_address(self, value):
        if not value.startswith('0x') or len(value) != 42:
            raise serializers.ValidationError("無效的 crypto_address 格式。")
        return value.lower()
    
class CryptoLoginSerializer(serializers.Serializer):
    crypto_address = serializers.CharField(max_length=255)
    nonce = serializers.CharField(max_length=255)
    signature = serializers.CharField(max_length=255)

    def validate(self, attrs):
        crypto_address = attrs.get('crypto_address').lower()
        nonce = attrs.get('nonce')
        signature = attrs.get('signature')

        try:
            user = User.objects.get(crypto_address=crypto_address, is_verify_wallet=True)
        except User.DoesNotExist:
            raise serializers.ValidationError("未找到對應的用戶。")

        try:
            nonce_record = Nonce.objects.get(user=user, nonce=nonce)
        except Nonce.DoesNotExist:
            raise serializers.ValidationError("無效的 nonce。")

        # 檢查 nonce 是否過期 (例如 10 分鐘內有效)
        from django.utils import timezone
        from datetime import timedelta
        if timezone.now() - nonce_record.created_at > timedelta(minutes=10):
            nonce_record.delete()
            raise serializers.ValidationError("nonce 已過期。")

        # 驗證簽名
        try:
            message_hash = encode_defunct(text=nonce)
            recovered_address = Account.recover_message(message_hash, signature=signature)
            if recovered_address.lower() != crypto_address:
                raise serializers.ValidationError("簽名驗證失敗。")
        except Exception as e:
            print(e)
            raise serializers.ValidationError(f"簽名驗證過程中出錯: {str(e)}")

        # 刪除 nonce 以避免重複使用
        nonce_record.delete()

        # 將用戶對象添加到驗證通過的資料中
        attrs['user'] = user

        return attrs