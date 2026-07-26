# EmployAI – AI Career Intelligence & Employability Platform

EmployAI is an enterprise-grade, production-ready AI platform that analyzes a user's complete professional profile and predicts employability, best job roles, company hiring compatibility, salary range, and dynamic learning roadmaps using AI, Machine Learning, and NLP models.

---

## Key Highlights & Architectural Features

- **Flagship Digital Career Twin:** Live background synchronization engine that automatically updates employability scores, salary ranges, and company matches whenever user skills, resume, GitHub, or test scores change.
- **20 Full-Featured AI Intelligence Modules:**
  1. **AI Resume ATS Analyzer & Generator:** PDF parsing, ATS match %, section optimization.
  2. **Adaptive Aptitude Test:** Dynamic difficulty adjustment (Quantitative, Logical, Verbal, DI).
  3. **Voice Communication Analyzer:** Fluency score, WPM speech rate, pitch, tone, grammar.
  4. **Multi-Language Technical Coding Test:** Python, JS, React, Django, SQL test runner.
  5. **GitHub Profile Inspector:** Commit velocity, repo complexity, open source impact score.
  6. **Portfolio Website Audit:** UI/UX aesthetics, responsiveness, accessibility, SEO audit.
  7. **LinkedIn Profile Optimizer:** Headline generator, summary enhancement, recruiter reach.
  8. **AI Mock Interview Simulator:** Video vision simulation, eye contact & emotion tracking.
  9. **Personality Radar & Soft Skills:** Big Five behavioral vectors and leadership potential.
  10. **Overall Employability Engine:** Weighted ensemble score and placement readiness rating.
  11. **Language & Tech Matrix:** Natural and programming language proficiency percentages.
  12. **AI Job Role Predictor:** Machine learning match % across 8+ specialized tech roles.
  13. **Enterprise Company Compatibility:** Google, Microsoft, Amazon, Zoho, TCS hiring chance.
  14. **AI Salary Predictor & Growth Curve:** Current market range and 5-year growth trajectory.
  15. **Skill Gap Analyzer:** Target role skill deficit comparison and certification roadmap.
  16. **Personalized AI Roadmap:** Actionable daily, weekly, and monthly milestones.
  17. **AI Recruiter Simulation:** Simulates headhunter screening verdicts (*Hire*, *Consider*, *Reject*).
  18. **Digital Career Twin:** Real-time auto-updating profile state twin.
  19. **AI Career Future Predictor:** Promotion timeline and 3-year YoY market demand index.
  20. **Super Admin Suite:** Manage candidates, question banks, and retrain ML estimators.
- **Executive PDF Report Downloader:** Professional multi-page PDF generation via ReportLab.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Chart.js / React-Chartjs-2, Lucide Icons, Axios, React Router v6.
- **Backend:** Python Django 5, Django REST Framework (DRF), SimpleJWT, Corsheaders.
- **Machine Learning & NLP:** Scikit-Learn (RandomForestRegressor, RandomForestClassifier), Pandas, NumPy, NLP TF-IDF & Keyword Parsing.
- **Database:** SQLite (Default zero-config setup) / PostgreSQL support.
- **DevOps & Containerization:** Docker, Docker Compose, Gunicorn.

---

## Quick Setup & Execution Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm
- Git

### 1. Backend Setup (Django REST)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# Windows activate:
.\venv\Scripts\activate
# Linux/macOS activate:
# source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Seed question bank, company benchmarks, ML models & demo candidate
python manage.py seed_data

# Run Django backend server
python manage.py runserver 0.0.0.0:8000
```

The Django REST API will be running at `http://127.0.0.1:8000/api/`.

### 2. Frontend Setup (React Vite)

Open a second terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```

The React web application will be live at `http://localhost:3000/`.

---

## Running via Docker Compose

```bash
# In the root directory containing docker-compose.yml
docker-compose up --build
```

---

## Demo Credentials

- **Admin Account:**
  - Username: `admin`
  - Password: `adminpassword123`

- **Candidate Account:**
  - Username: `demouser`
  - Password: `demopassword123`

---

## License & GitHub Release

This repository is ready to push directly to GitHub or deploy to production (Vercel, Railway, Render, AWS).
