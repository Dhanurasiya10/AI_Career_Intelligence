from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class QuestionBank(models.Model):
    TYPE_CHOICES = (
        ('aptitude', 'Aptitude Test'),
        ('technical', 'Technical Test'),
    )
    SECTION_CHOICES = (
        ('quantitative', 'Quantitative'),
        ('logical', 'Logical Reasoning'),
        ('verbal', 'Verbal Ability'),
        ('di', 'Data Interpretation'),
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('sql', 'SQL'),
        ('react', 'React'),
        ('django', 'Django'),
    )
    
    test_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='aptitude')
    section = models.CharField(max_length=30, choices=SECTION_CHOICES, default='quantitative')
    difficulty = models.CharField(max_length=15, default='medium') # easy, medium, hard
    question_text = models.TextField()
    code_snippet = models.TextField(blank=True, null=True)
    options = models.JSONField() # e.g. ["Option A", "Option B", "Option C", "Option D"]
    correct_option_index = models.IntegerField(default=0)
    explanation = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"[{self.test_type.upper()}] {self.section} - {self.question_text[:50]}"

class AssessmentResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assessments')
    test_type = models.CharField(max_length=30) # aptitude, technical, interview, voice
    score = models.FloatField(default=0.0)
    metrics = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.test_type}: {self.score}%"

class CompanyBenchmark(models.Model):
    company_name = models.CharField(max_length=100)
    tier = models.CharField(max_length=50, default="MAANG")
    logo = models.CharField(max_length=50, default="google")
    min_cutoff_score = models.FloatField(default=80.0)
    hiring_status = models.CharField(max_length=50, default="Actively Hiring")
    required_skills = models.JSONField(default=list)

    def __str__(self):
        return self.company_name
