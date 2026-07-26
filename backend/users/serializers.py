from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'target_role', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            target_role=validated_data.get('target_role', 'Full Stack Developer'),
            role=validated_data.get('role', 'candidate')
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 'role',
            'headline', 'bio', 'phone', 'experience_years', 'target_role',
            'github_url', 'linkedin_url', 'portfolio_url', 'skills', 'resume_file',
            'employability_score', 'resume_score', 'ats_score', 'aptitude_score',
            'communication_score', 'technical_score', 'github_score',
            'portfolio_score', 'linkedin_score', 'interview_score',
            'personality_score', 'predicted_salary_min', 'predicted_salary_max',
            'created_at', 'updated_at'
        )
        read_only_fields = (
            'id', 'employability_score', 'resume_score', 'ats_score', 'aptitude_score',
            'communication_score', 'technical_score', 'github_score',
            'portfolio_score', 'linkedin_score', 'interview_score',
            'personality_score', 'predicted_salary_min', 'predicted_salary_max'
        )
