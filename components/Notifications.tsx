import React, { useState } from 'react';
import { Mail, Send, History, Users, Zap, Check, Clock, Target, Edit2, Trash2 } from 'lucide-react';

type SegmentType = 'All Users' | 'Employers' | 'Workers';

export const Notifications: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<SegmentType>('All Users');
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);

  const recentBroadcasts = [
    { id: 'B1', title: 'Critical System Upgrade', date: 'Just now', reach: '12.8k', isLatest: true },
    { id: 'B2', title: 'Privacy Policy V4', date: 'Oct 24, 14:20', reach: '12.4k' },
    { id: 'B3', title: 'Gateway Sync Status', date: 'Oct 20, 09:15', reach: '4.2k' },
  ];

  const subOptionsMap: Record<SegmentType, string[]> = {
    'All Users': ['Recently Active', 'New Signups', 'Inactive', 'Unverified'],
    'Employers': ['Verified Partners', 'Pending KYC', 'High Volume'],
    'Workers': ['Top Rated', 'Skill Verified', 'Regional'],
  };

  const toggleSubOption = (option: string) => {
    setSelectedSubOptions(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Comm. Center</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Broadcast governance and platform-wide announcement ledger.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm p-12">
          <h3 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner"><Send className="w-6 h-6" /></div>
            Global Dispatch
          </h3>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-1">Target Segment</label>
              <div className="grid grid-cols-3 gap-4">
                {(['All Users', 'Employers', 'Workers'] as SegmentType[]).map((target) => (
                  <button 
                    key={target} 
                    onClick={() => { setSelectedSegment(target); setSelectedSubOptions([]); }}
                    className={`px-6 py-5 rounded-[2rem] text-[13px] font-black border transition-all active:scale-95 ${
                      selectedSegment === target 
                        ? 'bg-black border-black text-white shadow-2xl shadow-gray-900/20' 
                        : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    {target}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Available Granular Filters</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {subOptionsMap[selectedSegment].map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleSubOption(option)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[12px] font-bold transition-all ${
                        selectedSubOptions.includes(option)
                          ? 'bg-white text-blue-600 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20'
                          : 'bg-white/50 text-gray-400 border border-gray-100 hover:bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-lg flex items-center justify-center transition-all ${
                        selectedSubOptions.includes(option) ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                        {selectedSubOptions.includes(option) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-1">Subject Registry</label>
              <input type="text" placeholder="e.g. Critical Node Maintenance v3.2" className="w-full px-8 py-5 bg-gray-50 border-none rounded-[2rem] text-[15px] font-black focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-300" />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-1">Contextual Body</label>
              <textarea rows={6} placeholder="Compose system-wide instruction..." className="w-full px-8 py-6 bg-gray-50 border-none rounded-[2.5rem] text-[15px] font-medium focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-300"></textarea>
            </div>

            <div className="flex flex-col md:flex-row gap-8 pt-6">
              <button className="flex-[2] py-6 bg-black text-white rounded-[2rem] font-black text-[13px] uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-2xl active:scale-95">
                Dispatch Broadcast
              </button>
              <div className="flex-1 bg-indigo-600 p-6 rounded-[2rem] text-white flex items-center gap-5 shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <h4 className="font-black text-[12px] uppercase tracking-widest">Real-time</h4>
                    <p className="text-[10px] text-white/60 font-medium">Synced instantly.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-gray-400/20 relative overflow-hidden group">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-black text-2xl tracking-tight mb-4">Omni-Channel Sync</h4>
            <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
              Broadcasts are automatically synchronized across the platform mesh via Push, Email, and internal logs.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-gray-900 text-lg flex items-center gap-3 tracking-tight">
                <History className="w-5 h-5 text-gray-400" />
                Audit History
              </h3>
            </div>
            
            <div className="space-y-5">
              {recentBroadcasts.map((b) => (
                <div key={b.id} className={`p-6 rounded-[2rem] border transition-all group relative ${b.isLatest ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <p className={`text-[13px] font-black transition-colors ${b.isLatest ? 'text-blue-900' : 'text-gray-900'}`}>{b.title}</p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> {b.date}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-blue-500" /> {b.reach}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-10 border-t border-gray-100">
         <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.6em] italic leading-relaxed">"Getting jobs to your doorstep."</p>
      </div>
    </div>
  );
};
