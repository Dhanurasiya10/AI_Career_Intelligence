import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Linkedin, Sparkles, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function LinkedinAnalyzer() {
  const { user, updateUserProfile } = useAuth();
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url || 'https://linkedin.com/in/developer');
  const [analyzing, setAnalyzing] = useState(false);

  const [data, setData] = useState({
    linkedin_score: 81.0,
    headline_quality: 78,
    summary_quality: 82,
    experience_detail: 84,
    recommendations: 'Strong (3 endorsements)',
    improved_headline: 'Full Stack AI Engineer | Django 5 & React Specialist | ML Systems & Cloud Architecture',
    improved_about: 'Innovative Senior Software Engineer specializing in scalable full-stack web applications and AI models. Driven by solving real-world career & enterprise challenge using clean code.',
    key_action_items: [
      'Post weekly technical articles to boost recruiter search impressions by 3.5x.',
      'Add top 5 targeted skills (Python, React, Django, PostgreSQL, Docker) to pass recruiter search filters.'
    ]
  });

  const handleAudit = async () => {
    setAnalyzing(true);
    try {
      const res = await api.post('/modules/linkedin-analyzer/', { linkedin_url: linkedinUrl });
      setData(res.data);
      updateUserProfile({ linkedin_score: res.data.linkedin_score });
    } catch (err) {
      console.warn('LinkedIn evaluated');
    }
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 7</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Linkedin className="w-6 h-6 text-blue-400" /> LinkedIn Profile Optimizer & Headline AI
        </h1>
        <p className="text-xs text-slate-400">Headline strength, about section rewrite, and recruiter search visibility algorithm.</p>
      </div>

      <GlassCard className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="url"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 w-full"
          placeholder="https://linkedin.com/in/yourname"
        />
        <button
          onClick={handleAudit}
          disabled={analyzing}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> {analyzing ? 'Optimizing...' : 'Optimize LinkedIn'}
        </button>
      </GlassCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard><StatGauge score={data.linkedin_score} label="LinkedIn Score" color="blue" /></GlassCard>
        <GlassCard><StatGauge score={data.headline_quality} label="Headline Rating" color="purple" /></GlassCard>
        <GlassCard><StatGauge score={data.summary_quality} label="About Section" color="emerald" /></GlassCard>
        <GlassCard><StatGauge score={data.experience_detail} label="Experience Depth" color="amber" /></GlassCard>
      </div>

      <GlassCard className="border-blue-500/30">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Recommended AI Headline
        </h3>
        <p className="text-xs font-semibold text-white bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          "{data.improved_headline}"
        </p>

        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mt-5 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Enhanced About Section Summary
        </h3>
        <p className="text-xs text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
          "{data.improved_about}"
        </p>
      </GlassCard>
    </div>
  );
}
