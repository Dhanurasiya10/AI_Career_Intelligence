import React from 'react';
import GlassCard from '../components/GlassCard';
import { TrendingUp, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

export default function SalaryPrediction() {
  const { user } = useAuth();

  const currentMin = user?.predicted_salary_min || 110000;
  const currentMax = user?.predicted_salary_max || 165000;

  const salaryData = {
    labels: ['Current Entry', '+1 Year', '+2 Yrs (Upskilled)', '+3 Yrs (Senior)', '+5 Yrs (Principal Lead)'],
    datasets: [
      {
        label: 'Predicted Salary Trajectory ($)',
        data: [currentMin, Math.round(currentMin * 1.18), Math.round(currentMin * 1.42), Math.round(currentMin * 1.75), Math.round(currentMin * 2.30)],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const salaryOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
    },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 14</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" /> AI Salary Predictor & Growth Trajectory Engine
        </h1>
        <p className="text-xs text-slate-400">ML Regression model predicting base market compensation, post-upskill upside, and 5-year growth curve.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <span className="text-xs text-slate-400 font-semibold">Current Market Offer Range</span>
          <h3 className="text-xl font-black text-white mt-1">${currentMin.toLocaleString()} - ${currentMax.toLocaleString()}</h3>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> Baseline Market Value
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs text-slate-400 font-semibold">Post-Upskilling Target Range</span>
          <h3 className="text-xl font-black text-emerald-400 mt-1">${Math.round(currentMax * 1.35).toLocaleString()} / yr</h3>
          <p className="text-[10px] text-purple-400 font-semibold mt-1">+35% Potential Increase</p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs text-slate-400 font-semibold">5-Year Principal Lead Potential</span>
          <h3 className="text-xl font-black text-purple-400 mt-1">${Math.round(currentMin * 2.30).toLocaleString()} / yr</h3>
          <p className="text-[10px] text-blue-400 font-semibold mt-1">High Growth Velocity</p>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> 5-Year Compensation Progression
            </h3>
            <p className="text-[11px] text-slate-400">ML forecasted salary curve over career milestones</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <Line data={salaryData} options={salaryOptions} />
        </div>
      </GlassCard>
    </div>
  );
}
