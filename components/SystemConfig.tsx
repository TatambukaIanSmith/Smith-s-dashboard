import React, { useState, useEffect } from 'react';
import { 
  Save, Globe, Lock, Bell, Database, Cpu, 
  CreditCard, RefreshCw, Download, 
  Shield, DollarSign, Wallet, CheckCircle, Smartphone, 
  Layout, Building2, Landmark, Smartphone as Phone,
  Eye, EyeOff, X, Apple
} from 'lucide-react';

const GatewayLogo = ({ id }: { id: string }) => {
  switch (id) {
    case 'mtn':
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#FFCC00] flex items-center justify-center shadow-sm border border-black/5 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-8 h-8">
            <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="#003399" strokeWidth="4" />
            <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="900" fill="#003399" fontFamily="sans-serif">MTN</text>
          </svg>
        </div>
      );
    case 'airtel':
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#FF0000] flex flex-col items-center justify-center shadow-sm border border-black/5 overflow-hidden">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-8 h-8 -mb-1">
              <path 
                d="M50,20c-16.6,0-30,13.4-30,30s13.4,30,30,30c8.3,0,15.8-3.4,21.2-8.8c1.5-1.5,1.5-4,0-5.6c-1.5-1.5-4-1.5-5.6,0 c-4,4-9.5,6.4-15.6,6.4c-12.1,0-22-9.9-22-22s9.9-22,22-22c6.1,0,11.6,2.4,15.6,6.4c1.5,1.5,4,1.5,5.6,0c1.5-1.5,1.5-4,0-5.6 C65.8,23.4,58.3,20,50,20z" 
                fill="white" 
              />
              <path 
                d="M50,40c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S55.5,40,50,40z" 
                fill="white" 
              />
            </svg>
            <span className="text-white font-bold text-[9px] tracking-tight pb-1">airtel</span>
          </div>
        </div>
      );
    case 'mpesa':
      return (
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-black/5 overflow-hidden">
          <div className="flex flex-col items-center">
             <span className="text-[#4B9234] font-black text-[10px] leading-none">M-PESA</span>
             <div className="w-6 h-1 bg-[#E30613] mt-0.5"></div>
          </div>
        </div>
      );
    case 'orange':
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#FF7900] flex items-center justify-center shadow-sm border border-black/5 overflow-hidden">
          <span className="text-white font-bold text-[8px] uppercase tracking-tighter">orange</span>
        </div>
      );
    case 'tigo':
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#003399] flex items-center justify-center shadow-sm border border-black/5">
          <span className="text-white font-black text-xs">tigo</span>
        </div>
      );
    case 'telecel':
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#E30613] flex items-center justify-center shadow-sm border border-black/5">
          <span className="text-white font-black text-[8px] uppercase">telecel</span>
        </div>
      );
    case 'visa':
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#1A1F71] flex items-center justify-center shadow-sm border border-black/5">
          <span className="text-white italic font-black text-xs">VISA</span>
        </div>
      );
    case 'mastercard':
      return (
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-black/5">
          <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90"></div>
            <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90"></div>
          </div>
        </div>
      );
    case 'paypal':
      return (
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-black/5 overflow-hidden">
          <svg viewBox="0 0 24 24" className="w-7 h-7">
            <path d="M7,21h3l1-6h2c4,0,6-2,6-5s-2-5-6-5H7l-2,16z" fill="#003087" />
            <path d="M11,16h2c4,0,6-2,6-5s-2-5-6-5h-3l-2,13h3l1-6z" fill="#009CDE" opacity="0.8" />
          </svg>
        </div>
      );
    case 'applepay':
      return (
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-sm border border-black/5">
          <Apple className="w-6 h-6 text-white" />
        </div>
      );
    case 'googlepay':
      return (
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-black/5 overflow-hidden">
          <div className="flex items-center gap-0.5">
            <svg viewBox="0 0 48 48" className="w-6 h-6">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span className="text-gray-600 font-bold text-[10px] uppercase">Pay</span>
          </div>
        </div>
      );
    default:
      return <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center"><Wallet className="w-6 h-6 text-gray-400" /></div>;
  }
};

