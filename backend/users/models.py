from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('candidate', 'Candidate'),
        ('recruiter', 'Recruiter'),
        ('admin', 'Admin'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    headline = models.CharField(max_length=255, blank=True, null=True, default="Aspiring AI & Software Engineer")
    bio = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    experience_years = models.FloatField(default=2.0)
    target_role = models.CharField(max_length=100, default="Full Stack Developer")
    
    # Portfolio & Social Links
    github_url = models.URLField(blank=True, null=True, default="https://github.com/developer")
    linkedin_url = models.URLField(blank=True, null=True, default="https://linkedin.com/in/developer")
    portfolio_url = models.URLField(blank=True, null=True, default="https://myportfolio.dev")
    
    # Resume & Assets
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    resume_text = models.TextField(blank=True, null=True)
    skills = models.JSONField(default=list, blank=True) # e.g. ["Python", "React", "SQL", "Docker"]
    
    # Live Digital Career Twin Metrics
    employability_score = models.FloatField(default=78.5)
    resume_score = models.FloatField(default=82.0)
    ats_score = models.FloatField(default=85.0)
    aptitude_score = models.FloatField(default=75.0)
    communication_score = models.FloatField(default=80.0)
    technical_score = models.FloatField(default=78.0)
    github_score = models.FloatField(default=84.0)
    portfolio_score = models.FloatField(default=76.0)
    linkedin_score = models.FloatField(default=79.0)
    interview_score = models.FloatField(default=77.0)
    personality_score = models.FloatField(default=81.0)
    
    predicted_salary_min = models.IntegerField(default=1200000) # In INR or USD
    predicted_salary_max = models.IntegerField(default=1800000)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} ({self.email})"
