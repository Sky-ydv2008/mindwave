import React, { useState } from 'react';
import { Search, Bell, Shield, Sparkles, FolderGit2, CheckCircle2, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  activeProject: string;
  onSelectProject: (proj: string) => void;
  onOpenAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeProject, onSelectProject, onOpenAI }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  return (
    <header className="h-16 border-b border-dark-border bg-[#0d1322] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Project Selector & Status */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border hover:border-slate-700 transition text-sm font-medium text-slate-200"
          >
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            <span>{activeProject}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {showProjectDropdown && (
            <div className="absolute left-0 mt-2 w-64 bg-dark-card border border-dark-border rounded-lg shadow-xl py-2 z-50">
              <div className="px-3 py-1 text-xs text-slate-400 font-semibold uppercase tracking-wider">Select Project</div>
              <button 
                onClick={() => { onSelectProject("Mindweave Platform Engine"); setShowProjectDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-dark-hover flex items-center justify-between"
              >
                <span>Mindweave Platform Engine</span>
                <span className="text-xs text-emerald-400 font-mono">HEALTHY</span>
              </button>
              <button 
                onClick={() => { onSelectProject("Nexus Distributed Autonomous Agent System"); setShowProjectDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-dark-hover flex items-center justify-between"
              >
                <span>Nexus Distributed Agent System</span>
                <span className="text-xs text-amber-400 font-mono">AT_RISK</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Project Health: Healthy</span>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search tasks, documents, chat, requirements, code..." 
            className="w-full bg-[#070a12] border border-dark-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Right: Actions, AI Prompt, Notifications & Profile */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={onOpenAI}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-900/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Manager</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-dark-card border border-dark-border text-slate-300 hover:text-white hover:border-slate-700 transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-dark-card border border-dark-border rounded-lg shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-dark-border">
                <span className="text-xs font-semibold text-slate-200">Notifications</span>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-2 mt-2 max-h-60 overflow-y-auto text-xs">
                <div className="p-2 rounded bg-dark-hover border border-dark-border">
                  <div className="font-semibold text-slate-200">Task Assigned</div>
                  <div className="text-slate-400 text-[11px]">Sky assigned 'Knowledge Graph Explorer' to you.</div>
                </div>
                <div className="p-2 rounded bg-dark-hover border border-dark-border">
                  <div className="font-semibold text-emerald-400">PR Merged</div>
                  <div className="text-slate-400 text-[11px]">PR #42 merged into main branch. Requirement REQ-04 verified.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-dark-border">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">{user.name}</div>
            <div className="text-[10px] text-indigo-400 flex items-center space-x-1">
              <Shield className="w-2.5 h-2.5 inline" />
              <span>{user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
