
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, UserCheck, FileText, 
  FileCheck, BarChart3, Gavel, Shield, DollarSign, 
  Settings, Building2, Bell, ChevronDown, Link, ArrowRight,
  LogOut, X, Snowflake
} from 'lucide-react';
import { Section } from '../types';

interface SidebarProps {
  sidebarOpen: boolean;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  snowActive: boolean;
  setSnowActive: (active: boolean) => void;
  adminProfile: { name: string; email: string };
}

const navigationItems = [
  { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'users', name: 'User Management', icon: Users },
  { id: 'employers', name: 'Employer Oversight', icon: Building2 },
  { id: 'workers', name: 'Worker Oversight', icon: UserCheck },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'jobs', name: 'Job Moderation', icon: FileText },
  { id: 'applications', name: 'Applications Management', icon: FileCheck },
  { id: 'communications', name: 'Notifications', icon: Bell },
  { id: 'disputes', name: 'Disputes', icon: Gavel },
  { id: 'financial', name: 'Financial', icon: DollarSign },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'settings', name: 'System Config', icon: Settings },
] as const;

export const Sidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  activeSection, 
  setActiveSection,
  snowActive,
  setSnowActive,
  adminProfile
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    window.location.reload();
  };

  return (
    <>
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0d1117] border-r border-[#30363d] transform transition-all duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Link className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">Job-lyNK</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-1">ADMIN PANEL</p>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="bg-[#161b22] rounded-3xl p-3 flex items-center justify-between border border-[#30363d] group cursor-pointer hover:bg-[#1c2128] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-900/40">
                {adminProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="overflow-hidden">
                <p className="text-[13px] font-bold text-white leading-none truncate">{adminProfile.name}</p>
                <p className="text-[11px] text-gray-500 font-medium mt-1">Super Admin</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors mr-1 flex-shrink-0" />
          </div>
        </div>

        <nav className="px-3 pb-4 space-y-0.5 overflow-y-auto flex-1 custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl font-bold text-[13.5px] transition-all group active:scale-[0.98] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40'
                    : 'text-gray-400 hover:bg-[#161b22] hover:text-white'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                <span className="tracking-tight">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#30363d] space-y-4">
          <button 
            onClick={() => setSnowActive(!snowActive)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-[13px] transition-all active:scale-95 group ${
              snowActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-[#161b22] hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              <Snowflake className={`w-4.5 h-4.5 ${snowActive ? 'animate-spin-slow' : ''}`} />
              <span className="tracking-tight">Snow Effect</span>
            </div>
            <div className={`w-8 h-4 rounded-full relative transition-all ${snowActive ? 'bg-indigo-500' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${snowActive ? 'left-4.5' : 'left-0.5'}`} />
            </div>
          </button>

          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-[13px] text-rose-500 hover:bg-rose-500/10 transition-all active:scale-95 group"
          >
            <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
            <span className="tracking-tight">Sign Out</span>
          </button>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">System Status</span>
              <span className="text-[11px] font-black text-blue-500 uppercase">Normal</span>
            </div>
            <div className="w-full bg-[#161b22] h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[100%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
            </div>
          </div>
        </div>
      </aside>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[100] backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl w-[320px] p-8 text-center animate-scaleIn">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-black shadow-lg">
              <LogOut className="w-10 h-10 text-rose-500" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-white">Sign Out</h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">Are you sure you want to terminate the session?</p>
            <div className="mt-8 space-y-3">
              <button
                onClick={confirmLogout}
                className="w-full rounded-2xl bg-rose-600 py-3 text-white font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-900/40 active:scale-95"
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full rounded-2xl bg-[#161b22] border border-[#30363d] py-3 text-gray-300 font-bold hover:bg-[#1c2128] transition active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
