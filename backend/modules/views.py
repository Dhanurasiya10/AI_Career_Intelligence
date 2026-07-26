from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse
from django.contrib.auth import get_user_model

from .models import QuestionBank, AssessmentResult, CompanyBenchmark
from .serializers import QuestionForUserSerializer, QuestionBankSerializer, CompanyBenchmarkSerializer

from ai_engine.nlp_parsers import (
    parse_and_score_resume, analyze_voice_communication, analyze_github_profile,
    analyze_portfolio_website, analyze_linkedin_profile, generate_recruiter_decision
)
from ai_engine.ml_models import (
    predict_employability_and_salary, predict_job_role_matches, predict_company_matches
)
from ai_engine.twin_engine import sync_digital_career_twin
from ai_engine.pdf_generator import generate_career_pdf_report

User = get_user_model()

# Module 1: AI Resume Analyzer
class ResumeAnalyzerView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        user = request.user
        resume_text = request.data.get('resume_text') or user.resume_text
        result = parse_and_score_resume(resume_text)
        
        # Save score to user profile & sync career twin
        user.resume_score = result['overall_score']
        user.ats_score = result['ats_score']
        user.save()
        sync_digital_career_twin(user)

        return Response(result, status=status.HTTP_200_OK)

# Module 2: Aptitude Test
class AptitudeQuestionsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        questions = QuestionBank.objects.filter(test_type='aptitude')
        serializer = QuestionForUserSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SubmitAptitudeTestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        answers = request.data.get('answers', {}) # dict of {question_id: selected_index}
        questions = QuestionBank.objects.filter(id__in=answers.keys())
        
        correct_count = 0
        total = len(questions) or 1
        for q in questions:
            if answers.get(str(q.id)) == q.correct_option_index or answers.get(q.id) == q.correct_option_index:
                correct_count += 1

        accuracy = round((correct_count / total) * 100, 1)
        speed_score = 88.0
        problem_solving_score = round(accuracy * 0.95 + 5, 1)
        overall_score = round((accuracy + speed_score + problem_solving_score) / 3, 1)

        user = request.user
        user.aptitude_score = overall_score
        user.save()
        sync_digital_career_twin(user)

        return Response({
            "accuracy": accuracy,
            "speed_score": speed_score,
            "problem_solving_score": problem_solving_score,
            "time_management": "Excellent (45s per question)",
            "overall_aptitude_score": overall_score,
            "correct_answers": correct_count,
            "total_questions": total
        }, status=status.HTTP_200_OK)

# Module 3: Communication Analyzer
class CommunicationAnalyzerView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        transcript = request.data.get('transcript')
        duration = float(request.data.get('duration', 30))
        result = analyze_voice_communication(duration, transcript)

        user = request.user
        user.communication_score = result['communication_score']
        user.save()
        sync_digital_career_twin(user)

        return Response(result, status=status.HTTP_200_OK)

# Module 4: Technical Test
class TechnicalQuestionsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        questions = QuestionBank.objects.filter(test_type='technical')
        serializer = QuestionForUserSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SubmitTechnicalTestView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        answers = request.data.get('answers', {})
        questions = QuestionBank.objects.filter(id__in=answers.keys())
        
        correct_count = 0
        total = len(questions) or 1
        for q in questions:
            if answers.get(str(q.id)) == q.correct_option_index or answers.get(q.id) == q.correct_option_index:
                correct_count += 1

        score = round((correct_count / total) * 100, 1)
        user = request.user
        user.technical_score = score
        user.save()
        sync_digital_career_twin(user)

        return Response({
            "language_wise_score": {"Python": score, "JavaScript": min(100, score + 4), "SQL": min(100, score + 2)},
            "problem_solving": score,
            "algorithm_knowledge": round(score * 0.96, 1),
            "coding_speed": "Fast (18 mins for 5 problems)",
            "optimization_score": round(score * 0.94, 1),
            "overall_technical_score": score
        }, status=status.HTTP_200_OK)

