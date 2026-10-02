import React from 'react';
import { 
  LayoutDashboard, 
  Kanban, 
  GitGraph, 
  FileSpreadsheet, 
  Bot, 
  MessageSquare, 
  Github, 
  FileText, 
  BarChart3, 
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const menuItems: { id: ViewType; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'kanban', label: 'Tasks & Kanban', icon: Kanban, badge: '4' },
    { id: 'knowledge_graph', label: 'Knowledge Graph', icon: GitGraph, badge: 'New' },
    { id: 'traceability', label: 'Traceability Matrix', icon: FileSpreadsheet },
    { id: 'ai_manager', label: 'AI Manager & RAG', icon: Bot, badge: 'RAG' },
    { id: 'chat', label: 'Team Chat', icon: MessageSquare },
    { id: 'github', label: 'GitHub Workspace', icon: Github },
    { id: 'documents', label: 'Document Intelligence', icon: FileText },
    { id: 'analytics', label: 'Analytics & Metrics', icon: BarChart3 },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck }
  ];

  return (
    <aside className="w-64 border-r border-dark-border bg-[#0d1322] flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 border-b border-dark-border flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white flex items-center space-x-1.5">
              <span>Mindweave</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">v1.0</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Apexx Innovators</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Workspace Modules
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive 
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold shadow-sm' 
                    : 'text-slate-300 hover:bg-dark-hover hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-indigo-500 text-white' : 'bg-dark-border text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-dark-border bg-[#090d16]">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Symbolic Engine</span>
          <span className="text-emerald-400 font-mono">ONLINE</span>
        </div>
        <div className="w-full bg-dark-border h-1.5 rounded-full overflow-hidden">
          <div className="bg-indigo-500 h-full w-[88%]"></div>
        </div>
        <div className="mt-2 text-[10px] text-slate-500 text-center">
          Continuous Verification Active
        </div>
      </div>
    </aside>
  );
};
