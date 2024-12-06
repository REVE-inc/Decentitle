from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Video

@api_view(['POST'])
def check_unique_id_exists(request):
    unique_id = request.data.get('unique_id', None)
    if unique_id is None:
        return Response({"error": "unique_id is required."}, status=400)
    
    # 確認資料庫中是否有對應的 unique_id
    exists = Video.objects.filter(unique_id=unique_id).exists()
    print(exists)
    return Response({"exists": exists})