# Module 5: GitHub Analyzer
class GithubAnalyzerView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        github_url = request.data.get('github_url') or request.user.github_url
        result = analyze_github_profile(github_url)

        user = request.user
        user.github_score = result['github_score']
        user.save()
        sync_digital_career_twin(user)

        return Response(result, status=status.HTTP_200_OK)

# Module 6: Portfolio Analyzer
class PortfolioAnalyzerView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        portfolio_url = request.data.get('portfolio_url') or request.user.portfolio_url
        result = analyze_portfolio_website(portfolio_url)

        user = request.user
        user.portfolio_score = result['portfolio_score']
        user.save()
        sync_digital_career_twin(user)

        return Response(result, status=status.HTTP_200_OK)

# Module 7: LinkedIn Analyzer
class LinkedinAnalyzerView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        linkedin_url = request.data.get('linkedin_url') or request.user.linkedin_url
        result = analyze_linkedin_profile(linkedin_url)

        user = request.user
        user.linkedin_score = result['linkedin_score']
        user.save()
        sync_digital_career_twin(user)

        return Response(result, status=status.HTTP_200_OK)

# Module 8: AI Mock Interview
class SubmitMockInterviewView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        # Simulated responses analysis
        eye_contact = 88.0
        confidence = 85.0
        answer_quality = 86.0
        tech_accuracy = 84.0
        emotion = "Focused & Confident"

        overall_interview = round((confidence + answer_quality + tech_accuracy + eye_contact) / 4, 1)

        user = request.user
        user.interview_score = overall_interview
        user.save()
        sync_digital_career_twin(user)

        return Response({
            "interview_score": overall_interview,
            "confidence_score": confidence,
            "eye_contact_score": eye_contact,
            "communication_fluency": 86.0,
            "answer_quality_score": answer_quality,
            "technical_accuracy": tech_accuracy,
            "avg_thinking_time": "3.5 seconds",
            "detected_emotion": emotion,
            "feedback": [
                "Great articulation when describing architectural trade-offs.",
                "Maintain eye contact continuously during scenario-based questions."
            ]
        }, status=status.HTTP_200_OK)

# Module 9: Personality Analysis
class PersonalityAnalysisView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "leadership": 84,
            "creativity": 88,
            "critical_thinking": 90,
            "decision_making": 85,
            "teamwork": 92,
            "stress_management": 82,
            "confidence": 86,
            "communication_style": "Collaborative & Analytical",
            "learning_ability": 94,
            "personality_score": 86.8
        }, status=status.HTTP_200_OK)

# Module 10: Employability Score Breakdown
class EmployabilityScoreView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_metrics = {
            'resume_score': user.resume_score,
            'ats_score': user.ats_score,
            'aptitude_score': user.aptitude_score,
            'communication_score': user.communication_score,
            'technical_score': user.technical_score,
            'github_score': user.github_score,
            'portfolio_score': user.portfolio_score,
            'linkedin_score': user.linkedin_score,
            'interview_score': user.interview_score,
            'personality_score': user.personality_score,
            'experience_years': user.experience_years,
        }
        res = predict_employability_and_salary(user_metrics)

        return Response({
            "overall_employability_score": res["overall_employability"],
            "industry_readiness": res["industry_readiness"],
            "placement_readiness": res["placement_readiness"],
            "breakdown": [
                {"category": "Technical Competency", "score": user.technical_score, "weight": "25%"},
                {"category": "Aptitude & Logical", "score": user.aptitude_score, "weight": "15%"},
                {"category": "Voice & Communication", "score": user.communication_score, "weight": "15%"},
                {"category": "Resume & ATS Score", "score": user.resume_score, "weight": "15%"},
                {"category": "AI Interview Simulation", "score": user.interview_score, "weight": "15%"},
                {"category": "GitHub Code Quality", "score": user.github_score, "weight": "10%"},
                {"category": "Portfolio & UX", "score": user.portfolio_score, "weight": "5%"},
            ]
        }, status=status.HTTP_200_OK)

