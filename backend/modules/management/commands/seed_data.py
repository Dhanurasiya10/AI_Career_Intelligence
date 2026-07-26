from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from modules.models import QuestionBank, CompanyBenchmark
from ai_engine.ml_models import get_trained_models

User = get_user_model()

class Command(BaseCommand):
    help = "Seeds database with demo users, test question bank, company benchmarks, and initializes ML models."

    def handle(self, *args, **kwargs):
        self.stdout.write("Initializing ML Models...")
        get_trained_models()
        self.stdout.write(self.style.SUCCESS("ML Models trained successfully."))

        # Create Demo Admin & Demo Candidate
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username="admin",
                email="admin@employai.com",
                password="adminpassword123",
                role="admin",
                first_name="System",
                last_name="Administrator"
            )
            self.stdout.write(self.style.SUCCESS("Created Superuser: admin / adminpassword123"))

        if not User.objects.filter(username="demouser").exists():
            user = User.objects.create_user(
                username="demouser",
                email="demo@employai.com",
                password="demopassword123",
                role="candidate",
                first_name="Alex",
                last_name="Morgan",
                target_role="Full Stack AI Engineer",
                skills=["Python", "React", "Django", "SQL", "Docker", "Machine Learning"],
                employability_score=84.5,
                ats_score=86.0,
                technical_score=88.0,
                aptitude_score=82.0,
                communication_score=85.0,
                github_score=89.0,
                portfolio_score=82.0,
                interview_score=84.0,
                predicted_salary_min=110000,
                predicted_salary_max=165000
            )
            self.stdout.write(self.style.SUCCESS("Created Demo Candidate: demouser / demopassword123"))

        # Seed Aptitude Questions
        if QuestionBank.objects.filter(test_type="aptitude").count() == 0:
            apt_questions = [
                {
                    "test_type": "aptitude",
                    "section": "quantitative",
                    "difficulty": "medium",
                    "question_text": "If a train traveling at 60 km/h passes a 200m platform in 24 seconds, what is the length of the train?",
                    "options": ["150 meters", "200 meters", "250 meters", "300 meters"],
                    "correct_option_index": 1,
                    "explanation": "Speed = 60 * (5/18) = 50/3 m/s. Total distance = (50/3)*24 = 400m. Train length = 400 - 200 = 200m."
                },
                {
                    "test_type": "aptitude",
                    "section": "logical",
                    "difficulty": "medium",
                    "question_text": "Complete the sequence: 2, 6, 12, 20, 30, ?",
                    "options": ["38", "42", "44", "50"],
                    "correct_option_index": 1,
                    "explanation": "Differences are +4, +6, +8, +10, +12. 30 + 12 = 42."
                },
                {
                    "test_type": "aptitude",
                    "section": "verbal",
                    "difficulty": "easy",
                    "question_text": "Choose the synonym for 'PRAGMATIC':",
                    "options": ["Theoretical", "Practical", "Idealistic", "Arrogant"],
                    "correct_option_index": 1,
                    "explanation": "Pragmatic means dealing with things sensibly and realistically (Practical)."
                },
                {
                    "test_type": "aptitude",
                    "section": "di",
                    "difficulty": "hard",
                    "question_text": "A company revenue increased by 20% in Year 1 and decreased by 10% in Year 2. What is the net percentage change?",
                    "options": ["+8%", "+10%", "+12%", "-2%"],
                    "correct_option_index": 0,
                    "explanation": "Net change = 100 -> 120 -> 108 (+8%)."
                }
            ]
            for q in apt_questions:
                QuestionBank.objects.create(**q)
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(apt_questions)} Aptitude Questions."))

        # Seed Technical Questions
        if QuestionBank.objects.filter(test_type="technical").count() == 0:
            tech_questions = [
                {
                    "test_type": "technical",
                    "section": "python",
                    "difficulty": "medium",
                    "question_text": "What is the output of the following Python snippet?",
                    "code_snippet": "x = [1, 2, 3]\ny = [val * 2 for val in x if val % 2 != 0]\nprint(y)",
                    "options": ["[2, 6]", "[4]", "[2, 4, 6]", "[1, 3]"],
                    "correct_option_index": 0,
                    "explanation": "Filter selects 1 and 3 (odd). Multiplying by 2 gives [2, 6]."
                },
                {
                    "test_type": "technical",
                    "section": "react",
                    "difficulty": "medium",
                    "question_text": "Which React hook should be used to store persistent values without triggering re-renders?",
                    "code_snippet": "const ref = useRef(0);",
                    "options": ["useState", "useRef", "useMemo", "useEffect"],
                    "correct_option_index": 1,
                    "explanation": "useRef holds a mutable value in its .current property without triggering re-render."
                },
                {
                    "test_type": "technical",
                    "section": "django",
                    "difficulty": "hard",
                    "question_text": "In Django REST Framework, which method is called to validate custom request data before saving?",
                    "options": ["serializer.is_valid()", "serializer.save()", "serializer.check()", "serializer.verify()"],
                    "correct_option_index": 0,
                    "explanation": "is_valid() runs field validation and custom validate() logic on the serializer."
                },
                {
                    "test_type": "technical",
                    "section": "sql",
                    "difficulty": "medium",
                    "question_text": "Which SQL clause is used to filter aggregated group records?",
                    "options": ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
                    "correct_option_index": 1,
                    "explanation": "HAVING filters groups created by GROUP BY."
                }
            ]
            for q in tech_questions:
                QuestionBank.objects.create(**q)
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(tech_questions)} Technical Questions."))

        # Seed Company Benchmarks
        if CompanyBenchmark.objects.count() == 0:
            companies = [
                {"company_name": "Google", "tier": "MAANG", "logo": "google", "min_cutoff_score": 88.0, "required_skills": ["C++", "Python", "Data Structures", "System Design"]},
                {"company_name": "Microsoft", "tier": "MAANG", "logo": "microsoft", "min_cutoff_score": 85.0, "required_skills": ["C#", "React", "Azure", "Algorithms"]},
                {"company_name": "Amazon", "tier": "MAANG", "logo": "amazon", "min_cutoff_score": 84.0, "required_skills": ["Java", "AWS", "Distributed Systems", "OOP"]},
                {"company_name": "Zoho", "tier": "Product SaaS", "logo": "zoho", "min_cutoff_score": 75.0, "required_skills": ["Java", "JavaScript", "SQL", "Web Architecture"]},
            ]
            for c in companies:
                CompanyBenchmark.objects.create(**c)
            self.stdout.write(self.style.SUCCESS(f"Seeded {len(companies)} Company Benchmarks."))

        self.stdout.write(self.style.SUCCESS("All seed data created successfully!"))
