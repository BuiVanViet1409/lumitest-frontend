import React, { useState, useEffect } from 'react';
import { Play, StopCircle, Globe, ChevronRight, Save, Trash2, Database, Layers, Sparkles } from 'lucide-react';

const RecorderView = ({ onBack, initialContext }) => {
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
    <div className="h-full flex flex-col -m-1">
      {/* Top Control Bar */}
      <div className="bg-ent-surface border-b border-ent-border px-8 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              Business Recorder
            </h1>
            <span className="text-[10px] text-ent-text-light font-bold uppercase tracking-tighter">{testName || 'Untitled Session'}</span>
          </div>
          
          <div className="h-8 w-px bg-ent-border mx-2"></div>
          
          <div className="flex items-center gap-4 bg-ent-bg rounded-xl px-4 py-2 border border-ent-border">
             <Globe size={14} className="text-ent-text-light" />
             <span className="text-xs text-ent-text-main font-mono truncate max-w-[300px]">{url}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button 
              onClick={handleStart}
              className="bg-ent-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:shadow-lg hover:shadow-ent-primary/20 transition-all active:scale-95"
            >
              <Play size={14} fill="currentColor" /> Start Session
            </button>
          ) : (
            <>
              <div className="flex bg-ent-bg border border-ent-border rounded-xl p-1 gap-1">
                 <button className="px-3 py-1.5 text-ent-text-light hover:text-white hover:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all">Pause</button>
                 <button 
                   onClick={handleStop}
                   className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all"
                 >
                   Stop & Save
                 </button>
              </div>
              <button 
                onClick={onBack}
                className="p-2.5 text-ent-text-muted hover:text-ent-error hover:bg-ent-error/5 rounded-xl transition-all"
                title="Discard Session"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Site Interaction */}
        <div className="flex-1 bg-ent-bg p-8 flex flex-col relative overflow-hidden">
          <div className="bg-ent-surface border border-ent-border rounded-2xl flex-1 shadow-2xl overflow-hidden flex flex-col">
             {/* Browser Header Mock */}
             <div className="h-10 bg-ent-bg/80 border-b border-ent-border flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
                </div>
                <div className="mx-auto bg-ent-bg/50 px-4 py-1 rounded-lg border border-ent-border w-1/2 text-center">
                   <span className="text-[10px] text-ent-text-light font-medium font-mono truncate block">{url}</span>
                </div>
             </div>
             
             {/* Site Preview Area */}
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-grid opacity-100">
                {!isRecording ? (
                  <div className="max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-24 h-24 bg-ent-primary/10 rounded-3xl mx-auto flex items-center justify-center">
                      <Globe size={48} className="text-ent-primary opacity-50" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Ready to Capture</h2>
                      <p className="text-sm text-ent-text-muted leading-relaxed font-medium">
                        Configure your test name and target URL in the collection before starting. We'll open a persistent browser session for recording.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 pt-4">
                       <input 
                         type="text" 
                         value={testName}
                         onChange={(e) => setTestName(e.target.value)}
                         placeholder="Test Scenario Name"
                         className="bg-ent-bg border border-ent-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-ent-primary"
                       />
                       <input 
                         type="text" 
                         value={url}
                         onChange={(e) => setUrl(e.target.value)}
                         placeholder="https://app.target.com"
                         className="bg-ent-bg border border-ent-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-ent-primary"
                       />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 animate-in fade-in duration-1000">
                    <div className="w-20 h-20 bg-ent-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(124,108,245,0.3)]">
                       <Sparkles size={32} className="text-white animate-spin-slow" />
                    </div>
                    <p className="text-sm font-black text-white uppercase tracking-widest mt-4">Session Active: {url}</p>
                    <p className="text-xs text-ent-text-light max-w-xs font-medium">Interacting with application... Actions will appear in the feed automatically.</p>
                  </div>
                )}
             </div>
          </div>
          
          {/* Tip Overlay */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-ent-surface/90 backdrop-blur-md border border-ent-border px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-10 transition-opacity">
             <div className="w-2 h-2 rounded-full bg-ent-primary animate-pulse"></div>
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Tip: Hold <kbd className="bg-ent-bg px-1 rounded mx-1">Alt + Click</kbd> to Assert Text Intelligence</span>
          </div>
        </div>

        {/* Right Pane: Steps Feed */}
        <aside className="w-[450px] bg-ent-surface border-l border-ent-border flex flex-col overflow-hidden shadow-2xl z-10">
           <div className="px-8 py-6 border-b border-ent-border flex items-center justify-between bg-ent-bg/20">
              <h3 className="text-[10px] font-black text-ent-text-light uppercase tracking-[0.2em] flex items-center gap-2">
                <ChevronRight size={14} className="text-ent-primary" /> Action Feed ({steps.length})
              </h3>
              {isRecording && <span className="text-[9px] font-bold text-rose-500 uppercase animate-pulse">Live</span>}
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {steps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-4 p-8">
                  <div className="w-16 h-16 border-2 border-dashed border-ent-text-light rounded-2xl flex items-center justify-center">
                    <Layers size={24} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest">No actions captured</p>
                </div>
              ) : (
                steps.map((step, idx) => (
                  <div 
                    key={idx}
                    className="bg-ent-bg border border-ent-border rounded-2xl p-6 relative group hover:border-ent-primary/40 transition-all animate-in slide-in-from-right-4 duration-300"
                  >
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-ent-surface rounded-lg border border-ent-border flex items-center justify-center text-[10px] font-black text-ent-text-muted shadow-lg z-10">
                       {idx + 1}
                    </div>
                    
                    <div className="flex flex-col gap-4">
                       <div className="flex items-start justify-between">
                          <div className="flex flex-col gap-1">
                             <span className="text-[9px] font-black text-ent-text-light uppercase tracking-tighter opacity-60">
                               [00:{idx * 4 < 10 ? `0${idx * 4}` : idx * 4}] {step.verificationType === 'UI' ? 'Business Action' : 'System Event'}
                             </span>
                             <h4 className="text-sm font-bold text-white leading-snug">{step.description}</h4>
                          </div>
                          <div className={`p-2 rounded-lg bg-ent-surface border border-ent-border ${step.verificationType === 'UI' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                             {step.verificationType === 'UI' ? <Layout size={14} /> : <Database size={14} />}
                          </div>
                       </div>
                       
                       {step.testData && (
                         <div className="bg-ent-surface/50 rounded-xl p-3 border border-ent-border/10">
                            <span className="text-[8px] font-black text-ent-text-light uppercase block mb-1">Captured Data</span>
                            <code className="text-[11px] text-ent-success font-mono font-bold break-all">"{step.testData}"</code>
                         </div>
                       )}
                    </div>
                  </div>
                ))
              )}
           </div>
           
           {/* Folder Select Mini Mock */}
           <div className="p-6 border-t border-ent-border bg-ent-bg/40 space-y-3">
              <label className="text-[9px] font-black text-ent-text-light uppercase tracking-widest">Store in Collection</label>
              <div className="bg-ent-surface border border-ent-border rounded-xl px-4 py-3 flex items-center justify-between text-xs text-ent-text-main font-bold">
                 <span>General</span>
                 <ChevronRight size={14} className="rotate-90 text-ent-text-muted" />
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RecorderView;
