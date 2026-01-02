import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [view, setView] = useState('login'); // Options: 'login', 'register', 'forgot'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // --- 1. HANDLE FORGOT PASSWORD (MOCK) ---
    if (view === 'forgot') {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert(`Password reset link sent to ${formData.email} (Demo Only)`);
        setView('login');
      }, 1500);
      return;
    }

    // --- 2. EXISTING LOGIN/REGISTER LOGIC ---
    setIsLoading(true);
    const endpoint = view === 'login' ? '/api/login' : '/api/register';
    const url = `http://localhost:5000${endpoint}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      if (view === 'login') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userAvatar', data.user.avatar || ''); // 👈 Save Avatar

        navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        alert('Account created! Please log in.');
        setView('login');
        setFormData({ ...formData, password: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-2xl mb-4 shadow-lg">S</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Create Account' : 'Reset Password'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {view === 'forgot' ? 'Enter your email to receive reset instructions.' : 'Manage your SaaS dashboard.'}
          </p>
        </div>

        <Card className="p-8 border-t-4 border-t-indigo-600 shadow-xl">
          {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-sm rounded-md">{error}</div>}

          <AnimatePresence mode="wait">
            <motion.form
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {view === 'register' && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input name="email" type="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                </div>
              </div>

              {view !== 'forgot' && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                    {view === 'login' && (
                      <button type="button" onClick={() => setView('forgot')} className="text-xs text-indigo-600 hover:underline">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                  </div>
                </div>
              )}

              <Button className="w-full mt-6" size="lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : view === 'login' ? 'Sign In' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
              </Button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-6 text-center text-sm text-slate-500">
            {view === 'forgot' ? (
              <button onClick={() => setView('login')} className="text-slate-600 flex items-center justify-center gap-1 hover:underline mx-auto">
                <ArrowLeft size={14} /> Back to Login
              </button>
            ) : (
              <>
                {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setView(view === 'login' ? 'register' : 'login')} className="text-indigo-600 font-semibold hover:underline">
                  {view === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;