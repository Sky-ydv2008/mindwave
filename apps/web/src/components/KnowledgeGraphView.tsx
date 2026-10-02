import React, { useState, useEffect } from 'react';
import { GitGraph, Filter, Layers, Info, CheckCircle2, ArrowRight, ShieldCheck, Database, FileText } from 'lucide-react';
import { KnowledgeNode, KnowledgeEdge } from '../types';
import { ApiService } from '../services/api';

export const KnowledgeGraphView: React.FC = () => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    loadGraph();
  }, []);

  const loadGraph = async () => {
    const data = await ApiService.getKnowledgeGraph();
    setNodes(data.nodes);
    setEdges(data.edges);
    if (data.nodes.length > 0) {
      setSelectedNode(data.nodes[0]);
    }
  };

  const filteredNodes = selectedFilter === 'ALL' 
    ? nodes 
    : nodes.filter(n => n.type === selectedFilter);

  const getEntityTypeColor = (type: string) => {
    switch (type) {
      case 'REQUIREMENT': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'FEATURE': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40';
      case 'TASK': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'PULL_REQUEST': return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      case 'DOCUMENT': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      case 'PERSON': return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <GitGraph className="w-5 h-5 text-indigo-400" />
            <span>Symbolic Knowledge Graph Explorer</span>
          </h1>
          <p className="text-xs text-slate-400">
            Interactive representation of project entities, typed relationships, explicit facts, and evidence links.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-dark-card border border-dark-border p-1.5 rounded-xl text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
          {['ALL', 'REQUIREMENT', 'FEATURE', 'TASK', 'PULL_REQUEST', 'DOCUMENT', 'PERSON'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedFilter(type)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                selectedFilter === type 
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:bg-dark-hover hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Canvas & Inspector split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Graph Renderer Canvas */}
        <div className="lg:col-span-2 bg-[#090d16] rounded-2xl border border-dark-border p-6 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 z-10">
            <span className="flex items-center space-x-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Showing {filteredNodes.length} Active Nodes & {edges.length} Typed Relations</span>
            </span>
            <span className="text-[11px] text-slate-500">Click any node to inspect artifact details</span>
          </div>

          {/* Interactive Node Grid Canvas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-auto py-6 z-10">
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const connectedEdgeCount = edges.filter(e => e.source === node.id || e.target === node.id).length;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 space-y-2 ${
                    getEntityTypeColor(node.type)
                  } ${isSelected ? 'ring-2 ring-indigo-400 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/30">
                      {node.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {connectedEdgeCount} relations
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold leading-tight text-white">
                    {node.label}
                  </h3>

                  {node.externalId && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      ID: {node.externalId}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Canvas Decorative Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        {/* Right Col: Deep Node Inspector Panel */}
        <div className="bg-dark-card rounded-2xl border border-dark-border p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-dark-border pb-3">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Symbolic Artifact Inspector</span>
            </h2>
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded uppercase font-semibold">
                  {selectedNode.type}
                </span>
                <h3 className="text-base font-bold text-white pt-1">{selectedNode.label}</h3>
                {selectedNode.externalId && (
                  <p className="text-[11px] text-slate-400 font-mono">External Key: {selectedNode.externalId}</p>
                )}
              </div>

              {/* Connected Edges List */}
              <div className="space-y-2 pt-2 border-t border-dark-border">
                <div className="font-semibold text-slate-300">Outgoing & Incoming Symbolic Relations</div>
                {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(edge => {
                  const isSource = edge.source === selectedNode.id;
                  const otherNodeId = isSource ? edge.target : edge.source;
                  const otherNode = nodes.find(n => n.id === otherNodeId);
                  return (
                    <div key={edge.id} className="p-2.5 rounded-lg bg-dark-bg border border-dark-border space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-indigo-300">{edge.relation}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">Conf: {(edge.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-300 text-[11px]">
                        <span>{isSource ? '→' : '←'}</span>
                        <span className="font-medium text-slate-200">{otherNode?.label || otherNodeId}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Evidence Snippet Link */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Evidence Attached</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Source: DOC-11 Architecture Specification page 2. Confirmed by Sky Yadav.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a node on the left canvas to view its explicit symbolic facts and relations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
