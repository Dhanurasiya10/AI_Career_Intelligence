import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { FileText, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Upload } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function ResumeAnalyzer() {
  const { updateUserProfile } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [data, setData] = useState({
    ats_score: 86,
    overall_score: 85.5,
    formatting_score: 88,
    grammar_score: 92,
    project_quality_score: 85,
    keyword_match_percentage: 84.0,
    found_keywords: ['Python', 'React', 'Django', 'SQL', 'Git', 'Docker', 'AWS'],
    missing_keywords: ['Kubernetes', 'GraphQL', 'TypeScript'],
    weak_sections: [
      'Professional Summary could include quantifiable impact metrics (e.g., % improvement).',
      'Project section descriptions need more action verbs (e.g. Architected, Engineered).'
    ],
    strong_sections: [
      'Technical Skills section is cleanly categorized.',
      'Education and Certifications are clearly formatted for ATS software.'
    ],
    generated_summary: 'Driven Full Stack AI Engineer with 2+ years of experience engineering scalable Django REST services and dynamic React single page applications. Proven track record in deploying ML estimators to cloud environments.',
    improved_project_descriptions: [
      'Engineered an enterprise AI Career Intelligence Platform reducing resume analysis cycle time by 75% using Django 5, React, and Scikit-learn.',
      'Architected microservices handling 10,000+ daily REST requests with 99.9% uptime on Docker cloud infrastructure.'
    ]
  });

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await api.post('/modules/resume-analyzer/', { resume_text: 'Sample Resume Content' });
      setData(res.data);
      updateUserProfile({ ats_score: res.data.ats_score, resume_score: res.data.overall_score });
    } catch (err) {
      console.warn('Backend call simulated');
    }
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 1</span>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" /> AI Resume ATS Analyzer & Optimizer
          </h1>
          <p className="text-xs text-slate-400">PDF Parsing, ATS Keyword Match Score, Section Optimization & Professional Summary Generator.</p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> {analyzing ? 'Analyzing Resume...' : 'Re-Run ATS Scan'}
        </button>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard>
          <StatGauge score={data.ats_score} label="ATS Score" subtext="Parser Compatibility" color="blue" />
        </GlassCard>
        <GlassCard>
          <StatGauge score={data.formatting_score} label="Formatting" subtext="Layout & Spacing" color="purple" />
        </GlassCard>
        <GlassCard>
          <StatGauge score={data.grammar_score} label="Grammar Score" subtext="Tone & Syntax" color="emerald" />
        </GlassCard>
        <GlassCard>
          <StatGauge score={data.project_quality_score} label="Project Impact" subtext="Action Verbs & Impact" color="amber" />
        </GlassCard>
      </div>

      {/* Keywords Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Found ATS Keywords ({data.found_keywords.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.found_keywords.map((kw) => (
              <span key={kw} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {kw}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Recommended Missing Keywords ({data.missing_keywords.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.missing_keywords.map((kw) => (
              <span key={kw} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                + {kw}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* AI AI Resume Generation */}
      <GlassCard className="border-blue-500/30">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> AI Generated Professional Summary
        </h3>
        <p className="text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
          "{data.generated_summary}"
        </p>

        <h3 className="text-sm font-bold text-white mt-5 mb-2">AI Enhanced Project Impact Statements</h3>
        <div className="space-y-2">
          {data.improved_project_descriptions.map((desc, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200">
              <strong className="text-blue-400">Bullet {idx + 1}:</strong> {desc}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
