
import React, { useState } from 'react';
import { 
  Users, Briefcase, Eye, Flag, 
  CheckCircle, RefreshCw, Database, 
  Shield, X, Check, ArrowUpRight, ArrowDownRight,
  Activity, ShieldAlert, Zap, FileText, Image, Lock, Mail
} from 'lucide-react';

interface OverviewProps {
  onNavigate?: (section: any) => void;
  adminEmail?: string;
}

const stats = [
  { title: 'TOTAL USERS', value: '12,847', change: '+12.5%', isPositive: true, icon: Users, color: 'blue', desc: 'Active platform nodes' },
  { title: 'ACTIVE JOBS', value: '456', change: '+8.2%', isPositive: true, icon: Briefcase, color: 'purple', desc: 'Marketplace listings' },
  { title: 'PENDING REVIEWS', value: '89', change: '-5.2%', isPositive: false, icon: Eye, color: 'orange', desc: 'Awaiting moderation' },
  { title: 'ACTIVE DISPUTES', value: '12', change: '+2', isPositive: false, icon: Flag, color: 'red', desc: 'Platform mediation' },
];

export const Overview: React.FC<OverviewProps> = ({ onNavigate, adminEmail }) => {
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [backupOptions, setBackupOptions] = useState({
    dbMaster: true,
    talentRegistry: true,
    gatewayParams: true,
    mediaAssets: false,
    auditLedger: true
  });

  const playPopSound = () => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(500, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
  };

  const handleBackup = () => {
    setShowBackupModal(false);
    setShowSuccessModal(true);
  };

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const data = {
        platform: "Job-lyNK",
        reportType: "Global Vitals",
        generatedAt: new Date().toISOString(),
        metrics: stats.map(s => ({ title: s.title, value: s.value })),
        status: "Operational"
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `joblynk-global-report-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1500);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccessModal(false);
  };

  const toggleOption = (key: keyof typeof backupOptions) => {
    setBackupOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto font-aptos text-white">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-[42px] font-bold text-white tracking-tight leading-none">Platform Vitals</h1>
          <p className="text-gray-500 text-lg font-medium italic mt-2">Real-time infrastructure and engagement metrics.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowBackupModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#161b22] border border-[#30363d] rounded-2xl text-[14px] font-bold text-blue-400 shadow-sm hover:bg-[#1c2128] transition-all active:scale-95"
          >
            <Database className="w-4 h-4 text-blue-500" />
            System Backup
          </button>
          <button 
            onClick={handleExportReport}
            disabled={isExporting}
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-[14px] font-bold shadow-xl shadow-blue-900/40 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Export Global Report'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-[#0d1117] rounded-[3rem] p-8 border border-[#30363d] shadow-sm flex flex-col md:flex-row items-center justify-between group">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-[1.75rem] flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">System Integrity: 100%</h3>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
              <p className="text-gray-500 text-sm font-medium mt-1">
                Global clusters operational. Latency: <span className="text-blue-500 font-bold">24ms</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-10 mt-6 md:mt-0">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Uptime</p>
              <p className="text-lg font-bold text-white">99.998%</p>
            </div>
            <button className="p-3 bg-[#161b22] text-blue-400 rounded-xl hover:bg-[#1c2128] hover:text-white transition-all active:rotate-180 border border-[#30363d]">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0d1117] rounded-[2.5rem] p-8 border border-[#30363d] shadow-sm group hover:shadow-xl hover:shadow-black/50 transition-all duration-500 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-600/10 text-blue-500 group-hover:rotate-12 transition-transform shadow-inner border border-blue-500/10`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest ${
                    stat.isPositive ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-[44px] font-bold text-white tracking-tighter leading-none">{stat.value}</h4>
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</p>
                  <p className="text-[10px] text-gray-600 font-bold italic mt-1">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showBackupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowBackupModal(false)}></div>
          <div className="bg-[#0d1117] border border-[#30363d] w-full max-w-lg rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative z-10 p-6 md:p-8 animate-in zoom-in-95 duration-500 font-aptos max-h-[90vh] flex flex-col text-white">
             <div className="flex justify-between items-center mb-6 shrink-0">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
                    <Database className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-white leading-tight">System Snapshot</h3>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mt-0.5">Configuration State</p>
                 </div>
               </div>
               <button onClick={() => setShowBackupModal(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                  <X className="w-5 h-5" />
               </button>
             </div>

             <div className="space-y-3 mb-6 overflow-y-auto pr-1 custom-scrollbar flex-1">
                {Object.entries(backupOptions).map(([key, value]) => (
                <label key={key} className="flex items-center gap-4 p-4 bg-[#161b22] rounded-3xl border border-[#30363d] hover:border-blue-500/50 transition-all cursor-pointer group">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-900/40 group-hover:scale-105 transition-transform">
                    {key === 'dbMaster' && <Database className="w-5 h-5" />}
                    {key === 'talentRegistry' && <Users className="w-5 h-5" />}
                    {key === 'gatewayParams' && <Shield className="w-5 h-5" />}
                    {key === 'auditLedger' && <FileText className="w-5 h-5" />}
                    {key === 'mediaAssets' && <Image className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-tight">System registry data fragment.</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${value ? 'bg-blue-600' : 'bg-[#1c2128] border-2 border-[#30363d]'}`}>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={value}
                      onChange={() => toggleOption(key as keyof typeof backupOptions)}
                    />
                    {value && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </label>
                ))}
             </div>

             <button 
               onClick={handleBackup} 
               className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98] shrink-0"
             >
               Initiate Backup
             </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[110] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl w-[350px] p-8 text-center animate-in zoom-in-95 duration-250">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 shadow-lg shadow-blue-900/40">
              <Mail className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-white">Backup Dispatched</h2>
            <div className="mt-4 p-4 bg-[#161b22] rounded-2xl border border-[#30363d]">
               <p className="text-[13px] text-gray-400 font-medium leading-relaxed">
                 Secure snapshot synchronized and dispatched to:
                 <span className="block mt-1 font-black text-blue-500 underline">{adminEmail || 'admin.smith@job-lynk.com'}</span>
               </p>
            </div>
            <button
              onClick={closeSuccess}
              className="mt-8 w-full rounded-2xl bg-blue-600 py-3.5 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/40 active:scale-95"
            >
              Confirm Receipt
            </button>
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-[#30363d] flex flex-col items-center">
         <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.8em] italic leading-relaxed text-center">
           "Getting jobs to your doorstep."
         </p>
         <div className="flex items-center gap-6 mt-6 opacity-30 grayscale grayscale-100">
           <Zap className="w-4 h-4 text-blue-500" />
           <Activity className="w-4 h-4 text-blue-500" />
           <ShieldAlert className="w-4 h-4 text-blue-500" />
         </div>
      </div>
    </div>
  );
};
