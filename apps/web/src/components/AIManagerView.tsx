import React, { useState } from 'react';
import { Bot, Sparkles, Send, ShieldCheck, FileText, CheckCircle2, ArrowRight, Layers, HelpCircle, Code } from 'lucide-react';
import { ApiService } from '../services/api';

export const AIManagerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CHAT' | 'GENERATE' | 'ANALYZE'>('CHAT');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; trace?: any }>>([
    {
      sender: 'AI',
      text: 'Hello! I am your Mindweave AI Project Assistant. I operate over authorized project context using hybrid symbolic rule reasoning + RAG vector retrieval. Ask me anything about dependencies, architectural decisions, requirement coverage, or risk analysis.',
      trace: {
        intent: 'WELCOME',
        symbolicEntitiesFound: ['REQ-01', 'REQ-02', 'REQ-03', 'REQ-04'],
        evidenceSources: ['DOC-11 Architecture Specification', 'Prisma Schema'],
        rulesApplied: ['Symbolic Knowledge Graph Verifier']
      }
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Task Generation State
  const [requirementInput, setRequirementInput] = useState('');
  const [generatedTasksResult, setGeneratedTasksResult] = useState<any>(null);

  const handleSendQuery = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { sender: 'USER', text: q }]);
    if (!customQuery) setQuery('');
    setLoading(true);

    const res = await ApiService.queryAI(q);
    setLoading(false);

    setMessages(prev => [
      ...prev,
      {
        sender: 'AI',
        text: res.answer,
        trace: {
          intent: res.intent,
          symbolicEntitiesFound: res.symbolicEntitiesFound,
          evidenceSources: res.evidenceSources,
          rulesApplied: res.rulesApplied
        }
      }
    ]);
  };

  const handleGenerateTasks = async () => {
    if (!requirementInput.trim()) return;
    setLoading(true);
    const res = await ApiService.generateTasks(requirementInput);
    setLoading(false);
    setGeneratedTasksResult(res);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span>AI Project Manager & RAG Engine</span>
          </h1>
          <p className="text-xs text-slate-400">
            Hybrid symbolic + vector retrieval with verifiable evidence traces and task generation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 bg-dark-card border border-dark-border p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('CHAT')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'CHAT' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hybrid AI Chat
          </button>
          <button
            onClick={() => setActiveTab('GENERATE')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'GENERATE' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Task Generation
          </button>
        </div>
      </div>

      {activeTab === 'CHAT' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Chat Feed */}
          <div className="lg:col-span-2 bg-[#090d16] rounded-2xl border border-dark-border flex flex-col h-[600px]">
            {/* Quick Prompt Suggestions */}
            <div className="p-3 border-b border-dark-border flex items-center space-x-2 overflow-x-auto text-[11px]">
              <span className="text-slate-500 font-semibold uppercase text-[10px]">Quick Prompts:</span>
              <button 
                onClick={() => handleSendQuery("What is blocking this project right now?")}
                className="px-2.5 py-1 rounded-lg bg-dark-card border border-dark-border text-indigo-300 hover:border-indigo-500/50 whitespace-nowrap"
              >
                What is blocking this project?
              </button>
              <button 
                onClick={() => handleSendQuery("Which requirements are uncovered?")}
                className="px-2.5 py-1 rounded-lg bg-dark-card border border-dark-border text-indigo-300 hover:border-indigo-500/50 whitespace-nowrap"
              >
                Which requirements are uncovered?
              </button>
              <button 
                onClick={() => handleSendQuery("Summarize current architecture status.")}
                className="px-2.5 py-1 rounded-lg bg-dark-card border border-dark-border text-indigo-300 hover:border-indigo-500/50 whitespace-nowrap"
              >
                Summarize architecture status
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                    m.sender === 'USER' 
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                      : 'bg-dark-card border border-dark-border text-slate-200 rounded-bl-none shadow-md'
                  }`}>
                    <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-semibold">{m.sender === 'USER' ? 'You' : 'Mindweave AI Engine'}</span>
                    </div>

                    <p className="leading-relaxed">{m.text}</p>

                    {/* Transparent Reasoning Trace Box */}
                    {m.trace && m.sender === 'AI' && (
                      <div className="mt-3 p-3 rounded-xl bg-[#070a12] border border-dark-border text-[11px] space-y-2">
                        <div className="flex items-center justify-between text-indigo-400 font-mono font-semibold">
                          <span>Reasoning Trace & Evidence</span>
                          <span className="text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded">{m.trace.intent}</span>
                        </div>
                        <div className="text-slate-400">
                          <span className="font-semibold text-slate-300">Entities Identified: </span>
                          {m.trace.symbolicEntitiesFound?.join(', ')}
                        </div>
                        <div className="text-slate-400">
                          <span className="font-semibold text-slate-300">Evidence Sources: </span>
                          {m.trace.evidenceSources?.join(' • ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-dark-card border border-dark-border p-3 rounded-xl text-xs text-indigo-400 animate-pulse flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluating symbolic rules and semantic vectors...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-dark-border flex items-center space-x-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                placeholder="Ask AI about project health, tasks, symbolic facts, PRs..."
                className="flex-1 bg-[#070a12] border border-dark-border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button 
                onClick={() => handleSendQuery()}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Col: Context & Rule Guard Panel */}
          <div className="bg-dark-card rounded-2xl border border-dark-border p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Context & Security Boundary</span>
            </h2>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <p>
                The AI Project Manager accesses only project-scoped entities, documents, and code artifacts.
              </p>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border space-y-1">
                <div className="font-semibold text-slate-200">RAG Vector Chunks</div>
                <div>Document text indexed with pgvector cosine similarity.</div>
              </div>
              <div className="p-3 rounded-lg bg-dark-bg border border-dark-border space-y-1">
                <div className="font-semibold text-slate-200">Symbolic Fact Engine</div>
                <div>Strict explicit graph constraints override probabilistic LLM hallucinations.</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* AI Task Generation View */
        <div className="bg-dark-card rounded-2xl border border-dark-border p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">Automated AI Task Generation</h2>
            <p className="text-xs text-slate-400">Convert requirement specifications into structured epics, tasks, subtasks, and symbolic links.</p>
          </div>

          <div className="space-y-3">
            <textarea 
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              placeholder="Paste raw requirement description (e.g. 'Users must be able to export knowledge graph as high-res PNG and PDF report with custom node filters')..."
              className="w-full bg-[#070a12] border border-dark-border rounded-xl p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 h-32"
            />
            <button 
              onClick={handleGenerateTasks}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-md transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Work Tasks & Subtasks</span>
            </button>
          </div>

          {generatedTasksResult && (
            <div className="p-5 rounded-xl bg-dark-bg border border-dark-border space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-dark-border pb-2">
                <span className="font-bold text-indigo-400 text-sm">{generatedTasksResult.epic}</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">REVIEW MODE</span>
              </div>

              <div className="space-y-3">
                {generatedTasksResult.generatedTasks.map((t: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-card border border-dark-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{t.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400">{t.priority}</span>
                    </div>
                    <p className="text-slate-400">{t.description}</p>
                    <div className="text-[11px] text-slate-300 font-mono">
                      Subtasks: {t.subtasks.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
