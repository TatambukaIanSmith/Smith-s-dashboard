
import React, { useState } from 'react';
import { Search, Eye, EyeOff, Filter, Download, Edit2, Trash2, ArrowRight, X, CheckCircle, RefreshCw, Check } from 'lucide-react';

const apps = [
  { id: 'A501', candidate: 'Alice Mugisha', job: 'Senior Architect', company: 'BuildIt Inc', status: 'In Review', date: '2h ago' },
  { id: 'A500', candidate: 'Bob Okello', job: 'React Native Dev', company: 'TechCorp', status: 'Accepted', date: '5h ago' },
  { id: 'A499', candidate: 'David Musoke', job: 'Heavy Machinery Op', company: 'LogiLink', status: 'Rejected', date: '1d ago' },
  { id: 'A498', candidate: 'Grace Atwine', job: 'HR Specialist', company: 'Creative Hub', status: 'Interviewing', date: '2d ago' },
];

export const ApplicationsManagement: React.FC = () => {
  const [maskData, setMaskData] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ show: boolean, type: 'edit' | 'delete', application: any | null }>({ show: false, type: 'edit', application: null });
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

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const data = {
        title: "App Ledger Export",
        timestamp: new Date().toISOString(),
        records: apps
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `joblynk-applications-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1200);
  };

  const toggleMask = (id: string) => {
    const next = new Set(maskData);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setMaskData(next);
  };

  const triggerConfirm = (type: 'edit' | 'delete', application: any) => {
    setConfirmModal({ show: true, type, application });
  };

  const handleAction = () => {
    const { type, application } = confirmModal;
    setConfirmModal({ ...confirmModal, show: false });
    setSuccessMsg(type === 'edit' ? `Application for ${application?.candidate} updated.` : `Submission ${application?.id} removed.`);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">App Ledger</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Tracking global engagement between talent and opportunities.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-8 py-3.5 bg-white border border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-600 rounded-2xl shadow-sm hover:bg-gray-50 transition-all"><Filter className="w-4 h-4 inline mr-2" /> Filter</button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-8 py-3.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 inline mr-2 animate-spin" /> : <Download className="w-4 h-4 inline mr-2" />} 
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-gray-200/40">
        <div className="p-8 border-b border-gray-50 flex items-center gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search application registry..." className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <th className="px-10 py-6">Reference ID</th>
                <th className="px-10 py-6">Market Pairing</th>
                <th className="px-10 py-6">Registry Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {apps.map((a) => {
                const isMasked = maskData.has(a.id);
                return (
                  <tr key={a.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-10 py-8">
                      <div className={`text-[15px] font-black text-gray-900 transition-all duration-300 ${isMasked ? 'blur-content opacity-30 select-none' : ''}`}>{isMasked ? 'A-••••' : a.id}</div>
                      <div className={`text-[11px] text-gray-400 font-bold mt-1.5 transition-all duration-300 ${isMasked ? 'opacity-10' : ''}`}>Candidate: {a.candidate}</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`text-[15px] font-black text-indigo-600 transition-all duration-300 ${isMasked ? 'blur-content' : ''}`}>{isMasked ? '••••••••' : a.job}</div>
                      <div className={`text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1.5 flex items-center gap-2 transition-all ${isMasked ? 'opacity-0' : ''}`}>{a.company} <ArrowRight className="w-3 h-3 opacity-20" /> {a.date}</div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                        isMasked ? 'bg-gray-50 text-gray-300 border-transparent' : 
                        a.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        a.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100 shadow-sm shadow-blue-50'
                      }`}>{isMasked ? 'SECURED' : a.status}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3 transition-all">
                        <button onClick={() => toggleMask(a.id)} className={`p-3.5 rounded-2xl transition-all shadow-sm ${isMasked ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100'}`}>
                          {isMasked ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        {!isMasked && (
                          <div className="flex gap-2">
                            <button onClick={() => triggerConfirm('edit', a)} className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl shadow-sm transition-all active:scale-90"><Edit2 className="w-5 h-5" /></button>
                            <button onClick={() => triggerConfirm('delete', a)} className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-2xl shadow-sm transition-all active:scale-90"><Trash2 className="w-5 h-5" /></button>
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
             <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">{confirmModal.type === 'edit' ? 'Modify Pairing?' : 'Delete Application?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for <span className="font-bold text-gray-900">"{confirmModal.application?.candidate}"</span></p>
             <div className="flex flex-col gap-3">
                <button onClick={handleAction} className="py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">Proceed</button>
                <button onClick={() => setConfirmModal({...confirmModal, show: false})} className="py-4 bg-gray-50 border border-gray-100 text-gray-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[110] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-[320px] p-8 text-center animate-in zoom-in-95 duration-250">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100">
              <Check className="w-10 h-10 text-emerald-500" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Success</h2>
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
