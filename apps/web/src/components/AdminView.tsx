import React from 'react';
import { ShieldCheck, Users, Server, Cpu, KeyRound } from 'lucide-react';

export const AdminView: React.FC = () => {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Platform Administration Panel</span>
        </h1>
        <p className="text-xs text-slate-400">
          User roles, RBAC authorization boundaries, and system runtime health monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Team Members & Roles</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Sky Yadav</div>
                <div className="text-[11px] text-slate-400">admin@mindweave.ai</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 font-mono font-bold">
                SUPER_ADMIN
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Alex Chen</div>
                <div className="text-[11px] text-slate-400">dev@mindweave.ai</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 font-mono font-bold">
                TEAM_ADMIN
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Infrastructure Health Status</span>
          </h2>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-dark-bg border border-dark-border flex justify-between">
              <span className="text-slate-300">Database (PostgreSQL + pgvector)</span>
              <span className="text-emerald-400 font-mono font-semibold">ONLINE</span>
            </div>
            <div className="p-3 rounded-lg bg-dark-bg border border-dark-border flex justify-between">
              <span className="text-slate-300">Redis Cache & WebSockets</span>
              <span className="text-emerald-400 font-mono font-semibold">ONLINE</span>
            </div>
            <div className="p-3 rounded-lg bg-dark-bg border border-dark-border flex justify-between">
              <span className="text-slate-300">Symbolic Rule Evaluator Engine</span>
              <span className="text-emerald-400 font-mono font-semibold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
