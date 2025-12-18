
import React, { useState } from 'react';
import { Flag, AlertTriangle, Gavel, ArrowRight, Eye, EyeOff, Edit2, Trash2, X, CheckCircle } from 'lucide-react';

const disputesData = [
  { id: 'D-102', job: 'Backend Fix', claimant: 'Alice Dev', respondent: 'Startup X', status: 'Open', severity: 'High', date: '2h ago' },
  { id: 'D-101', job: 'Logo Design', claimant: 'Bob Designer', respondent: 'Local Biz', status: 'Under Review', severity: 'Medium', date: '1d ago' },
  { id: 'D-099', job: 'Content Writing', claimant: 'Freelance Co', respondent: 'Charles', status: 'Resolved', severity: 'Low', date: '3d ago' },
];

export const Disputes: React.FC = () => {
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());
  const [confirmModal, setConfirmModal] = useState<{ show: boolean, type: 'edit' | 'delete', dispute: any | null }>({ show: false, type: 'edit', dispute: null });
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

  const triggerConfirm = (type: 'edit' | 'delete', dispute: any) => {
    setConfirmModal({ show: true, type, dispute });
  };

  const handleAction = () => {
    const { type, dispute } = confirmModal;
    setConfirmModal({ ...confirmModal, show: false });
    setSuccessMsg(type === 'edit' ? `Dispute details for case ${dispute?.id} revised.` : `Record for case ${dispute?.id} has been archived.`);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dispute Resolution</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Governance and platform mediation for gig conflicts.</p>
        </div>
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button className="px-8 py-3 bg-white shadow-sm border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-blue-600">All Cases</button>
          <button className="px-8 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Archive</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Avg. Resolution', val: '24.5h', icon: Gavel, color: 'bg-indigo-600' },
          { label: 'Pending Cases', val: '12', icon: AlertTriangle, color: 'bg-rose-500' },
          { label: 'Satisfaction', val: '94%', icon: Flag, color: 'bg-emerald-600' },
        ].map((m, i) => (
          <div key={i} className={`${m.color} p-10 rounded-[2.5rem] text-white shadow-2xl flex items-center justify-between group relative overflow-hidden transition-all hover:scale-[1.02]`}>
             <div className="relative z-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{m.label}</p>
               <h4 className="text-4xl font-black mt-2">{m.val}</h4>
             </div>
             <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl relative z-10 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
               <m.icon className="w-8 h-8" />
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-gray-200/40">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase tracking-widest">Global Conflict Ledger</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Monitoring</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <th className="px-10 py-6">Case Identity</th>
                <th className="px-10 py-6">Adversaries</th>
                <th className="px-10 py-6">Severity</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {disputesData.map((d) => {
                const isHidden = hiddenRows.has(d.id);
                return (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-10 py-8">
                      <div className={`text-[15px] font-black text-gray-900 transition-all ${isHidden ? 'blur-content opacity-30 select-none' : ''}`}>{isHidden ? 'D-••••' : d.id}</div>
                      <div className={`text-[11px] text-gray-400 font-bold mt-1.5 transition-all ${isHidden ? 'opacity-10' : ''}`}>{d.job}</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`flex items-center gap-3 text-[11px] font-black text-gray-500 transition-all ${isHidden ? 'blur-content' : ''}`}>
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">{isHidden ? '••••' : d.claimant}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-30" />
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">{isHidden ? '••••' : d.respondent}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        isHidden ? 'bg-gray-50 text-gray-300 border-transparent' :
                        d.status === 'Open' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        d.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                      }`}>{isHidden ? 'LOCKED' : d.status}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3 transition-all">
                        <button onClick={() => toggleVisibility(d.id)} className={`p-3.5 rounded-2xl transition-all shadow-sm ${isHidden ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100'}`}>
                          {isHidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        {!isHidden && (
                          <div className="flex gap-2">
                            <button onClick={() => triggerConfirm('edit', d)} className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl shadow-sm transition-all active:scale-90"><Edit2 className="w-5 h-5" /></button>
                            <button onClick={() => triggerConfirm('delete', d)} className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-2xl shadow-sm transition-all active:scale-90"><Trash2 className="w-5 h-5" /></button>
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setConfirmModal({...confirmModal, show: false})}></div>
          <div className="bg-white border border-gray-100 w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 p-10 text-center animate-in zoom-in-95 duration-300">
             <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {confirmModal.type === 'edit' ? <Edit2 className="w-8 h-8 text-blue-500" /> : <Trash2 className="w-8 h-8 text-rose-500" />}
             </div>
             <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">{confirmModal.type === 'edit' ? 'Modify Case?' : 'Erase Record?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for case <span className="font-bold text-gray-900">"{confirmModal.dispute?.id}"</span></p>
             <div className="flex flex-col gap-3">
                <button onClick={handleAction} className="py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">Confirm</button>
                <button onClick={() => setConfirmModal({...confirmModal, show: false})} className="py-4 bg-gray-50 border border-gray-100 text-gray-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[110] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-[320px] p-8 text-center animate-in zoom-in-95 duration-250">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Resolution Applied</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">{successMsg}</p>
            <button
              onClick={closeSuccess}
              className="mt-6 w-full rounded-2xl bg-emerald-500 py-3 text-white font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
