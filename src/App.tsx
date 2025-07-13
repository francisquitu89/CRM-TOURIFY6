import React, { useState, useEffect } from 'react';
import { User } from './types';
import { getCurrentUser } from './utils/auth';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProspectsSection } from './components/prospects/ProspectsSection';
import { ScriptsSection } from './components/scripts/ScriptsSection';
import { FinancesSection } from './components/finances/FinancesSection';
import { TasksSection } from './components/tasks/TasksSection';
import { MotivationSection } from './components/motivation/MotivationSection';
import { ToursSection } from './components/tours/ToursSection';
import { CalendarSection } from './components/calendar/CalendarSection';
import { MotivationalPopup, useMotivationalPopups } from './components/motivation/MotivationalPopup';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { popup, showPopup, closePopup } = useMotivationalPopups();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('dashboard');
  };

  // Mostrar popup de bienvenida al hacer login
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    showPopup(`¡Bienvenido de vuelta, ${loggedInUser.name}! 🎉 ¡Listo para conquistar nuevas metas!`, 'success');
  };

  const renderActiveSection = () => {
    if (!user) return null;

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} onQuickAction={setActiveSection} />;
      case 'prospects':
        return <ProspectsSection user={user} />;
      case 'scripts':
        return <ScriptsSection />;
      case 'finances':
        return <FinancesSection />;
      case 'tasks':
        return <TasksSection user={user} />;
      case 'motivation':
        return <MotivationSection />;
      case 'tours':
        return <ToursSection />;
      case 'calendar':
        return <CalendarSection />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {renderActiveSection()}
          </div>
        </main>
        
        <MotivationalPopup
          isOpen={popup.isOpen}
          onClose={closePopup}
          message={popup.message}
          type={popup.type}
        />
      </div>
    </div>
  );
}

export default App;