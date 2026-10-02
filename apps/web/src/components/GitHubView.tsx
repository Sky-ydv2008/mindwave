import React from 'react';
import { Github, GitPullRequest, GitCommit, ExternalLink, CheckCircle2 } from 'lucide-react';

export const GitHubView: React.FC = () => {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <Github className="w-5 h-5 text-indigo-400" />
          <span>GitHub Workspace Integration</span>
        </h1>
        <p className="text-xs text-slate-400">
          Connected repository: <span className="font-mono text-indigo-400">Sky-ydv2008/mindwave</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commits Feed */}
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <span>Recent Commits</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-200">a7d9f21</span>
                <span className="text-emerald-400 text-[10px]">Verified</span>
              </div>
              <p className="text-slate-300 font-medium">feat: implement symbolic rule reasoning engine & RAG trace</p>
              <div className="text-[10px] text-slate-500">Sky Yadav • 1 hour ago</div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-200">e4b81c0</span>
                <span className="text-emerald-400 text-[10px]">Verified</span>
              </div>
              <p className="text-slate-300 font-medium">docs: add Mindweave full implementation plan and specs</p>
              <div className="text-[10px] text-slate-500">Sky Yadav • 3 hours ago</div>
            </div>
          </div>
        </div>

        {/* Pull Requests */}
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <GitPullRequest className="w-4 h-4 text-purple-400" />
            <span>Active Pull Requests</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300">PR #42: Add Hybrid RAG Pipeline</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono text-[10px]">MERGED</span>
              </div>
              <p className="text-slate-400">Links to: TASK-104 & Requirement REQ-04</p>
              <a 
                href="https://github.com/Sky-ydv2008/mindwave" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
