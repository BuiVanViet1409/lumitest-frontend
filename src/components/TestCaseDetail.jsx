import React from 'react';
import { X, Play, Save, Trash2, Copy, Clock, User, Shield, Info, CheckCircle2, ChevronRight, FileCode, Tag, Activity, Command, Zap, Layers, Cpu, Leaf, Terminal, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TestCaseDetail = ({ 
  testCase, 
  onClose, 
  onSave, 
  onDelete, 
  onRun, 
  onDuplicate 
}) => {
  const { t } = useLanguage();
  if (!testCase) return null;

  return (
    <div className="h-full w-full bg-white border-l border-slate-200 flex flex-col relative overflow-hidden animate-premium-in shadow-2xl">
      {/* Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      {/* Studio Header */}
      <div className="p-6 border-b border-slate-100 relative z-10 flex items-center justify-between bg-white/40 backdrop-blur-md">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group relative overflow-hidden transition-all duration-300 hover:scale-105">
               <Terminal className="text-white relative z-10" size={24} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
               <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none">{testCase.name}</h2>
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">v{testCase.version || '1.0'}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase tracking-widest">ID: {testCase.id.slice(0, 10)}</span>
               </div>
            </div>
         </div>
         <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm">
            <X size={20} strokeWidth={2.5} />
         </button>
      </div>

      {/* Meta Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar relative z-10">
         
         {/* Metrics Grid */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-500">
                  <Activity size={48} className="text-indigo-500" />
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('testCaseDetail.metadata')}</span>
               <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${testCase.lastStatus === 'PASS' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-300'}`} />
                  <span className="text-lg font-bold text-slate-900 uppercase tracking-wide">{testCase.lastStatus || t('common.loading')}</span>
               </div>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-500">
                  <Zap size={48} className="text-amber-500" />
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cluster</span>
               <div className="flex items-center gap-2 text-indigo-600">
                  <Share2 size={16} strokeWidth={2.5} />
                  <span className="text-lg font-bold uppercase tracking-wide">SYNC.ALPHA</span>
               </div>
            </div>
         </div>

         {/* Execution Logic */}
         <div className="space-y-5">
            <div className="flex items-center justify-between px-1">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                  <Command size={14} strokeWidth={2.5} /> {t('testCaseDetail.steps')}
               </h3>
               <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">Certified</span>
            </div>
            <div className="space-y-3">
               {(testCase.steps || [1,2,3]).map((step, idx) => (
                 <div key={idx} className="group flex items-center gap-5 p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-indigo-200 hover:translate-x-1 transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 inset-y-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[12px] font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                       {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors leading-snug mb-1">{typeof step === 'string' ? step : 'Synchronization Step'}</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                          <Terminal size={10} strokeWidth={3} /> SYSTEM_OP: <span className="text-indigo-600 font-mono">NODE-0{idx}</span>
                       </p>
                    </div>
                    <ChevronRight size={18} strokeWidth={3} className="text-slate-200 group-hover:text-indigo-600 transition-all" />
                 </div>
               ))}
            </div>
         </div>

         {/* Studio Signature */}
         <div className="pt-8 border-t border-slate-100 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-8">
               <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('testCaseDetail.recordedBy')}</span>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-700">
                     <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 p-0.5 bg-white shadow-sm transition-transform hover:scale-110"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Studio" alt="A" className="w-full h-full rounded-md" /></div>
                     LumiStudio
                  </div>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Heartbeat</span>
                  <span className="text-[11px] font-bold text-indigo-600">12:42:04</span>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[9px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-indigo-600 pb-1">
               Metrics Details <ChevronRight size={14} strokeWidth={3} />
            </button>
         </div>
      </div>

      {/* Action Panel */}
      <div className="p-6 border-t border-slate-200 bg-white/90 backdrop-blur-md relative z-10 flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
         <button 
           onClick={() => onRun(testCase)}
           className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all group"
         >
            <Play size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" /> 
            Execute Sequence
         </button>
         <div className="flex items-center gap-3">
            <button 
              onClick={() => onDuplicate(testCase)}
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-500/30 transition-all shadow-sm active:scale-95"
              title="Duplicate"
            >
               <Copy size={20} />
            </button>
            <button 
              onClick={() => onDelete(testCase.id)}
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-95 shadow-sm"
              title="Delete"
            >
               <Trash2 size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default TestCaseDetail;
