
import React from 'react';
import { ShieldCheck, User, Lock, LogIn, Key } from 'lucide-react';

interface LandingPageViewProps {
  onOrderCreate: (order: any) => void;
  onLogin?: () => void;
  onCourseClick?: (id: string) => void;
}

const Logo = ({ className = "", size = 60 }: { className?: string, size?: number }) => (
  <div className={`flex flex-col items-center gap-1 select-none ${className}`}>
    <svg width={size} height={size} viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10, 5)">
        <path d="M25 25c0-10 8-15 15-15s15 5 15 15-8 15-15 15-15-5-15-15z" fill="#FFE0BD" />
        <circle cx="33" cy="25" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <circle cx="47" cy="25" r="9" stroke="#000" strokeWidth="1.5" fill="white" />
        <path d="M25 45h30l6 18H19l6-18z" fill="#ec2027" />
        <path d="M30 45h20v18H30V45z" fill="#00a651" />
        <path d="M15 55l25 12 25-12v15l-25 12-25-12z" fill="#fbee21" stroke="#000" strokeWidth="1" />
      </g>
    </svg>
    <div className="flex flex-col items-center">
      <span className="text-xl font-black text-[#292667] leading-none tracking-tighter uppercase" style={{ fontSize: size * 0.3 }}>U BOOK STORE</span>
      <span className="text-[7px] font-black text-[#ec2027] uppercase tracking-[0.3em] leading-none mt-1" style={{ fontSize: size * 0.12 }}>Learning Center</span>
    </div>
  </div>
);

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onLogin }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#fbee21]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#292667]/5 blur-[120px] rounded-full"></div>

      {/* Main Login Interface */}
      <div className="w-full max-w-sm flex flex-col items-center z-10 animate-in fade-in zoom-in-95 duration-700">
        <Logo size={100} className="mb-10" />
        
        <div className="w-full bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(41,38,103,0.15)] border-[6px] border-[#292667] relative group">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#292667] rounded-2xl text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              <ShieldCheck size={24} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#292667] uppercase tracking-tight leading-none">Hub Login</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Authorization Required</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (onLogin) onLogin(); }}>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  required 
                  type="text" 
                  placeholder="Enter username" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#ec2027] focus:bg-white outline-none font-black text-[#292667] transition-all text-xs" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#ec2027] focus:bg-white outline-none font-black text-[#292667] transition-all text-xs" 
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-4 bg-[#292667] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-3"
              >
                <LogIn size={18} /> Enter System
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Corners */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 animate-in slide-in-from-left-4 duration-1000">
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm flex items-center gap-3 px-4 group hover:bg-white hover:border-[#ec2027] transition-all cursor-default">
          <Key size={14} className="text-[#ec2027]" strokeWidth={3} />
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Authorized Register Code</span>
            <span className="text-[10px] font-black text-[#292667] uppercase tracking-widest">UB-LIVE-2024-X</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500 animate-in slide-in-from-right-4 duration-1000">
         <Logo size={50} />
      </div>
    </div>
  );
};
