import React from 'react';
import GlassCard from '../components/GlassCard';
import { Compass, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SkillGapAnalysis() {
  const { user } = useAuth();

  const missingSkills = [
    { skill: 'System Design', priority: 'High', desc: 'Scalable Microservices, Caching, & Load Balancing' },
    { skill: 'Docker & Kubernetes', priority: 'High', desc: 'Containerization, Pod Orchestration, & CI/CD Pipelines' },
    { skill: 'GraphQL APIs', priority: 'Medium', desc: 'Declarative Querying & Schema Design' },
  ];

  const weakSkills = [
    { skill: 'AWS Cloud Infrastructure', current: 62, target: 85 },
    { skill: 'SQL Index & Query Optimization', current: 68, target: 90 },
  ];

  const strongSkills = [
    { skill: 'Python / Django 5 Backend', score: 92 },
    { skill: 'React.js Component Architecture', score: 88 },
    { skill: 'RESTful API Engineering', score: 90 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 15</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-purple-400" /> AI Skill Gap Analysis & Industry Benchmark
        </h1>
        <p className="text-xs text-slate-400">Target role skill comparison highlighting missing competencies, weak areas, and strong advantages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Recommended Missing Skills
          </h3>
          <div className="space-y-3">
            {missingSkills.map((item) => (
              <div key={item.skill} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <strong className="text-white">{item.skill}</strong>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {item.priority} Priority
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Strong Key Competencies
          </h3>
          <div className="space-y-3">
            {strongSkills.map((item) => (
              <div key={item.skill} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{item.skill}</span>
                <span className="font-black text-emerald-400">{item.score}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
