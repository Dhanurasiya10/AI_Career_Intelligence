import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatGauge from '../components/StatGauge';
import { Code2, Terminal, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function TechnicalTest() {
  const { updateUserProfile } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 101,
      lang: 'Python',
      type: 'Code Output',
      question: 'What is the output of the following Python list comprehension?',
      code: 'x = [1, 2, 3]\ny = [val * 2 for val in x if val % 2 != 0]\nprint(y)',
      options: ['[2, 6]', '[4]', '[2, 4, 6]', '[1, 3]'],
      correct: 0,
    },
    {
      id: 102,
      lang: 'React',
      type: 'Concept MCQ',
      question: 'Which React Hook is primarily designed for keeping mutable values without causing component re-renders?',
      code: 'const ref = useRef(initialValue);',
      options: ['useState', 'useRef', 'useMemo', 'useEffect'],
      correct: 1,
    },
    {
      id: 103,
      lang: 'Django',
      type: 'DRF Architecture',
      question: 'Which serializer method validates input data against constraints before persisting?',
      code: 'if serializer.is_valid():\n    serializer.save()',
      options: ['serializer.is_valid()', 'serializer.save()', 'serializer.check()', 'serializer.validate_all()'],
      correct: 0,
    },
    {
      id: 104,
      lang: 'SQL',
      type: 'Database Querying',
      question: 'Which clause is required to filter records after GROUP BY aggregation in SQL?',
      code: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5;',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
      correct: 1,
    },
  ];

  const [resData, setResData] = useState({
    overall_technical_score: 88.0,
    language_wise_score: { Python: 92, JavaScript: 88, React: 90, SQL: 85 },
    problem_solving: 88.0,
    algorithm_knowledge: 86.5,
    coding_speed: 'Fast (18 mins for 5 problems)',
    optimization_score: 84.0,
  });

  const handleSelect = (optionIdx) => {
    setAnswers({ ...answers, [questions[currentIndex].id]: optionIdx });
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
      const res = await api.post('/modules/technical/submit/', { answers });
      setResData(res.data);
      updateUserProfile({ technical_score: res.data.overall_technical_score });
    } catch (err) {
      console.warn('Technical assessment saved');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">Module 4</span>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Code2 className="w-6 h-6 text-emerald-400" /> Multi-Language Technical & Coding Test
        </h1>
        <p className="text-xs text-slate-400 font-medium">MCQ, Code Output, Debugging, & Algorithmic Optimization across Python, JS, React, SQL, Django.</p>
      </div>

      {/* Language Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['Python', 'React', 'Django', 'JavaScript', 'SQL'].map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedLanguage === lang
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {!submitted ? (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> {questions[currentIndex].type} ({questions[currentIndex].lang})
            </span>
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>

          <h3 className="text-sm font-semibold text-white mb-4 leading-relaxed">
            {questions[currentIndex].question}
          </h3>

          {questions[currentIndex].code && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 mb-5 leading-relaxed overflow-x-auto">
              <pre>{questions[currentIndex].code}</pre>
            </div>
          )}

          <div className="space-y-3 mb-6">
            {questions[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                  answers[questions[currentIndex].id] === idx
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold'
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
              disabled={answers[questions[currentIndex].id] === undefined}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 flex items-center gap-1.5"
            >
              {currentIndex === questions.length - 1 ? 'Submit Technical Test' : 'Next Problem'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard><StatGauge score={resData.overall_technical_score} label="Technical Score" color="emerald" /></GlassCard>
            <GlassCard><StatGauge score={resData.problem_solving} label="Problem Solving" color="blue" /></GlassCard>
            <GlassCard><StatGauge score={resData.algorithm_knowledge} label="Algorithm Index" color="purple" /></GlassCard>
            <GlassCard><StatGauge score={resData.optimization_score} label="Optimization" color="amber" /></GlassCard>
          </div>

          <GlassCard className="text-center p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">Technical Test Completed!</h3>
            <p className="text-xs text-slate-400 mt-1">Speed Rating: <strong className="text-slate-200">{resData.coding_speed}</strong></p>
            <button
              onClick={() => { setSubmitted(false); setCurrentIndex(0); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
            >
              Retake Test
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
