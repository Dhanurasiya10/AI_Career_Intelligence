import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import ResumeAnalyzer from './pages/ResumeAnalyzer';
import AptitudeTest from './pages/AptitudeTest';
import CommunicationAnalyzer from './pages/CommunicationAnalyzer';
import TechnicalTest from './pages/TechnicalTest';
import GithubAnalyzer from './pages/GithubAnalyzer';
import PortfolioAnalyzer from './pages/PortfolioAnalyzer';
import LinkedinAnalyzer from './pages/LinkedinAnalyzer';
import MockInterview from './pages/MockInterview';
import PersonalityAnalysis from './pages/PersonalityAnalysis';
import EmployabilityScore from './pages/EmployabilityScore';
import LanguageProficiency from './pages/LanguageProficiency';
import JobRolePrediction from './pages/JobRolePrediction';
import CompanyMatch from './pages/CompanyMatch';
import SalaryPrediction from './pages/SalaryPrediction';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import LearningRoadmap from './pages/LearningRoadmap';
import AiRecruiter from './pages/AiRecruiter';
import DigitalCareerTwin from './pages/DigitalCareerTwin';
import CareerPrediction from './pages/CareerPrediction';
import AdminPanel from './pages/AdminPanel';

function ProtectedLayout({ children }) {
  const { loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading EmployAI...</div>;
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />

          <Route path="/resume-analyzer" element={<ProtectedLayout><ResumeAnalyzer /></ProtectedLayout>} />
          <Route path="/aptitude-test" element={<ProtectedLayout><AptitudeTest /></ProtectedLayout>} />
          <Route path="/communication-analyzer" element={<ProtectedLayout><CommunicationAnalyzer /></ProtectedLayout>} />
          <Route path="/technical-test" element={<ProtectedLayout><TechnicalTest /></ProtectedLayout>} />
          <Route path="/github-analyzer" element={<ProtectedLayout><GithubAnalyzer /></ProtectedLayout>} />
          <Route path="/portfolio-analyzer" element={<ProtectedLayout><PortfolioAnalyzer /></ProtectedLayout>} />
          <Route path="/linkedin-analyzer" element={<ProtectedLayout><LinkedinAnalyzer /></ProtectedLayout>} />
          <Route path="/mock-interview" element={<ProtectedLayout><MockInterview /></ProtectedLayout>} />
          <Route path="/personality-analysis" element={<ProtectedLayout><PersonalityAnalysis /></ProtectedLayout>} />

          <Route path="/employability-score" element={<ProtectedLayout><EmployabilityScore /></ProtectedLayout>} />
          <Route path="/language-proficiency" element={<ProtectedLayout><LanguageProficiency /></ProtectedLayout>} />
          <Route path="/job-role-prediction" element={<ProtectedLayout><JobRolePrediction /></ProtectedLayout>} />
          <Route path="/company-match" element={<ProtectedLayout><CompanyMatch /></ProtectedLayout>} />
          <Route path="/salary-prediction" element={<ProtectedLayout><SalaryPrediction /></ProtectedLayout>} />
          <Route path="/skill-gap-analysis" element={<ProtectedLayout><SkillGapAnalysis /></ProtectedLayout>} />
          <Route path="/learning-roadmap" element={<ProtectedLayout><LearningRoadmap /></ProtectedLayout>} />
          <Route path="/ai-recruiter" element={<ProtectedLayout><AiRecruiter /></ProtectedLayout>} />
          <Route path="/digital-career-twin" element={<ProtectedLayout><DigitalCareerTwin /></ProtectedLayout>} />
          <Route path="/career-prediction" element={<ProtectedLayout><CareerPrediction /></ProtectedLayout>} />
          <Route path="/admin-panel" element={<ProtectedLayout><AdminPanel /></ProtectedLayout>} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
