
import React, { useState } from 'react';
import { 
  FileText, Check, X, Edit2, Trash2, 
  Eye, EyeOff, CheckCircle, ShieldAlert, AlertCircle 
} from 'lucide-react';

const mockJobs = [
  { id: 'J1', title: 'Senior Frontend Engineer', company: 'TechCorp', risk: 'Low', color: 'blue' },
  { id: 'J2', title: 'Warehouse Associate', company: 'Logistics Pro', risk: 'High', color: 'red' },
];

export const JobModeration: React.FC = () => {
  const [confirmState, setConfirmState] = useState<{ show: boolean, type: 'reject' | 'edit', job: any | null }>({ show: false, type: 'reject', job: null });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());

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

  const handleConfirmAction = () => {
    const { type, job } = confirmState;
    setConfirmState({ ...confirmState, show: false });
    setSuccessMsg(type === 'edit' ? `Job entry for "${job.title}" modified.` : `Marketplace record for "${job.title}" removed.`);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl font-aptos text-white">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Job Moderation</h2>
        <p className="text-gray-500 font-medium mt-1">Ensuring platform safety by reviewing new listings.</p>
      </div>

      <div className="space-y-4">
        {mockJobs.map((job) => {
          const isHidden = hiddenRows.has(job.id);
          const isHighRisk = job.risk === 'High';

          return (
            <div key={job.id} className="bg-[#0d1117] rounded-3xl p-6 flex items-center justify-between shadow-sm border border-[#30363d] group">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isHighRisk ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div className={isHidden ? 'opacity-30 blur-[2px] select-none' : ''}>
                  <h4 className="text-[17px] font-bold text-white leading-tight">{job.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-500">{job.company}</span>
                    <div className="flex items-center gap-1">
                      <AlertCircle className={`w-3.5 h-3.5 ${isHighRisk ? 'text-rose-500' : 'text-orange-400'}`} />
                      <span className={`text-[12px] font-bold ${isHighRisk ? 'text-rose-500' : 'text-orange-400'}`}>{job.risk} Risk</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleVisibility(job.id)}
                  className="p-3 hover:bg-[#161b22] rounded-xl text-gray-500 hover:text-white transition-all active:scale-90"
                >
                  {isHidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setConfirmState({ show: true, type: 'edit', job })}
                  className="p-3 hover:bg-blue-600/10 rounded-xl text-blue-400 hover:text-blue-300 transition-all active:scale-90"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setConfirmState({ show: true, type: 'reject', job })}
                  className="p-3 hover:bg-rose-600/10 rounded-xl text-rose-400 hover:text-rose-300 transition-all active:scale-90"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {confirmState.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setConfirmState({ ...confirmState, show: false })}></div>
          <div className="bg-[#0d1117] border border-[#30363d] w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 p-10 text-center animate-in zoom-in-95 duration-300">
             <div className="w-16 h-16 bg-[#161b22] border border-[#30363d] rounded-2xl flex items-center justify-center mx-auto mb-6">
                {confirmState.type === 'reject' ? <ShieldAlert className="w-8 h-8 text-rose-500" /> : <Edit2 className="w-8 h-8 text-blue-400" />}
             </div>
             <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{confirmState.type === 'reject' ? 'Deny Job?' : 'Modify Job?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for <span className="font-bold text-white">"{confirmState.job?.title}"</span></p>
             <div className="flex flex-col gap-3">
                <button onClick={handleConfirmAction} className="py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">Proceed</button>
                <button onClick={() => setConfirmState({ ...confirmState, show: false })} className="py-4 bg-[#161b22] border border-[#30363d] text-gray-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#1c2128] transition-all active:scale-95">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[110] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl w-[320px] p-8 text-center animate-in zoom-in-95 duration-250">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-600/10 border border-emerald-500/20">
              <CheckCircle className="w-10 h-10 text-emerald-500" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-white">Action Successful</h2>
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
