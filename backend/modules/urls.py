from django.urls import path
from .views import (
    ResumeAnalyzerView, AptitudeQuestionsView, SubmitAptitudeTestView,
    CommunicationAnalyzerView, TechnicalQuestionsView, SubmitTechnicalTestView,
    GithubAnalyzerView, PortfolioAnalyzerView, LinkedinAnalyzerView,
    SubmitMockInterviewView, PersonalityAnalysisView, EmployabilityScoreView,
    LanguageProficiencyView, JobRolePredictionView, CompanyMatchView,
    SalaryPredictionView, SkillGapAnalysisView, LearningRoadmapView,
    AiRecruiterView, DigitalCareerTwinView, CareerPredictionView,
    AdminPanelView, ExportPDFReportView
)

urlpatterns = [
    path('resume-analyzer/', ResumeAnalyzerView.as_view(), name='resume_analyzer'),
    path('aptitude/questions/', AptitudeQuestionsView.as_view(), name='aptitude_questions'),
    path('aptitude/submit/', SubmitAptitudeTestView.as_view(), name='submit_aptitude'),
    path('communication-analyzer/', CommunicationAnalyzerView.as_view(), name='communication_analyzer'),
    path('technical/questions/', TechnicalQuestionsView.as_view(), name='technical_questions'),
    path('technical/submit/', SubmitTechnicalTestView.as_view(), name='submit_technical'),
    path('github-analyzer/', GithubAnalyzerView.as_view(), name='github_analyzer'),
    path('portfolio-analyzer/', PortfolioAnalyzerView.as_view(), name='portfolio_analyzer'),
    path('linkedin-analyzer/', LinkedinAnalyzerView.as_view(), name='linkedin_analyzer'),
    path('mock-interview/submit/', SubmitMockInterviewView.as_view(), name='submit_mock_interview'),
    path('personality-analysis/', PersonalityAnalysisView.as_view(), name='personality_analysis'),
    path('employability-score/', EmployabilityScoreView.as_view(), name='employability_score'),
    path('language-proficiency/', LanguageProficiencyView.as_view(), name='language_proficiency'),
    path('job-role-prediction/', JobRolePredictionView.as_view(), name='job_role_prediction'),
    path('company-match/', CompanyMatchView.as_view(), name='company_match'),
    path('salary-prediction/', SalaryPredictionView.as_view(), name='salary_prediction'),
    path('skill-gap-analysis/', SkillGapAnalysisView.as_view(), name='skill_gap_analysis'),
    path('learning-roadmap/', LearningRoadmapView.as_view(), name='learning_roadmap'),
    path('ai-recruiter/', AiRecruiterView.as_view(), name='ai_recruiter'),
    path('digital-career-twin/', DigitalCareerTwinView.as_view(), name='digital_career_twin'),
    path('career-prediction/', CareerPredictionView.as_view(), name='career_prediction'),
    path('admin-panel/', AdminPanelView.as_view(), name='admin_panel'),
    path('export-pdf/', ExportPDFReportView.as_view(), name='export_pdf'),
]
