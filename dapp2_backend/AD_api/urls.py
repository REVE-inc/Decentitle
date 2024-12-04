from django.urls import path
from .uploadvid_view import VideoUploadView
from .getVideo import VideoDetailView
from .picture_view import PictureUploadView
urlpatterns = [
    path('uploadvideo/', VideoUploadView.as_view(), name='video_upload'),
    path('uploadpic', PictureUploadView.as_view(), name='pic_upload'),
    path('video/<uuid:unique_id>/', VideoDetailView.as_view(), name='video'),
]