# Module 11: Language & Tech Proficiency Matrix
class LanguageProficiencyView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "natural_languages": [
                {"language": "English", "proficiency": "Professional / Fluent", "percentage": 92},
                {"language": "Tamil", "proficiency": "Native", "percentage": 98},
                {"language": "Hindi", "proficiency": "Conversational", "percentage": 75},
            ],
            "technical_languages": [
                {"language": "Python", "proficiency": "Expert", "percentage": 94},
                {"language": "JavaScript", "proficiency": "Advanced", "percentage": 88},
                {"language": "React.js", "proficiency": "Advanced", "percentage": 86},
                {"language": "Django", "proficiency": "Advanced", "percentage": 85},
                {"language": "SQL", "proficiency": "Intermediate / Advanced", "percentage": 82},
                {"language": "HTML / CSS", "proficiency": "Expert", "percentage": 95},
                {"language": "Java", "proficiency": "Intermediate", "percentage": 72},
            ]
        }, status=status.HTTP_200_OK)

# Module 12: Job Role Prediction
class JobRolePredictionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        skills = user.skills if isinstance(user.skills, list) and user.skills else ["Python", "React", "SQL", "Django"]
        matches = predict_job_role_matches(skills, user.technical_score, user.experience_years)
        return Response({"roles": matches}, status=status.HTTP_200_OK)

# Module 13: Company Compatibility Match
class CompanyMatchView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_metrics = {
            'employability_score': user.employability_score,
            'technical_score': user.technical_score,
            'interview_score': user.interview_score,
            'resume_score': user.resume_score
        }
        matches = predict_company_matches(user_metrics)
        return Response({"companies": matches}, status=status.HTTP_200_OK)

# Module 14: AI Salary Prediction
class SalaryPredictionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_metrics = {
            'resume_score': user.resume_score,
            'aptitude_score': user.aptitude_score,
            'communication_score': user.communication_score,
            'technical_score': user.technical_score,
            'github_score': user.github_score,
            'portfolio_score': user.portfolio_score,
            'interview_score': user.interview_score,
            'experience_years': user.experience_years,
        }
        res = predict_employability_and_salary(user_metrics)

        current_min = res["salary_min"]
        current_max = res["salary_max"]
        
        return Response({
            "expected_salary_range": f"${current_min:,} - ${current_max:,}",
            "current_min": current_min,
            "current_max": current_max,
            "post_upskilling_salary": f"${int(current_max * 1.35):,}",
            "experience_salary_3yr": f"${int(current_max * 1.60):,}",
            "salary_growth_graph": [
                {"year": "Current", "salary": current_min},
                {"year": "+1 Year", "salary": int(current_min * 1.18)},
                {"year": "+2 Years (Post Upskill)", "salary": int(current_min * 1.42)},
                {"year": "+3 Years (Senior Lead)", "salary": int(current_min * 1.75)},
                {"year": "+5 Years (Principal)", "salary": int(current_min * 2.30)},
            ]
        }, status=status.HTTP_200_OK)

# Module 15: Skill Gap Analysis
class SkillGapAnalysisView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "target_role": request.user.target_role,
            "missing_skills": [
                {"skill": "System Design", "priority": "High", "desc": "Scalable Microservices & Load Balancing"},
                {"skill": "Docker & Kubernetes", "priority": "High", "desc": "Containerization & Orchestration"},
                {"skill": "GraphQL APIs", "priority": "Medium", "desc": "Efficient Data Fetching"},
            ],
            "weak_skills": [
                {"skill": "AWS Cloud Services", "current_score": 62, "target": 85},
                {"skill": "Advanced SQL Optimization", "current_score": 68, "target": 90},
            ],
            "strong_skills": [
                {"skill": "Python / Django 5", "current_score": 92},
                {"skill": "React.js State Management", "current_score": 88},
                {"skill": "REST API Architecture", "current_score": 90},
            ],
            "recommended_certifications": [
                "AWS Certified Solutions Architect – Associate",
                "Meta Front-End Developer Professional Certificate",
                "Google Professional ML Engineer"
            ]
        }, status=status.HTTP_200_OK)

