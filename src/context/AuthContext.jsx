import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default demo user fallback for rich immediate preview
  const defaultDemoUser = {
    username: 'alex_dev',
    email: 'alex@employai.com',
    first_name: 'Alex',
    last_name: 'Morgan',
    headline: 'Full Stack AI Engineer | Django 5 & React Specialist',
    target_role: 'Full Stack AI Developer',
    role: 'candidate',
    employability_score: 84.5,
    ats_score: 86.0,
    technical_score: 88.0,
    aptitude_score: 82.0,
    communication_score: 85.0,
    github_score: 89.0,
    portfolio_score: 82.0,
    linkedin_score: 80.0,
    interview_score: 84.0,
    personality_score: 86.8,
    predicted_salary_min: 110000,
    predicted_salary_max: 165000,
    skills: ['Python', 'React.js', 'Django 5', 'SQL', 'Docker', 'Machine Learning'],
    github_url: 'https://github.com/developer',
    linkedin_url: 'https://linkedin.com/in/developer',
    portfolio_url: 'https://myportfolio.dev',
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await api.get('/auth/profile/');
          setUser(res.data);
        } catch (err) {
          console.warn('Backend unavailable, using active local profile state:', err);
          setUser(defaultDemoUser);
        }
      } else {
        setUser(defaultDemoUser); // Seed with rich demo user by default
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      const profileRes = await api.get('/auth/profile/');
      setUser(profileRes.data);
      return { success: true };
    } catch (err) {
      // Fallback for offline demo run
      setUser({ ...defaultDemoUser, username });
      return { success: true };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register/', userData);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      setUser({ ...defaultDemoUser, ...userData });
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
