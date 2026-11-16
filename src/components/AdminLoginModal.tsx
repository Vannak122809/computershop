'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  KeyRound, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { ROLE_CONFIG, authenticateLocalAdmin } from '@/lib/auth';
import { AdminUser, UserRole } from '@/lib/types';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  lang?: 'kh' | 'en';
}

export default function AdminLoginModal({ onSuccess, lang = 'kh' }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. Check local admin accounts (offline / static hosting compatible)
    const localUser = authenticateLocalAdmin(username, password);
    if (localUser) {
      try {
        localStorage.setItem('nv_admin_user', JSON.stringify(localUser));
      } catch (e) {}
      setLoading(false);
      onSuccess(localUser);
      return;
    }

    // 2. Fallback to API if available
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          try {
            localStorage.setItem('nv_admin_user', JSON.stringify(data.user));
          } catch (e) {}
          onSuccess(data.user);
          return;
        }
      }
    } catch (err: any) {}

    setError(lang === 'kh' ? 'ឈ្មោះ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ' : 'Invalid username or password');
    setLoading(false);
  };

  const handleQuickLogin = async (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    setLoading(true);
    setError(null);

    const localUser = authenticateLocalAdmin(user, pass);
    if (localUser) {
      try {
        localStorage.setItem('nv_admin_user', JSON.stringify(localUser));
      } catch (e) {}
      setLoading(false);
      onSuccess(localUser);
      return;
    }

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: user, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          try {
            localStorage.setItem('nv_admin_user', JSON.stringify(data.user));
          } catch (e) {}
          onSuccess(data.user);
          return;
        }
      }
    } catch (err: any) {}

    setError(lang === 'kh' ? 'ឈ្មោះ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ' : 'Invalid username or password');
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-khmer">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden modal-content-anim">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>
          
          <div className="w-14 h-14 rounded-2xl bg-[#0187ca] text-white mx-auto flex items-center justify-center shadow-lg shadow-sky-500/30 mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-lg font-black tracking-wide">
            {lang === 'kh' ? 'ប្រព័ន្ធសុវត្ថិភាព ADMIN NV TECHNOLOGY' : 'NV TECHNOLOGY SECURITY GATEWAY'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {lang === 'kh' 
              ? 'សូមចូលគណនីបុគ្គលិក ដើម្បីគ្រប់គ្រងស្តុក និងទំនិញ' 
              : 'Authorized Staff Login & User Access Levels'}
          </p>
        </div>

        {/* Login Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {lang === 'kh' ? 'ឈ្មោះគណនី (Username)' : 'Username'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin, inventory, sales..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-slate-800 font-mono text-xs focus:outline-none focus:border-[#0187ca] focus:bg-white transition"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {lang === 'kh' ? 'ពាក្យសម្ងាត់ (Password)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 pr-10 text-slate-800 font-mono text-xs focus:outline-none focus:border-[#0187ca] focus:bg-white transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-tactile bg-[#0187ca] hover:bg-[#0073ad] text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              <span>{loading ? 'Verifying Credentials...' : (lang === 'kh' ? 'ចូលប្រព័ន្ធ (Login)' : 'Sign In')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* User Levels Fast Switch / Demo Access */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 block">
                {lang === 'kh' ? 'សាកល្បងចូលតាមកម្រិតសិទ្ធិ (Test User Levels):' : 'Fast Test Login by User Level:'}
              </span>
              <span className="text-[9px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200 font-bold">
                Pass: test123
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {/* Level 1: Super Admin */}
              <button
                type="button"
                onClick={() => handleQuickLogin('test1', 'test123')}
                className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-left transition btn-tactile group"
              >
                <div className="font-bold text-purple-900 flex items-center justify-between">
                  <span>👑 Level 1</span>
                  <span className="text-[8px] bg-purple-200 px-1 rounded font-mono group-hover:bg-purple-300">test1</span>
                </div>
                <span className="text-purple-700 block truncate font-medium mt-0.5">Super Admin</span>
                <span className="text-[9px] text-purple-500 font-mono">admin / admin123</span>
              </button>

              {/* Level 2: Stock Manager */}
              <button
                type="button"
                onClick={() => handleQuickLogin('test2', 'test123')}
                className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left transition btn-tactile group"
              >
                <div className="font-bold text-sky-900 flex items-center justify-between">
                  <span>📦 Level 2</span>
                  <span className="text-[8px] bg-sky-200 px-1 rounded font-mono group-hover:bg-sky-300">test2</span>
                </div>
                <span className="text-sky-700 block truncate font-medium mt-0.5">Stock Manager</span>
                <span className="text-[9px] text-sky-500 font-mono">inventory / manager123</span>
              </button>

              {/* Level 3: Sales Staff */}
              <button
                type="button"
                onClick={() => handleQuickLogin('test3', 'test123')}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition btn-tactile group"
              >
                <div className="font-bold text-emerald-900 flex items-center justify-between">
                  <span>💼 Level 3</span>
                  <span className="text-[8px] bg-emerald-200 px-1 rounded font-mono group-hover:bg-emerald-300">test3</span>
                </div>
                <span className="text-emerald-700 block truncate font-medium mt-0.5">Sales Staff</span>
                <span className="text-[9px] text-emerald-500 font-mono">sales / sales123</span>
              </button>

              {/* Level 4: Auditor */}
              <button
                type="button"
                onClick={() => handleQuickLogin('test4', 'test123')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-left transition btn-tactile group"
              >
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>👁️ Level 4</span>
                  <span className="text-[8px] bg-slate-300 px-1 rounded font-mono group-hover:bg-slate-400">test4</span>
                </div>
                <span className="text-slate-600 block truncate font-medium mt-0.5">Auditor (Read-Only)</span>
                <span className="text-[9px] text-slate-500 font-mono">auditor / audit123</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
