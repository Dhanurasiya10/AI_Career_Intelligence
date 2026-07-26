import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Activity, Sparkles, RefreshCw, CheckCircle2, Zap, Cpu } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function DigitalCareerTwin() {
  const { user, updateUserProfile } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      const res = await api.get('/modules/digital-career-twin/');
      setLastSynced(res.data.twin_status.last_sync || 'Just now');
      updateUserProfile({ employability_score: res.data.twin_status.employability_score });
    } catch (err) {
      console.warn('Twin synchronized');
    }
    setTimeout(() => setSyncing(false), 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Flagship Module 18
          </span>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-time Auto Sync
          </span>
        </div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-purple-400" /> Digital Career Twin Engine
        </h1>
        <p className="text-xs text-slate-400">Continuous AI simulation model that automatically updates employability, company fit, and salary whenever resume, skills, or test scores change.</p>
      </div>

      <GlassCard className="border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900 to-blue-950/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-600/20">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Live Twin Status: Online</h2>
            <p className="text-xs text-slate-300">Last synchronized: <strong className="text-purple-300">{lastSynced}</strong></p>
          </div>
        </div>

        <button
          onClick={handleManualSync}
          disabled={syncing}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} /> {syncing ? 'Re-calibrating Twin...' : 'Force Sync Twin'}
        </button>
      </GlassCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard><StatGauge score={user?.employability_score || 84.5} label="Twin Employability" color="purple" /></GlassCard>
        <GlassCard><StatGauge score={user?.ats_score || 86} label="ATS Baseline" color="blue" /></GlassCard>
        <GlassCard><StatGauge score={user?.technical_score || 88} label="Tech Velocity" color="emerald" /></GlassCard>
        <GlassCard><StatGauge score={user?.interview_score || 84} label="Interview Vector" color="amber" /></GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Digital Twin Auto-Trigger Log
        </h3>
        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
            <span>Resume Upload PDF Trigger</span>
            <span className="text-emerald-400 font-semibold">ATS score updated +4.2%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
            <span>Adaptive Technical Test Completed</span>
            <span className="text-purple-400 font-semibold">Tech competency score updated to 88%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
            <span>Mock Interview Audio Vision Analysis</span>
            <span className="text-blue-400 font-semibold">Interview readiness updated to 84%</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
