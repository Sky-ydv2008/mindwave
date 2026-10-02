import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Download, Filter } from 'lucide-react';
import { TraceabilityItem } from '../types';
import { ApiService } from '../services/api';

export const TraceabilityView: React.FC = () => {
  const [matrix, setMatrix] = useState<TraceabilityItem[]>([]);

  useEffect(() => {
    loadTraceability();
  }, []);

  const loadTraceability = async () => {
    const data = await ApiService.getTraceability();
    setMatrix(data);
  };

  const getCoverageBadge = (status: TraceabilityItem['coverageStatus']) => {
    switch (status) {
      case 'FULL':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>FULL COVERAGE</span>
          </span>
        );
      case 'PARTIAL':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>PARTIAL</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>UNCOVERED</span>
          </span>
        );
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
            <span>Requirements Traceability Matrix</span>
          </h1>
          <p className="text-xs text-slate-400">
            End-to-end audit mapping: Requirement → Feature → Task → Pull Request → Test → Documentation.
          </p>
        </div>

        <button 
          onClick={() => alert("Requirements Traceability Matrix exported as audit PDF/CSV report.")}
          className="px-4 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition self-start"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Export Matrix Report</span>
        </button>
      </div>

      {/* Audit Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Total System Requirements</div>
            <div className="text-xl font-bold text-white mt-0.5">{matrix.length}</div>
          </div>
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
        </div>

        <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Fully Covered Requirements</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              {matrix.filter(m => m.coverageStatus === 'FULL').length} / {matrix.length}
            </div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Implementation Gap Alerts</div>
            <div className="text-xl font-bold text-slate-100 mt-0.5">
              {matrix.filter(m => m.coverageStatus === 'UNCOVERED').length} Gaps
            </div>
          </div>
          <AlertTriangle className="w-6 h-6 text-amber-400" />
        </div>
      </div>

      {/* Traceability Table */}
      <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090d16] text-slate-400 font-semibold uppercase tracking-wider border-b border-dark-border">
              <tr>
                <th className="p-4">Requirement</th>
                <th className="p-4">Feature Module</th>
                <th className="p-4">Work Task</th>
                <th className="p-4">Pull Request / Code</th>
                <th className="p-4">Test Verification</th>
                <th className="p-4">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border text-slate-300">
              {matrix.map((row) => (
                <tr key={row.requirementId} className="hover:bg-dark-hover transition">
                  <td className="p-4">
                    <div className="font-semibold text-white">{row.requirementName}</div>
                    {row.externalId && <div className="text-[10px] text-indigo-400 font-mono">{row.externalId}</div>}
                  </td>
                  <td className="p-4">
                    {row.features.map(f => (
                      <span key={f} className="inline-block px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-medium mr-1 mb-1">
                        {f}
                      </span>
                    ))}
                  </td>
                  <td className="p-4">
                    {row.tasks.map(t => (
                      <div key={t.id} className="text-[11px]">
                        <span className="font-semibold text-slate-200">{t.title}</span>
                        <span className="ml-1 text-[10px] text-emerald-400">({t.status})</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    {row.pullRequests.map(pr => (
                      <div key={pr.id} className="text-[11px] font-mono text-purple-400">
                        {pr.title}
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    {row.tests.map(test => (
                      <div key={test.name} className="flex items-center space-x-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{test.name}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    {getCoverageBadge(row.coverageStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
