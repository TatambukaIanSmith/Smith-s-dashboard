
import React, { useState } from 'react';
import { Search, UserCheck, Star, MapPin, Edit2, Trash2, User, Zap, Eye, EyeOff, ShieldCheck, Briefcase, TrendingUp, X, CheckCircle, Check } from 'lucide-react';

const mockWorkers = [
  { id: 'W-01', name: 'John Doe', skills: ['Node.js', 'React'], rating: 4.8, status: 'Verified', completedJobs: 45, location: 'Entebbe', reliability: '98%' },
  { id: 'W-02', name: 'Sarah Nakato', skills: ['UI Design', 'Figma'], rating: 4.9, status: 'Verified', completedJobs: 82, location: 'Kampala', reliability: '100%' },
  { id: 'W-03', name: 'Mike Johnson', skills: ['Python', 'Django'], rating: 4.2, status: 'Reviewing', completedJobs: 12, location: 'Jinja', reliability: '85%' },
];

export const WorkerOversight: React.FC = () => {
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModal, setConfirmModal] = useState<{ show: boolean, type: 'edit' | 'delete', worker: any | null }>({ show: false, type: 'edit', worker: null });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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

  const toggleVisibility = (id: string) => {
    const next = new Set(hiddenRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setHiddenRows(next);
  };

  const triggerConfirm = (type: 'edit' | 'delete', worker: any) => {
    setConfirmModal({ show: true, type, worker });
  };

  const handleAction = () => {
    const { type, worker } = confirmModal;
    setConfirmModal({ ...confirmModal, show: false });
    setSuccessMsg(type === 'edit' ? `Talent profile for ${worker?.name} synchronized.` : `Worker node ${worker?.name} purged from talent pool.`);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 font-aptos text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Talent Governance</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Audit the global talent registry and verify reliability telemetry.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-8 py-4 rounded-[1.5rem] border border-emerald-500/20 text-[11px] font-black uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-5 h-5" /> 92.4% Verification Yield
          </div>
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-[3rem] p-4 shadow-sm border border-[#30363d] flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search talent by competency, region, or unique hash..." 
            className="w-full pl-16 pr-8 py-5 bg-[#161b22] border-none rounded-[1.75rem] text-[15px] font-black focus:ring-4 focus:ring-blue-500/5 transition-all text-white placeholder:text-gray-600" 
          />
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-[4rem] border border-[#30363d] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#161b22]/50 border-b border-[#30363d] text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
                <th className="px-12 py-8">Talent Identity</th>
                <th className="px-12 py-8">Network Vitals</th>
                <th className="px-12 py-8">Registry State</th>
                <th className="px-12 py-8 text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {mockWorkers.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase())).map((w) => {
                const isHidden = hiddenRows.has(w.id);
                return (
                  <tr key={w.id} className="hover:bg-[#161b22]/50 transition-all group">
                    <td className="px-12 py-10">
                      <div className={`flex items-center gap-6 transition-all duration-500 ${isHidden ? 'blur-content opacity-30 select-none' : ''}`}>
                         <div className="w-12 h-12 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center font-black text-blue-500 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all text-lg">{w.name.charAt(0)}</div>
                         <div>
                            <div className="text-[17px] font-black text-white tracking-tight leading-none">{isHidden ? '••••••••' : w.name}</div>
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2.5 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-500" />{isHidden ? '••••' : w.location}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                       <div className={`flex items-center gap-8 transition-all duration-500 ${isHidden ? 'blur-content opacity-10' : ''}`}>
                          <div>
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Rating</p>
                             <div className="flex items-center gap-1.5 text-[15px] font-black text-white"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {w.rating}</div>
                          </div>
                          <div className="w-px h-8 bg-[#30363d]"></div>
                          <div>
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Reliability</p>
                             <div className="flex items-center gap-1.5 text-[15px] font-black text-emerald-500"><TrendingUp className="w-4 h-4" /> {w.reliability}</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-12 py-10">
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${
                        isHidden ? 'bg-[#161b22] text-gray-600 border-[#30363d]' : w.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>{isHidden ? 'SECURED' : w.status}</span>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex justify-end gap-3 transition-all">
                        <button onClick={() => toggleVisibility(w.id)} className={`p-4 rounded-2xl transition-all shadow-sm ${isHidden ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30' : 'bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-blue-500 hover:border-blue-500/40'}`}>
                          {isHidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        {!isHidden && (
                          <div className="flex gap-2">
                            <button onClick={() => triggerConfirm('edit', w)} className="p-4 bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-blue-400 hover:border-blue-400/40 rounded-2xl shadow-sm transition-all active:scale-90"><Edit2 className="w-5 h-5" /></button>
                            <button onClick={() => triggerConfirm('delete', w)} className="p-4 bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-rose-400 hover:border-rose-400/40 rounded-2xl shadow-sm transition-all active:scale-90"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {confirmModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setConfirmModal({...confirmModal, show: false})}></div>
          <div className="bg-[#0d1117] border border-[#30363d] w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 p-10 text-center animate-in zoom-in-95 duration-300">
             <div className="w-16 h-16 bg-[#161b22] border border-[#30363d] rounded-2xl flex items-center justify-center mx-auto mb-6">
                {confirmModal.type === 'edit' ? <Edit2 className="w-8 h-8 text-blue-500" /> : <Trash2 className="w-8 h-8 text-rose-500" />}
             </div>
             <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{confirmModal.type === 'edit' ? 'Modify Profile?' : 'Terminate Talent?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for <span className="font-bold text-white">"{confirmModal.worker?.name}"</span></p>
             <div className="flex flex-col gap-3">
                <button onClick={handleAction} className="py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">Proceed</button>
                <button onClick={() => setConfirmModal({...confirmModal, show: false})} className="py-4 bg-[#161b22] border border-[#30363d] text-gray-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#1c2128] transition-all active:scale-95">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 z-[110] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl w-[320px] p-8 text-center animate-in zoom-in-95 duration-250">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-600/10 border border-emerald-500/20">
              <Check className="w-10 h-10 text-emerald-500" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-white">Action Successful</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">{successMsg}</p>
            <button
              onClick={closeSuccess}
              className="mt-6 w-full rounded-2xl bg-blue-600 py-3 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/40 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
