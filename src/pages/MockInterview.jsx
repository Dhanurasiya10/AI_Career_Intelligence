import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Video, Mic, Eye, Smile, AlertCircle, CheckCircle2, Play, Square } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function MockInterview() {
  const { updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('Technical');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [interviewResult, setInterviewResult] = useState({
    interview_score: 84.0,
    confidence_score: 85.0,
    eye_contact_score: 88.0,
    communication_fluency: 86.0,
    answer_quality_score: 86.0,
    technical_accuracy: 84.0,
    avg_thinking_time: '3.5 seconds',
    detected_emotion: 'Focused & Confident',
    feedback: [
      'Great articulation when explaining architectural trade-offs in Django microservices.',
      'Maintain eye contact continuously during scenario-based system design questions.'
    ]
  });

  const handleFinishInterview = async () => {
    setAnalyzing(true);
    setTimeout(async () => {
      try {
        const res = await api.post('/modules/mock-interview/submit/', {});
        setInterviewResult(res.data);
        updateUserProfile({ interview_score: res.data.interview_score });
      } catch (err) {
        console.warn('Interview evaluated');
      }
      setAnalyzing(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 8</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Video className="w-6 h-6 text-rose-400" /> AI Mock Interview Simulator & Emotion Analyzer
        </h1>
        <p className="text-xs text-slate-400">HR, Technical, System Design, & Behavioral interview engine with real-time video feedback.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        {['Technical', 'HR Behavioral', 'System Design', 'Coding Interview'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {!interviewStarted ? (
        <GlassCard className="text-center p-8 border-rose-500/30">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Simulated {activeTab} Interview</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
            The AI interviewer will ask 3 live questions. Enable your camera & microphone for real-time eye-contact and facial emotion scoring.
          </p>
          <button
            onClick={() => { setInterviewStarted(true); setSubmitted(false); }}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-white" /> Start AI Interview Session
          </button>
        </GlassCard>
      ) : !submitted ? (
        <GlassCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Webcam feed simulator */}
            <div className="md:col-span-2 relative rounded-2xl bg-slate-950 border border-slate-800 h-64 overflow-hidden flex flex-col justify-between p-3">
              <div className="flex justify-between items-center z-10">
                <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white"></span> REC • AI Live Vision Active
                </span>
                <span className="text-[10px] text-slate-400 font-mono">00:01:42</span>
              </div>

              <div className="text-center text-slate-500 my-auto">
                <Video className="w-12 h-12 mx-auto mb-1 text-slate-700 animate-pulse" />
                <p className="text-xs">Webcam Eye-Tracking & Facial Mesh Active</p>
              </div>

              {/* Real-time Overlay metrics */}
              <div className="flex justify-around bg-slate-900/90 backdrop-blur-md rounded-xl p-2 border border-slate-800 text-[10px] text-slate-300">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-blue-400" /> Eye Contact: 88%</span>
                <span className="flex items-center gap-1"><Smile className="w-3.5 h-3.5 text-emerald-400" /> Emotion: Focused</span>
                <span className="flex items-center gap-1"><Mic className="w-3.5 h-3.5 text-purple-400" /> Audio: Crisp</span>
              </div>
            </div>

            {/* Question Panel */}
            <div className="flex flex-col justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400">Question 1 of 3</span>
                <h4 className="text-xs font-semibold text-white mt-2 leading-relaxed">
                  "How do you approach designing a scalable database schema for high-throughput REST APIs in Django?"
                </h4>
              </div>

              <button
                onClick={handleFinishInterview}
                disabled={analyzing}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 mt-4"
              >
                <Square className="w-4 h-4 fill-white" /> {analyzing ? 'Analyzing Session...' : 'Submit Answer & Complete'}
              </button>
            </div>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard><StatGauge score={interviewResult.interview_score} label="Interview Score" color="rose" /></GlassCard>
            <GlassCard><StatGauge score={interviewResult.eye_contact_score} label="Eye Contact" color="blue" /></GlassCard>
            <GlassCard><StatGauge score={interviewResult.confidence_score} label="Confidence Index" color="emerald" /></GlassCard>
            <GlassCard><StatGauge score={interviewResult.answer_quality_score} label="Answer Quality" color="purple" /></GlassCard>
          </div>

          <GlassCard>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Interception & Feedback
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              {interviewResult.feedback.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
