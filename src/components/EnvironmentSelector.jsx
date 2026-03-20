import React, { useState, useRef, useEffect } from 'react';
import { Globe2, ChevronDown, Check, Zap, Server, ShieldCheck, Activity, Search } from 'lucide-react';

const environments = [
  { id: 'SIT', name: 'SIT Alpha', icon: ShieldCheck, desc: 'Central Cluster', color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/5', border: 'border-[#3B82F6]/20' },
  { id: 'DEV', name: 'DEV Feature', icon: Zap, desc: 'Sandboxed Node', color: 'text-[#818CF8]', bg: 'bg-[#818CF8]/5', border: 'border-[#818CF8]/20' },
  { id: 'UAT', name: 'UAT Gate', icon: Activity, desc: 'Stability Guard', color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
  { id: 'PROD', name: 'PROD Main', icon: Server, desc: 'Public Access', color: 'text-rose-400', bg: 'bg-rose-500/5', border: 'border-rose-500/20' },
];

const EnvironmentSelector = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const activeEnv = environments.find(e => e.id === selected) || environments[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-6 py-3 bg-[#05080F]/60 backdrop-blur-3xl border border-white/5 rounded-2xl hover:bg-[#05080F] hover:border-[#3B82F6]/30 transition-all group active:scale-95 shadow-2xl"
      >
        <div className={`p-2 rounded-xl bg-[#020617] border border-white/5 text-[#475569] group-hover:text-[#3B82F6] group-hover:border-[#3B82F6]/20 transition-all shadow-2xl group-hover:rotate-12`}>
           <activeEnv.icon size={18} />
        </div>
        <div className="flex flex-col items-start mr-4">
          <span className="text-[13px] font-black text-white tracking-tight leading-none uppercase italic">{activeEnv.name}</span>
          <span className="text-[8px] text-[#475569] font-black mt-1.5 uppercase tracking-[0.4em] leading-none">Neural Node</span>
        </div>
        <ChevronDown size={14} className={`text-[#475569] transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#3B82F6]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 right-0 w-80 bg-[#05080F]/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-[300] overflow-hidden animate-premium-in">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.5em] italic">Neural Cluster Grid</span>
          </div>
          <div className="p-3 space-y-2">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => { onSelect(env.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5 group relative ${selected === env.id ? 'bg-white/5 border border-white/5 shadow-inner' : 'border border-transparent'}`}
              >
                <div className={`p-2.5 rounded-xl bg-[#020617] border border-white/5 text-[#334155] group-hover:text-[#3B82F6] transition-all`}>
                  <env.icon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white tracking-tight uppercase italic">{env.name}</span>
                    {selected === env.id && <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,1)]" />}
                  </div>
                  <p className="text-[10px] text-[#475569] font-black uppercase tracking-[0.3em] mt-1 italic">{env.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="p-5 bg-white/5 border-t border-white/5 flex items-center gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
             <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.3em] italic">Security Protocol: Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentSelector;
