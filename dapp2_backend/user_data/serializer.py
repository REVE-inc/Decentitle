from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

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
