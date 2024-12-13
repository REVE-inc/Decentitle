from django.urls import path
from .views import CryptoLoginView ,RequestLoginNonceView, UserLoginView, UserRegisterView, RequestNonceView, VerifySignatureView

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('request-nonce/', RequestNonceView.as_view(), name='request-nonce'),
    path('verify-signature/', VerifySignatureView.as_view(), name='verify-signature'),
    path('request-login-nonce/', RequestLoginNonceView.as_view(), name='request-login-nonce'),
    path('crypto-login/', CryptoLoginView.as_view(), name='crypto-login')]