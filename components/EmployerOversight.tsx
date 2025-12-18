
import React, { useState } from 'react';
import { Search, MapPin, Eye, EyeOff, Edit2, Trash2, X, CheckCircle, Check } from 'lucide-react';

const mockEmployers = [
  { id: 'E1', name: 'TechCorp Solutions', industry: 'Software Engineering', status: 'Verified', activeJobs: 12, rating: 4.8, location: 'San Francisco, CA' },
  { id: 'E2', name: 'Global Logistics', industry: 'Supply Chain', status: 'Pending', activeJobs: 0, rating: 0, location: 'New Jersey, NY' },
  { id: 'E3', name: 'Creative Minds', industry: 'Digital Arts', status: 'Verified', activeJobs: 5, rating: 4.9, location: 'Austin, TX' },
];

export const EmployerOversight: React.FC = () => {
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());
  const [confirmModal, setConfirmModal] = useState<{ show: boolean, type: 'edit' | 'delete', employer: any | null }>({ show: false, type: 'edit', employer: null });
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

  const triggerConfirm = (type: 'edit' | 'delete', employer: any) => {
    setConfirmModal({ show: true, type, employer });
  };

  const handleAction = () => {
    const { type, employer } = confirmModal;
    setConfirmModal({ ...confirmModal, show: false });
    setSuccessMsg(type === 'edit' ? `Configuration for ${employer?.name} updated.` : `Business entity ${employer?.name} terminated from registry.`);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 font-aptos text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Partner Oversight</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Governance and auditing of verified business accounts.</p>
        </div>
        <div className="px-6 py-2.5 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-blue-500/20">
          98.4% Retention Rate
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-[2.5rem] border border-[#30363d] shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#161b22]/50 border-b border-[#30363d] text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                <th className="px-10 py-6">Company Identity</th>
                <th className="px-10 py-6">Sector</th>
                <th className="px-10 py-6">Governance</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {mockEmployers.map((emp) => {
                const isHidden = hiddenRows.has(emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-[#161b22]/50 transition-all group">
                    <td className="px-10 py-8">
                      <div className={`flex items-center gap-5 transition-all duration-300 ${isHidden ? 'blur-content opacity-30 select-none' : ''}`}>
                        <div className="w-12 h-12 bg-[#161b22] border border-[#30363d] rounded-xl flex items-center justify-center font-black text-blue-500 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all text-lg">{emp.name.charAt(0)}</div>
                        <div>
                          <div className="text-[15px] font-black text-white leading-tight">{isHidden ? '••••••••' : emp.name}</div>
                          <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-500" />{isHidden ? '••••••••' : emp.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-10 py-8 text-[13px] font-bold text-gray-400 transition-all duration-300 ${isHidden ? 'blur-content opacity-20' : ''}`}>{isHidden ? '••••••' : emp.industry}</td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                        isHidden ? 'bg-[#161b22] text-gray-600 border-transparent' : emp.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>{isHidden ? 'SECURED' : emp.status}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3 transition-all">
                        <button onClick={() => toggleVisibility(emp.id)} className={`p-4 rounded-2xl transition-all shadow-sm ${isHidden ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-blue-500 hover:border-blue-500/40'}`}>
                          {isHidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        {!isHidden && (
                          <div className="flex gap-2">
                            <button onClick={() => triggerConfirm('edit', emp)} className="p-4 bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-blue-400 hover:border-blue-400/40 rounded-2xl shadow-sm transition-all active:scale-90"><Edit2 className="w-5 h-5" /></button>
                            <button onClick={() => triggerConfirm('delete', emp)} className="p-4 bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-rose-400 hover:border-rose-400/40 rounded-2xl shadow-sm transition-all active:scale-90"><Trash2 className="w-5 h-5" /></button>
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
             <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{confirmModal.type === 'edit' ? 'Modify Entity?' : 'Erase Record?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for <span className="font-bold text-white">"{confirmModal.employer?.name}"</span></p>
             <div className="flex flex-col gap-3">
                <button onClick={handleAction} className="py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">Confirm</button>
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
            <h2 className="text-xl font-bold text-white">Protocol Executed</h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">{successMsg}</p>
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
