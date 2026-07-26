import React from 'react';
import GlassCard from '../components/GlassCard';
import { Briefcase, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function JobRolePrediction() {
  const { user } = useAuth();

  const roles = [
    { role: 'Full Stack AI Developer', match: 94.5, demand: 'Very High', salary: '$145,000', badge: 'Top Match' },
    { role: 'Python Backend Engineer', match: 91.0, demand: 'High', salary: '$135,000' },
    { role: 'AI / ML Systems Engineer', match: 88.5, demand: 'Very High', salary: '$160,000' },
    { role: 'Frontend React Developer', match: 86.0, demand: 'High', salary: '$125,000' },
    { role: 'Software Engineer (Generalist)', match: 85.0, demand: 'High', salary: '$130,000' },
    { role: 'Cloud & DevOps Specialist', match: 78.5, demand: 'Moderate', salary: '$140,000' },
    { role: 'Data Analyst / BI Engineer', match: 75.0, demand: 'Moderate', salary: '$110,000' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 12</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-500" /> AI Job Role Predictor & Career Alignment
        </h1>
        <p className="text-xs text-slate-400">Match percentage prediction based on candidate skills vector, project experience, and tech test scores.</p>
      </div>

      <div className="space-y-3">
        {roles.map((r) => (
          <GlassCard key={r.role} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                {r.match}%
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-white">{r.role}</h3>
                  {r.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {r.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Industry Demand: <span className="text-slate-200 font-semibold">{r.demand}</span></p>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Avg Market Compensation</span>
                <span className="text-xs font-black text-emerald-400">{r.salary} / yr</span>
              </div>
              <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden hidden sm:block">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.match}%` }}></div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
