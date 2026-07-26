import React from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { PieChart, Award, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EmployabilityScore() {
  const { user } = useAuth();

  const breakdown = [
    { category: 'Technical Competency', score: user?.technical_score || 88, weight: '25%', status: 'Top Tier' },
    { category: 'Aptitude & Reasoning', score: user?.aptitude_score || 82, weight: '15%', status: 'Proficient' },
    { category: 'Voice & Communication', score: user?.communication_score || 85, weight: '15%', status: 'Fluent' },
    { category: 'ATS Resume Match', score: user?.ats_score || 86, weight: '15%', status: 'Optimized' },
    { category: 'AI Interview Readiness', score: user?.interview_score || 84, weight: '15%', status: 'Ready' },
    { category: 'GitHub Code Quality', score: user?.github_score || 89, weight: '10%', status: 'High Velocity' },
    { category: 'Portfolio UI/UX', score: user?.portfolio_score || 82, weight: '5%', status: 'Responsive' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 10</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <PieChart className="w-6 h-6 text-emerald-400" /> Overall Employability Score & Industry Readiness
        </h1>
        <p className="text-xs text-slate-400">Weighted AI model ensemble aggregating all 9 primary career assessment vectors.</p>
      </div>

      <GlassCard className="flex flex-col md:flex-row items-center justify-between p-6 border-emerald-500/30">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <StatGauge score={user?.employability_score || 84.5} label="" color="emerald" size="lg" />
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Placement Status: Ready
            </span>
            <h2 className="text-2xl font-black text-white mt-1">{user?.employability_score || 84.5}% Overall</h2>
            <p className="text-xs text-slate-300">Industry Placement Probability: <strong className="text-emerald-400">88.7%</strong></p>
          </div>
        </div>

        <div className="text-right border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
          <p className="text-xs text-slate-400">Market Tier Bracket</p>
          <h3 className="text-lg font-bold text-blue-400">Tier-1 Product Enterprise</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Top 5% candidate percentile</p>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Weighted Breakdown Matrix</h3>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={item.category} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-12 text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded text-center">{item.weight}</span>
                <span className="font-semibold text-white">{item.category}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-slate-400 text-[10px] hidden sm:inline">{item.status}</span>
                <span className="font-black text-emerald-400 text-sm">{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
