import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  GitBranch, 
  Sparkles, 
  ArrowUpRight, 
  FileCode2, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { ViewType } from '../types';

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Project Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/40 via-dark-card to-purple-950/30 p-6 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Workspace Active</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mindweave Platform Overview</h1>
          <p className="text-sm text-slate-400">
            Continuous intelligence, symbolic knowledge rule evaluation, and team workflow synchronization.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('knowledge_graph')}
            className="px-4 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-indigo-500/50 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Explore Knowledge Graph</span>
          </button>
          <button 
            onClick={() => onNavigate('kanban')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 transition shadow-lg shadow-indigo-900/30"
          >
            <span>Open Kanban Board</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Requirement Coverage</div>
            <div className="text-2xl font-bold text-white mt-1">100%</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>4 / 4 Requirements Linked</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Tasks</div>
            <div className="text-2xl font-bold text-white mt-1">16</div>
            <div className="text-[11px] text-indigo-400 mt-1">12 Completed • 2 In Progress</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Symbolic Rule Alerts</div>
            <div className="text-2xl font-bold text-white mt-1">1</div>
            <div className="text-[11px] text-amber-400 mt-1 flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3" />
              <span>1 Task Dependency Flag</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">GitHub Repository</div>
            <div className="text-2xl font-bold text-white mt-1">Synced</div>
            <div className="text-[11px] text-purple-400 mt-1">PR #42 Merged • Sky-ydv2008</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <GitBranch className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Activity & AI Reasoning Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sprint Progress & Traceability Matrix Quick View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-indigo-400" />
                <span>Sprint 1 Requirements Traceability Quick Audit</span>
              </h2>
              <button 
                onClick={() => onNavigate('traceability')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
              >
                <span>View Full Matrix</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-200">REQ-01: JWT Auth & RBAC Security Guard</div>
                  <div className="text-slate-400 mt-0.5">FEAT-01 → TASK-101 → PR #40 → 100% Evidence Verified</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">FULL COVERAGE</span>
              </div>

              <div className="p-3.5 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-200">REQ-02: Interactive Symbolic Knowledge Graph</div>
                  <div className="text-slate-400 mt-0.5">FEAT-02 → TASK-102 → PR #41 → Node Filter Pass</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">FULL COVERAGE</span>
              </div>

              <div className="p-3.5 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-200">REQ-04: Hybrid Symbolic + RAG AI Engine</div>
                  <div className="text-slate-400 mt-0.5">FEAT-04 → TASK-104 → PR #42 → Trace Pipeline Pass</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">FULL COVERAGE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Symbolic Rule Evaluator */}
        <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Active Symbolic Rule Engine</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-1">
              <div className="font-semibold text-indigo-300">Rule: Dependency Bottleneck Detector</div>
              <div className="text-slate-400">TASK-103 is flagged as blocked by TASK-102 in progress status.</div>
              <div className="text-[10px] text-indigo-400 font-mono pt-1">Confidence: 1.0 • Rule ID: R-01</div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1">
              <div className="font-semibold text-emerald-300">Rule: PR Linkage Sync</div>
              <div className="text-slate-400">PR #42 merged into main branch automatically created IMPLEMENTS relation.</div>
              <div className="text-[10px] text-emerald-400 font-mono pt-1">Confidence: 0.98 • Rule ID: R-04</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
