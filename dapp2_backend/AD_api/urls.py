from django.urls import path
from .uploadvid_view import VideoUploadView
from .getVideo import VideoDetailView
from .getPicture import PictureDetailView
from .picture_view import PictureUploadView
from .checkvid import check_unique_id_exists
from .checkpic import check_picunique_id_exists
urlpatterns = [
    path('uploadvideo/', VideoUploadView.as_view(), name='video_upload'),
    path('uploadpic', PictureUploadView.as_view(), name='pic_upload'),
    path('videoid/<uuid:unique_id>/', VideoDetailView.as_view(), name='video'),
    path('pictureid/<uuid:unique_id>/',PictureDetailView.as_view(), name='picture'),
    path('video/checkstatus/', check_unique_id_exists, name='ckeckstatus_vid'),
    path('picture/checkstatus/',check_picunique_id_exists, name='checkstatus_pic')
]