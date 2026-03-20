import React from 'react';
import { Play, ChevronRight, Wrench, Clock, Plus, Search, Filter, MoreHorizontal, CheckCircle2, Zap, Shield, Database, Activity, Command, Cpu, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TestCaseList = ({ 
  testCases, 
  onSelectTestCase, 
  onRunTest 
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar animate-premium-in relative bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Refined Studio Header */}
        <div className="flex items-end justify-between border-b border-slate-100 pb-10 relative group">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
               <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{t('testCaseList.subtitle')}</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-none mb-2">{t('testCaseList.title')}</h1>
            <p className="text-sm text-slate-500 font-medium max-w-md leading-relaxed">
              {t('testCaseList.subtitle')}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={t('testCaseList.searchPlaceholder')} 
                  className="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-10 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500/50 transition-all w-72 shadow-sm"
                />
             </div>
             <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 transition-all">
                <Plus size={18} strokeWidth={3} /> 
                {t('common.newTest')}
             </button>
          </div>
        </div>

        {/* List Section - Refined Light Depth */}
        <div className="grid grid-cols-1 gap-4">
           {testCases.map((tc, idx) => (
             <div 
               key={tc.id} 
               onClick={() => onSelectTestCase(tc)}
               className="card-premium p-6 cursor-pointer group hover:bg-slate-50 relative overflow-hidden flex items-center gap-8 animate-premium-in border-slate-200"
               style={{ animationDelay: `${idx * 0.05}s` }}
             >
                {/* Visual Indicator */}
                <div className="absolute left-0 inset-y-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Node ID */}
                <div className="w-12 flex flex-col items-center flex-shrink-0">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">ID</span>
                   <span className="text-xl font-bold text-slate-300 group-hover:text-indigo-600 transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center gap-8">
                   <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Terminal size={24} strokeWidth={2} />
                   </div>
                   
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                         <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{tc.name}</h3>
                         <span className="text-[9px] font-bold text-indigo-600 px-2 py-0.5 border border-indigo-200 rounded-md bg-indigo-50 uppercase tracking-wider">v{tc.version || '1.0'}</span>
                      </div>
                      <div className="flex items-center gap-6">
                         <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            <Activity size={14} className="text-slate-300" /> {t('testCaseDetail.environment')}
                         </span>
                         <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            <Shield size={14} className="text-slate-300" /> {t('testCaseDetail.metadata')}
                         </span>
                      </div>
                   </div>
                </div>

                {/* Status & Telemetry */}
                <div className="flex items-center gap-10 flex-shrink-0">
                   <div className="flex flex-col items-end gap-1.5 min-w-[120px]">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{t('common.status')}</span>
                      <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                        tc.lastStatus === 'PASS' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-white text-slate-400 border-slate-200'
                      }`}>
                         {tc.lastStatus || t('common.loading')}
                      </div>
                   </div>

                   <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Team</span>
                      <div className="flex items-center gap-2">
                         <div className="flex -space-x-2">
                            {[1, 2].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=UX${i + idx}`} alt="user" className="w-full h-full" />
                              </div>
                            ))}
                         </div>
                         <div className="w-8 h-8 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-500 transition-all">
                            <Plus size={14} />
                         </div>
                      </div>
                   </div>

                   <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                      <ChevronRight size={24} />
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Studio Footer */}
        <div className="pt-10 border-t border-slate-200 flex items-center justify-between opacity-80">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                 <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">System Operational</span>
              </div>
              <div className="flex items-center gap-8">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Nodes</span>
                    <span className="text-sm font-bold text-slate-900">4,192 Active</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Latency</span>
                    <span className="text-sm font-bold text-indigo-600">0.04 ms</span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-wider shadow-sm bg-white">Prev</button>
              <div className="flex items-center gap-1.5">
                 {[1, 2, 3].map(p => (
                   <button key={p} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${p === 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}>{p}</button>
                 ))}
              </div>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-600 transition-all uppercase tracking-wider shadow-md">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TestCaseList;
