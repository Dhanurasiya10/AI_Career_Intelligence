import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Define global persistent ML Models
_MODEL_CACHE = {}

def get_trained_models():
    """Initializes or fetches synthetic trained models for predictions."""
    if 'employability_model' in _MODEL_CACHE:
        return _MODEL_CACHE

    # Generate synthetic training dataset for enterprise career predictions
    np.random.seed(42)
    n_samples = 1000

    # Features: [resume_score, aptitude_score, comm_score, tech_score, github_score, portfolio_score, interview_score, exp_years]
    X_train = np.random.uniform(low=40, high=100, size=(n_samples, 7))
    exp_years = np.random.uniform(low=0, high=10, size=(n_samples, 1))
    X_data = np.hstack([X_train, exp_years])

    # Target 1: Employability Score (Weighted formula with non-linear noise)
    y_employability = (
        X_data[:, 0] * 0.15 + # resume
        X_data[:, 1] * 0.15 + # aptitude
        X_data[:, 2] * 0.15 + # comm
        X_data[:, 3] * 0.25 + # tech
        X_data[:, 4] * 0.10 + # github
        X_data[:, 5] * 0.05 + # portfolio
        X_data[:, 6] * 0.15   # interview
    ) * (1 + X_data[:, 7] * 0.02)
    y_employability = np.clip(y_employability, 30, 99)

    # Target 2: Salary Prediction (in USD per annum)
    y_salary = 40000 + (X_data[:, 3] * 600) + (X_data[:, 7] * 12000) + (y_employability * 500)

    # Models fitting
    emp_model = RandomForestRegressor(n_estimators=50, random_state=42)
    emp_model.fit(X_data, y_employability)

    sal_model = RandomForestRegressor(n_estimators=50, random_state=42)
    sal_model.fit(X_data, y_salary)

    _MODEL_CACHE['employability_model'] = emp_model
    _MODEL_CACHE['salary_model'] = sal_model
    return _MODEL_CACHE

def predict_employability_and_salary(user_metrics):
    """
    Given a dict of user scores and experience, returns predicted overall employability and salary range.
    """
    models = get_trained_models()
    
    features = np.array([[
        user_metrics.get('resume_score', 80),
        user_metrics.get('aptitude_score', 75),
        user_metrics.get('communication_score', 78),
        user_metrics.get('technical_score', 82),
        user_metrics.get('github_score', 80),
        user_metrics.get('portfolio_score', 75),
        user_metrics.get('interview_score', 77),
        user_metrics.get('experience_years', 2.0),
    ]])

    pred_emp = models['employability_model'].predict(features)[0]
    pred_sal = models['salary_model'].predict(features)[0]

    min_sal = int(pred_sal * 0.9)
    max_sal = int(pred_sal * 1.25)

    return {
        'overall_employability': round(float(pred_emp), 1),
        'salary_min': min_sal,
        'salary_max': max_sal,
        'industry_readiness': 'High' if pred_emp > 80 else 'Moderate' if pred_emp > 60 else 'Developing',
        'placement_readiness': round(min(pred_emp * 1.05, 99.0), 1)
    }

def predict_job_role_matches(skills, tech_score, exp_years):
    """Predicts top matching job roles based on skills vector and tech capability."""
    skills_lower = [s.lower() for s in skills]
    
    roles = [
        {"role": "Full Stack Developer", "req_skills": ["react", "node", "python", "javascript", "django", "html", "css"], "base_match": 88},
        {"role": "AI / ML Engineer", "req_skills": ["python", "pytorch", "tensorflow", "scikit-learn", "numpy", "pandas"], "base_match": 85},
        {"role": "Backend Engineer", "req_skills": ["python", "django", "postgresql", "fastapi", "sql", "docker"], "base_match": 82},
        {"role": "Frontend Developer", "req_skills": ["react", "javascript", "html", "css", "tailwind", "typescript"], "base_match": 80},
        {"role": "Data Analyst", "req_skills": ["python", "sql", "pandas", "excel", "tableau", "powerbi"], "base_match": 78},
        {"role": "Cloud / DevOps Engineer", "req_skills": ["docker", "kubernetes", "aws", "linux", "ci/cd", "terraform"], "base_match": 75},
        {"role": "Software Engineer", "req_skills": ["c++", "java", "python", "data structures", "algorithms"], "base_match": 86},
        {"role": "UI/UX Engineer", "req_skills": ["figma", "css", "react", "html", "design systems"], "base_match": 72},
    ]

    results = []
    for item in roles:
        matching_count = sum(1 for s in item["req_skills"] if any(s in user_s for user_s in skills_lower))
        skill_boost = (matching_count / len(item["req_skills"])) * 25
        match_score = min(99, round(item["base_match"] + skill_boost + (tech_score * 0.1), 1))
        results.append({
            "role": item["role"],
            "match_percentage": match_score,
            "demand": "Very High" if match_score > 80 else "High",
            "avg_salary": f"${int(70000 + match_score * 800):,}"
        })

    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results

def predict_company_matches(user_metrics):
    """Predicts hiring probability and match scores for top tech enterprise companies."""
    emp_score = user_metrics.get('employability_score', 78)
    tech_score = user_metrics.get('technical_score', 80)
    interview_score = user_metrics.get('interview_score', 75)

    companies = [
        {"name": "Google", "logo": "google", "tier": "MAANG", "min_cutoff": 88},
        {"name": "Microsoft", "logo": "microsoft", "tier": "MAANG", "min_cutoff": 85},
        {"name": "Amazon", "logo": "amazon", "tier": "MAANG", "min_cutoff": 84},
        {"name": "Meta", "logo": "meta", "tier": "MAANG", "min_cutoff": 87},
        {"name": "NVIDIA", "logo": "nvidia", "tier": "Tier-1 Tech", "min_cutoff": 86},
        {"name": "Tesla", "logo": "tesla", "tier": "Tier-1 Tech", "min_cutoff": 83},
        {"name": "Zoho", "logo": "zoho", "tier": "Product SaaS", "min_cutoff": 75},
        {"name": "Freshworks", "logo": "freshworks", "tier": "Product SaaS", "min_cutoff": 74},
        {"name": "TCS", "logo": "tcs", "tier": "IT Services", "min_cutoff": 65},
        {"name": "Infosys", "logo": "infosys", "tier": "IT Services", "min_cutoff": 65},
        {"name": "Accenture", "logo": "accenture", "tier": "Consulting", "min_cutoff": 68},
        {"name": "Cognizant", "logo": "cognizant", "tier": "IT Services", "min_cutoff": 64},
    ]

    output = []
    for comp in companies:
        diff = (emp_score + tech_score + interview_score) / 3 - comp["min_cutoff"]
        prob = min(98.5, max(15.0, round(70.0 + (diff * 2.5), 1)))
        
        output.append({
            "name": comp["name"],
            "tier": comp["tier"],
            "hiring_probability": prob,
            "skill_match": min(99, round(prob + 2.5, 1)),
            "resume_match": min(99, round(user_metrics.get('resume_score', 80), 1)),
            "interview_readiness": min(99, round(interview_score, 1)),
            "verdict": "High Chance" if prob >= 80 else "Moderate Chance" if prob >= 60 else "Upskill Needed"
        })

    output.sort(key=lambda x: x["hiring_probability"], reverse=True)
    return output
