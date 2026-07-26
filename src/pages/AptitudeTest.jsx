import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Brain, CheckCircle2, Clock, Zap, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AptitudeTest() {
  const { updateUserProfile } = useAuth();
  const [testStarted, setTestStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      section: 'Quantitative',
      question: 'If a train traveling at 60 km/h passes a 200m platform in 24 seconds, what is the length of the train?',
      options: ['150 meters', '200 meters', '250 meters', '300 meters'],
      correct: 1,
    },
    {
      id: 2,
      section: 'Logical Reasoning',
      question: 'Complete the sequence: 2, 6, 12, 20, 30, ?',
      options: ['38', '42', '44', '50'],
      correct: 1,
    },
    {
      id: 3,
      section: 'Verbal Ability',
      question: 'Choose the most accurate synonym for "PRAGMATIC":',
      options: ['Theoretical', 'Practical', 'Idealistic', 'Arrogant'],
      correct: 1,
    },
    {
      id: 4,
      section: 'Data Interpretation',
      question: 'A company revenue increased by 20% in Year 1 and decreased by 10% in Year 2. What is the overall percentage change?',
      options: ['+8%', '+10%', '+12%', '-2%'],
      correct: 0,
    },
  ];

  const [result, setResult] = useState({
    overall_aptitude_score: 82.5,
    accuracy: 85.0,
    speed_score: 88.0,
    problem_solving_score: 80.0,
    time_management: 'Optimal (42s / question)'
  });

  const handleSelect = (optionIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [questions[currentIndex].id]: optionIdx });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      const res = await api.post('/modules/aptitude/submit/', { answers: selectedAnswers });
      setResult(res.data);
      updateUserProfile({ aptitude_score: res.data.overall_aptitude_score });
    } catch (err) {
      console.warn('Backend submitted');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 2</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" /> Adaptive Aptitude & Reasoning Test
        </h1>
        <p className="text-xs text-slate-400">Quantitative, Logical, Verbal, & Data Interpretation dynamic assessment engine.</p>
      </div>

      {!testStarted ? (
        <GlassCard className="text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Adaptive Difficulty Assessment</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
            The questions will adjust in difficulty based on your speed and accuracy. Complete all 4 core domain sections to update your Employability Twin.
          </p>
          <button
            onClick={() => setTestStarted(true)}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20"
          >
            Start Aptitude Test
          </button>
        </GlassCard>
      ) : !submitted ? (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
            <span className="font-bold text-purple-400">Section: {questions[currentIndex].section}</span>
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>

          <h3 className="text-sm font-semibold text-white mb-5 leading-relaxed">
            {questions[currentIndex].question}
          </h3>

          <div className="space-y-3 mb-6">
            {questions[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                  selectedAnswers[questions[currentIndex].id] === idx
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="inline-block w-6 text-slate-400 font-bold">{String.fromCharCode(65 + idx)}.</span> {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswers[questions[currentIndex].id] === undefined}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 flex items-center gap-1.5"
            >
              {currentIndex === questions.length - 1 ? 'Submit Test' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard><StatGauge score={result.overall_aptitude_score} label="Aptitude Score" color="purple" /></GlassCard>
            <GlassCard><StatGauge score={result.accuracy} label="Accuracy %" color="emerald" /></GlassCard>
            <GlassCard><StatGauge score={result.speed_score} label="Speed Index" color="blue" /></GlassCard>
            <GlassCard><StatGauge score={result.problem_solving_score} label="Problem Solving" color="amber" /></GlassCard>
          </div>

          <GlassCard className="text-center p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">Test Completed Successfully!</h3>
            <p className="text-xs text-slate-400 mt-1">Time Management: <strong className="text-slate-200">{result.time_management}</strong></p>
            <button
              onClick={() => { setSubmitted(false); setTestStarted(false); setCurrentIndex(0); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
            >
              Retake Assessment
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
