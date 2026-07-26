import React from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Sparkles, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';
import { Radar } from 'react-chartjs-2';

export default function PersonalityAnalysis() {
  const radarData = {
    labels: ['Leadership', 'Creativity', 'Critical Thinking', 'Decision Making', 'Teamwork', 'Stress Mgmt'],
    datasets: [
      {
        label: 'Soft Skills Personality Vector',
        data: [84, 88, 90, 85, 92, 82],
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderColor: '#a855f7',
        borderWidth: 2,
        pointBackgroundColor: '#c084fc',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        pointLabels: { color: '#94a3b8', font: { size: 11, weight: '600' } },
        ticks: { display: false },
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 9</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" /> Personality & Soft Skills Behavioral Analysis
        </h1>
        <p className="text-xs text-slate-400">Leadership, creativity, stress resilience, decision making, and team dynamics radar vector.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
            Soft Skills Competency Radar
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </GlassCard>

        <GlassCard className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Behavioral Archetype</h3>
          
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
            <span className="font-bold text-purple-300">Style: Collaborative & Analytical Problem Solver</span>
            <p className="text-slate-400 mt-1">High adaptability in cross-functional tech teams with strong stress management during high-throughput sprints.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Learning Speed:</span>
              <p className="font-bold text-emerald-400">Top 3% (Fast Learner)</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Decision Ability:</span>
              <p className="font-bold text-blue-400">Data-Driven (85%)</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
