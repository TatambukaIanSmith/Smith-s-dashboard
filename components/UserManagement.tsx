
import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, 
  Eye, EyeOff, Check, User as UserIcon, X, Mail, Shield, Activity
} from 'lucide-react';
import { User } from '../types';

const initialUsers: User[] = [
  { id: '1', name: 'Sarah Nakato', email: 'sarah.n@example.com', role: 'Worker', status: 'Active', joinedDate: 'Oct 24, 2023', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop' },
  { id: '2', name: 'TechCorp Ltd', email: 'hr@techcorp.com', role: 'Employer', status: 'Active', joinedDate: 'Oct 22, 2023', avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop' },
  { id: '3', name: 'John Doe', email: 'john.doe@gmail.com', role: 'Worker', status: 'Active', joinedDate: 'Sep 15, 2023', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: '4', name: 'BuildIt Inc', email: 'contact@buildit.co', role: 'Employer', status: 'Active', joinedDate: 'Nov 01, 2023', avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop' },
  { id: '5', name: 'Mike Smith', email: 'm.smith@yahoo.com', role: 'Worker', status: 'Active', joinedDate: 'Oct 10, 2023', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenRows, setHiddenRows] = useState<Set<string>>(new Set());
  const [confirmModal, setConfirmModal] = useState<{ show: boolean, type: 'edit' | 'delete', user: User | null }>({ show: false, type: 'edit', user: null });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Worker' as const,
    status: 'Active' as const
  });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const triggerConfirm = (type: 'edit' | 'delete', user: User) => {
    setConfirmModal({ show: true, type, user });
  };

  const handleAction = () => {
    const { type, user } = confirmModal;
    setConfirmModal({ ...confirmModal, show: false });
    if (type === 'delete' && user) {
      setUsers(users.filter(u => u.id !== user.id));
    }
    setSuccessMsg(type === 'edit' ? `User profile for ${user?.name} updated.` : `User account for ${user?.name} removed.`);
    setShowSuccess(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (users.length + 1).toString();
    const registeredUser: User = {
      ...newUser,
      id,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=2f81f7&color=fff`
    };
    setUsers([registeredUser, ...users]);
    setShowRegisterModal(false);
    setSuccessMsg(`New user "${newUser.name}" successfully registered.`);
    setShowSuccess(true);
    setNewUser({ name: '', email: '', role: 'Worker', status: 'Active' });
  };

  const closeSuccess = () => {
    playPopSound();
    setShowSuccess(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 font-aptos text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">User Management</h1>
          <p className="text-gray-500 font-medium mt-1 italic">Managing {users.length} total platform accounts.</p>
        </div>
        <button 
          onClick={() => setShowRegisterModal(true)}
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] text-[14px] font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> Register New User
        </button>
      </div>

      <div className="bg-[#0d1117] rounded-[3rem] p-4 shadow-sm border border-[#30363d] flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search platform directory by name or email..." 
            className="w-full pl-16 pr-8 py-5 bg-[#161b22] border-none rounded-[1.75rem] text-[15px] font-black focus:ring-4 focus:ring-blue-500/5 transition-all text-white placeholder:text-gray-600" 
          />
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-[4rem] border border-[#30363d] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#161b22]/50 border-b border-[#30363d] text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
                <th className="px-12 py-8">IDENTITY PROFILE</th>
                <th className="px-12 py-8 text-center">PLATFORM ROLE</th>
                <th className="px-12 py-8 text-center">VERIFICATION STATUS</th>
                <th className="px-12 py-8 text-right">GOVERNANCE ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {filteredUsers.map((user) => {
                const isHidden = hiddenRows.has(user.id);
                return (
                  <tr key={user.id} className="hover:bg-[#161b22]/50 transition-all group">
                    <td className="px-12 py-10">
                      <div className={`flex items-center gap-6 transition-all duration-500 ${isHidden ? 'blur-content opacity-30 select-none' : ''}`}>
                         <div className="relative">
                           <img 
                              src={user.avatar} 
                              className={`w-12 h-12 rounded-xl object-cover shadow-sm transition-all ${isHidden ? 'blur-md' : ''}`} 
                              alt={user.name} 
                            />
                            {!isHidden && (
                              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0d1117] rounded-full"></div>
                            )}
                         </div>
                         <div>
                            <div className="text-[17px] font-black text-white tracking-tight leading-none">{isHidden ? '••••••••' : user.name}</div>
                            <div className="text-[13px] text-gray-500 font-medium mt-1.5">{isHidden ? '••••' : user.email}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-center">
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                        isHidden ? 'bg-[#161b22] text-gray-600 border-[#30363d]' :
                        user.role === 'Employer' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>{isHidden ? 'SECURED' : user.role}</span>
                    </td>
                    <td className="px-12 py-10 text-center">
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                        isHidden ? 'bg-[#161b22] text-gray-600 border-[#30363d]' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>{isHidden ? 'SECURED' : user.status}</span>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex justify-end gap-3 transition-all">
                        <button onClick={() => toggleVisibility(user.id)} className={`p-4 rounded-2xl transition-all shadow-sm ${isHidden ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30' : 'bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-blue-500 hover:border-blue-500/40'}`}>
                          {isHidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        {!isHidden && (
                          <div className="flex gap-2">
                            <button onClick={() => triggerConfirm('edit', user)} className="p-4 bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-blue-400 hover:border-blue-400/40 rounded-2xl shadow-sm transition-all active:scale-90"><Edit2 className="w-5 h-5" /></button>
                            <button onClick={() => triggerConfirm('delete', user)} className="p-4 bg-[#161b22] border border-[#30363d] text-gray-500 hover:text-rose-400 hover:border-rose-400/40 rounded-2xl shadow-sm transition-all active:scale-90"><Trash2 className="w-5 h-5" /></button>
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

      {showRegisterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setShowRegisterModal(false)}></div>
          <div className="bg-[#0d1117] border border-[#30363d] w-full max-w-lg rounded-[3.5rem] shadow-2xl relative z-10 p-10 animate-in zoom-in-95 duration-500 flex flex-col">
             <div className="flex justify-between items-center mb-8 shrink-0">
               <div>
                  <h2 className="text-[10px] font-black text-blue-600 tracking-[0.5em] uppercase opacity-70">Governance Hub</h2>
                  <h3 className="text-2xl font-black text-white tracking-tighter mt-1">Register Platform Actor</h3>
               </div>
               <button onClick={() => setShowRegisterModal(false)} className="w-10 h-10 flex items-center justify-center bg-[#161b22] border border-[#30363d] rounded-2xl text-gray-500 hover:text-white transition-all">
                  <X className="w-5 h-5" />
               </button>
             </div>

             <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Legal Identity</label>
                   <div className="relative group">
                      <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        required
                        type="text" 
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        placeholder="Enter full name..."
                        className="w-full pl-14 pr-6 py-4 bg-[#161b22] border border-[#30363d] rounded-2xl text-sm font-bold text-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Dispatch Address (Email)</label>
                   <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        required
                        type="email" 
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        placeholder="Enter email address..."
                        className="w-full pl-14 pr-6 py-4 bg-[#161b22] border border-[#30363d] rounded-2xl text-sm font-bold text-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Platform Role</label>
                      <select 
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                        className="w-full px-5 py-4 bg-[#161b22] border border-[#30363d] rounded-2xl text-sm font-bold text-white focus:ring-4 focus:ring-blue-500/10 outline-none"
                      >
                         <option value="Worker">Worker Node</option>
                         <option value="Employer">Employer Cluster</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Status</label>
                      <select 
                        value={newUser.status}
                        onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
                        className="w-full px-5 py-4 bg-[#161b22] border border-[#30363d] rounded-2xl text-sm font-bold text-white focus:ring-4 focus:ring-blue-500/10 outline-none"
                      >
                         <option value="Active">Operational</option>
                         <option value="Pending">Quarantined</option>
                      </select>
                   </div>
                </div>

                <div className="pt-6">
                   <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/40 hover:bg-blue-700 transition-all active:scale-[0.98]">
                      Authorize Registry Entry
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {confirmModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setConfirmModal({...confirmModal, show: false})}></div>
          <div className="bg-[#0d1117] border border-[#30363d] w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 p-10 text-center animate-in zoom-in-95 duration-300">
             <div className="w-16 h-16 bg-[#161b22] border border-[#30363d] rounded-2xl flex items-center justify-center mx-auto mb-6">
                {confirmModal.type === 'edit' ? <Edit2 className="w-8 h-8 text-blue-500" /> : <Trash2 className="w-8 h-8 text-rose-500" />}
             </div>
             <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{confirmModal.type === 'edit' ? 'Modify User?' : 'Delete User?'}</h3>
             <p className="text-gray-500 text-sm font-medium italic mb-8">Confirm action for <span className="font-bold text-white">"{confirmModal.user?.name}"</span></p>
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
            <h2 className="text-xl font-bold text-white">Success</h2>
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

      <div className="mt-20 pt-10 border-t border-[#30363d] text-center">
         <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.8em] italic leading-relaxed">
           "Getting jobs to your doorstep."
         </p>
      </div>
    </div>
  );
};
