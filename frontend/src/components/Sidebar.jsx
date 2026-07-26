import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Brain, Mic, Code2, Github, Globe, Linkedin,
  Video, Sparkles, PieChart, ShieldCheck, Languages, Briefcase, Building2,
  TrendingUp, Compass, Map, UserCheck, Activity, LineChart, Settings
} from 'lucide-react';

export default function Sidebar() {
  const modules = [
    { label: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Core' },
    { label: 'Digital Career Twin', path: '/digital-career-twin', icon: Activity, category: 'Flagship', highlight: true },
    
    { label: '1. Resume Analyzer', path: '/resume-analyzer', icon: FileText, category: 'Assessment' },
    { label: '2. Adaptive Aptitude', path: '/aptitude-test', icon: Brain, category: 'Assessment' },
    { label: '3. Communication Voice', path: '/communication-analyzer', icon: Mic, category: 'Assessment' },
    { label: '4. Technical Coding', path: '/technical-test', icon: Code2, category: 'Assessment' },
    { label: '5. GitHub Inspector', path: '/github-analyzer', icon: Github, category: 'Assessment' },
    { label: '6. Portfolio Web Audit', path: '/portfolio-analyzer', icon: Globe, category: 'Assessment' },
    { label: '7. LinkedIn Optimizer', path: '/linkedin-analyzer', icon: Linkedin, category: 'Assessment' },
    { label: '8. AI Mock Interview', path: '/mock-interview', icon: Video, category: 'Assessment' },
    { label: '9. Personality Radar', path: '/personality-analysis', icon: Sparkles, category: 'Assessment' },

    { label: '10. Employability Score', path: '/employability-score', icon: PieChart, category: 'Intelligence' },
    { label: '11. Language Matrix', path: '/language-proficiency', icon: Languages, category: 'Intelligence' },
    { label: '12. Job Role Predictor', path: '/job-role-prediction', icon: Briefcase, category: 'Intelligence' },
    { label: '13. Company Matcher', path: '/company-match', icon: Building2, category: 'Intelligence' },
    { label: '14. AI Salary Growth', path: '/salary-prediction', icon: TrendingUp, category: 'Intelligence' },
    { label: '15. Skill Gap Analysis', path: '/skill-gap-analysis', icon: Compass, category: 'Intelligence' },
    { label: '16. AI Career Roadmap', path: '/learning-roadmap', icon: Map, category: 'Intelligence' },
    { label: '17. AI Recruiter Decision', path: '/ai-recruiter', icon: UserCheck, category: 'Intelligence' },
    { label: '19. Career Growth Forecast', path: '/career-prediction', icon: LineChart, category: 'Intelligence' },
    { label: '20. Super Admin Panel', path: '/admin-panel', icon: Settings, category: 'Admin' },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-61px)] sticky top-[61px] glass-panel border-r border-slate-800/80 p-4 overflow-y-auto hidden lg:block">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Main Suite</p>
          <div className="space-y-1">
            {modules.filter(m => m.category === 'Core' || m.category === 'Flagship').map((mod) => (
              <NavLink
                key={mod.path}
                to={mod.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  } ${mod.highlight ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30' : ''}`
                }
              >
                <mod.icon className={`w-4 h-4 ${mod.highlight ? 'text-purple-400' : 'text-slate-400'}`} />
                <span className="flex-1">{mod.label}</span>
                {mod.highlight && (
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">AI Analyzers (1-9)</p>
          <div className="space-y-1">
            {modules.filter(m => m.category === 'Assessment').map((mod) => (
              <NavLink
                key={mod.path}
                to={mod.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`
                }
              >
                <mod.icon className="w-4 h-4 text-slate-400" />
                <span>{mod.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Predictions & Recruiter (10-20)</p>
          <div className="space-y-1">
            {modules.filter(m => m.category === 'Intelligence' || m.category === 'Admin').map((mod) => (
              <NavLink
                key={mod.path}
                to={mod.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`
                }
              >
                <mod.icon className="w-4 h-4 text-slate-400" />
                <span>{mod.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