export const SystemConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payments');
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(4.2);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());

  const [config, setConfig] = useState({
    platformName: 'Job-lyNK',
    motto: 'Getting jobs to your doorstep.',
    supportEmail: 'admin@job-lynk.com',
    commission: 15,
    minPayout: 50,
    twoFactor: true,
    ipWhite: false,
    gateways: {
      mtn: true, airtel: true, mpesa: true, orange: false, tigo: true, telecel: false,
      visa: true, mastercard: true, amex: true, discover: false,
      paypal: true, applepay: true, googlepay: true
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 8 - 4))));
      setRamUsage(prev => Math.min(16, Math.max(0, prev + (Math.random() * 0.3 - 0.15))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSaveStatus(true);
      setTimeout(() => setSaveStatus(false), 3000);
    }, 1200);
  };

  const toggleGateway = (key: string) => {
    setConfig(prev => ({
      ...prev,
      gateways: { ...prev.gateways, [key as keyof typeof prev.gateways]: !prev.gateways[key as keyof typeof prev.gateways] }
    }));
  };

  const toggleVisibility = (id: string) => {
    const next = new Set(hiddenRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setHiddenRows(next);
  };

  const gatewayList = [
    { id: 'mtn', name: 'MTN MoMo', reg: 'Africa / Uganda' },
    { id: 'airtel', name: 'Airtel Money', reg: 'Africa / India' },
    { id: 'mpesa', name: 'M-Pesa', reg: 'East Africa' },
    { id: 'orange', name: 'Orange Money', reg: 'West Africa / Europe' },
    { id: 'tigo', name: 'Tigo Pesa', reg: 'Tanzania / Rwanda' },
    { id: 'telecel', name: 'Telecel Cash', reg: 'Zimbabwe / Ghana' },
    { id: 'visa', name: 'Visa Network', reg: 'Global Standard' },
    { id: 'mastercard', name: 'Mastercard', reg: 'Global Standard' },
    { id: 'paypal', name: 'PayPal Digital', reg: 'Worldwide' },
    { id: 'applepay', name: 'Apple Pay', reg: 'Mobile Global' },
    { id: 'googlepay', name: 'Google Pay', reg: 'Mobile Global' },
  ];

  const handleDownloadBackup = () => {
    const backupContent = {
      app: "Job-lyNK",
      version: "3.2.0",
      timestamp: new Date().toISOString(),
      config: config,
      footer: "Getting jobs to your doorstep."
    };
    const blob = new Blob([JSON.stringify(backupContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-lynk-snapshot-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-aptos">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Configuration</h2>
          <p className="text-gray-500 font-medium italic">Advanced controls for Job-lyNK platform architecture.</p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus && (
            <span className="flex items-center gap-2 text-green-600 text-xs font-black bg-green-50 px-4 py-2 rounded-2xl animate-fade-in border border-green-100">
              <CheckCircle className="w-4 h-4" /> System Synchronized
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isRefreshing}
            className="flex items-center gap-3 px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {isRefreshing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Deploy Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-72 flex flex-col gap-2">
          {[
            { id: 'general', name: 'General', icon: Layout },
            { id: 'financial', name: 'Financial', icon: DollarSign },
            { id: 'payments', name: 'Gateways', icon: Wallet },
            { id: 'security', name: 'Security', icon: Shield },
            { id: 'infrastructure', name: 'Infra', icon: Cpu },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-3xl text-sm font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-xl shadow-blue-500/5 ring-1 ring-gray-100 scale-105'
                  : 'text-gray-400 hover:bg-white/50 hover:text-gray-600'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-300'}`} />
              {tab.name}
            </button>
          ))}
          <div className="mt-8 p-8 bg-blue-50 rounded-[40px] border border-blue-100 relative overflow-hidden">
             <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2 opacity-50">platform motto</h4>
             <p className="text-xs text-blue-800 font-bold italic leading-relaxed">"{config.motto}"</p>
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[48px] border border-gray-100 shadow-sm p-10 min-h-[600px] relative">
          {activeTab === 'payments' && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-blue-100 rounded-2xl"><Wallet className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-xl font-black text-gray-900">Payment Gateway Management</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {gatewayList.map((gate) => {
                  const isActive = config.gateways[gate.id as keyof typeof config.gateways];
                  return (
                    <div 
                      key={gate.id} 
                      onClick={() => toggleGateway(gate.id)}
                      className={`p-6 bg-gray-50 rounded-[32px] border transition-all cursor-pointer group flex flex-col justify-between h-48 hover:border-blue-300 ${isActive ? 'border-blue-100 shadow-md' : 'opacity-40 grayscale'}`}
                    >
                      <div className="flex justify-between items-start">
                        <GatewayLogo id={gate.id} />
                        <div className={`w-10 h-5 rounded-full relative transition-all ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isActive ? 'left-6' : 'left-1'}`} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 leading-tight">{gate.name}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{gate.reg}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-10 animate-fade-in">
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3"><Layout className="w-6 h-6 text-blue-500" /> Platform Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Name</label>
                  <input type="text" value={config.platformName} onChange={e => setConfig({...config, platformName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Email</label>
                  <input type="email" value={config.supportEmail} onChange={e => setConfig({...config, supportEmail: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Motto</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={hiddenRows.has('motto') ? '••••••••••••••••••••' : config.motto} 
                      onChange={e => setConfig({...config, motto: e.target.value})} 
                      className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all ${hiddenRows.has('motto') ? 'blur-sm' : ''}`} 
                    />
                    <button onClick={() => toggleVisibility('motto')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                      {hiddenRows.has('motto') ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-10 animate-fade-in">
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3"><DollarSign className="w-6 h-6 text-green-500" /> Global Fee Control</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Commission Override (%)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={hiddenRows.has('comm') ? 0 : config.commission} 
                      onChange={e => setConfig({...config, commission: parseInt(e.target.value)})} 
                      className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-blue-500 ${hiddenRows.has('comm') ? 'blur-sm' : ''}`} 
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-gray-400">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Min. Withdrawal ($)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={hiddenRows.has('min') ? 0 : config.minPayout} 
                      onChange={e => setConfig({...config, minPayout: parseInt(e.target.value)})} 
                      className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-blue-500 ${hiddenRows.has('min') ? 'blur-sm' : ''}`} 
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10 animate-fade-in">
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3"><Shield className="w-6 h-6 text-orange-500" /> Access & Security Hardening</h3>
              <div className="space-y-6">
                {[
                  { id: 'twoFactor', label: 'Mandatory 2FA', desc: 'Require authentication apps for all administrative access.', val: config.twoFactor },
                  { id: 'ipWhite', label: 'IP Whitelisting', desc: 'Limit access to specific office or static IP ranges.', val: config.ipWhite },
                ].map((sec) => (
                  <div key={sec.id} className="flex items-center justify-between p-8 bg-gray-50 rounded-[32px] border border-gray-100 group transition-all">
                    <div>
                      <p className="text-base font-black text-gray-900">{sec.label}</p>
                      <p className="text-sm text-gray-500 font-medium">{sec.desc}</p>
                    </div>
                    <button 
                      onClick={() => setConfig({...config, [sec.id]: !sec.val})}
                      className={`w-14 h-7 rounded-full transition-all relative ${sec.val ? 'bg-orange-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${sec.val ? 'left-8' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'infrastructure' && (
            <div className="space-y-10 animate-fade-in">
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3"><Cpu className="w-6 h-6 text-blue-500" /> Infrastructure Vitals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Compute Load</span>
                    <span className="text-sm font-black text-gray-900">{cpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.4)]" style={{ width: `${cpuUsage}%` }}></div>
                  </div>
                </div>
                <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">RAM Consumption</span>
                    <span className="text-sm font-black text-gray-900">{ramUsage.toFixed(1)}GB / 16GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(139,92,246,0.4)]" style={{ width: `${(ramUsage/16)*100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-gray-900 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black mb-2">Platform Data Persistence</h4>
                    <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                      Download a complete snapshot of system configurations and gateway statuses for offline auditing.
                    </p>
                  </div>
                  <button 
                    onClick={handleDownloadBackup}
                    className="flex items-center gap-4 px-10 py-5 bg-white text-gray-900 rounded-[28px] text-sm font-black hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap"
                  >
                    <Download className="w-6 h-6" />
                    System Snapshot
                  </button>
                </div>
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                  <Database className="w-32 h-32" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center pt-10 border-t border-gray-100">
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] italic">"Getting jobs to your doorstep."</p>
      </div>
    </div>
  );
};