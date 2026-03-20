import React, { useState, useEffect } from 'react';
import { Play, StopCircle, Globe, ChevronRight, Save, Trash2, Database, Layers, Sparkles, Monitor, AppWindow, Layout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RecorderView = ({ onBack, initialContext }) => {
  const { t } = useLanguage();
  const [url, setUrl] = useState('https://www.google.com');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [steps, setSteps] = useState([]);
  const [testName, setTestName] = useState('New Business Test');
  const [description, setDescription] = useState('');
  const [preconditions, setPreconditions] = useState('');

  useEffect(() => {
    if (initialContext) {
      setUrl(initialContext.applicationUrl || 'https://www.google.com');
      setTestName(initialContext.name || 'New Business Test');
      setDescription(initialContext.description || '');
      setPreconditions(initialContext.preconditions || '');
    }
  }, [initialContext]);

  useEffect(() => {
    let interval;
    if (isRecording && sessionId) {
      interval = setInterval(async () => {
        const res = await fetch(`/api/recorder/session/${sessionId}`);
        const session = await res.json();
        setSteps(session.steps || []);
        if (!session.active) {
          setIsRecording(false);
          setSessionId(null);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, sessionId]);

  const handleStart = async () => {
    const params = new URLSearchParams({
      url: url,
      name: testName,
      description: description,
      preconditions: preconditions
    });
    const res = await fetch(`/api/recorder/start?${params.toString()}`, { method: 'POST' });
    const session = await res.json();
    setSessionId(session.id);
    setIsRecording(true);
    setSteps([]);
  };

  const handleStop = async () => {
    await fetch(`/api/recorder/stop?sessionId=${sessionId}`, { method: 'POST' });
    setIsRecording(false);
    setSessionId(null);
    alert('Recording saved as: ' + testName);
    onBack(); // Go back to dashboard to see new test
  };

  return (
    <div className="h-full flex flex-col bg-white animate-premium-in">
      {/* Refined Control Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isRecording ? 'bg-rose-600 shadow-lg' : 'bg-indigo-600 shadow-md'}`}>
               <Monitor className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2 uppercase">
                {isRecording && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-sm"></span>}
                {t('recorder.title')}
              </h1>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{testName || 'Untitled Session'}</span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-100"></div>
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 group hover:border-indigo-200 transition-all">
             <Globe size={14} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
             <span className="text-[10px] text-indigo-600 font-bold truncate max-w-[300px]">{url}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isRecording ? (
            <button 
              onClick={handleStart}
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-3 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <Play size={16} fill="currentColor" /> {t('recorder.start')}
            </button>
          ) : (
            <div className="flex items-center gap-3">
               <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-sm">
                  <button className="px-4 py-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">Pause</button>
                  <button 
                    onClick={handleStop}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-md transition-all active:scale-95"
                  >
                    {t('recorder.stop')}
                  </button>
               </div>
               <button 
                 onClick={onBack}
                 className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100 shadow-sm"
                 title="Discard Session"
               >
                 <Trash2 size={20} />
               </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Site Preview Workspace */}
        <div className="flex-1 p-6 flex flex-col relative overflow-hidden bg-white">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl flex-1 shadow-inner overflow-hidden flex flex-col relative group">
             {/* Browser Navigation Mock */}
             <div className="h-12 bg-white/50 border-b border-slate-100 flex items-center px-6 gap-4">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <div className="flex-1 max-w-lg mx-auto bg-white px-4 py-1.5 rounded-full border border-slate-100 text-center shadow-sm group-focus-within:border-indigo-300 transition-all">
                   <span className="text-[10px] text-slate-400 font-bold truncate block">{url}</span>
                </div>
             </div>
             
             {/* Interactive Visual Area */}
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent pointer-events-none" />
                
                {!isRecording ? (
                  <div className="max-w-xs space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-xl border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                      <AppWindow size={40} className="text-slate-200 group-hover:text-indigo-600/40 transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">{t('recorder.title')}</h2>
                      <p className="text-sm text-slate-500 leading-relaxed font-bold">
                        LumiTest sẽ tạo ra một môi trường sạch để ghi lại các thao tác của bạn một cách chính xác.
                      </p>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                       <div className="grid grid-cols-1 gap-3">
                          <input 
                            type="text" 
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            placeholder="Scenario Title"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all placeholder-slate-300 font-bold"
                          />
                          <input 
                            type="text" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Target URL"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-indigo-600 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all placeholder-slate-300 font-bold"
                          />
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
                    <div className="relative">
                       <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl relative z-10 border-4 border-white">
                          <Sparkles size={32} className="text-white animate-pulse" />
                       </div>
                       <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20 scale-125"></div>
                    </div>
                    <div className="space-y-2">
                       <p className="text-xl font-bold text-slate-900 tracking-tight uppercase">{t('recorder.activeSession')}</p>
                       <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{url}</p>
                    </div>
                    <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-bold">{t('recorder.recordingMsg')}</p>
                  </div>
                )}
             </div>
          </div>
          
          {/* Dynamic Tip Tooltip */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-6 py-2.5 rounded-full flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-20 animate-premium-in group hover:border-indigo-400 transition-all cursor-pointer">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('recorder.tip')}</span>
          </div>
        </div>

        {/* Action Feed Sidebar */}
        <aside className="w-[400px] bg-slate-50 border-l border-slate-100 flex flex-col overflow-hidden shadow-sm z-10">
           <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between bg-white/50">
              <div className="flex flex-col">
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   {t('recorder.actionTimeline')}
                 </h3>
                 <span className="text-md font-bold text-slate-900 mt-1 uppercase">{steps.length} {t('recorder.stepsCaptured')}</span>
              </div>
              {isRecording && <div className="flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 font-bold text-[9px] text-rose-600 uppercase tracking-widest animate-pulse shadow-sm">Live</div>}
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
              {steps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-300 gap-6 p-8">
                  <div className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center transition-all">
                    <Layers size={32} className="opacity-20 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pending Telemetry</p>
                     <p className="text-xs font-bold leading-relaxed text-slate-300">System events will appear here as they are processed.</p>
                  </div>
                </div>
              ) : (
                steps.map((step, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-100 p-6 relative group hover:border-indigo-200 transition-all animate-in slide-in-from-right-8 duration-500 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="absolute -left-2 top-6 w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 shadow-sm z-10 transition-all">
                       {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    
                    <div className="flex flex-col gap-4">
                       <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1.5 flex-1 pl-4">
                             <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${step.verificationType === 'UI' ? 'bg-indigo-500' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(79,70,229,0.3)]`}></span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                  {step.verificationType === 'UI' ? 'User Interaction' : 'System Sync'}
                                </span>
                             </div>
                             <h4 className="text-md font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{step.description}</h4>
                          </div>
                          <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-all shadow-sm ${step.verificationType === 'UI' ? 'text-indigo-600 group-hover:bg-indigo-50' : 'text-emerald-600 group-hover:bg-emerald-50'}`}>
                             {step.verificationType === 'UI' ? <Layout size={18} /> : <Database size={18} />}
                          </div>
                       </div>
                       
                       {step.testData && (
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-inner ml-4">
                             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Input Data</span>
                             <code className="text-xs text-indigo-600 font-mono font-bold break-all">"{step.testData}"</code>
                          </div>
                       )}
                    </div>
                  </div>
                ))
              )}
           </div>
           
           {/* Summary Tool */}
           <div className="p-8 border-t border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deployment Repository</label>
                 <span className="text-[9px] font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer transition-colors uppercase tracking-widest">Change Plan</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between text-[10px] text-slate-900 font-bold hover:border-indigo-300 transition-all cursor-pointer shadow-sm uppercase tracking-wider">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-md"></div>
                    <span>General Repository</span>
                 </div>
                 <ChevronRight size={16} className="text-slate-400" />
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RecorderView;
