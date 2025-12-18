
import React, { useState } from 'react';
import { X, User, Mail, Check, Shield } from 'lucide-react';

interface AdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: { name: string; email: string };
  setProfile: (profile: { name: string; email: string }) => void;
}

export const AdminProfileModal: React.FC<AdminProfileModalProps> = ({ isOpen, onClose, profile, setProfile }) => {
  const [formData, setFormData] = useState(profile);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="bg-[#0d1117] border border-[#30363d] w-full max-w-lg rounded-[3.5rem] shadow-2xl relative z-10 p-10 animate-in zoom-in-95 duration-500">
        
        {showSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Profile Updated</h3>
              <p className="text-gray-500 font-medium mt-1">Administrative credentials synchronized.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter leading-none">Admin Settings</h3>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1.5">Governance Identity</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 bg-[#161b22] border border-[#30363d] rounded-2xl text-gray-500 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-1">Admin Identity</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name"
                    className="w-full pl-14 pr-6 py-5 bg-[#161b22] border border-[#30363d] rounded-[1.75rem] text-[15px] font-bold text-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-1">Primary Dispatch Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="admin@job-lynk.com"
                    className="w-full pl-14 pr-6 py-5 bg-[#161b22] border border-[#30363d] rounded-[1.75rem] text-[15px] font-bold text-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[12px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/40 hover:bg-blue-700 transition-all active:scale-[0.98]">
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
