from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, username=None, crypto_address=None, role=0, avatar=None):
        if not email:
            raise ValueError('使用者必須有 Email')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            crypto_address=crypto_address,
            role=role
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, verbose_name='Email')
    username = models.CharField(max_length=50, blank=True, null=True, verbose_name='用戶名稱')
    crypto_address = models.CharField(max_length=255, blank=True, null=True, verbose_name='Crypto 錢包地址')
    role = models.IntegerField(default=0, verbose_name='用戶角色(數字)')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, verbose_name='用戶大頭貼')
    is_verify_wallet = models.BooleanField(default=False, verbose_name='是否驗證錢包')  # 新增欄位
    # Django 欄位
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Nonce(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nonces')
    nonce = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.nonce}"