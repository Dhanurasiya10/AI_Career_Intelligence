from .ml_models import predict_employability_and_salary

def sync_digital_career_twin(user):
    """
    Recalculates Digital Career Twin metrics across all 20 modules and updates user fields.
    """
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

    # Run ML prediction pipeline
    ml_output = predict_employability_and_salary(user_metrics)

    user.employability_score = ml_output['overall_employability']
    user.predicted_salary_min = ml_output['salary_min']
    user.predicted_salary_max = ml_output['salary_max']
    user.save()

    return {
        "status": "synchronized",
        "employability_score": user.employability_score,
        "predicted_salary_min": user.predicted_salary_min,
        "predicted_salary_max": user.predicted_salary_max,
        "last_sync": user.updated_at.strftime("%Y-%m-%d %H:%M:%S") if user.updated_at else "Just now"
    }
