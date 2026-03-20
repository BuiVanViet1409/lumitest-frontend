import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Play, Image as ImageIcon, ExternalLink, Calendar, Clock, Shield, Info, Activity, Monitor } from 'lucide-react';

const ExecutionView = ({ executionId, onBack }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    const fetchExecution = async () => {
      try {
        const res = await fetch(`/api/executions/${executionId}`);
        if (!res.ok) {
           if (res.status === 404) {
             setError("Report not found. It might have been deleted or doesn't exist yet.");
           } else {
             setError("Server error while fetching report.");
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
        setError("Network error. Please check your connection.");
      }
    };

    fetchExecution();
  }, [executionId]);

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 text-[#475569] space-y-6 animate-premium-in">
      <div className="w-20 h-20 bg-rose-500/10 rounded-[2.5rem] flex items-center justify-center border border-rose-500/20 shadow-xl shadow-rose-500/10">
         <XCircle className="text-rose-500" size={40} />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black text-white tracking-tight uppercase italic">System Error Detected</h3>
        <p className="text-sm font-medium text-[#475569] max-w-sm italic">{error}</p>
      </div>
      <button 
        onClick={onBack}
        className="px-8 py-3.5 bg-[#0B0E14] text-white border border-white/5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#161B22] transition-all shadow-xl active:scale-95 italic"
      >
        Revert to Dashboard
      </button>
    </div>
  );

  if (!data) return (
    <div className="flex flex-col items-center justify-center py-40 text-[#475569] gap-8 animate-pulse">
      <div className="relative">
         <Loader2 className="animate-spin text-[#3B82F6]" size={48} />
         <div className="absolute inset-0 bg-[#3B82F6] blur-2xl opacity-20"></div>
      </div>
      <div className="space-y-1 text-center">
         <p className="text-sm font-black uppercase tracking-[0.3em] text-white italic">Synthesizing Report</p>
         <p className="text-[10px] font-black uppercase tracking-widest text-[#475569]">Aggregating Cloud Logs...</p>
      </div>
    </div>
  );

  const { execution, steps } = data;

  return (
    <div className="h-full flex flex-col bg-[#020617] animate-premium-in custom-scrollbar">
      {/* Execution Header */}
      <div className="px-10 py-8 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 bg-[#0B0E14] hover:bg-[#161B22] text-[#475569] hover:text-[#3B82F6] rounded-xl transition-all border border-white/5 active:scale-90 shadow-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
               <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">Execution Analysis</h2>
               <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                 execution.status === 'PASSED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                 execution.status === 'FAILED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 animate-pulse'
               }`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${execution.status === 'PASSED' ? 'bg-emerald-400' : execution.status === 'FAILED' ? 'bg-rose-400' : 'bg-indigo-400'}`}></div>
                 {execution.status}
               </div>
            </div>
            <div className="flex items-center gap-6 text-[10px] text-[#475569] font-black uppercase tracking-widest italic">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#334155]" /> {new Date(execution.startTime).toLocaleString()}</span>
              {execution.endTime && (
                <span className="flex items-center gap-2"><Clock size={14} className="text-[#334155]" /> Finished in {Math.round((new Date(execution.endTime) - new Date(execution.startTime))/1000)}s</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-[#0B0E14] border border-white/5 rounded-2xl px-6 py-3 shadow-xl">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-[#475569] uppercase tracking-widest">Cloud Instance</span>
              <span className="text-xs font-black text-white italic">SIT-Alpha-774</span>
           </div>
           <div className="w-px h-8 bg-white/5 mx-2"></div>
           <Shield size={20} className="text-[#3B82F6]" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Steps Stream */}
           <div className="lg:col-span-8 space-y-6">
             
             {/* Dynamic Status Buffer */}
             {(execution.status === 'RUNNING' || execution.status === 'PENDING') && (
               <div className="bg-[#0B0E14] p-6 border border-white/5 rounded-[2.5rem] flex items-center gap-6 animate-pulse shadow-2xl">
                 <div className="w-12 h-12 rounded-2xl bg-[#020617] flex items-center justify-center text-[#3B82F6] border border-white/5">
                    <Activity size={24} />
                 </div>
                 <div className="space-y-1 flex-1">
                   <p className="text-sm font-black text-white uppercase tracking-tight italic">Active Engine Sequence</p>
                   <p className="text-[11px] font-black text-[#3B82F6] uppercase tracking-widest opacity-80">{execution.progressMessage || 'Synthesizing DOM Cluster...'}</p>
                 </div>
                 <Loader2 className="animate-spin text-[#3B82F6]" size={20} />
               </div>
             )}

             <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-[11px] font-black text-[#475569] uppercase tracking-[0.25em] flex items-center gap-3">
                   <Monitor size={14} className="text-[#3B82F6]" /> Sequence Trace
                </h3>
                <span className="text-[10px] font-black text-[#475569] uppercase tracking-widest">Latency: <span className="text-[#3B82F6] italic">42ms</span></span>
             </div>

             <div className="space-y-4">
               {steps.map((step, idx) => (
                 <div 
                   key={idx} 
                   className={`bg-[#0B0E14]/40 border border-white/5 p-6 hover:border-[#3B82F6]/30 transition-all group rounded-[2.5rem] shadow-lg ${
                     step.status === 'FAIL' ? 'border-rose-500/30 !bg-rose-500/5 shadow-rose-500/10' : ''
                   }`}
                 >
                   <div className="flex items-start justify-between gap-6">
                     <div className="flex gap-6 flex-1">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black border transition-all shadow-sm italic ${
                         step.status === 'PASS' ? 'bg-[#020617] text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white' :
                         step.status === 'FAIL' ? 'bg-[#020617] text-rose-400 border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white' :
                         'bg-[#020617] text-[#475569] border-white/5'
                       }`}>
                         {step.stepOrder.toString().padStart(2, '0')}
                       </div>
                       <div className="space-y-3 flex-1">
                         <div className="flex items-center gap-3">
                           <span className="text-base font-black text-white tracking-tight uppercase italic">{step.action}</span>
                           {step.status === 'PASS' && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                           {step.status === 'FAIL' && <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-[#475569] uppercase tracking-widest">Target Logic Matrix:</span>
                            <p className="text-xs text-[#3B82F6] font-mono font-black bg-[#020617] px-3 py-2 rounded-lg border border-white/5 break-all italic">{step.selector || 'GLOBAL_SCOPE'} {step.value && <span className="text-white opacity-60">→ "{step.value}"</span>}</p>
                         </div>
                         {step.errorMessage && (
                           <div className="mt-4 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-[13px] text-rose-400 font-black italic leading-relaxed shadow-inner">
                             " {step.errorMessage} "
                           </div>
                         )}
                       </div>
                     </div>

                     {step.screenshotPath && (
                       <button 
                         onClick={() => setSelectedScreenshot(`/api/screenshots/${execution.id}/${step.screenshotPath}`)}
                         className="flex-shrink-0 group relative overflow-hidden rounded-2xl border border-white/5 hover:border-[#3B82F6] transition-all shadow-2xl active:scale-95"
                       >
                         <img 
                           src={`/api/screenshots/${execution.id}/${step.screenshotPath}`} 
                           alt="Step proof" 
                           className="w-32 h-20 object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all"
                         />
                         <div className="absolute inset-0 bg-[#020617]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                           <ExternalLink size={20} className="text-white" />
                         </div>
                       </button>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Results Matrix & Visualization */}
           <div className="lg:col-span-4 space-y-10">
             {execution.videoPath && (
               <div className="bg-[#0B0E14] p-8 space-y-6 border border-white/5 rounded-[3rem] shadow-2xl">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-black text-[#475569] uppercase tracking-widest flex items-center gap-3">
                      <ImageIcon size={16} className="text-[#3B82F6]" /> Playback Stream
                    </h3>
                    <span className="text-[9px] font-black text-[#334155] uppercase tracking-widest">4K RAW</span>
                 </div>
                 <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative group bg-[#020617]">
                   <video controls className="w-full aspect-video bg-[#020617]">
                     <source src={`/api/video/${execution.id}/${execution.videoPath}`} type="video/webm" />
                   </video>
                   <div className="absolute top-4 right-4 bg-[#020617]/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity italic">
                      LumiCapture Onyx v2.0
                   </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-[#020617] border border-white/5 rounded-xl">
                    <Info size={14} className="text-[#3B82F6]" />
                    <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest italic">Automated Visual Proof Synthesized</p>
                 </div>
               </div>
             )}

             <div className="bg-[#0B0E14] border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] scale-150 rotate-12 text-[#3B82F6]">
                  <Activity size={120} />
               </div>
               
               <div className="space-y-1 relative z-10 text-center">
                  <h3 className="text-[11px] font-black text-[#475569] uppercase tracking-[0.35em]">Verdict Matrix</h3>
                  <p className="text-3xl font-black text-white tracking-tighter uppercase italic">Cluster Assessment</p>
               </div>
               
               <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-center bg-[#020617] p-5 rounded-3xl border border-white/5 shadow-inner">
                   <span className="text-[11px] font-black text-[#475569] uppercase tracking-widest italic">Sequence Count</span>
                   <span className="text-xl font-black text-white italic">{steps.length} Nodes</span>
                 </div>
                 <div className="flex justify-between items-center bg-emerald-500/5 p-5 rounded-3xl border border-emerald-500/10 shadow-inner">
                   <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest italic">Reaches Gate</span>
                   <span className="text-xl font-black text-emerald-400 italic">{steps.filter(s => s.status === 'PASS').length}</span>
                 </div>
                 <div className="flex justify-between items-center bg-rose-500/5 p-5 rounded-3xl border border-rose-500/10 shadow-inner">
                   <span className="text-[11px] font-black text-rose-400 uppercase tracking-widest italic">Regression Nodes</span>
                   <span className="text-xl font-black text-rose-400 italic">{steps.filter(s => s.status === 'FAIL').length}</span>
                 </div>
               </div>
               
               <div className={`mt-10 p-10 rounded-[2.5rem] border border-white/5 text-center relative z-10 transition-all shadow-2xl ${
                 execution.status === 'PASSED' ? 'bg-emerald-600/90 text-white shadow-emerald-500/20' :
                 execution.status === 'FAILED' ? 'bg-rose-600/90 text-white shadow-rose-500/20' :
                 'bg-[#3B82F6]/90 text-white shadow-blue-500/20'
               }`}>
                 <span className="text-[11px] uppercase font-black tracking-[0.4em] opacity-80">Final Certification</span>
                 <p className="text-4xl font-black mt-2 tracking-widest uppercase italic">{execution.status}</p>
                 <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-80 italic">
                    <Shield size={14} /> Intelligence Verified
                 </div>
               </div>
             </div>
           </div>
         </div>
      </div>

      {/* Proof Inspection Overlay */}
      {selectedScreenshot && (
        <div 
          className="fixed inset-0 z-[110] bg-[#020617]/95 backdrop-blur-2xl flex items-center justify-center p-12 cursor-pointer animate-in fade-in duration-300"
          onClick={() => setSelectedScreenshot(null)}
        >
          <img src={selectedScreenshot} alt="High Res Proof" className="max-w-full max-h-full rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 animate-in zoom-in-95 duration-300" />
          <div className="absolute top-10 right-10 flex items-center gap-4">
             <span className="text-[11px] font-black text-white uppercase tracking-widest opacity-40">Inspection Mode Active</span>
             <button className="text-white/40 hover:text-white transition-all bg-white/5 p-3 rounded-full border border-white/10 hover:bg-white/10"><XCircle size={32} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionView;
