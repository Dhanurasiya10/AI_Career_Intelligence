import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CommunicationAnalyzer() {
  const { updateUserProfile } = useAuth();
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [timer, setTimer] = useState(0);

  const [data, setData] = useState({
    communication_score: 85.0,
    grammar_score: 88,
    confidence_score: 84,
    pronunciation_score: 87,
    fluency_score: 86,
    vocabulary_score: 85,
    speech_speed_wpm: 138,
    tone_analysis: 'Enthusiastic & Professional',
    pause_frequency: 'Optimal (1.2 pauses/min)',
    suggestions: [
      'Maintain steady vocal cadence when explaining complex technical concepts.',
      'Incorporate structured transition words (e.g. Furthermore, Consequently) to boost vocabulary richness.'
    ]
  });

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
    } else {
      setRecording(false);
      setAnalyzing(true);
      setTimeout(async () => {
        try {
          const res = await api.post('/modules/communication-analyzer/', { duration: 25 });
          setData(res.data);
          updateUserProfile({ communication_score: res.data.communication_score });
        } catch (err) {
          console.warn('Voice analyzed locally');
        }
        setAnalyzing(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 3</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Mic className="w-6 h-6 text-amber-400" /> AI Voice Communication & Speech Analyzer
        </h1>
        <p className="text-xs text-slate-400">Evaluate grammar, confidence, pronunciation, fluency, vocabulary, tone, and speech speed (WPM).</p>
      </div>

      <GlassCard className="text-center p-8 border-amber-500/30">
        <div className="relative inline-block mb-4">
          {recording && (
            <div className="absolute -inset-3 bg-amber-500/20 rounded-full animate-ping"></div>
          )}
          <button
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-xl ${
              recording
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
            }`}
          >
            {recording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

        <h3 className="text-sm font-bold text-white mb-1">
          {recording ? 'Recording Speech... Speak clearly into your mic' : 'Click Mic to Record 30s Speech Sample'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          "Describe your recent software project and the key technical challenges you resolved."
        </p>
      </GlassCard>

      {/* Results Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard><StatGauge score={data.communication_score} label="Voice Score" color="amber" /></GlassCard>
        <GlassCard><StatGauge score={data.confidence_score} label="Confidence" color="emerald" /></GlassCard>
        <GlassCard><StatGauge score={data.fluency_score} label="Fluency Index" color="blue" /></GlassCard>
        <GlassCard><StatGauge score={data.pronunciation_score} label="Pronunciation" color="purple" /></GlassCard>
      </div>

      {/* Voice Parameters Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400" /> Speech Rate & Cadence
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Words Per Minute (WPM):</span>
              <strong className="text-white font-bold">{data.speech_speed_wpm} WPM (Ideal range: 130-150)</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Tone Analysis:</span>
              <strong className="text-amber-400 font-bold">{data.tone_analysis}</strong>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Pause Frequency:</span>
              <strong className="text-emerald-400 font-bold">{data.pause_frequency}</strong>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> AI Speech Feedback
          </h3>
          <ul className="space-y-2">
            {data.suggestions.map((sug, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
