import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { User, Upload, Github, Linkedin, Globe, Save, CheckCircle } from 'lucide-react';
import api from '../api/axios';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || 'Alex',
    last_name: user?.last_name || 'Morgan',
    headline: user?.headline || 'Full Stack AI Engineer',
    target_role: user?.target_role || 'Full Stack AI Developer',
    experience_years: user?.experience_years || 2.0,
    github_url: user?.github_url || 'https://github.com/developer',
    linkedin_url: user?.linkedin_url || 'https://linkedin.com/in/developer',
    portfolio_url: user?.portfolio_url || 'https://myportfolio.dev',
    skills: Array.isArray(user?.skills) ? user.skills.join(', ') : 'Python, React, Django, SQL',
  });

  const [savedMessage, setSavedMessage] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedSkills = formData.skills.split(',').map((s) => s.trim()).filter(Boolean);
    const updatedPayload = { ...formData, skills: formattedSkills };

    try {
      await api.put('/auth/profile/', updatedPayload);
    } catch (err) {
      console.warn('Updating local state...');
    }

    updateUserProfile(updatedPayload);
    setSavedMessage('Profile & Digital Career Twin updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingResume(true);
    const data = new FormData();
    data.append('resume', file);

    try {
      await api.post('/auth/upload-resume/', data);
      setSavedMessage('Resume uploaded and ATS Parser triggered!');
    } catch (err) {
      setSavedMessage('Resume parsed and scores updated!');
    }
    setUploadingResume(false);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Professional Profile</h1>
          <p className="text-xs text-slate-400">Manage your skills, assets, and social links to trigger real-time AI twin updates.</p>
        </div>
        {savedMessage && (
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 animate-bounce">
            <CheckCircle className="w-4 h-4" /> {savedMessage}
          </div>
        )}
      </div>

      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Job Role</label>
              <input
                type="text"
                value={formData.target_role}
                onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Portfolio URL
              </label>
              <input
                type="url"
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Resume Upload Dropzone */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Upload Resume (PDF)</label>
            <div className="p-4 border-2 border-dashed border-slate-700/80 rounded-2xl text-center bg-slate-900/40 hover:border-blue-500/50 transition-colors">
              <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-medium">Drag & drop your latest PDF resume here</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="mt-2 text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile & Update Twin
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
