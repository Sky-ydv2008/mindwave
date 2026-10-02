import React from 'react';
import { FileText, Upload, File, Sparkles, CheckCircle2 } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Document Intelligence Workspace</span>
          </h1>
          <p className="text-xs text-slate-400">
            Ingest PDFs, extract chunks, generate vector embeddings, and ground AI responses in verified evidence.
          </p>
        </div>

        <button 
          onClick={() => alert("Upload document simulation: Ingesting PDF file and extracting 14 text chunks.")}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 transition shadow-md self-start"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Specification Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="w-8 h-8 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Mindweave_Full_Implementation_Plan.pdf</h3>
                <p className="text-[11px] text-slate-400">6 Pages • 14 Chunks Extracted</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold">
              INDEXED
            </span>
          </div>

          <div className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2 text-xs">
            <div className="font-semibold text-indigo-300">Chunk 01 (Extract):</div>
            <p className="text-slate-400 italic">
              "Mindweave combines project management, real-time collaboration, AI assistance, document intelligence, GitHub integration, analytics, and a systematic symbolic knowledge layer."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
