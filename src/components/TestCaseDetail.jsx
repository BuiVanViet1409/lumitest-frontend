import React from 'react';
import { X, Play, Save, Trash2, Copy, Clock, User, Shield, Info, CheckCircle2, ChevronRight, FileCode, Tag, Activity, Command, Zap, Layers, Cpu, Leaf, Terminal, Share2 } from 'lucide-react';

const TestCaseDetail = ({ 
  testCase, 
  onClose, 
  onSave, 
  onDelete, 
  onRun, 
  onDuplicate 
}) => {
  if (!testCase) return null;

  return (
    <div className="h-full w-full glass-elite border-l border-white/10 flex flex-col relative overflow-hidden animate-premium-in" style={{ backgroundColor: 'rgba(5, 8, 15, 0.9)', backdropFilter: 'blur(80px)' }}>
      {/* Decorative Obsidian Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#3B82F6]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-[#818CF8]/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Editorial Dark Header */}
      <div className="p-12 border-b border-white/5 relative z-10 flex items-center justify-between">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-[1.75rem] flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] group relative overflow-hidden transition-all duration-700 hover:rotate-12">
               <Cpu className="text-white relative z-10" size={32} strokeWidth={3} />
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-2">
               <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">{testCase.name}</h2>
               <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.4em] bg-[#3B82F6]/5 px-3 py-1.5 rounded-xl border border-[#3B82F6]/20 italic">Neural.CORE v{testCase.version || '1.0'}</span>
                  <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.4em]">ID: {testCase.id.slice(0, 10)}</span>
               </div>
            </div>
         </div>
         <button onClick={onClose} className="p-5 hover:bg-white/5 rounded-[1.5rem] transition-all text-[#475569] hover:text-white active:scale-90 border border-transparent hover:border-white/10">
            <X size={28} strokeWidth={3} />
         </button>
      </div>

      {/* Obsidian Meta Matrix Area */}
      <div className="flex-1 overflow-y-auto p-12 space-y-16 custom-scrollbar relative z-10">
         
         {/* Cluster Verification Metrics */}
         <div className="grid grid-cols-2 gap-8">
            <div className="bg-[#0B0E14]/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-1000">
                  <Activity size={64} className="text-[#3B82F6]" />
               </div>
               <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Gate Protocol</span>
               <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${testCase.lastStatus === 'PASS' ? 'bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-[#1E293B]'}`} />
                  <span className="text-2xl font-black text-white uppercase tracking-tight italic">{testCase.lastStatus || 'UNRESOLVED'}</span>
               </div>
            </div>
            <div className="bg-[#0B0E14]/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-1000">
                  <Zap size={64} className="text-[#818CF8]" />
               </div>
               <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Neural Cluster</span>
               <div className="flex items-center gap-4 text-[#3B82F6]">
                  <Share2 size={20} strokeWidth={3} className="text-[#3B82F6]" />
                  <span className="text-2xl font-black uppercase tracking-tight italic">SYNT.ALPHA</span>
               </div>
            </div>
         </div>

         {/* Logic Execution Matrix */}
         <div className="space-y-8">
            <div className="flex items-center justify-between px-3">
               <h3 className="text-[11px] font-black text-[#475569] uppercase tracking-[0.6em] flex items-center gap-4 italic">
                  <Command size={16} strokeWidth={3} /> Execution Logic Matrix
               </h3>
               <span className="text-[10px] font-black text-[#3B82F6] bg-[#3B82F6]/5 px-4 py-1.5 rounded-full border border-[#3B82F6]/20 uppercase tracking-[0.3em] italic animate-pulse">Neural Certified</span>
            </div>
            <div className="space-y-4">
               {(testCase.steps || [1,2,3]).map((step, idx) => (
                 <div key={idx} className="group flex items-center gap-8 p-8 bg-[#0F172A]/30 border border-white/5 rounded-[2.5rem] hover:bg-[#0F172A]/60 hover:border-[#3B82F6]/20 hover:translate-x-4 transition-all duration-700 cursor-pointer shadow-2xl relative overflow-hidden">
                    <div className="absolute left-0 inset-y-0 w-1 bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_rgba(59,130,246,1)]" />
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#020617] border border-white/5 flex items-center justify-center text-[14px] font-black text-[#334155] group-hover:bg-[#F8FAFC] group-hover:text-[#020617] group-hover:border-white transition-all duration-700 italic border-l-4 border-l-[#3B82F6]/30">
                       {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                       <p className="text-xl font-black text-white tracking-tight uppercase group-hover:text-[#3B82F6] transition-colors leading-none mb-3 italic">{typeof step === 'string' ? step : 'Neural Matrix Synchronization'}</p>
                       <p className="text-[10px] text-[#475569] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                          <Terminal size={12} strokeWidth={3} /> SYSTEM_OP: <span className="text-[#3B82F6]/60 font-mono italic">X-ONYX-0{idx}</span>
                       </p>
                    </div>
                    <ChevronRight size={24} strokeWidth={4} className="text-[#1E293B] group-hover:text-[#3B82F6] transition-all group-hover:translate-x-2" />
                 </div>
               ))}
            </div>
         </div>

         {/* Matrix Signature */}
         <div className="pt-12 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-10">
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Logic Architect</span>
                  <div className="flex items-center gap-4 text-[12px] font-black text-white uppercase italic">
                     <div className="w-10 h-10 rounded-[1rem] overflow-hidden border border-[#3B82F6]/30 p-0.5 bg-[#0F172A] shadow-lg shadow-blue-500/5"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Onyx" alt="A" className="w-full h-full rounded-[0.8rem]" /></div>
                     Onyx System Guide
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Last Pulse</span>
                  <span className="text-[12px] font-black text-white uppercase italic">Active @ 12:42:04</span>
               </div>
            </div>
            <button className="flex items-center gap-3 text-[11px] font-black text-[#3B82F6] hover:text-[#F8FAFC] transition-colors uppercase tracking-[0.3em] border-b border-transparent hover:border-[#3B82F6] pb-1 italic">
               Inspect Growth Trails <ChevronRight size={16} strokeWidth={4} />
            </button>
         </div>
      </div>

      {/* Obsidian High-End Action Panel */}
      <div className="p-12 border-t border-white/5 bg-[#020617]/60 backdrop-blur-3xl relative z-10 flex items-center gap-6">
         <button 
           onClick={() => onRun(testCase)}
           className="flex-1 flex items-center justify-center gap-6 bg-[#3B82F6] text-white px-10 py-6 rounded-[2.5rem] text-sm font-black shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:bg-[#F8FAFC] hover:text-[#020617] hover:translate-y-[-6px] active:scale-95 transition-all uppercase tracking-[0.2em] group italic"
         >
            <Play size={24} fill="currentColor" strokeWidth={3} className="group-hover:scale-125 transition-transform" /> 
            Execute Sequence
         </button>
         <div className="flex items-center gap-4">
            <button 
              onClick={() => onDuplicate(testCase)}
              className="p-6 bg-[#0B0E14] border border-white/5 rounded-[2.5rem] text-[#64748B] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all shadow-xl active:scale-90"
              title="Duplicate Matrix"
            >
               <Copy size={26} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => onDelete(testCase.id)}
              className="p-6 bg-[#0B0E14] border border-white/5 rounded-[2.5rem] text-[#475569] hover:bg-rose-600 hover:text-white hover:border-transparent hover:shadow-[0_0_40px_rgba(225,29,72,0.4)] transition-all active:scale-90"
              title="Decommission Logic"
            >
               <Trash2 size={26} strokeWidth={2.5} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default TestCaseDetail;
