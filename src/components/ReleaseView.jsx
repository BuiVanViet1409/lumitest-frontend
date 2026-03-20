import React, { useState } from 'react';
import { Package, Plus, Filter, TrendingUp, TrendingDown, ChevronRight, Activity, ShieldCheck, Zap, Search, Bell, Settings, MoreVertical, Calendar, Command, Cpu, Globe2, Shield, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProgressBar = ({ label, value, colorClass }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-900">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative group shadow-inner">
       <div 
         className={`h-full rounded-full transition-all duration-1000 ease-out relative z-10 ${colorClass}`} 
         style={{ width: `${value}%` }}
       />
    </div>
  </div>
);

const ReleaseView = () => {
  const { t } = useLanguage();
  const [releases] = useState([
    { id: 1, name: 'Core Infrastructure v2.8', manager: 'Quang Nguyen', status: 'In Progress', target: 'Apr 05', auto: 78, system: 85, risk: 12, trend: 5 },
    { id: 2, name: 'SIT Integration Sync', manager: 'Alex Chen', status: 'Critical', target: 'Mar 25', auto: 45, system: 92, risk: 64, trend: -2 },
    { id: 3, name: 'Legacy Migration Hub', manager: 'Sarah J.', status: 'Stabilizing', target: 'Mar 30', auto: 92, system: 71, risk: 35, trend: 8 },
  ]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden animate-premium-in">
      {/* Editorial Table Layout */}
      <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex items-end justify-between border-b border-slate-100 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm animate-pulse" />
                 <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{t('release.management')}</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight uppercase leading-none mb-1">{t('release.title1')} <br/> {t('release.title2')}</h1>
              <p className="text-sm text-slate-400 font-bold max-w-md leading-relaxed uppercase tracking-wider">
                 Synchronize deployment gates and ecosystem integrity across distributed clusters.
              </p>
            </div>
            <button className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-widest group">
               <Plus size={18} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-500" /> {t('release.newCycle')}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {releases.map((release, idx) => (
              <div 
                key={release.id} 
                className="bg-white border border-slate-100 p-6 grid grid-cols-12 gap-8 items-center cursor-pointer group relative overflow-hidden animate-premium-in shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all rounded-2xl"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute left-0 inset-y-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="col-span-4 space-y-4">
                   <div className="space-y-3">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                            <Package size={22} className="group-hover:scale-110 transition-transform" />
                         </div>
                         <div className="flex flex-col gap-1.5">
                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-none">{release.name}</h2>
                            <div className={`inline-flex self-start px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border transition-all ${
                               release.status === 'Critical' 
                               ? 'bg-rose-50 text-rose-600 border-rose-100' 
                               : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                            }`}>
                               {release.status}
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 pl-1">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <Calendar size={14} className="text-slate-300" /> {release.target}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <Activity size={14} className="text-slate-300" /> {release.manager.split(' ')[0]}
                         </div>
                      </div>
                   </div>
                </div>
 
                <div className="col-span-4 space-y-6 border-x border-slate-100 px-8">
                   <ProgressBar label="Integrity" value={release.auto} colorClass="bg-indigo-600 shadow-sm" />
                   <ProgressBar label="Harmony" value={release.system} colorClass="bg-slate-300 shadow-sm" />
                </div>
 
                <div className="col-span-2 pl-6">
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Risk Index</span>
                      <div className="flex items-baseline gap-3">
                         <span className={`text-3xl font-bold tracking-tight ${release.risk > 50 ? 'text-rose-600' : 'text-slate-900'}`}>{release.risk}%</span>
                         <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${release.risk > 50 ? 'text-rose-600 border-rose-100 bg-rose-50' : 'text-indigo-600 border-indigo-100 bg-indigo-50'}`}>{release.risk > 50 ? 'High' : 'Low'}</span>
                      </div>
                   </div>
                </div>
 
                <div className="col-span-2 text-right pr-4">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Velocity</span>
                   <div className="flex items-center gap-3 justify-end mt-2">
                       <div className="flex flex-col items-end">
                          <span className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-none tracking-tight">{release.trend + 30}</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Nodes</span>
                       </div>
                       <div className={`p-2 rounded-xl border transition-all duration-500 ${release.trend > 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                          {release.trend > 0 ? <TrendingUp size={20} strokeWidth={2.5} /> : <TrendingDown size={20} strokeWidth={2.5} />}
                       </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Release Grid System Footer */}
          <div className="pt-10 border-t border-slate-100 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse shadow-sm" />
                   <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-none">Status: Normalized // Sync: Active</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   <Globe2 size={14} className="text-indigo-300" /> Cluster: Global.Grid
                </div>
             </div>
             <div className="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition-all duration-500">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">View Archives</span>
                <ChevronRight size={18} strokeWidth={3} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseView;
