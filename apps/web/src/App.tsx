import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { KanbanView } from './components/KanbanView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { TraceabilityView } from './components/TraceabilityView';
import { AIManagerView } from './components/AIManagerView';
import { ChatView } from './components/ChatView';
import { GitHubView } from './components/GitHubView';
import { DocumentsView } from './components/DocumentsView';
import { AnalyticsView } from './components/AnalyticsView';
import { AdminView } from './components/AdminView';
import { ViewType, UserProfile } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [activeProject, setActiveProject] = useState('Mindweave Platform Engine');

  const user: UserProfile = {
    id: 'u-1',
    name: 'Sky Yadav',
    email: 'sky@mindweave.ai',
    role: 'SUPER_ADMIN'
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView onNavigate={setCurrentView} />;
      case 'kanban': return <KanbanView />;
      case 'knowledge_graph': return <KnowledgeGraphView />;
      case 'traceability': return <TraceabilityView />;
      case 'ai_manager': return <AIManagerView />;
      case 'chat': return <ChatView />;
      case 'github': return <GitHubView />;
      case 'documents': return <DocumentsView />;
      case 'analytics': return <AnalyticsView />;
      case 'admin': return <AdminView />;
      default: return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b0f19] text-slate-100">
      {/* Sidebar Component */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Header */}
        <Header 
          user={user}
          activeProject={activeProject}
          onSelectProject={setActiveProject}
          onOpenAI={() => setCurrentView('ai_manager')}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto bg-[#0b0f19]">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