# Module 16: AI Roadmap Generator
class LearningRoadmapView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "roadmap": [
                {
                    "timeframe": "Daily (Week 1)",
                    "focus": "Algorithm Speed & ATS Resume Refinement",
                    "tasks": [
                        "Solve 2 LeetCode Medium problem in Python/JS",
                        "Incorporate quantifiable metrics into top 3 resume projects",
                        "Practice 15 mins voice fluency recording"
                    ]
                },
                {
                    "timeframe": "Weekly (Month 1)",
                    "focus": "Cloud Deployment & System Design Basics",
                    "tasks": [
                        "Containerize Django & React apps using Docker Compose",
                        "Build a distributed caching layer using Redis",
                        "Complete 1 AI Mock Technical Interview"
                    ]
                },
                {
                    "timeframe": "Monthly (Quarter 1)",
                    "focus": "Production Full Stack Portfolio Launch & Outreach",
                    "tasks": [
                        "Deploy EmployAI project live on Railway/Vercel",
                        "Optimize LinkedIn profile with AI generated headline & summary",
                        "Apply to top tier company matches with 85%+ probability"
                    ]
                }
            ]
        }, status=status.HTTP_200_OK)

# Module 17: AI Recruiter Simulation
class AiRecruiterView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_metrics = {
            'employability_score': user.employability_score,
            'technical_score': user.technical_score,
            'resume_score': user.resume_score,
            'interview_score': user.interview_score
        }
        res = generate_recruiter_decision(user_metrics)
        return Response(res, status=status.HTTP_200_OK)

# Module 18: Digital Career Twin Engine
class DigitalCareerTwinView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        twin_data = sync_digital_career_twin(user)
        return Response({
            "twin_status": twin_data,
            "metrics_snapshot": {
                "overall_employability": user.employability_score,
                "ats_score": user.ats_score,
                "technical_score": user.technical_score,
                "interview_score": user.interview_score,
                "github_score": user.github_score,
                "predicted_salary_range": f"${user.predicted_salary_min:,} - ${user.predicted_salary_max:,}"
            }
        }, status=status.HTTP_200_OK)

# Module 19: AI Career Future Predictor
class CareerPredictionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "placement_probability": 88.5,
            "company_selection_probability": 84.0,
            "promotion_timeline": "14-18 Months to Senior Engineer",
            "future_growth_index": "Top 5% Career Velocity",
            "learning_time_required": "4-6 Weeks for Tier-1 Readiness",
            "industry_demand": "Extremely High (+28% YoY Growth in AI/FullStack)"
        }, status=status.HTTP_200_OK)

# Module 20: Super Admin Panel Analytics
class AdminPanelView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        total_users = User.objects.count()
        total_questions = QuestionBank.objects.count()
        avg_score = round(sum(u.employability_score for u in User.objects.all()) / (total_users or 1), 1)

        return Response({
            "stats": {
                "total_users": total_users,
                "total_assessments_taken": 1420,
                "total_question_bank": total_questions,
                "average_employability_score": avg_score,
                "active_ai_models": 4
            },
            "recent_users": [
                {"id": u.id, "username": u.username, "email": u.email, "score": u.employability_score, "role": u.target_role}
                for u in User.objects.all()[:10]
            ]
        }, status=status.HTTP_200_OK)

# Downloadable PDF AI Career Report
class ExportPDFReportView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        skills = user.skills if isinstance(user.skills, list) and user.skills else ["Python", "React", "SQL"]
        role_matches = predict_job_role_matches(skills, user.technical_score, user.experience_years)
        company_matches = predict_company_matches({'employability_score': user.employability_score, 'technical_score': user.technical_score, 'interview_score': user.interview_score, 'resume_score': user.resume_score})

        pdf_buffer = generate_career_pdf_report(user, company_matches, role_matches)

        response = HttpResponse(pdf_buffer.getvalue(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="EmployAI_Career_Report_{user.username}.pdf"'
        return response
