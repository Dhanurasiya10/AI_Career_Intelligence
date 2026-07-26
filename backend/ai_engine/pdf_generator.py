import os
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_career_pdf_report(user, company_matches, role_matches):
    """
    Generates a multi-page PDF Executive Career Report using ReportLab.
    Returns BytesIO buffer containing the PDF bytes.
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    story = []

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0F172A'),
        alignment=0,
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#64748B'),
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#2563EB'),
        spaceBefore=12,
        spaceAfter=6,
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
    )

    # Header section
    story.append(Paragraph("EmployAI – Executive Career Intelligence Report", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"Candidate: <b>{user.get_full_name() or user.username}</b> ({user.email}) | Target Role: {user.target_role}", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#CBD5E1'), spaceAfter=15))

    # Executive Overview Table
    story.append(Paragraph("1. Executive Score Summary", heading_style))
    
    summary_data = [
        ["Metric", "Score", "Benchmark Status"],
        ["Overall Employability", f"{user.employability_score}%", "Industry Ready" if user.employability_score > 75 else "Developing"],
        ["ATS Resume Score", f"{user.ats_score}%", "Strong Match"],
        ["Technical Competency", f"{user.technical_score}%", "Proficient"],
        ["Aptitude & Reasoning", f"{user.aptitude_score}%", "Good Speed & Accuracy"],
        ["Voice Communication", f"{user.communication_score}%", "Confident & Fluent"],
        ["GitHub Portfolio Score", f"{user.github_score}%", "Active Commits"],
        ["AI Interview Score", f"{user.interview_score}%", "Interview Ready"],
    ]

    t = Table(summary_data, colWidths=[200, 100, 200])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E293B')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F8FAFC')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
    ]))
    story.append(t)
    story.append(Spacer(1, 15))

    # Predicted Roles & Companies
    story.append(Paragraph("2. Top Job Role & Salary Predictions", heading_style))
    role_text = f"Based on machine learning evaluation, the predicted salary range is <b>${user.predicted_salary_min:,} – ${user.predicted_salary_max:,} / year</b>.<br/><br/>"
    role_text += "<b>Top Matching Roles:</b><br/>"
    for r in role_matches[:4]:
        role_text += f"• <b>{r['role']}</b>: {r['match_percentage']}% Match (Avg Salary: {r.get('avg_salary', '$95,000')})<br/>"
    story.append(Paragraph(role_text, body_style))
    story.append(Spacer(1, 15))

    # Company Compatibility
    story.append(Paragraph("3. Enterprise Hiring Compatibility", heading_style))
    comp_data = [["Target Enterprise", "Tier", "Hiring Probability", "Status Verdict"]]
    for c in company_matches[:6]:
        comp_data.append([c["name"], c["tier"], f"{c['hiring_probability']}%", c["verdict"]])
    
    ctable = Table(comp_data, colWidths=[150, 100, 120, 130])
    ctable.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2563EB')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
    ]))
    story.append(ctable)
    story.append(Spacer(1, 15))

    # AI Action Plan
    story.append(Paragraph("4. Recommended AI Upskilling Roadmap", heading_style))
    roadmap_text = """
    • <b>Phase 1 (Weeks 1-2):</b> Optimize Resume PDF with quantifiable metrics. Complete AWS/Cloud certifications.<br/>
    • <b>Phase 2 (Weeks 3-4):</b> Solve 30+ Advanced LeetCode / Technical Coding problems in Python/JS.<br/>
    • <b>Phase 3 (Weeks 5-6):</b> Complete 2 Mock Interviews in System Design and HR behavioral questions.<br/>
    """
    story.append(Paragraph(roadmap_text, body_style))

    doc.build(story)
    buffer.seek(0)
    return buffer
