import React, { useState } from 'react';
import { Send, Sparkles, History, Bot, User, Trash2, RefreshCcw, Command, MessageSquare, Terminal, Zap, Shield, Search, Cpu, Activity, Layout, Leaf } from 'lucide-react';

const QAAssistantView = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Greeting, Operator. I have analyzed the current SIT Alpha cluster ecosystem. I have detected 3 potential regression paths in the Core Infrastructure v2.8 deployment. Would you like me to generate a mitigation scenario to restore harmony?' }
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="h-full flex text-[#F8FAFC] animate-premium-in relative overflow-hidden bg-transparent">
      {/* Editorial Assistant Sidebar */}
      <div className="w-[380px] border-r border-white/5 flex flex-col glass-elite relative z-10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#020617] rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl">
                 <Terminal size={22} className="text-[#3B82F6]" />
              </div>
              <div className="flex flex-col">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white leading-none mb-1">Cognitive Log</h3>
                 <span className="text-[9px] font-bold text-[#475569] uppercase tracking-widest">SIT.ALPH.7 // RECOVERY</span>
              </div>
           </div>
           <button className="p-3 hover:bg-white/5 rounded-xl transition-all text-[#475569] hover:text-white border border-transparent hover:border-white/10 active:scale-90">
              <History size={18} />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar bg-[#020617]/20">
           {[1,2,3].map(i => (
             <div key={i} className="group bg-[#0B0E14]/40 border border-white/5 p-6 rounded-[2rem] hover:bg-[#0B0E14]/80 hover:border-[#3B82F6]/30 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-[#3B82F6]/5 relative overflow-hidden">
                <div className="absolute left-0 inset-y-0 w-1 bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                   <span className="text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">Audit Trace #{i*21}</span>
                </div>
                <p className="text-[14px] font-black text-white leading-tight group-hover:text-[#3B82F6] transition-colors uppercase tracking-tighter italic">Analyzing Neural Cluster Protocol Alpha-0{i}...</p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                   <div className="flex items-center gap-2">
                       <Shield size={12} className="text-[#3B82F6]" />
                       <span className="text-[10px] text-[#475569] font-bold uppercase tracking-widest">GATE HARMONIZED</span>
                   </div>
                   <Zap size={14} className="text-[#475569] group-hover:text-[#3B82F6] transition-transform group-hover:rotate-12" />
                </div>
             </div>
           ))}
        </div>

        <div className="p-10 border-t border-white/5">
           <button className="w-full py-5 bg-[#3B82F6] text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#020617] transition-all shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-4 group italic">
              <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-1000" /> Realign Neural Engine
           </button>
        </div>
      </div>

      {/* Main Intelligent Workspace Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-16 space-y-16 custom-scrollbar relative z-10">
           {messages.map((m, i) => (
             <div key={i} className={`flex gap-10 animate-premium-in ${m.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                <div className={`w-16 h-16 rounded-[1.5rem] shrink-0 flex items-center justify-center border-4 relative overflow-hidden transition-all duration-700 ${m.role === 'assistant' ? 'bg-[#020617] border-white/5 shadow-2xl' : 'bg-white border-white/5 shadow-xl'}`}>
                   {m.role === 'assistant' ? <Sparkles size={28} className="text-[#3B82F6] relative z-10" /> : <User size={28} className="text-[#020617] relative z-10" />}
                   {m.role === 'assistant' && <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#3B82F6]/10" />}
                </div>
                <div className={`flex flex-col gap-4 max-w-3xl ${m.role === 'assistant' ? '' : 'items-end'}`}>
                   <div className={`px-10 py-7 rounded-[2.5rem] text-[16px] leading-relaxed shadow-lg backdrop-blur-3xl border transition-all duration-700 ${m.role === 'assistant' ? 'bg-[#0B0E14]/60 border-white/5 text-white font-medium' : 'bg-[#3B82F6] border-[#3B82F6]/20 text-white font-black shadow-blue-500/20'}`}>
                      {m.content}
                   </div>
                   <div className="flex items-center gap-4 px-6">
                      {m.role === 'assistant' && <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.6)]" />}
                      <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.4em] italic">
                         {m.role === 'assistant' ? 'LumiOnyx Neural Entity' : 'System Navigator Alpha'}
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Neural Input Protocol */}
        <div className="p-16 pt-0 relative z-10">
           <div className="max-w-4xl mx-auto glass-elite border-white/5 p-5 flex items-center gap-6 shadow-2xl shadow-black/40 group focus-within:ring-[20px] focus-within:ring-[#3B82F6]/5 focus-within:border-[#3B82F6]/30 transition-all rounded-[3rem]" style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
              <div className="w-16 h-16 rounded-[1.5rem] bg-[#020617] flex items-center justify-center text-[#3B82F6] group-focus-within:rotate-[15deg] transition-all duration-700 shadow-xl border border-white/5">
                 <Cpu size={28} />
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Initialize Cognitive Dialogue..."
                className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-[#475569] font-black uppercase tracking-tight italic"
              />
              <button 
                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 ${input ? 'bg-[#3B82F6] text-white shadow-2xl shadow-blue-500/40 scale-105 active:scale-90' : 'bg-[#0F172A] text-[#334155]'}`}
              >
                 <Send size={24} strokeWidth={3} className={input ? 'translate-x-1 -translate-y-1' : ''} />
              </button>
           </div>
           
           <div className="mt-8 flex items-center justify-center gap-10">
              <div className="flex items-center gap-3">
                 <Activity size={12} className="text-[#3B82F6]" />
                 <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest italic leading-none">Ecosystem: Core v2.4</span>
              </div>
              <div className="flex items-center gap-3">
                 <Zap size={12} className="text-[#3B82F6]" />
                 <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest italic leading-none">Mode: Neural Synthesis</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QAAssistantView;
