from django.db import models
import uuid
# Create your models here.

class Video(models.Model):
    file = models.FileField(upload_to='video/')
    upload_at = models.DateTimeField(auto_now_add=True)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

class Picture(models.Model):
    image = models.ImageField(upload_to='picture/')
    upload_at = models.DateTimeField(auto_now_add=True)
    unique_id = models.UUIDField(default=uuid.uuid4,editable=False,unique=True)