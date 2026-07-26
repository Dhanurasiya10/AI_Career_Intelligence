import React from 'react';
import GlassCard from '../components/GlassCard';
import { UserCheck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AiRecruiter() {
  const { user } = useAuth();
  const score = user?.employability_score || 84.5;

  const verdict = score >= 82 ? 'HIRE' : score >= 65 ? 'CONSIDER' : 'REJECT';
  const badgeColor = score >= 82 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 17</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-emerald-400" /> AI Recruiter Simulation & Verdict Engine
        </h1>
        <p className="text-xs text-slate-400 font-medium">Simulates corporate headhunter decision reasoning across resume, technical skills, and interview performance.</p>
      </div>

      <GlassCard className="text-center p-8 border-emerald-500/30">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Recruiter Screening Verdict</span>
        <div className="my-4">
          <span className={`px-6 py-2.5 rounded-2xl text-2xl font-black border ${badgeColor}`}>
            {verdict}
          </span>
        </div>
        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          "Candidate displays exceptional technical depth, crisp voice articulation, high ATS resume match, and strong project repository depth."
        </p>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" /> Hiring Manager Evaluation Notes
        </h3>
        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            • <strong>Technical Depth:</strong> Excellent command over Python, Django, React, and SQL database optimization.
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            • <strong>Interview Articulation:</strong> Confident cadence during technical trade-off discussions.
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            • <strong>Next Step Recommendation:</strong> Fast-track candidate directly to Final Round Technical Architecture.
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
