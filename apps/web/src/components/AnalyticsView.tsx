import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, Award, Zap } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <span>Analytics & Knowledge Metrics</span>
        </h1>
        <p className="text-xs text-slate-400">
          Sprint velocity, task completion efficiency, and knowledge freshness metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="text-xs text-slate-400 font-medium">Sprint Velocity</div>
          <div className="text-3xl font-extrabold text-white">52 pts</div>
          <div className="text-emerald-400 text-xs flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+15% from Sprint 2</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="text-xs text-slate-400 font-medium">Knowledge Freshness</div>
          <div className="text-3xl font-extrabold text-indigo-400">98%</div>
          <div className="text-slate-400 text-xs">Updated 10m ago</div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="text-xs text-slate-400 font-medium">Evidence Coverage</div>
          <div className="text-3xl font-extrabold text-emerald-400">94%</div>
          <div className="text-slate-400 text-xs">15 of 16 facts verified</div>
        </div>
      </div>
    </div>
  );
};
