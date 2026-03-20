import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Play, Image as ImageIcon, ExternalLink, Calendar, Clock, Shield, Info, Activity, Monitor, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ExecutionView = ({ executionId, onBack }) => {
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    const fetchExecution = async () => {
      try {
        const res = await fetch(`/api/executions/${executionId}`);
        if (!res.ok) {
           if (res.status === 404) {
              setError(t('execution.errorNotFound'));
           } else {
              setError(t('execution.errorServer'));
           }
           return;
        }
        const json = await res.json();
        setData(json);
        setError(null);
        
        // Polling if running
        if (json && json.execution && (json.execution.status === 'RUNNING' || json.execution.status === 'PENDING')) {
          setTimeout(fetchExecution, 2000);
        }
      } catch (e) {
        console.error("Error fetching execution:", e);
        setError(t('execution.errorNetwork'));
      }
    };

    fetchExecution();
  }, [executionId, t]);

  if (error) return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-premium-in space-y-8 bg-white min-h-full">
      <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 shadow-sm">
        <Shield size={32} className="text-rose-500" />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">{t('execution.errorHeader')}</h3>
        <p className="text-sm font-medium text-slate-500 max-w-sm">{error}</p>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
      >
        {t('execution.retry')}
      </button>
    </div>
  );

  if (!data) return (
    <div className="flex-1 flex flex-col items-center justify-center p-20 animate-pulse bg-white">
       <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-10 shadow-sm" />
       <div className="space-y-3 text-center">
         <p className="text-xs font-bold uppercase tracking-widest text-slate-900">{t('execution.analyzing')}</p>
         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('common.loading')}</p>
       </div>
    </div>
  );

  const { execution, steps } = data;

  return (
    <div className="h-full flex flex-col bg-white animate-premium-in custom-scrollbar">
      {/* Execution Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white hover:bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-all border border-slate-200 active:scale-95 shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="space-y-0.5">
            <div className="flex items-center gap-3">
               <h2 className="text-xl font-bold text-slate-900 tracking-tight">{t('execution.title')}</h2>
               <div className={`flex items-center gap-2 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${
                 execution.status === 'PASSED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                 execution.status === 'FAILED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                 'bg-indigo-50 text-indigo-600 border-indigo-100 animate-pulse'
               }`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${execution.status === 'PASSED' ? 'bg-emerald-600' : execution.status === 'FAILED' ? 'bg-rose-600' : 'bg-indigo-600'}`}></div>
                 {execution.status}
               </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-300" /> {new Date(execution.startTime).toLocaleString()}</span>
               {execution.endTime && (
                 <span className="flex items-center gap-1.5"><Clock size={12} className="text-slate-300" /> {Math.round((new Date(execution.endTime) - new Date(execution.startTime))/1000)}s</span>
               )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instance</span>
              <span className="text-[11px] font-bold text-slate-900">SIT-Alpha-774</span>
           </div>
           <div className="w-px h-6 bg-slate-200 mx-1"></div>
           <Shield size={18} className="text-indigo-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Steps Stream */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Dynamic Status Buffer */}
              {(execution.status === 'RUNNING' || execution.status === 'PENDING') && (
                <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl flex items-center gap-4 animate-pulse shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-indigo-600 border border-indigo-100">
                     <Activity size={20} />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Active Sequence</p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest opacity-80">{execution.progressMessage || 'Processing...'}</p>
                  </div>
                  <Loader2 className="animate-spin text-indigo-600" size={18} />
                </div>
              )}

              <div className="flex items-center justify-between px-1 mb-1">
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Monitor size={14} className="text-indigo-600" /> Sequence Trace
                 </h3>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency: <span className="text-indigo-600">42ms</span></span>
              </div>

              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white border border-slate-100 p-5 hover:border-indigo-200 transition-all group rounded-xl shadow-sm ${
                      step.status === 'FAIL' ? 'border-rose-100 bg-rose-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex gap-5 flex-1">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold border transition-all ${
                          step.status === 'PASS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white' :
                          step.status === 'FAIL' ? 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white' :
                          'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                          {step.stepOrder.toString().padStart(2, '0')}
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900 tracking-tight uppercase">{step.action}</span>
                            {step.status === 'PASS' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />}
                            {step.status === 'FAIL' && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />}
                          </div>
                          <div className="flex flex-col gap-1">
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Matrix:</span>
                             <p className="text-[11px] text-indigo-600 font-mono font-bold bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100 break-all">{step.selector || 'GLOBAL_SCOPE'} {step.value && <span className="text-slate-400 ml-2">→ "{step.value}"</span>}</p>
                          </div>
                          {step.errorMessage && (
                            <div className="mt-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-[12px] text-rose-600 font-bold leading-relaxed shadow-inner">
                               <span className="text-[10px] font-bold uppercase block mb-1 opacity-60 tracking-widest">Failure Sequence</span>
                               {step.errorMessage}
                            </div>
                          )}
                        </div>
                      </div>

                      {step.screenshotPath && (
                        <button 
                          onClick={() => setSelectedScreenshot(`/api/screenshots/${execution.id}/${step.screenshotPath}`)}
                          className="flex-shrink-0 group relative overflow-hidden rounded-xl border border-slate-200 hover:border-indigo-600 transition-all shadow-md active:scale-95"
                        >
                          <img 
                            src={`/api/screenshots/${execution.id}/${step.screenshotPath}`} 
                            alt="Proof" 
                            className="w-28 h-16 object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all"
                          />
                          <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <ExternalLink size={16} className="text-indigo-600" />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Pane */}
            <div className="lg:col-span-4 space-y-8">
              {execution.videoPath && (
                <div className="bg-slate-50 p-6 space-y-4 border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <ImageIcon size={14} className="text-indigo-600" /> Playback Stream
                     </h3>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">HD RAW</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg relative group bg-black">
                    <video controls className="w-full aspect-video">
                      <source src={`/api/video/${execution.id}/${execution.videoPath}`} type="video/webm" />
                    </video>
                  </div>
                </div>
              )}

              <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-[0.05] scale-150 rotate-12 text-indigo-600">
                    <Activity size={80} />
                 </div>
                 
                 <div className="space-y-0.5 relative z-10">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assessment</h3>
                    <p className="text-xl font-bold text-slate-900 tracking-tight">Verdict Matrix</p>
                 </div>
                 
                 <div className="space-y-4 relative z-10">
                   <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('testCaseList.subtitle')}</span>
                     <span className="text-sm font-bold text-slate-900">{steps.length}</span>
                   </div>
                   <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                     <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Passed</span>
                     <span className="text-sm font-bold text-emerald-600">{steps.filter(s => s.status === 'PASS').length}</span>
                   </div>
                   <div className="flex justify-between items-center bg-rose-50 p-4 rounded-xl border border-rose-100">
                     <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Failed</span>
                     <span className="text-sm font-bold text-rose-600">{steps.filter(s => s.status === 'FAIL').length}</span>
                   </div>
                 </div>
                 
                 <div className={`mt-6 p-6 rounded-xl border text-center relative z-10 transition-all shadow-lg ${
                   execution.status === 'PASSED' ? 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-600/20' :
                   execution.status === 'FAILED' ? 'bg-rose-600 border-rose-500 text-white shadow-rose-600/20' :
                   'bg-slate-900 border-slate-800 text-white shadow-slate-900/20'
                 }`}>
                   <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">Certification</span>
                   <p className="text-2xl font-bold mt-1 tracking-wider uppercase">{execution.status}</p>
                   <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-70">
                      <Shield size={14} /> Verified
                   </div>
                 </div>
              </div>
           </div>
         </div>
      </div>

      {/* Proof Overlay */}
      {selectedScreenshot && (
        <div 
          className="fixed inset-0 z-[110] bg-white/90 backdrop-blur-xl flex items-center justify-center p-8 cursor-pointer animate-in fade-in duration-300"
          onClick={() => setSelectedScreenshot(null)}
        >
          <img src={selectedScreenshot} alt="Proof" className="max-w-full max-h-full rounded-xl shadow-2xl border border-slate-200" />
          <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-all bg-white p-2 rounded-full border border-slate-200 shadow-md"><XCircle size={28} /></button>
        </div>
      )}
    </div>
  );
};

export default ExecutionView;
