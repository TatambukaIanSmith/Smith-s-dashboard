
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { SystemConfig } from './components/SystemConfig';
import { Notifications } from './components/Notifications';
import { WorkerOversight } from './components/WorkerOversight';
import { UserManagement } from './components/UserManagement';
import { EmployerOversight } from './components/EmployerOversight';
import { JobModeration } from './components/JobModeration';
import { ApplicationsManagement } from './components/ApplicationsManagement';
import { Analytics } from './components/Analytics';
import { Disputes } from './components/Disputes';
import { Financial } from './components/Financial';
import { Security } from './components/Security';
import { SnowEffect } from './components/SnowEffect';
import { AdminProfileModal } from './components/AdminProfileModal';
import { Section } from './types';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [snowActive, setSnowActive] = useState(false);
  
  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin Smith',
    email: 'admin.smith@job-lynk.com'
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return <Overview onNavigate={setActiveSection} adminEmail={adminProfile.email} />;
      case 'settings': return <SystemConfig />;
      case 'communications': return <Notifications />;
      case 'workers': return <WorkerOversight />;
      case 'users': return <UserManagement />;
      case 'employers': return <EmployerOversight />;
      case 'jobs': return <JobModeration />;
      case 'applications': return <ApplicationsManagement />;
      case 'analytics': return <Analytics />;
      case 'disputes': return <Disputes />;
      case 'financial': return <Financial />;
      case 'security': return <Security />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 bg-[#161b22] border border-[#30363d] rounded-[2.5rem] flex items-center justify-center text-gray-500">
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Component Registry</h2>
              <p className="text-gray-400 max-w-sm mx-auto font-medium italic">This module is currently undergoing live platform synchronization.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#010409]">
      {snowActive && <SnowEffect />}
      
      <AdminProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        profile={adminProfile}
        setProfile={setAdminProfile}
      />

      <Sidebar 
        sidebarOpen={sidebarOpen} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        snowActive={snowActive}
        setSnowActive={setSnowActive}
        adminProfile={adminProfile}
      />
      <div className="flex-1 flex flex-col relative min-w-0">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          activeSection={activeSection} 
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-[#010409] scroll-smooth custom-scrollbar">
          <div className="max-w-[1600px] mx-auto p-6 md:p-12 lg:p-16">
            {renderContent()}
          </div>
        </main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default App;
