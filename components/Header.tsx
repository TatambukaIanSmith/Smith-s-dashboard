
import React from 'react';
import { Menu, Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarOpen, activeSection, onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#010409]/80 backdrop-blur-md border-b border-[#30363d] px-8 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="lg:hidden p-2 hover:bg-[#161b22] rounded-xl transition-all active:scale-90"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex-1 max-w-2xl px-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search users, jobs, logs..."
              className="w-full pl-14 pr-6 py-2.5 bg-[#0d1117] border border-[#30363d] rounded-2xl focus:ring-4 focus:ring-blue-500/10 text-[14.5px] font-medium text-white placeholder:text-gray-600 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2.5 hover:bg-[#161b22] rounded-xl text-gray-500 hover:text-white transition-all relative active:scale-90">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#010409]"></span>
          </button>
          
          <button 
            onClick={onOpenProfile}
            className="p-2.5 hover:bg-[#161b22] rounded-xl text-gray-500 hover:text-white transition-all active:scale-90"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
