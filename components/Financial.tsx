
import React, { useState } from 'react';
import { 
  Wallet, CreditCard, DollarSign, 
  Download, Eye, EyeOff, Edit2, 
  Trash2, ArrowUpRight, ArrowDownRight, X, RefreshCw, Check
} from 'lucide-react';

const transactions = [
  { id: 'TX-902', user: 'Sarah Nakato', amount: 450.00, type: 'Payout', status: 'COMPLETED', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop' },
  { id: 'TX-901', user: 'TechCorp Solutions', amount: 1200.00, type: 'Deposit', status: 'COMPLETED', avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop' },
  { id: 'TX-900', user: 'John Doe', amount: 120.00, type: 'Payout', status: 'PENDING', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
];

const EXCHANGE_RATE = 3800; // 1 USD = 3800 UGX

export const Financial: React.FC = () => {
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());
  const [currency, setCurrency] = useState<'USD' | 'UGX'>('USD');
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [confirmModal, setConfirmModal] = useState<{ show: boolean, type: 'edit' | 'delete', data: any | null }>({
    show: false,
    type: 'edit',
    data: null
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

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = "ID,User,Amount,Type,Status\n";
      const rows = transactions.map(t => `${t.id},${t.user},${t.amount},${t.type},${t.status}`).join("\n");
      const blob = new Blob([headers + rows], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `joblynk-transactions-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1200);
  };

  const toggleVisibility = (id: string) => {
    const next = new Set(hiddenRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setHiddenRows(next);
  };

  const openConfirm = (type: 'edit' | 'delete', data: any) => {
    setConfirmModal({ show: true, type, data });
  };

  const handleAction = () => {
    const { type, data } = confirmModal;
    setConfirmModal({ ...confirmModal, show: false });
    setSuccessMsg(type === 'edit' ? `Record for ${data.user} has been modified.` : `Entry for ${data.user} has been removed.`);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  const formatValue = (val: number) => {
    const converted = currency === 'UGX' ? val * EXCHANGE_RATE : val;
    const formatted = converted.toLocaleString(undefined, { 
      minimumFractionDigits: currency === 'USD' ? 2 : 0,
      maximumFractionDigits: currency === 'USD' ? 2 : 0
    });
    return currency === 'USD' ? `$${formatted}` : `UGX ${formatted}`;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto font-aptos text-white">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-[38px] font-bold text-white tracking-tight leading-none">Financials</h1>
          <p className="text-gray-500 text-base font-medium italic mt-2">Monitor revenue, platform fees, and user transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#161b22] p-1 rounded-2xl border border-[#30363d]">
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all ${currency === 'USD' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              USD
            </button>
            <button 
              onClick={() => setCurrency('UGX')}
              className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all ${currency === 'UGX' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              UGX
            </button>
          </div>
          <button 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-2xl text-[14px] font-bold text-gray-300 shadow-sm hover:bg-[#1c2128] transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" /> : <Download className="w-5 h-5 text-blue-500" />} 
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111827] rounded-[2.5rem] border border-white/5 p-8 text-white shadow-xl relative group overflow-hidden">
          <div className="relative z-10 flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="px-3 py-1 bg-blue-600/40 text-blue-400 rounded-full text-[10px] font-black tracking-widest border border-white/5">
              +14.5%
            </div>
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em]">PLATFORM VOLUME</p>
            <h4 className="text-[36px] font-bold tracking-tighter leading-none">{formatValue(245890)}</h4>
          </div>
        </div>

        <div className="bg-[#FB923C] rounded-[2.5rem] p-8 text-white shadow-xl relative group overflow-hidden">
          <div className="relative z-10 flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest border border-white/10">
              Monthly
            </div>
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.25em]">NET REVENUE</p>
            <h4 className="text-[36px] font-bold tracking-tighter leading-none">{formatValue(12450)}</h4>
          </div>
        </div>

        <div className="bg-[#A3E635] rounded-[2.5rem] p-8 text-[#1A2E05] shadow-xl relative group overflow-hidden">
          <div className="relative z-10 flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#1A2E05]" />
            </div>
            <div className="px-4 py-1.5 bg-black/10 rounded-full text-[10px] font-black tracking-widest border border-black/5">
              Average
            </div>
          </div>
          <div className="relative z-10 space-y-2">
            <p className="text-[10px] font-black text-[#1A2E05]/40 uppercase tracking-[0.25em]">AVG. TICKET</p>
            <h4 className="text-[36px] font-bold tracking-tighter leading-none">{formatValue(245)}</h4>
          </div>
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-[3rem] border border-[#30363d] shadow-sm overflow-hidden mt-6">
        <div className="px-10 py-8 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">Recent Ledger Transactions</h3>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.25em]">REAL-TIME SYNC ({currency})</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] border-b border-[#30363d] bg-[#161b22]/30">
                <th className="px-10 py-6">INITIATED BY</th>
                <th className="px-10 py-6">CLASSIFICATION</th>
                <th className="px-10 py-6 text-right">AMOUNT ({currency})</th>
                <th className="px-10 py-6 text-center">SETTLEMENT STATUS</th>
                <th className="px-10 py-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {transactions.map((t) => {
                const isHidden = hiddenRows.has(t.id);
                return (
                  <tr key={t.id} className="hover:bg-[#161b22]/30 transition-all">
                    <td className="px-10 py-6">
                      <div className={`flex items-center gap-4 ${isHidden ? 'blur-sm opacity-30 select-none' : ''}`}>
                        <img 
                          src={t.avatar} 
                          className="w-12 h-12 rounded-xl object-cover shadow-sm" 
                          alt={t.user} 
                        />
                        <div className="text-[16px] font-bold text-white">{isHidden ? '••••••••' : t.user}</div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className={`flex items-center gap-2 text-[13px] font-bold ${isHidden ? 'blur-sm opacity-20' : t.type === 'Payout' ? 'text-blue-500' : 'text-emerald-500'}`}>
                        {t.type === 'Payout' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        {t.type}
                      </div>
                    </td>
                    <td className={`px-10 py-6 text-[18px] font-bold text-white text-right ${isHidden ? 'blur-sm opacity-20' : ''}`}>
                      {formatValue(t.amount)}
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="flex justify-center">
                        <span className={`px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest ${
                          isHidden ? 'bg-[#161b22] text-gray-600' : 
                          t.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                          t.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                          'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        }`}>
                          {isHidden ? 'SECURED' : t.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => toggleVisibility(t.id)}
                          className="w-10 h-10 flex items-center justify-center bg-[#161b22] text-gray-500 rounded-full hover:bg-[#1c2128] hover:text-white transition-all active:scale-90 border border-[#30363d]"
                        >
                          {isHidden ? <Eye className="w-4.5 h-4.5" /> : <EyeOff className="w-4.5 h-4.5" />}
                        </button>
                        <button 
                          onClick={() => openConfirm('edit', t)}
                          className="w-10 h-10 flex items-center justify-center bg-[#161b22] text-gray-500 rounded-full hover:bg-blue-600/20 hover:text-blue-400 transition-all active:scale-90 border border-[#30363d]"
                        >
                          <Edit2 className="w-4.5 h-4.5" />
                        </button>
                        <button 
                          onClick={() => openConfirm('delete', t)}
                          className="w-10 h-10 flex items-center justify-center bg-[#161b22] text-gray-500 rounded-full hover:bg-rose-600/20 hover:text-rose-400 transition-all active:scale-90 border border-[#30363d]"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
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
             <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{confirmModal.type === 'edit' ? 'Modify Record?' : 'Erase Entry?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for <span className="font-bold text-white">"{confirmModal.data?.user}"</span></p>
             <div className="flex flex-col gap-3">
                <button onClick={handleAction} className="py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">Confirm</button>
                <button onClick={() => setConfirmModal({...confirmModal, show: false})} className="py-4 bg-[#161b22] border border-[#30363d] text-gray-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#1c2128] transition-all active:scale-95">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[110] backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-[2rem] shadow-2xl w-[320px] p-8 text-center animate-in zoom-in-95 duration-250">
            <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-600/10 border border-emerald-500/20">
              <Check className="w-10 h-10 text-emerald-500" strokeWidth={3} />
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

      <div className="mt-16 pt-8 border-t border-[#30363d] text-center">
         <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.8em] italic leading-relaxed">
           "Getting jobs to your doorstep."
         </p>
      </div>
    </div>
  );
};
