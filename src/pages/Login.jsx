import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function Login({ settings, addToast }) {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showShortcut, setShowShortcut] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect immediately to admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const correctPassword = settings.admin_password || 'admin';
    const success = login(email, password, correctPassword);

    if (success) {
      addToast('Welcome back, Chef!', 'success');
      navigate('/admin');
    } else {
      addToast('Invalid admin email or password.', 'error');
    }
  };

  const handleHeaderClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowShortcut(true);
        addToast('Developer shortcut activated! Default credentials shown.', 'info');
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-accent-50/30 dark:from-darkBg-dark dark:via-darkBg dark:to-brand-950/20 py-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-850 p-8 sm:p-10 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-premium"
      >
        <div 
          onClick={handleHeaderClick} 
          className="text-center space-y-3 cursor-pointer select-none group"
          title="Click 5 times for assistance"
        >
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-brand/10 dark:bg-brand/20 text-brand group-hover:scale-105 transition-transform duration-200">
            <Lock size={28} />
          </div>
          <h2 className="font-display font-extrabold text-3xl text-neutral-900 dark:text-white">
            Chef Login
          </h2>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto">
            Please enter your cloud kitchen credentials to manage menu lists & settings.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleLoginSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@goodfood.com"
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-1 focus:ring-brand focus:border-brand text-neutral-850 dark:text-neutral-100 text-sm font-semibold"
              />
            </div>
          </div>

          {showShortcut && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-neutral-400 font-semibold bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-750 flex items-center gap-2"
            >
              <KeyRound size={14} className="text-accent" />
              <span>Default credentials: owner@goodfood.com / admin</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-brand hover:bg-brand-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand/10 hover:shadow-brand/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm tracking-wide"
          >
            <span>Verify & Access</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
