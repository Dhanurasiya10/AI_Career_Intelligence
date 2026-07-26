from rest_framework import serializers
from .models import QuestionBank, AssessmentResult, CompanyBenchmark

class QuestionBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = '__all__'

class QuestionForUserSerializer(serializers.ModelSerializer):
    """Omits correct option index when serving test questions to user."""
    class Meta:
        model = QuestionBank
        fields = ('id', 'test_type', 'section', 'difficulty', 'question_text', 'code_snippet', 'options')

class AssessmentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentResult
        fields = '__all__'

class CompanyBenchmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBenchmark
        fields = '__all__'
