import React from 'react';
import GlassCard from '../components/GlassCard';
import { Languages, Code } from 'lucide-react';

export default function LanguageProficiency() {
  const naturalLangs = [
    { language: 'English', proficiency: 'Professional / Fluent', percentage: 92 },
    { language: 'Tamil', proficiency: 'Native', percentage: 98 },
    { language: 'Hindi', proficiency: 'Conversational', percentage: 75 },
  ];

  const techLangs = [
    { language: 'Python', proficiency: 'Expert', percentage: 94 },
    { language: 'JavaScript / ES6', proficiency: 'Advanced', percentage: 88 },
    { language: 'React.js', proficiency: 'Advanced', percentage: 86 },
    { language: 'Django 5', proficiency: 'Advanced', percentage: 85 },
    { language: 'SQL / PostgreSQL', proficiency: 'Intermediate / Advanced', percentage: 82 },
    { language: 'HTML5 / CSS3', proficiency: 'Expert', percentage: 95 },
    { language: 'Java', proficiency: 'Intermediate', percentage: 72 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 11</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Languages className="w-6 h-6 text-purple-400" /> Language & Technical Proficiency Matrix
        </h1>
        <p className="text-xs text-slate-400">Natural language fluency and programming language competency percentages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4 flex items-center gap-2">
            <Languages className="w-4 h-4" /> Natural Languages
          </h3>
          <div className="space-y-4">
            {naturalLangs.map((lang) => (
              <div key={lang.language}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-white">{lang.language} <span className="text-slate-400 font-normal">({lang.proficiency})</span></span>
                  <span className="text-purple-400 font-bold">{lang.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${lang.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
            <Code className="w-4 h-4" /> Programming & Tech Stack
          </h3>
          <div className="space-y-4">
            {techLangs.map((lang) => (
              <div key={lang.language}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-white">{lang.language} <span className="text-slate-400 font-normal">({lang.proficiency})</span></span>
                  <span className="text-blue-400 font-bold">{lang.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lang.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
