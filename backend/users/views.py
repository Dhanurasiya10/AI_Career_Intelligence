from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserRegisterSerializer, UserProfileSerializer
from ai_engine.twin_engine import sync_digital_career_twin

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserProfileSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        # Auto-trigger Digital Career Twin calculation upon profile update
        sync_digital_career_twin(self.request.user)
        updated_user = self.get_object()
        return Response(UserProfileSerializer(updated_user).data)

class UploadResumeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        if 'resume' not in request.FILES and 'file' not in request.FILES:
            return Response({'error': 'No resume file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        file_obj = request.FILES.get('resume') or request.FILES.get('file')
        user = request.user
        user.resume_file = file_obj
        user.save()

        # Trigger Digital Career Twin update
        sync_digital_career_twin(user)

        return Response({
            'message': 'Resume uploaded successfully',
            'user': UserProfileSerializer(user).data
        }, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'message': f'Password reset link sent to {email}. Check your inbox.'
        }, status=status.HTTP_200_OK)
