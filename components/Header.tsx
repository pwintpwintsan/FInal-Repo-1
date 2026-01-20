
import React, { useState } from 'react';
import { Menu, X, ShieldAlert, GraduationCap, ShieldCheck, LogOut, LogIn } from 'lucide-react';
import { UserRole } from '../types.ts';

interface HeaderProps {
  schoolName: string;
  teacherCode: string;
  activeRole: UserRole;
  isLoggedIn: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onLogin: () => void;
}

const Logo = () => (
  <div className="flex items-center gap-3 py-1 select-none group">
    <div className="w-10 h-10 bg-[#292667] rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
      <span className="text-xl font-black italic">U</span>
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-sm font-bold text-[#292667] leading-none tracking-tight uppercase">U BOOK STORE</span>
      <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-0.5">LEARNING HUB</span>
    </div>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ schoolName, teacherCode, activeRole, isLoggedIn, isSidebarOpen, onToggleSidebar, onRoleChange, onLogout, onLogin }) => {
  const roles = [
    { id: UserRole.MAIN_CENTER, label: 'Main Center Admin', icon: ShieldAlert, color: 'text-[#ec2027]' },
    { id: UserRole.SUPER_ADMIN, label: 'School Admin', icon: ShieldCheck, color: 'text-[#3b82f6]' },
    { id: UserRole.TEACHER, label: 'Teacher', icon: GraduationCap, color: 'text-[#292667]' },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full bg-white border-b border-slate-100 flex items-center shrink-0 h-16">
      <div className="max-w-[1600px] mx-auto px-6 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 active:scale-95 transition-all"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <Logo />
        </div>

        {isLoggedIn ? (
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100/50">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => onRoleChange(role.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-white shadow-sm text-[#292667]' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon size={14} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] font-bold text-[#292667] uppercase leading-none">{schoolName}</p>
                <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">{teacherCode}</p>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/u-profile/64`} className="w-full h-full object-cover" alt="" />
              </div>

              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 px-6 py-2 bg-[#292667] text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-md"
          >
            <LogIn size={14} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
};
