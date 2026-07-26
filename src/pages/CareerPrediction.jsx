import React from 'react';
import GlassCard from '../components/GlassCard';
import { LineChart, TrendingUp, Award, Clock, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CareerPrediction() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 19</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <LineChart className="w-6 h-6 text-emerald-400" /> AI Career Growth & Future Predictor
        </h1>
        <p className="text-xs text-slate-400">Promotion timeline, placement probability, learning velocity index, and 3-year market demand forecasts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <span className="text-xs text-slate-400 font-semibold">Placement Probability</span>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">88.5%</h3>
          <p className="text-[10px] text-slate-400 mt-1">High offer probability within 30 days</p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs text-slate-400 font-semibold">Promotion Timeline</span>
          <h3 className="text-xl font-black text-white mt-1">14 - 18 Months</h3>
          <p className="text-[10px] text-purple-400 mt-1 font-semibold">Fast Track to Senior Lead</p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs text-slate-400 font-semibold">Industry YoY Demand</span>
          <h3 className="text-2xl font-black text-blue-400 mt-1">+28.4%</h3>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1">Top Tier Growth Market</p>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" /> 3-Year Career Velocity Forecast
        </h3>
        <div className="space-y-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
            <div>
              <strong className="text-white">Year 1: Mid-Level Full Stack AI Engineer</strong>
              <p className="text-[11px] text-slate-400">Focus on Django REST microservices and production React architecture.</p>
            </div>
            <span className="text-emerald-400 font-bold">$130,000 / yr</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
            <div>
              <strong className="text-white">Year 2-3: Senior Staff AI Architect</strong>
              <p className="text-[11px] text-slate-400">Leading cloud infrastructure and distributed ML pipelines.</p>
            </div>
            <span className="text-purple-400 font-bold">$175,000 / yr</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
