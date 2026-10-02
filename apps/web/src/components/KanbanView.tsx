import React, { useState, useEffect } from 'react';
import { Plus, CheckSquare, Clock, AlertCircle, User, Tag, Sparkles, X } from 'lucide-react';
import { TaskItem } from '../types';
import { ApiService } from '../services/api';

export const KanbanView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('HIGH');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await ApiService.getTasks();
    setTasks(data);
  };

  const columns: { id: TaskItem['status']; title: string; color: string }[] = [
    { id: 'BACKLOG', title: 'Backlog', color: 'border-slate-700 text-slate-400' },
    { id: 'TODO', title: 'To Do', color: 'border-blue-500/50 text-blue-400' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'border-amber-500/50 text-amber-400' },
    { id: 'IN_REVIEW', title: 'In Review', color: 'border-purple-500/50 text-purple-400' },
    { id: 'BLOCKED', title: 'Blocked', color: 'border-rose-500/50 text-rose-400' },
    { id: 'COMPLETED', title: 'Completed', color: 'border-emerald-500/50 text-emerald-400' }
  ];

  const handleStatusChange = (taskId: string, newStatus: TaskItem['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      projectId: "proj-1",
      title: newTitle,
      description: newDesc || "Created from Mindweave Kanban workspace",
      status: "TODO",
      priority: newPriority,
      assigneeName: "Sky Yadav",
      deadline: "2026-10-12",
      labels: ["New Task"],
      dependencies: [],
      subtasks: []
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setShowCreateModal(false);
  };

  const getPriorityBadge = (priority: TaskItem['priority']) => {
    switch (priority) {
      case 'URGENT': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">URGENT</span>;
      case 'HIGH': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">HIGH</span>;
      case 'MEDIUM': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">MEDIUM</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">LOW</span>;
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-full">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Project Tasks & Kanban Board</span>
          </h1>
          <p className="text-xs text-slate-400">Manage sprint work items with real-time status and symbolic rule enforcement.</p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 transition shadow-lg shadow-indigo-900/30 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="bg-[#0e1424] rounded-xl border border-dark-border p-3 space-y-3 min-w-[240px]">
              {/* Column Header */}
              <div className={`flex items-center justify-between pb-2 border-b ${col.color}`}>
                <span className="text-xs font-bold uppercase tracking-wider">{col.title}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-dark-card border border-dark-border">
                  {colTasks.length}
                </span>
              </div>

              {/* Column Tasks */}
              <div className="space-y-3 min-h-[400px]">
                {colTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="p-3.5 rounded-xl bg-dark-card border border-dark-border hover:border-indigo-500/40 transition shadow-sm space-y-3 group"
                  >
                    <div className="flex items-start justify-between">
                      {getPriorityBadge(task.priority)}
                      <select 
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task.id, e.target.value as TaskItem['status'])}
                        className="bg-[#070a12] border border-dark-border rounded text-[10px] text-slate-300 py-0.5 px-1.5 focus:outline-none"
                      >
                        {columns.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300 transition leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-1">
                      {task.labels.map(l => (
                        <span key={l} className="text-[9px] px-1.5 py-0.5 rounded bg-dark-hover text-slate-300 font-mono">
                          #{l}
                        </span>
                      ))}
                    </div>

                    {/* Assignee & Subtasks */}
                    <div className="pt-2 border-t border-dark-border flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <User className="w-3 h-3 text-indigo-400" />
                        <span>{task.assigneeName}</span>
                      </div>
                      {task.subtasks.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <CheckSquare className="w-3 h-3 text-emerald-400" />
                          <span>{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Create New Task</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Task Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement Symbolic Rule Evaluator"
                  className="w-full bg-[#070a12] border border-dark-border rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide task specification details..."
                  className="w-full bg-[#070a12] border border-dark-border rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 h-24"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Priority</label>
                <select 
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT')}
                  className="w-full bg-[#070a12] border border-dark-border rounded-lg p-2 text-slate-100 focus:outline-none"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-dark-hover text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
