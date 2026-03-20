import React, { useState, useEffect } from 'react';
import { Play, StopCircle, Globe, ChevronRight, Save, Trash2, Database, Layers, Sparkles, Monitor, AppWindow, Layout } from 'lucide-react';

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
    <div className="h-full flex flex-col bg-[#020617] animate-premium-in">
      {/* Premium Control Bar */}
      <div className="bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-10 py-6 flex items-center justify-between z-20 shadow-2xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isRecording ? 'bg-rose-600 shadow-xl shadow-rose-500/20' : 'bg-[#3B82F6] shadow-xl shadow-blue-500/20'}`}>
               <Monitor className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-3 uppercase italic">
                {isRecording && <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]"></span>}
                Neural Intelligence Recorder
              </h1>
              <span className="text-[10px] text-[#475569] font-black uppercase tracking-[0.3em] italic">{testName || 'Untitled Session'}</span>
            </div>
          </div>
          
          <div className="h-10 w-px bg-white/5"></div>
          
          <div className="flex items-center gap-3 bg-[#0B0E14] border border-white/5 rounded-2xl px-5 py-2.5 group hover:border-[#3B82F6]/30 transition-all">
             <Globe size={16} className="text-[#475569] group-hover:text-[#3B82F6] transition-colors" />
             <span className="text-xs text-[#3B82F6] font-black truncate max-w-[350px] italic">{url}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isRecording ? (
            <button 
              onClick={handleStart}
              className="bg-[#3B82F6] text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 flex items-center gap-4 hover:bg-[#2563EB] hover:-translate-y-1 transition-all active:translate-y-0 italic"
            >
              <Play size={20} fill="currentColor" /> Initialize Capture
            </button>
          ) : (
            <div className="flex items-center gap-4">
               <div className="flex items-center bg-[#0B0E14] border border-white/5 rounded-2xl p-1 shadow-2xl">
                  <button className="px-6 py-3 text-[#475569] hover:text-white hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic">Pause</button>
                  <button 
                    onClick={handleStop}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 transition-all active:scale-95 italic"
                  >
                    Commit & Save
                  </button>
               </div>
               <button 
                 onClick={onBack}
                 className="p-4 text-[#475569] hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20 shadow-lg"
                 title="Discard Session"
               >
                 <Trash2 size={24} />
               </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Site Preview Workspace */}
        <div className="flex-1 p-10 flex flex-col relative overflow-hidden bg-[#020617]">
          <div className="bg-[#0B0E14]/40 border border-white/5 rounded-[3.5rem] flex-1 shadow-2xl overflow-hidden flex flex-col relative group">
             {/* Browser Navigation Mock */}
             <div className="h-14 bg-[#020617]/50 border-b border-white/5 flex items-center px-8 gap-6">
                <div className="flex gap-2.5">
                   <div className="w-3.5 h-3.5 rounded-full bg-[#161B22]"></div>
                   <div className="w-3.5 h-3.5 rounded-full bg-[#161B22]"></div>
                   <div className="w-3.5 h-3.5 rounded-full bg-[#161B22]"></div>
                </div>
                <div className="flex-1 max-w-xl mx-auto bg-[#020617] px-6 py-2 rounded-full border border-white/5 text-center shadow-inner group-focus-within:border-[#3B82F6]/30 transition-all">
                   <span className="text-[11px] text-[#475569] font-black truncate block italic">{url}</span>
                </div>
             </div>
             
             {/* Interactive Visual Area */}
             <div className="flex-1 flex flex-col items-center justify-center text-center p-20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent pointer-events-none" />
                
                {!isRecording ? (
                  <div className="max-w-md space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="w-28 h-28 bg-[#020617] rounded-[3rem] mx-auto flex items-center justify-center shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-700">
                      <AppWindow size={56} className="text-[#3B82F6]/20 group-hover:text-[#3B82F6]/40 transition-colors" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Capture Architecture</h2>
                      <p className="text-[16px] text-[#475569] leading-relaxed font-black italic">
                        LumiAI will materialize a clean-room neural matrix to capture your session logic with molecular precision.
                      </p>
                    </div>
                    
                    <div className="space-y-5 pt-4">
                       <div className="grid grid-cols-1 gap-4">
                          <div className="relative">
                             <input 
                               type="text" 
                               value={testName}
                               onChange={(e) => setTestName(e.target.value)}
                               placeholder="Scenario Designation"
                               className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-[#3B82F6]/50 focus:ring-[15px] focus:ring-[#3B82F6]/5 transition-all font-black placeholder-[#334155] uppercase tracking-tight italic"
                             />
                          </div>
                          <div className="relative">
                             <input 
                               type="text" 
                               value={url}
                               onChange={(e) => setUrl(e.target.value)}
                               placeholder="Target Application URL"
                               className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-5 text-sm text-[#3B82F6] outline-none focus:border-[#3B82F6]/50 focus:ring-[15px] focus:ring-[#3B82F6]/5 transition-all font-black placeholder-[#334155] italic"
                             />
                          </div>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-10 animate-in fade-in duration-1000">
                    <div className="relative">
                       <div className="w-28 h-28 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.4)] relative z-10 border-4 border-white/10">
                          <Sparkles size={48} className="text-white animate-pulse" />
                       </div>
                       <div className="absolute inset-0 bg-[#3B82F6] rounded-full animate-ping opacity-10 scale-150"></div>
                    </div>
                    <div className="space-y-3">
                       <p className="text-2xl font-black text-white tracking-tight uppercase italic">Active Neural Capture Session</p>
                       <p className="text-sm font-black text-[#3B82F6] uppercase tracking-[0.4em] italic">{url}</p>
                    </div>
                    <p className="text-[15px] text-[#475569] max-w-sm leading-relaxed font-black italic">LumiAI is synthesizing action nodes in real-time. Please continue your interaction in the generated window.</p>
                  </div>
                )}
             </div>
          </div>
          
          {/* Dynamic Tip Tooltip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#0B0E14] border border-white/10 px-10 py-4 rounded-full flex items-center gap-5 shadow-2xl z-10 animate-premium-in group hover:border-[#3B82F6]/40 transition-all cursor-pointer">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
             <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Contextual Hint: <span className="text-[#3B82F6] active:scale-110 block sm:inline">Right-Click</span> elements to append validation checks.</span>
          </div>
        </div>

        {/* Action Feed Sidebar */}
        <aside className="w-[500px] bg-[#020617] border-l border-white/5 flex flex-col overflow-hidden shadow-2xl z-10">
           <div className="px-10 py-10 border-b border-white/5 flex items-center justify-between bg-[#0B0E14]/30">
              <div className="flex flex-col">
                 <h3 className="text-[11px] font-black text-[#475569] uppercase tracking-[0.4em] flex items-center gap-3">
                   Sequence Matrix
                 </h3>
                 <span className="text-lg font-black text-white mt-1 uppercase italic">{steps.length} Actions Captured</span>
              </div>
              {isRecording && <div className="flex items-center gap-3 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20 font-black text-[10px] text-rose-400 uppercase tracking-widest animate-pulse shadow-lg italic">Live Link Active</div>}
           </div>
           
           <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[#020617]">
              {steps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[#334155] gap-8 p-12">
                  <div className="w-24 h-24 border-2 border-dashed border-[#161B22] rounded-[2.5rem] flex items-center justify-center group-hover:border-[#3B82F6]/30 transition-all">
                    <Layers size={40} className="opacity-20" />
                  </div>
                  <div className="space-y-3">
                     <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#475569]">Pending Telemetry</p>
                     <p className="text-xs font-black leading-relaxed italic">System events and user triggers will appear here as they are processed.</p>
                  </div>
                </div>
              ) : (
                steps.map((step, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#0B0E14]/40 border border-white/5 p-8 relative group hover:border-[#3B82F6]/30 transition-all animate-in slide-in-from-right-12 duration-700 rounded-[2.5rem] overflow-hidden shadow-lg"
                  >
                    <div className="absolute -left-3 top-8 w-8 h-8 bg-[#020617] rounded-xl border border-white/5 flex items-center justify-center text-[11px] font-black text-[#475569] group-hover:text-[#3B82F6] group-hover:border-[#3B82F6]/20 shadow-2xl z-10 transition-all italic">
                       {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    
                    <div className="flex flex-col gap-6">
                       <div className="flex items-start justify-between gap-6">
                          <div className="flex flex-col gap-2 flex-1">
                             <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${step.verificationType === 'UI' ? 'bg-[#3B82F6]' : 'bg-emerald-500'} shadow-lg`}></span>
                                <span className="text-[10px] font-black text-[#475569] uppercase tracking-widest italic">
                                  Tele-Node V.{idx + 10} · {step.verificationType === 'UI' ? 'User Event' : 'System Sync'}
                                </span>
                             </div>
                             <h4 className="text-lg font-black text-white leading-tight group-hover:text-[#3B82F6] transition-colors uppercase tracking-tight italic">{step.description}</h4>
                          </div>
                          <div className={`w-12 h-12 rounded-2xl bg-[#020617] border border-white/5 flex items-center justify-center transition-all shadow-xl ${step.verificationType === 'UI' ? 'text-[#3B82F6] group-hover:bg-[#3B82F6]/10' : 'text-emerald-400 group-hover:bg-emerald-500/10'}`}>
                             {step.verificationType === 'UI' ? <Layout size={20} /> : <Database size={20} />}
                          </div>
                       </div>
                       
                       {step.testData && (
                         <div className="bg-[#020617] rounded-2xl p-5 border border-white/5 ring-1 ring-white/5 shadow-inner">
                            <span className="text-[9px] font-black text-[#475569] uppercase tracking-widest block mb-2 italic">Captured Input Node</span>
                            <code className="text-sm text-[#3B82F6] font-mono font-black break-all italic">"{step.testData}"</code>
                         </div>
                       )}
                    </div>
                  </div>
                ))
              )}
           </div>
           
           {/* Summary Tool */}
           <div className="p-10 border-t border-white/5 bg-[#0B0E14]/50 space-y-5">
              <div className="flex items-center justify-between px-2">
                 <label className="text-[10px] font-black text-[#475569] uppercase tracking-[0.3em]">Deployment Collection</label>
                 <span className="text-[10px] font-black text-[#3B82F6] hover:text-[#2563EB] cursor-pointer transition-colors uppercase tracking-widest italic">Change Matrix</span>
              </div>
              <div className="bg-[#020617] border border-white/5 rounded-2xl px-6 py-5 flex items-center justify-between text-[11px] text-white font-black hover:border-[#3B82F6]/30 transition-all cursor-pointer shadow-2xl uppercase tracking-[0.2em] italic">
                 <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <span>General Repository</span>
                 </div>
                 <ChevronRight size={18} className="text-[#334155]" />
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RecorderView;
