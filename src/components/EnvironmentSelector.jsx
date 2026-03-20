import React, { useState, useRef, useEffect } from 'react';
import { Globe2, ChevronDown, Check, Zap, Server, ShieldCheck, Activity, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const environments = [
  { id: 'SIT', name: 'SIT Alpha', icon: ShieldCheck, desc: 'Central Cluster', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { id: 'DEV', name: 'DEV Feature', icon: Zap, desc: 'Sandboxed Node', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  { id: 'UAT', name: 'UAT Gate', icon: Activity, desc: 'Stability Guard', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { id: 'PROD', name: 'PROD Main', icon: Server, desc: 'Public Access', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
];

const EnvironmentSelector = ({ selected, onSelect }) => {
  const { t } = useLanguage();
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
        className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-300 transition-all group active:scale-95 shadow-sm"
      >
        <div className={`p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-all group-hover:rotate-6`}>
           <activeEnv.icon size={16} />
        </div>
        <div className="flex flex-col items-start mr-2">
          <span className="text-xs font-bold text-slate-900 tracking-tight leading-none">{activeEnv.name}</span>
          <span className="text-[8px] text-slate-400 font-bold mt-1 uppercase tracking-widest leading-none">{t('environment.clusterNode')}</span>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-[300] overflow-hidden animate-premium-in">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('environment.title')}</span>
          </div>
          <div className="p-2 space-y-1">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => { onSelect(env.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-slate-50 group relative ${selected === env.id ? 'bg-indigo-50/50 border border-indigo-100' : 'border border-transparent'}`}
              >
                <div className={`p-2 rounded-lg bg-white border border-slate-100 text-slate-400 group-hover:text-indigo-600 transition-all shadow-sm`}>
                  <env.icon size={18} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 tracking-tight">{env.name}</span>
                    {selected === env.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />}
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{env.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shadow-sm"></div>
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('environment.protocol')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentSelector;
