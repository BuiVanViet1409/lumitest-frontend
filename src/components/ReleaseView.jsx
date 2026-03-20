import React, { useState } from 'react';
import { Package, Plus, Filter, TrendingUp, TrendingDown, ChevronRight, Activity, ShieldCheck, Zap, Search, Bell, Settings, MoreVertical, Calendar, Command, Cpu, Globe2, Shield, Leaf } from 'lucide-react';

const ProgressBar = ({ label, value, colorClass }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
      <span className="text-[#64748B]">{label}</span>
      <span className="text-white italic">{value}%</span>
    </div>
    <div className="h-3 w-full bg-[#05080F] rounded-full overflow-hidden border border-white/5 relative group shadow-2xl">
       <div 
         className={`h-full rounded-full transition-all duration-1000 ease-out relative z-10 ${colorClass}`} 
         style={{ width: `${value}%` }}
       />
       <div className="absolute inset-x-0 bottom-0 h-full bg-[#3B82F6]/5 group-hover:bg-[#3B82F6]/10 transition-all" />
    </div>
  </div>
);

const ReleaseView = () => {
  const [releases] = useState([
    { id: 1, name: 'Core Infrastructure v2.8', manager: 'Quang Nguyen', status: 'In Progress', target: 'Apr 05', auto: 78, system: 85, risk: 12, trend: 5 },
    { id: 2, name: 'SIT Integration Sync', manager: 'Alex Chen', status: 'Critical', target: 'Mar 25', auto: 45, system: 92, risk: 64, trend: -2 },
    { id: 3, name: 'Legacy Migration Hub', manager: 'Sarah J.', status: 'Stabilizing', target: 'Mar 30', auto: 92, system: 71, risk: 35, trend: 8 },
  ]);

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden animate-premium-in">
      {/* Editorial Table Layout */}
      <div className="p-16 flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex items-end justify-between border-b border-white/5 pb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse" />
                 <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.5em] italic">Orchestration Matrix</span>
              </div>
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-2 italic">Release <br/> Matrix</h1>
              <p className="text-[16px] text-[#64748B] font-bold max-w-lg leading-relaxed uppercase tracking-wider opacity-80">
                 Coordinate deployment gates and synchronize ecosystem integrity across the distributed neural clusters.
              </p>
            </div>
            <button className="flex items-center gap-4 bg-[#3B82F6] text-white px-10 py-5 rounded-[2.5rem] text-sm font-black shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:bg-[#F8FAFC] hover:text-[#020617] hover:translate-y-[-6px] active:scale-95 transition-all uppercase tracking-[0.2em] group italic">
               <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-700" /> New Cycle
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {releases.map((release, idx) => (
              <div 
                key={release.id} 
                className="card-premium p-10 grid grid-cols-12 gap-12 items-center cursor-pointer group relative overflow-hidden animate-premium-in shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5"
                style={{ animationDelay: `${idx * 0.1}s`, backgroundColor: 'rgba(15, 23, 42, 0.3)' }}
              >
                <div className="absolute left-0 inset-y-0 w-1.5 bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                
                <div className="col-span-4 space-y-6">
                   <div className="space-y-4">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-[#020617] border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-[#3B82F6] group-hover:text-white group-hover:rotate-6 transition-all duration-700">
                            <Package size={28} className="group-hover:scale-110 transition-transform" />
                         </div>
                         <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-black text-white group-hover:text-[#3B82F6] transition-colors uppercase tracking-tighter leading-none italic">{release.name}</h2>
                            <div className={`inline-flex self-start px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all italic ${
                               release.status === 'Critical' 
                               ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' 
                               : 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'
                            }`}>
                               {release.status}
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-10 pl-2">
                         <div className="flex items-center gap-3 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] italic">
                            <Calendar size={16} className="text-[#334155]" /> {release.target}
                         </div>
                         <div className="flex items-center gap-3 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] italic">
                            <Activity size={16} className="text-[#334155]" /> NODE: {release.manager.split(' ')[0]}
                         </div>
                      </div>
                   </div>
                </div>
 
                <div className="col-span-4 space-y-10 border-x border-white/5 px-12">
                   <ProgressBar label="Matrix Integrity" value={release.auto} colorClass="bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
                   <ProgressBar label="Neural Harmony" value={release.system} colorClass="bg-[#818CF8] shadow-[0_0_20px_rgba(129,140,248,0.4)]" />
                </div>
 
                <div className="col-span-2 pl-8">
                   <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Risk Matrix</span>
                      <div className="flex items-baseline gap-4">
                         <span className={`text-5xl font-black tracking-tighter italic ${release.risk > 50 ? 'text-rose-500' : 'text-white'}`}>{release.risk}%</span>
                         <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-[0.2em] italic ${release.risk > 50 ? 'text-rose-500 border-rose-500/30 bg-rose-500/5' : 'text-[#3B82F6] border-[#3B82F6]/30 bg-[#3B82F6]/5'}`}>{release.risk > 50 ? 'Critical' : 'Stable'}</span>
                      </div>
                   </div>
                </div>
 
                <div className="col-span-2 text-right pr-6">
                   <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Flux Velocity</span>
                   <div className="flex items-center gap-4 justify-end mt-3">
                      <div className="flex flex-col items-end">
                         <span className="text-5xl font-black text-white group-hover:text-[#3B82F6] transition-colors leading-none tracking-tighter italic">{release.trend + 30}</span>
                         <span className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.3em] mt-2 italic">GigaNodes</span>
                      </div>
                      <div className={`p-3 rounded-2xl border group-hover:rotate-[15deg] transition-all duration-700 ${release.trend > 0 ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30' : 'bg-rose-500/10 text-rose-500 border-rose-500/30'}`}>
                         {release.trend > 0 ? <TrendingUp size={28} strokeWidth={3} /> : <TrendingDown size={28} strokeWidth={3} />}
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Release Grid System Footer */}
          <div className="pt-16 border-t border-white/5 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-14">
                <div className="flex items-center gap-4">
                   <div className="w-4 h-4 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                   <span className="text-[13px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Matrix: HARMONIZED // SYNC: 100%</span>
                </div>
                <div className="flex items-center gap-12 text-[11px] font-black text-[#64748B] uppercase tracking-[0.4em] italic">
                   <Globe2 size={16} className="text-[#3B82F6]/60" /> Region: GLOBAL.ONYX.GRID
                </div>
                <div className="flex items-center gap-12 text-[11px] font-black text-[#64748B] uppercase tracking-[0.4em] italic">
                   <Shield size={16} className="text-[#3B82F6]/60" /> Security: PROTOCOL.ONYX.ALPHA
                </div>
             </div>
             <div className="flex items-center gap-4 group cursor-pointer hover:translate-x-3 transition-all duration-700">
                <span className="text-[12px] font-black text-[#3B82F6] uppercase tracking-[0.5em] italic">Access Neural Archives</span>
                <ChevronRight size={22} strokeWidth={4} className="text-[#3B82F6] group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseView;
