import React from 'react';
import GlassCard from '../components/GlassCard';
import { Building2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CompanyMatch() {
  const { user } = useAuth();

  const companies = [
    { name: 'Google', tier: 'MAANG', prob: 88.5, skillMatch: 90, verdict: 'High Chance', badgeColor: 'emerald' },
    { name: 'Microsoft', tier: 'MAANG', prob: 86.0, skillMatch: 88, verdict: 'High Chance', badgeColor: 'emerald' },
    { name: 'Amazon', tier: 'MAANG', prob: 84.0, skillMatch: 85, verdict: 'High Chance', badgeColor: 'emerald' },
    { name: 'Meta', tier: 'MAANG', prob: 83.5, skillMatch: 86, verdict: 'High Chance', badgeColor: 'emerald' },
    { name: 'NVIDIA', tier: 'Tier-1 Tech', prob: 85.5, skillMatch: 87, verdict: 'High Chance', badgeColor: 'emerald' },
    { name: 'Tesla', tier: 'Tier-1 Tech', prob: 82.0, skillMatch: 84, verdict: 'High Chance', badgeColor: 'emerald' },
    { name: 'Zoho', tier: 'Product SaaS', prob: 92.4, skillMatch: 95, verdict: 'Instant Fit', badgeColor: 'blue' },
    { name: 'Freshworks', tier: 'Product SaaS', prob: 91.0, skillMatch: 93, verdict: 'Instant Fit', badgeColor: 'blue' },
    { name: 'TCS', tier: 'IT Services', prob: 96.0, skillMatch: 98, verdict: 'Instant Fit', badgeColor: 'blue' },
    { name: 'Infosys', tier: 'IT Services', prob: 95.5, skillMatch: 97, verdict: 'Instant Fit', badgeColor: 'blue' },
    { name: 'Accenture', tier: 'Consulting', prob: 93.0, skillMatch: 94, verdict: 'Instant Fit', badgeColor: 'blue' },
    { name: 'Cognizant', tier: 'IT Services', prob: 94.0, skillMatch: 96, verdict: 'Instant Fit', badgeColor: 'blue' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 13</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-emerald-400" /> Enterprise Company Compatibility Predictor
        </h1>
        <p className="text-xs text-slate-400">Hiring probability & skill match benchmarked against Tier-1, Product SaaS, and Enterprise Tech giants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companies.map((c) => (
          <GlassCard key={c.name} className="flex items-center justify-between p-4">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white">{c.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400">{c.tier}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Skill Match: <strong className="text-slate-200">{c.skillMatch}%</strong></p>
              <span className={`text-[10px] font-bold ${c.badgeColor === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {c.verdict}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Hiring Chance</span>
              <span className="text-xl font-black text-emerald-400">{c.prob}%</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
