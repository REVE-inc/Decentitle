# resume_api/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserProfile, Experience
from .serializers import UserProfileSerializer, ExperienceSerializer
from .blockchain import BlockchainClient
from datetime import datetime
import os

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    blockchain_client = BlockchainClient()

    @action(detail=False, methods=['post'])
    def register_job_seeker(self, request):
        address = request.data.get('address')
        private_key = request.data.get('private_key')

        try:
            # 調用智能合約
            transaction = self.blockchain_client.build_transaction(
                'registerAsJobSeeker',
                [],
                address
            )
            receipt = self.blockchain_client.sign_and_send_transaction(
                transaction,
                private_key
            )

            # 創建用戶檔案
            user_profile = UserProfile.objects.create(
                address=address,
                user_type=1  # JobSeeker
            )

            return Response({
                'status': 'success',
                'transaction_hash': receipt['transactionHash'].hex(),
                'user_profile': UserProfileSerializer(user_profile).data
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def register_company(self, request):
        address = request.data.get('address')
        private_key = request.data.get('private_key')
        name = request.data.get('name')
        description = request.data.get('description')

        try:
            # 調用智能合約
            transaction = self.blockchain_client.build_transaction(
                'registerAsCompany',
                [name, description],
                address
            )
            receipt = self.blockchain_client.sign_and_send_transaction(
                transaction,
                private_key
            )

            # 創建用戶檔案
            user_profile = UserProfile.objects.create(
                address=address,
                user_type=2  # Company
            )

            return Response({
                'status': 'success',
                'transaction_hash': receipt['transactionHash'].hex(),
                'user_profile': UserProfileSerializer(user_profile).data
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    blockchain_client = BlockchainClient()

    def create(self, request):
        user_profile = UserProfile.objects.get(address=request.data.get('address'))
        if user_profile.user_type != 1:  # 檢查是否為求職者
            return Response({
                'status': 'error',
                'message': 'Only job seekers can add experience'
            }, status=status.HTTP_403_FORBIDDEN)

        try:
            # 轉換日期格式為timestamp
            start_date = int(datetime.strptime(
                request.data.get('start_date'),
                '%Y-%m-%d'
            ).timestamp())
            end_date = int(datetime.strptime(
                request.data.get('end_date'),
                '%Y-%m-%d'
            ).timestamp())

            # 調用智能合約
            transaction = self.blockchain_client.build_transaction(
                'addExperience',
                [
                    request.data.get('category'),
                    request.data.get('institution'),
                    request.data.get('title'),
                    start_date,
                    end_date,
                    request.data.get('description')
                ],
                request.data.get('address')
            )
            receipt = self.blockchain_client.sign_and_send_transaction(
                transaction,
                request.data.get('private_key')
            )

            # 從事件中獲取experience index
            event = self.blockchain_client.contract.events.ExperienceAdded()\
                .process_receipt(receipt)[0]
            chain_index = event['args']['index']

            # 創建經歷記錄
            experience = Experience.objects.create(
                user_profile=user_profile,
                category=request.data.get('category'),
                institution=request.data.get('institution'),
                title=request.data.get('title'),
                start_date=datetime.fromtimestamp(start_date),
                end_date=datetime.fromtimestamp(end_date),
                description=request.data.get('description'),
                chain_index=chain_index
            )

            return Response({
                'status': 'success',
                'transaction_hash': receipt['transactionHash'].hex(),
                'experience': ExperienceSerializer(experience).data
            })
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        experience = self.get_object()
        verifier_address = request.data.get('address')
        
        # 檢查驗證者是否為已驗證的公司
        try:
            company = UserProfile.objects.get(
                address=verifier_address,
                user_type=2
            )
            
            # 調用智能合約
            transaction = self.blockchain_client.build_transaction(
                'verifyExperience',
                [experience.user_profile.address, experience.chain_index],
                verifier_address
            )
            receipt = self.blockchain_client.sign_and_send_transaction(
                transaction,
                request.data.get('private_key')
            )

            # 更新經歷狀態
            experience.is_valid = True
            experience.verifier = verifier_address
            experience.save()

            return Response({
                'status': 'success',
                'transaction_hash': receipt['transactionHash'].hex(),
                'experience': ExperienceSerializer(experience).data
            })
        except UserProfile.DoesNotExist:
            return Response({
                'status': 'error',
                'message': 'Verifier must be a verified company'
            }, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)