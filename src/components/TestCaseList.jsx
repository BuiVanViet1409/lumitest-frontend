import React from 'react';
import { Play, ChevronRight, Wrench, Clock, Plus, Search, Filter, MoreHorizontal, CheckCircle2, Zap, Shield, Database, Activity, Command, Cpu } from 'lucide-react';

const TestCaseList = ({ 
  testCases, 
  onSelectTestCase, 
  onRunTest 
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-16 py-16 custom-scrollbar animate-premium-in relative">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Obsidian Editorial Header */}
        <div className="flex items-end justify-between border-b border-white/5 pb-16 relative group">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-3 h-3 rounded-full bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse" />
               <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.5em] italic">Neural Repository Matrix</span>
            </div>
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-2 italic">Scenario <br/> Intelligence</h1>
            <p className="text-[16px] text-[#64748B] font-bold max-w-lg leading-relaxed uppercase tracking-wider opacity-80">
              Curate and deploy high-fidelity automated SIT scenarios across the distributed obsidian neural grid.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="relative group/search">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within/search:text-[#3B82F6] transition-all duration-700" />
                <input 
                  type="text" 
                  placeholder="Query scenario cluster..." 
                  className="bg-[#05080F]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] py-5 px-14 text-[14px] text-white placeholder-[#475569] outline-none focus:ring-[15px] focus:ring-[#3B82F6]/5 focus:border-[#3B82F6]/30 focus:bg-[#05080F] transition-all w-96 shadow-2xl font-black uppercase tracking-widest italic"
                />
             </div>
             <button className="flex items-center gap-4 bg-[#3B82F6] text-white px-10 py-5 rounded-[2.5rem] text-sm font-black shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:bg-[#F8FAFC] hover:text-[#020617] hover:translate-y-[-6px] active:scale-95 transition-all uppercase tracking-[0.2em] group italic">
                <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-700" /> 
                Init Logic
             </button>
          </div>
        </div>

        {/* List Section - Obsidian Depth Treatment */}
        <div className="space-y-6">
           {testCases.map((tc, idx) => (
             <div 
               key={tc.id} 
               onClick={() => onSelectTestCase(tc)}
               className="card-premium p-10 cursor-pointer group hover:bg-[#0B0E14]/60 relative overflow-hidden flex items-center gap-12 animate-premium-in shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5"
               style={{ animationDelay: `${idx * 0.1}s`, backgroundColor: 'rgba(15, 23, 42, 0.3)' }}
             >
                {/* Electric Hover Glow */}
                <div className="absolute left-0 inset-y-0 w-1.5 bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                
                {/* Node Identity */}
                <div className="w-16 flex flex-col items-center flex-shrink-0">
                   <span className="text-[10px] font-black text-[#475569] group-hover:text-[#3B82F6] transition-colors uppercase tracking-[0.4em] mb-2">Node</span>
                   <span className="text-3xl font-black text-[#1E293B] group-hover:text-white transition-all italic">{(idx + 1).toString().padStart(2, '0')}</span>
                </div>

                {/* Primary Intelligence Content */}
                <div className="flex-1 flex items-center gap-12">
                   <div className="w-20 h-20 rounded-[2rem] bg-[#020617] border border-white/5 flex items-center justify-center text-[#334155] group-hover:bg-[#3B82F6] group-hover:text-white group-hover:rotate-[20deg] transition-all duration-700 shadow-2xl relative overflow-hidden">
                      <Zap size={32} strokeWidth={2.5} className="relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                         <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic group-hover:text-[#3B82F6] transition-colors">{tc.name}</h3>
                         <span className="text-[11px] font-black text-[#3B82F6] px-4 py-1.5 border border-[#3B82F6]/20 rounded-full bg-[#3B82F6]/5 uppercase tracking-[0.3em] italic">Neural.CORE v{tc.version || '1.0'}</span>
                      </div>
                      <div className="flex items-center gap-10">
                         <span className="flex items-center gap-3 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] italic">
                            <Activity size={16} className="text-[#334155]" /> SIT.CLUSTER.ONYX
                         </span>
                         <span className="flex items-center gap-3 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] italic">
                            <Shield size={16} className="text-[#334155]" /> CRYPTO.SECURED
                         </span>
                      </div>
                   </div>
                </div>

                {/* Status & Matrix Telemetry */}
                <div className="flex items-center gap-16 flex-shrink-0">
                   <div className="flex flex-col items-end gap-2 min-w-[150px]">
                      <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em]">Gate Verification</span>
                      <div className={`px-6 py-2.5 rounded-[1.25rem] text-[12px] font-black uppercase tracking-[0.3em] border transition-all italic shadow-2xl ${
                        tc.lastStatus === 'PASS' 
                        ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30 shadow-blue-500/10' 
                        : 'bg-[#0F172A] text-[#64748B] border-white/5'
                      }`}>
                         {tc.lastStatus || 'UNRESOLVED'}
                      </div>
                   </div>

                   <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em]">Telemetry</span>
                      <div className="flex items-center gap-4">
                         <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-[#0F172A] overflow-hidden shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 p-0.5">
                                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Onyx${i}`} alt="user" className="w-full h-full rounded-full" />
                              </div>
                            ))}
                         </div>
                         <div className="w-10 h-10 rounded-[1.25rem] border-2 border-dashed border-white/5 flex items-center justify-center text-[#334155] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-all shadow-xl">
                            <Plus size={16} strokeWidth={3} />
                         </div>
                      </div>
                   </div>

                   <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-[#1E293B] group-hover:bg-[#F8FAFC] group-hover:text-[#020617] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-700 group-hover:translate-x-3">
                      <ChevronRight size={36} strokeWidth={4} />
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Global Grid Matrix Footer */}
        <div className="pt-20 border-t border-white/5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-14">
              <div className="flex items-center gap-4">
                 <div className="w-4 h-4 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                 <span className="text-[13px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Grid: OPERATIONAL // SYNC: 0.04ms</span>
              </div>
              <div className="flex items-center gap-12">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] mb-1">Threads</span>
                    <span className="text-lg font-black text-white uppercase tracking-tight italic">4,192 NODES</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] mb-1">Bandwidth</span>
                    <span className="text-lg font-black text-[#3B82F6] uppercase tracking-tight italic">1.2 PB/s</span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="px-8 py-4 border border-white/5 rounded-2xl text-[11px] font-black text-[#64748B] hover:text-white hover:border-[#3B82F6]/30 transition-all uppercase tracking-[0.3em] italic">Prev Cycle</button>
              <div className="flex items-center gap-3">
                 {[1, 2, 3].map(p => (
                   <button key={p} className={`w-12 h-12 rounded-2xl flex items-center justify-center text-[15px] font-black transition-all italic ${p === 1 ? 'bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'text-[#475569] hover:bg-white/5 hover:text-white'}`}>{p}</button>
                 ))}
              </div>
              <button className="px-10 py-4 bg-white text-[#020617] rounded-2xl text-[11px] font-black shadow-2xl hover:scale-105 transition-all uppercase tracking-[0.3em] italic">Next Cycle</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TestCaseList;
