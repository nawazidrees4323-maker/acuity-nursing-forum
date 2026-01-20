import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../services/mockData';
import { LOGO_URL } from '../constants';
import { ArrowLeft, Lock, User as UserIcon, Mail, Phone } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'forgot' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  // Load registered students from LocalStorage
  const [registeredStudents, setRegisteredStudents] = useState<(User & {password?: string})[]>(() => {
    const saved = localStorage.getItem('acuity_students');
    return saved ? JSON.parse(saved) : mockUsers.filter(u => u.role === UserRole.STUDENT);
  });

  useEffect(() => {
    localStorage.setItem('acuity_students', JSON.stringify(registeredStudents));
  }, [registeredStudents]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 1. Admin Login
    if (username === 'acuitynursing4323' && password === 'idrees4323@acuity') {
      onLogin({ id: 'admin', username, name: 'Academy Admin', role: UserRole.TEACHER });
      return;
    }

    // 2. Student Login (Checks both username and password)
    const user = registeredStudents.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      (u.password === password || (!u.password && password === '123456'))
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Ghalt Username ya Password! Check karein ya Register karein.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (registeredStudents.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      setError('Ye Username pehle se maujood hai.');
      return;
    }
    const newUser = { 
      id: `s-${Date.now()}`, 
      username, 
      name, 
      role: UserRole.STUDENT, 
      isPresent: true,
      password: password // Save the chosen password
    };
    setRegisteredStudents(prev => [...prev, newUser]);
    alert('Account Ban Gaya! Ab Login Karein.');
    setView('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 bg-white rounded-3xl mb-4 flex items-center justify-center shadow-lg overflow-hidden border-4 border-sky-50 p-2">
            <img 
              src={LOGO_URL} 
              alt="Acuity Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Nursing+Logo';
              }}
            />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Acuity Nursing Forum</h1>
          <div className="h-1 w-12 bg-sky-500 rounded-full mt-2"></div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl text-center border border-red-100 animate-shake">
            {error}
          </div>
        )}

        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <UserIcon className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <input 
                type="text" 
                required 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all" 
                placeholder="Username" 
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all" 
                placeholder="Password" 
              />
            </div>
            <div className="flex justify-end px-1">
              <button type="button" onClick={() => setView('forgot')} className="text-xs font-bold text-sky-600 hover:text-sky-700">
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="w-full py-4 bg-sky-600 text-white rounded-2xl font-bold text-lg hover:bg-sky-700 transform active:scale-[0.98] transition-all shadow-xl shadow-sky-100">
              Sign In
            </button>
            <div className="text-center pt-4">
              <p className="text-sm text-slate-500">
                New Student? <button type="button" onClick={() => setView('signup')} className="text-sky-600 font-bold hover:underline">Register Now</button>
              </p>
            </div>
          </form>
        )}

        {view === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
             <div className="bg-sky-50 p-4 rounded-2xl mb-2">
                <p className="text-xs text-sky-700 font-medium text-center">Apni details bharein account banane ke liye.</p>
             </div>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all" placeholder="Student Full Name" />
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all" placeholder="Choose Username" />
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all" placeholder="Create Password" />
            <button type="submit" className="w-full py-4 bg-sky-600 text-white rounded-2xl font-bold text-lg hover:bg-sky-700 shadow-xl transition-all">
              Create My Account
            </button>
            <button type="button" onClick={() => setView('login')} className="w-full flex items-center justify-center text-slate-500 font-bold text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
            </button>
          </form>
        )}

        {view === 'forgot' && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Password Bhool Gaye?</h3>
              <p className="text-sm text-slate-600 px-4">Pareshan na hon! Password reset karwane ke liye niche diye gaye number par Academy Admin se rabta karein.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Admin Contact</p>
              <p className="text-2xl font-black text-sky-600">+92 300 1234567</p>
            </div>
            <button type="button" onClick={() => setView('login')} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;