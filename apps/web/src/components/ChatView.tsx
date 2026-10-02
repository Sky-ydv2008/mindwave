import React, { useState } from 'react';
import { MessageSquare, Send, Hash, CheckCircle2, User, Sparkles } from 'lucide-react';

export const ChatView: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('chan-general');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Sky Yadav',
      role: 'SUPER_ADMIN',
      text: 'Team, we have completed the initial monorepo architecture and schema setup.',
      timestamp: '10:14 AM'
    },
    {
      id: 'm2',
      sender: 'Apexx AI Assistant',
      role: 'SYSTEM_BOT',
      text: 'Symbolic Knowledge Graph sync: 4 requirements linked to 16 tasks with passing unit checks.',
      timestamp: '10:15 AM'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'Sky Yadav',
        role: 'SUPER_ADMIN',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputMessage('');
  };

  const handlePromoteToFact = (msgText: string) => {
    alert(`Chat Decision Promoted to Persistent Symbolic Fact:\n"${msgText}"`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <span>Real-Time Team Collaboration Chat</span>
        </h1>
        <p className="text-xs text-slate-400">
          Collaborate in real-time, discuss tasks, and turn key team decisions into symbolic project knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[#090d16] rounded-2xl border border-dark-border overflow-hidden h-[600px]">
        {/* Channel List */}
        <div className="border-r border-dark-border p-4 bg-[#0d1322] space-y-3">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Channels
          </div>
          <div className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveChannel('chan-general')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                activeChannel === 'chan-general' ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>general</span>
            </button>
            <button
              onClick={() => setActiveChannel('chan-dev')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                activeChannel === 'chan-dev' ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>dev-discussion</span>
            </button>
            <button
              onClick={() => setActiveChannel('chan-symbolic')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                activeChannel === 'chan-symbolic' ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>symbolic-knowledge</span>
            </button>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="lg:col-span-3 flex flex-col justify-between p-4 bg-dark-card">
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
            {messages.map((m) => (
              <div key={m.id} className="p-3.5 rounded-xl bg-dark-bg border border-dark-border space-y-2 group">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-bold text-white">{m.sender}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                      {m.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{m.text}</p>

                <div className="pt-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition">
                  <button 
                    onClick={() => handlePromoteToFact(m.text)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 bg-indigo-500/10 px-2 py-0.5 rounded"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Convert Decision to Fact</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-dark-border flex items-center space-x-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message #general..."
              className="flex-1 bg-[#070a12] border border-dark-border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button 
              type="submit"
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
