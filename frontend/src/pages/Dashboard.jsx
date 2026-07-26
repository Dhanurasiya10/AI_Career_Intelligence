import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import {
  Radar, Bar, Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler,
  Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import {
  Sparkles, TrendingUp, Building2, Briefcase, Download, ArrowRight,
  ShieldCheck, Activity, Award, Brain, Mic, Code2, Github, Video
} from 'lucide-react';

ChartJS.register(
  RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title
);

export default function Dashboard() {
  const { user } = useAuth();

  const radarData = {
    labels: ['Technical', 'Aptitude', 'Communication', 'Resume/ATS', 'Interview', 'GitHub', 'Portfolio'],
    datasets: [
      {
        label: 'Candidate Competency Score',
        data: [
          user?.technical_score || 88,
          user?.aptitude_score || 82,
          user?.communication_score || 85,
          user?.ats_score || 86,
          user?.interview_score || 84,
          user?.github_score || 89,
          user?.portfolio_score || 82,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.25)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#60a5fa',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        pointLabels: { color: '#94a3b8', font: { size: 10, weight: '600' } },
        ticks: { display: false, stepSize: 20 },
        suggestedMin: 40,
        suggestedMax: 100,
      },
    },
    plugins: { legend: { display: false } },
  };

  const salaryData = {
    labels: ['Current', '+1 Year', '+2 Yrs (Upskill)', '+3 Yrs (Senior)', '+5 Yrs (Lead)'],
    datasets: [
      {
        label: 'Predicted Salary Trajectory ($)',
        data: [110000, 130000, 156000, 192000, 253000],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
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
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard className="border-blue-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Digital Twin Active
              </span>
              <span className="text-xs text-slate-400">Synced 2 minutes ago</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white">
              Welcome, <span className="gradient-text">{user?.first_name || user?.username || 'Candidate'}</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Target Role: <strong className="text-blue-400">{user?.target_role || 'Full Stack AI Engineer'}</strong>. Your AI Employability Twin is currently in the <span className="text-emerald-400 font-semibold">Top 4% Candidates</span> tier.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/digital-career-twin"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" /> View Digital Twin
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* Top 4 Score Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold">Overall Employability</p>
            <h3 className="text-2xl font-black text-white mt-1">{user?.employability_score || 84.5}%</h3>
            <span className="text-[10px] text-emerald-400 font-semibold">High Placement Readiness</span>
          </div>
          <StatGauge score={user?.employability_score || 84.5} label="" color="emerald" />
        </GlassCard>

        <GlassCard className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold">ATS Resume Match</p>
            <h3 className="text-2xl font-black text-white mt-1">{user?.ats_score || 86}%</h3>
            <span className="text-[10px] text-blue-400 font-semibold">Keywords Optimized</span>
          </div>
          <StatGauge score={user?.ats_score || 86} label="" color="blue" />
        </GlassCard>

        <GlassCard className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold">Technical Score</p>
            <h3 className="text-2xl font-black text-white mt-1">{user?.technical_score || 88}%</h3>
            <span className="text-[10px] text-purple-400 font-semibold">Python & React Expert</span>
          </div>
          <StatGauge score={user?.technical_score || 88} label="" color="purple" />
        </GlassCard>

        <GlassCard className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold">AI Interview Readiness</p>
            <h3 className="text-2xl font-black text-white mt-1">{user?.interview_score || 84}%</h3>
            <span className="text-[10px] text-amber-400 font-semibold">Fluent & Confident</span>
          </div>
          <StatGauge score={user?.interview_score || 84} label="" color="amber" />
        </GlassCard>
      </div>

      {/* Middle Grid: Radar & Salary Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" /> Multi-Module Competency Radar
              </h3>
              <p className="text-[11px] text-slate-400">7-dimension AI skill breakdown</p>
            </div>
            <Link to="/employability-score" className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1">
              Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" /> Predicted Salary Trajectory
              </h3>
              <p className="text-[11px] text-slate-400">5-year career projection curve</p>
            </div>
            <span className="text-xs font-bold text-emerald-400">${user?.predicted_salary_min?.toLocaleString() || '110,000'} - ${user?.predicted_salary_max?.toLocaleString() || '165,000'}</span>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Line data={salaryData} options={salaryOptions} />
          </div>
        </GlassCard>
      </div>

      {/* Enterprise Company Match Badges */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" /> Top Enterprise Compatibility Matches
            </h3>
            <p className="text-[11px] text-slate-400">AI predicted hiring probability based on current metrics</p>
          </div>
          <Link to="/company-match" className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1">
            View All 15+ Companies <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Google', prob: '88.5%', verdict: 'High Chance', color: 'emerald' },
            { name: 'Microsoft', prob: '86.0%', verdict: 'High Chance', color: 'emerald' },
            { name: 'Zoho', prob: '92.4%', verdict: 'Instant Fit', color: 'blue' },
            { name: 'Amazon', prob: '81.2%', verdict: 'High Chance', color: 'emerald' },
          ].map((c) => (
            <div key={c.name} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{c.name}</p>
                <span className="text-[10px] text-emerald-400 font-semibold">{c.verdict}</span>
              </div>
              <span className="text-xs font-black text-blue-400">{c.prob}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Access to Key Analyzers */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-3">Instant AI Module Launchers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/resume-analyzer" className="p-3.5 rounded-xl glass-card hover:border-blue-500/50 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Resume ATS</p>
              <p className="text-[10px] text-slate-400">Parse & Optimize</p>
            </div>
          </Link>

          <Link to="/mock-interview" className="p-3.5 rounded-xl glass-card hover:border-purple-500/50 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI Interview</p>
              <p className="text-[10px] text-slate-400">Webcam & Emotion</p>
            </div>
          </Link>

          <Link to="/communication-analyzer" className="p-3.5 rounded-xl glass-card hover:border-amber-500/50 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Voice Coach</p>
              <p className="text-[10px] text-slate-400">Fluency & WPM</p>
            </div>
          </Link>

          <Link to="/technical-test" className="p-3.5 rounded-xl glass-card hover:border-emerald-500/50 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Coding Test</p>
              <p className="text-[10px] text-slate-400">Multi-language MCQ</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
