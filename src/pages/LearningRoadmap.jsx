import React from 'react';
import GlassCard from '../components/GlassCard';
import { Map, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';

export default function LearningRoadmap() {
  const roadmap = [
    {
      timeframe: 'Daily (Week 1)',
      focus: 'Algorithm Speed & ATS Resume Refinement',
      tasks: [
        'Solve 2 LeetCode Medium problems in Python/JS',
        'Incorporate quantifiable impact metrics into top 3 resume projects',
        'Practice 15 mins voice fluency recording in Module 3'
      ]
    },
    {
      timeframe: 'Weekly (Month 1)',
      focus: 'Cloud Deployment & System Design Architecture',
      tasks: [
        'Containerize Django & React apps using Docker Compose',
        'Build a distributed caching layer using Redis',
        'Complete 1 AI Mock Technical Interview'
      ]
    },
    {
      timeframe: 'Monthly (Quarter 1)',
      focus: 'Production Full Stack Portfolio Launch & Outreach',
      tasks: [
        'Deploy EmployAI project live on Railway/Vercel',
        'Optimize LinkedIn profile with AI generated headline & summary',
        'Apply to top tier company matches with 85%+ probability'
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 16</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Map className="w-6 h-6 text-blue-400" /> Personalized AI Career Learning Roadmap
        </h1>
        <p className="text-xs text-slate-400 font-medium">Daily, weekly, and monthly action plan generated dynamically for your target role.</p>
      </div>

      <div className="space-y-4">
        {roadmap.map((step, idx) => (
          <GlassCard key={step.timeframe} className="p-5 border-blue-500/20">
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/30">
                0{idx + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">{step.timeframe}</h3>
                <p className="text-[11px] text-blue-400 font-semibold">{step.focus}</p>
              </div>
            </div>

            <div className="space-y-2 pl-11">
              {step.tasks.map((task, tIdx) => (
                <div key={tIdx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
