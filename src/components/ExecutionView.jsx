import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Play, Image as ImageIcon, ExternalLink, Calendar, Clock } from 'lucide-react';

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
        
        // Nếu đang chạy thì tiếp tục poll
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
    <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
      <XCircle className="text-rose-500" size={48} />
      <div className="text-center">
        <p className="text-white font-bold">Execution Error</p>
        <p className="text-sm">{error}</p>
      </div>
      <button 
        onClick={onBack}
        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
      >
        Go Back
      </button>
    </div>
  );

  if (!data) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p>Loading execution report...</p>
    </div>
  );

  const { execution, steps } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-2xl transition-all border border-slate-700"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Execution Report
              <span className={`text-xs px-2 py-1 rounded-md border ${
                execution.status === 'PASSED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                execution.status === 'FAILED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 animate-pulse'
              }`}>
                {execution.status}
              </span>
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(execution.startTime).toLocaleString()}</span>
              {execution.endTime && (
                <span className="flex items-center gap-1"><Clock size={14} /> Finished in {Math.round((new Date(execution.endTime) - new Date(execution.startTime))/1000)}s</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step List */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Progress Banner for RUNNING status */}
          {(execution.status === 'RUNNING' || execution.status === 'PENDING') && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
              <Loader2 className="animate-spin text-indigo-500" size={20} />
              <div className="space-y-1">
                <p className="text-indigo-400 font-bold text-sm">Test in progress...</p>
                <p className="text-slate-400 text-xs font-mono">{execution.progressMessage || 'Initializing engine...'}</p>
              </div>
            </div>
          )}

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Play size={16} className="text-indigo-500" /> Test Steps Execution
          </h3>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`bg-slate-900/40 border rounded-2xl p-5 transition-all hover:border-slate-700 ${
                  step.status === 'PASS' ? 'border-slate-800' : 
                  step.status === 'FAIL' ? 'border-rose-500/30 bg-rose-500/5' : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border ${
                      step.status === 'PASS' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      step.status === 'FAIL' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      'bg-slate-800 text-slate-500 border-slate-700'
                    }`}>
                      {step.stepOrder}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-bold uppercase text-sm tracking-tight">{step.action}</span>
                        {step.status === 'PASS' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                         step.status === 'FAIL' ? <XCircle size={16} className="text-rose-500" /> : null}
                      </div>
                      <p className="text-xs text-slate-500 font-mono break-all opacity-80">{step.selector || 'No selector'} {step.value && `→ "${step.value}"`}</p>
                      {step.errorMessage && (
                        <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 font-mono">
                          {step.errorMessage}
                        </div>
                      )}
                    </div>
                  </div>

                  {step.screenshotPath && (
                    <button 
                      onClick={() => setSelectedScreenshot(`/api/screenshots/${execution.id}/${step.screenshotPath}`)}
                      className="flex-shrink-0 group relative overflow-hidden rounded-xl border border-slate-700 hover:border-indigo-500 transition-all"
                    >
                      <img 
                        src={`/api/screenshots/${execution.id}/${step.screenshotPath}`} 
                        alt="Step proof" 
                        className="w-24 h-14 object-cover opacity-80 group-hover:opacity-100 transition-all"
                      />
                      <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <ExternalLink size={16} className="text-white" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Results (Video & Summary) */}
        <div className="space-y-8">
          {execution.videoPath && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={16} className="text-indigo-500" /> Full Session Video
              </h3>
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <video controls className="w-full aspect-video bg-black">
                  <source src={`/api/video/${execution.id}/${execution.videoPath}`} type="video/webm" />
                </video>
              </div>
              <p className="text-[10px] text-slate-600 italic">Playwright automated recording session.</p>
            </div>
          )}

          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Execution Verdict</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Steps</span>
                <span className="text-white font-bold">{steps.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Passed</span>
                <span className="text-emerald-500 font-bold">{steps.filter(s => s.status === 'PASS').length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Failed</span>
                <span className="text-rose-500 font-bold">{steps.filter(s => s.status === 'FAIL').length}</span>
              </div>
            </div>
            
            <div className={`mt-6 p-4 rounded-2xl border text-center ${
              execution.status === 'PASSED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              execution.status === 'FAILED' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
              'bg-indigo-500/5 border-indigo-500/10 text-indigo-400'
            }`}>
              <span className="text-xs uppercase font-black tracking-[0.2em]">Overall Verdict</span>
              <p className="text-xl font-black mt-1 tracking-wider">{execution.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Modal Overaly */}
      {selectedScreenshot && (
        <div 
          className="fixed inset-0 z-[100] bg-dark-950/90 backdrop-blur-xl flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setSelectedScreenshot(null)}
        >
          <img src={selectedScreenshot} alt="Full Proof" className="max-w-full max-h-full rounded-2xl shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-200" />
          <button className="absolute top-8 right-8 text-white p-2 bg-slate-800 rounded-full"><XCircle size={32} /></button>
        </div>
      )}
    </div>
  );
};

export default ExecutionView;
