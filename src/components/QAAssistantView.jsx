import React, { useState } from 'react';
import { Send, Sparkles, History, Bot, User, Trash2, RefreshCcw, Command, MessageSquare, Terminal, Zap, Shield, Search, Cpu, Activity, Layout, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const QAAssistantView = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('qaAssistant.welcome') || 'Greeting, Operator. I have analyzed the current cluster ecosystem. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="h-full flex text-slate-900 animate-premium-in relative overflow-hidden bg-white">
      {/* Studio Assistant Sidebar */}
      <div className="w-[320px] border-r border-slate-100 flex flex-col relative z-10 bg-slate-50/80 backdrop-blur-xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                 <Terminal size={18} className="text-indigo-600" />
              </div>
              <div className="flex flex-col">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 leading-none mb-1">Audit Log</h3>
                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol Recovery</span>
              </div>
           </div>
           <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 active:scale-90">
              <History size={16} />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/40">
           {[1,2,3].map(i => (
             <div key={i} className="group bg-white border border-slate-200 p-4 rounded-xl hover:bg-slate-50 hover:border-indigo-200 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden">
                <div className="absolute left-0 inset-y-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shadow-sm" />
                   <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">Trace #{i*21}</span>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">Analyzing Protocol Alpha-0{i}...</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                   <div className="flex items-center gap-2">
                       <Shield size={10} className="text-indigo-600" />
                       <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">GATE SECURE</span>
                   </div>
                   <Zap size={12} className="text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:rotate-12" />
                </div>
             </div>
           ))}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white/50">
           <button className="w-full py-4 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 group">
              <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Realign Engine
           </button>
        </div>
      </div>

      {/* Main Intelligent Workspace Area */}
      <div className="flex-1 flex flex-col relative bg-white">
        <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar relative z-10">
           {messages.map((m, i) => (
             <div key={i} className={`flex gap-6 animate-premium-in ${m.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border-2 relative overflow-hidden transition-all duration-500 ${m.role === 'assistant' ? 'bg-indigo-600 border-indigo-500 shadow-xl' : 'bg-slate-900 border-slate-800 shadow-lg'}`}>
                   {m.role === 'assistant' ? <Sparkles size={22} className="text-white relative z-10" /> : <User size={22} className="text-white relative z-10" />}
                </div>
                <div className={`flex flex-col gap-3 max-w-2xl ${m.role === 'assistant' ? '' : 'items-end'}`}>
                   <div className={`px-8 py-5 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-2xl border transition-all duration-500 ${m.role === 'assistant' ? 'bg-slate-50 border-slate-200 text-slate-700 font-medium' : 'bg-indigo-600 border-indigo-500 text-white font-bold'}`}>
                      {m.content}
                   </div>
                   <div className="flex items-center gap-3 px-4">
                      {m.role === 'assistant' && <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm" />}
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                         {m.role === 'assistant' ? 'LumiAI Assistant' : 'Authorized User'}
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Neural Input Protocol */}
        <div className="p-12 pt-0 relative z-10">
           <div className="max-w-3xl mx-auto bg-white border border-slate-200 p-4 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)] group focus-within:ring-8 focus-within:ring-indigo-500/5 focus-within:border-indigo-500/30 transition-all rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 group-focus-within:rotate-6 transition-all duration-500 shadow-sm border border-slate-100">
                 <Cpu size={22} />
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('qaAssistant.placeholder')}
                className="flex-1 bg-transparent border-none outline-none text-md text-slate-900 placeholder-slate-300 font-bold uppercase tracking-tight"
              />
              <button 
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${input ? 'bg-indigo-600 text-white shadow-lg scale-105 active:scale-95' : 'bg-slate-200 text-slate-400'}`}
              >
                 <Send size={18} strokeWidth={2.5} className={input ? 'translate-x-0.5 -translate-y-0.5' : ''} />
              </button>
           </div>
           
           <div className="mt-6 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                 <Activity size={10} className="text-emerald-500" />
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status: Normalized</span>
              </div>
              <div className="flex items-center gap-2">
                 <Zap size={10} className="text-indigo-600" />
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Synthesis: Active</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QAAssistantView;
