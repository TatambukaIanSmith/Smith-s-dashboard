
import React, { useState } from 'react';
import { 
  Shield, Lock, AlertCircle, Smartphone, Globe, 
  CheckCircle, MoreVertical, RefreshCw, Zap, Key,
  ShieldCheck, ShieldAlert, Clock, Activity, Settings,
  X, Laptop, Tablet, Smartphone as MobileIcon, ShieldOff, Search
} from 'lucide-react';

const activeDevices = [
  { id: 'DV-01', name: 'MacBook Pro 14"', owner: 'Admin Smith', location: 'Kampala, UG', icon: Laptop, lastSeen: 'Active Now' },
  { id: 'DV-02', name: 'iPad Air (6th Gen)', owner: 'Admin Smith', location: 'Entebbe, UG', icon: Tablet, lastSeen: '12m ago' },
  { id: 'DV-03', name: 'iPhone 15 Pro', owner: 'Admin Smith', location: 'Jinja, UG', icon: MobileIcon, lastSeen: '2h ago' },
];

export const Security: React.FC = () => {
  const [mfEnabled, setMfEnabled] = useState(true);
  const [ipEnabled, setIpEnabled] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  const auditLogs = [
    { id: 1, action: 'Admin Login', detail: 'Admin Smith • 192.168.1.1', time: '2 MINS AGO', status: 'SUCCESS' },
    { id: 2, action: 'API Key Rotated', detail: 'System • internal', time: '1 HOUR AGO', status: 'SUCCESS' },
    { id: 3, action: 'Threat Blocked', detail: 'External Node • 45.23.1.9', time: '4 HOURS AGO', status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1200px] mx-auto pb-20 font-aptos">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Security Center</h1>
          <p className="text-gray-500 font-medium mt-1">Audit system health, monitor active logins, and manage platform integrity.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-700">Platform Score: <span className="font-black">98/100</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-all">
              <div className="p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-blue-50 group-hover:rotate-12 transition-all">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tighter">2FA</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">ENFORCED</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-all">
              <div className="p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-emerald-50 group-hover:rotate-12 transition-all">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tighter">SSL</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">ACTIVE</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-105 transition-all">
              <div className="p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-orange-50 group-hover:rotate-12 transition-all">
                <AlertCircle className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tighter">0</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">THREATS</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                <span className="text-gray-400 text-xl tracking-tighter">&gt;_</span>
                Security Audit Log
              </h3>
              <button className="text-[11px] font-bold text-blue-600 hover:underline tracking-widest uppercase">Export Logs</button>
            </div>
            <div className="divide-y divide-gray-50">
              {auditLogs.map((log) => (
                <div key={log.id} className="px-8 py-6 flex items-center justify-between group hover:bg-gray-50/50 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-blue-600 transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 tracking-tight">{log.action}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium italic">{log.detail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 mb-1">{log.time}</p>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg uppercase tracking-widest">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
              <Key className="w-5 h-5 text-blue-600" />
              Access Control
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 tracking-tight">Multi-Factor Auth</p>
                  <p className="text-[11px] text-gray-400 font-medium">Require 2FA for all sessions</p>
                </div>
                <button 
                  onClick={() => setMfEnabled(!mfEnabled)}
                  className={`w-11 h-6 rounded-full transition-all relative ${mfEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mfEnabled ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 tracking-tight">IP Whitelisting</p>
                  <p className="text-[11px] text-gray-400 font-medium">Limit to governance VPN</p>
                </div>
                <button 
                  onClick={() => setIpEnabled(!ipEnabled)}
                  className={`w-11 h-6 rounded-full transition-all relative ${ipEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${ipEnabled ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
            <button className="w-full py-4 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-600 font-black text-[11px] uppercase tracking-widest rounded-[1.5rem] transition-all active:scale-[0.98]">
              Manage API Infrastructure
            </button>
          </div>

          <div 
            onClick={() => setShowDeviceModal(true)}
            className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
          >
            <div className="relative z-10 space-y-5">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:rotate-6 transition-transform">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tighter">Hardware Governance</h4>
                <p className="text-white/70 text-xs font-medium mt-1 leading-relaxed italic">
                  Manage physical nodes connected to administrative clusters.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
               <Smartphone className="w-48 h-48" />
            </div>
            <div className="absolute top-1/2 right-4 w-12 h-20 bg-white/5 border border-white/10 rounded-lg transform rotate-12 blur-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Optimized Hardware Governance Modal */}
      {showDeviceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setShowDeviceModal(false)}></div>
          
          {/* Spatial Ambient Glows */}
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

          <div className="bg-white/80 backdrop-blur-3xl w-full max-w-xl rounded-[3rem] md:rounded-[4rem] shadow-[0_64px_128px_rgba(0,0,0,0.15)] relative z-10 border border-white/60 p-8 md:p-10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 max-h-[90vh] flex flex-col">
             <div className="flex justify-between items-start mb-8 shrink-0">
               <div>
                  <h2 className="text-[10px] font-black text-blue-600 tracking-[0.6em] uppercase opacity-70">Security Protocol</h2>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter mt-1">Authorized Nodes</h3>
               </div>
               <button onClick={() => setShowDeviceModal(false)} className="w-10 h-10 flex items-center justify-center bg-white/40 hover:bg-white rounded-2xl transition-all shadow-sm border border-white/80 active:scale-90">
                  <X className="w-5 h-5 text-gray-400" />
               </button>
             </div>

             {/* Scrollable Device List for Better Screen Fit */}
             <div className="space-y-3 mb-8 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {activeDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-5 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/60 hover:bg-white/80 transition-all group shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center text-gray-400 shadow-inner border border-white/80 group-hover:text-blue-600 transition-colors">
                        <device.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-base font-black text-gray-900 tracking-tight leading-none">{device.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{device.owner}</span>
                          <span className="w-1 h-1 bg-blue-100 rounded-full"></span>
                          <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-50/50 px-2 py-0.5 rounded-md">{device.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/50 rounded-full border border-emerald-100">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                          {device.lastSeen}
                       </span>
                       <div className="flex gap-1.5">
                          <button className="w-9 h-9 flex items-center justify-center bg-white/60 text-blue-600 rounded-xl hover:bg-white transition-all shadow-sm border border-white active:scale-90" title="Secure Ping">
                             <RefreshCw className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => alert(`Node Revocation protocol: Terminanting ${device.id}.`)}
                            className="w-9 h-9 flex items-center justify-center bg-white/60 text-pink-600 rounded-xl hover:bg-white transition-all shadow-sm border border-white active:scale-90" 
                            title="Revoke Access"
                          >
                             <ShieldOff className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="pt-6 border-t border-gray-100 text-center relative overflow-hidden shrink-0">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em] italic leading-relaxed max-w-[80%] mx-auto">
                  "Only authorized hardware clusters may interact with governance nodes."
                </p>
                {/* Visual Accent */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-2 bg-blue-500/10 blur-xl"></div>
             </div>
          </div>
        </div>
      )}

      {/* Footer Motto */}
      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
         <p className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.8em] italic leading-relaxed">
           "Getting jobs to your doorstep."
         </p>
      </div>
    </div>
  );
};
