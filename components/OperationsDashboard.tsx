import React from 'react';
import { Activity, Cpu, Database, Server, Zap, Globe, ShieldCheck, HardDrive } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const pulseData = Array.from({ length: 20 }, (_, i) => ({
  val: 40 + Math.random() * 40,
  time: i
}));

export const OperationsDashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Operational Mesh</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Real-time infrastructure orchestration and node telemetry.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">Protocol v4.2 Secured</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'CPU Cluster', val: '24.2%', icon: Cpu, color: 'blue' },
          { label: 'Mem Pool', val: '4.8 GB', icon: HardDrive, color: 'indigo' },
          { label: 'DB Latency', val: '12ms', icon: Database, color: 'emerald' },
          { label: 'Sync Rate', val: '99.99%', icon: Globe, color: 'amber' },
        ].map((m, i) => (
          <div key={i} className="modern-card bg-white p-10 rounded-[3rem] group">
            <div className={`w-14 h-14 bg-${m.color}-50 text-${m.color}-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <m.icon className="w-7 h-7" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{m.label}</p>
            <h4 className="text-3xl font-black text-gray-900 tracking-tighter">{m.val}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 modern-card bg-white rounded-[4rem] p-12 overflow-hidden relative group">
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Node Traffic Velocity</h3>
              <p className="text-gray-400 text-sm font-medium italic">High-frequency throughput across global ingress points.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase">
              <Zap className="w-3 h-3 fill-current" /> Optimal
            </div>
          </div>
          
          <div className="h-[300px] w-full -mx-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData}>
                <defs>
                  <linearGradient id="opGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={6} fillOpacity={1} fill="url(#opGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="modern-card bg-gray-900 rounded-[4rem] p-12 text-white flex flex-col justify-between group overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform">
              <Server className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-4">Cluster Health</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">All platform worker nodes are currently operating within nominal parameters.</p>
            
            <div className="space-y-4">
              {['Asia-East', 'US-West', 'EU-Central'].map((loc) => (
                <div key={loc} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-xs font-bold text-gray-300">{loc}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-emerald-400">Stable</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
        </div>
      </div>
    </div>
  );
};