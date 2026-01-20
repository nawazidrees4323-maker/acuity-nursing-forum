
import React from 'react';
import { LOGO_URL } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: { name: string; role: UserRole } | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {user && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-3">
                <img src={LOGO_URL} alt="Logo" className="h-10 w-auto rounded" />
                <span className="font-bold text-xl text-slate-800 hidden sm:block">Acuity Nursing Forum</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2024 Acuity Nursing Forum. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
