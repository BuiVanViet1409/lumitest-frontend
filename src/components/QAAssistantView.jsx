import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Clipboard, CheckCircle2, Database, Layout, AlertCircle, Clock, Trash2, Plus, ChevronRight } from 'lucide-react';

const QAAssistantView = () => {
  const [ticketDescription, setTicketDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [savedCaseIndices, setSavedCaseIndices] = useState(new Set());

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    setSavedCaseIndices(new Set());
  }, [selectedSessionId]);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/qa/history');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
        if (data.length > 0 && !selectedSessionId) setSelectedSessionId(data[0].id);
      }
    } catch (e) { console.error(e); }
  };

  const handleAnalyze = async () => {
    if (!ticketDescription.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/qa/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: ticketDescription })
      });
      await fetchHistory();
      setTicketDescription('');
    } catch (e) { alert("Analysis failed."); } finally { setLoading(false); }
  };

  const handleDeleteSession = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Delete this analysis session?")) return;
    try {
      const res = await fetch(`/api/qa/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchHistory();
        if (selectedSessionId === id) setSelectedSessionId(null);
      }
    } catch (e) { console.error(e); }
  };

  const handleClearHistory = async () => {
    if (!confirm("Clear all analysis history?")) return;
    try {
      const res = await fetch('/api/qa/history', { method: 'DELETE' });
      if (res.ok) await fetchHistory();
    } catch (e) { console.error(e); }
  };

  const handleDeleteTestCase = (sessionId, tcIdx) => {
    // Only remove locally for this session view
    setHistory(prevHistory => prevHistory.map(session => {
      if (session.id === sessionId) {
        const newTestCases = session.result.testCases.filter((_, i) => i !== tcIdx);
        return {
          ...session,
          result: {
            ...session.result,
            testCases: newTestCases
          }
        };
      }
      return session;
    }));
  };

  const currentSession = history.find(s => s.id === selectedSessionId);

  return (
    <div className="w-full h-full flex gap-8 p-1">
      {/* Sidebar: History */}
      <aside className="w-80 bg-ent-surface/50 border border-ent-border rounded-xl flex flex-col overflow-hidden shadow-xl shrink-0">
        <div className="px-6 py-5 border-b border-ent-border bg-ent-bg/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ent-text-light">
            <Clock size={14} className="text-ent-primary" /> Analysis Log
          </div>
          <button 
            onClick={handleClearHistory}
            className="text-ent-text-light hover:text-ent-error transition-colors"
            title="Clear All History"
          >
            <Trash2 size={14} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <button 
            onClick={() => setSelectedSessionId(null)}
            className={`w-full p-4 rounded-xl flex items-center gap-3 border border-dashed transition-all ${!selectedSessionId ? 'bg-ent-primary/10 border-ent-primary text-ent-primary' : 'bg-transparent border-ent-border text-ent-text-muted hover:border-ent-text-light hover:bg-white/5'}`}
          >
            <Plus size={16} />
            <span className="text-xs font-black uppercase tracking-widest">New Analysis</span>
          </button>

          {history.map(session => (
            <button 
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all group ${selectedSessionId === session.id ? 'bg-ent-primary/10 border-ent-primary shadow-lg shadow-ent-primary/10' : 'bg-transparent border-ent-border hover:bg-white/5'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-ent-text-light font-black uppercase tracking-tighter">{session.timestamp}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="p-1 text-ent-text-light hover:text-ent-error opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                  <ChevronRight size={12} className={`transition-transform ${selectedSessionId === session.id ? 'rotate-90 text-ent-primary' : 'text-ent-text-light'}`} />
                </div>
              </div>
              <h4 className={`text-sm font-bold line-clamp-2 ${selectedSessionId === session.id ? 'text-white' : 'text-ent-text-muted group-hover:text-ent-text-main'}`}>
                {session.result.ticketTitle}
              </h4>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {!selectedSessionId ? (
          <div className="h-full bg-ent-surface/30 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-ent-primary/10 rounded-3xl flex items-center justify-center text-ent-primary mb-10 shadow-2xl shadow-ent-primary/20 animate-pulse">
              <Sparkles size={48} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">AI Requirement Engine</h2>
            <p className="text-ent-text-muted text-sm max-w-md mb-12 leading-relaxed font-medium">
              Paste your requirement or feature description. Our AI will generate structured business test cases, preconditions, and verification logic.
            </p>
            
            <div className="w-full max-w-3xl space-y-6">
              <div className="relative group">
                <textarea
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder='Example: "As a user, I want to be able to reset my password using my phone number..."'
                  className="w-full h-56 bg-ent-surface border border-ent-border rounded-2xl p-8 text-ent-text-main placeholder:text-ent-text-light outline-none focus:border-ent-primary focus:ring-4 focus:ring-ent-primary/10 transition-all resize-none text-base font-medium shadow-2xl"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-50">
                   <div className="w-2 h-2 rounded-full bg-ent-primary"></div>
                   <span className="text-[10px] uppercase font-black tracking-widest text-ent-text-light">LumiAI v4.5</span>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || !ticketDescription.trim()}
                className="w-full h-16 bg-ent-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-ent-primary/20 hover:shadow-ent-primary/40 hover:-translate-y-1 transition-all disabled:opacity-30 disabled:translate-y-0 flex items-center justify-center gap-4"
              >
                {loading ? (
                   <div className="flex items-center gap-3">
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     <span>Synthesizing Scenarios...</span>
                   </div>
                ) : (
                  <><Send size={20} className="text-white/80" /> Generate Logic Grid</>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="bg-ent-primary/20 p-2.5 rounded-xl border border-ent-primary/30">
                   <CheckCircle2 size={24} className="text-ent-primary" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-ent-text-light uppercase tracking-widest">Analysis Results</span>
                   <h3 className="text-2xl font-black text-white tracking-tight">{currentSession.result.ticketTitle}</h3>
                 </div>
              </div>
              <button 
                onClick={() => setSelectedSessionId(null)} 
                className="flex items-center gap-2 px-5 py-2.5 bg-ent-surface border border-ent-border rounded-xl text-[10px] font-black uppercase text-ent-text-muted hover:text-white hover:bg-white/5 transition-all"
              >
                <Plus size={14} /> New Request
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <div className="grid grid-cols-1 gap-8 pb-12">
                {currentSession.result.testCases.map((tc, idx) => (
                  <div key={idx} className="bg-ent-surface/60 border border-ent-border rounded-3xl p-8 shadow-2xl group hover:border-ent-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-start gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-ent-text-light uppercase tracking-[0.3em] block">Scenario #{idx + 1}</span>
                          <h4 className="text-xl font-black text-white tracking-tighter group-hover:text-ent-primary transition-colors">{tc.title}</h4>
                        </div>
                        <button 
                          onClick={() => handleDeleteTestCase(currentSession.id, idx)}
                          className="p-1.5 text-ent-text-light hover:text-ent-error bg-ent-bg/40 border border-ent-border rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          title="Remove from session"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <span className="px-4 py-1.5 bg-ent-bg/50 border border-ent-border text-ent-text-muted text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {tc.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Description & Preconditions */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-ent-text-light uppercase tracking-widest">
                          <Layout size={16} className="text-ent-info" /> Scenario Info
                        </div>
                        <div className="bg-ent-bg/40 border border-ent-border p-6 rounded-2xl space-y-3 shadow-inner">
                           <div>
                             <span className="text-[9px] font-bold text-ent-text-muted uppercase block mb-1">Description</span>
                             <p className="text-sm text-ent-text-main leading-relaxed font-medium">{tc.description}</p>
                           </div>
                           <div className="pt-2 border-t border-ent-border/30">
                              <span className="text-[9px] font-bold text-ent-text-muted uppercase block mb-1">Acceptance Criteria Mapping</span>
                              <p className="text-xs text-ent-primary font-bold">{tc.acceptanceCriteriaMapping || 'General Verification'}</p>
                           </div>
                            {tc.preconditions && (
                              <div className="pt-2 border-t border-ent-border/30">
                                <span className="text-[9px] font-bold text-ent-text-muted uppercase block mb-1">Preconditions</span>
                                <p className="text-xs text-ent-text-light italic font-medium">{tc.preconditions}</p>
                              </div>
                            )}
                        </div>
                      </div>
                      
                      {/* Business Steps Summary */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-ent-text-light uppercase tracking-widest">
                          <Database size={16} className="text-ent-success" /> Generated Steps ({tc.steps?.length || 0})
                        </div>
                        <div className="bg-ent-primary/5 border border-ent-primary/10 p-6 rounded-2xl shadow-inner max-h-[160px] overflow-y-auto custom-scrollbar">
                           <ul className="space-y-3">
                             {tc.steps?.map((step, sIdx) => (
                               <li key={sIdx} className="flex gap-3 text-xs">
                                 <span className="text-ent-primary font-black opacity-40 font-mono">{sIdx + 1}.</span>
                                 <span className="text-ent-text-main font-medium">{step.description}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-ent-border flex items-center justify-between">
                       <div className="flex gap-2">
                         <span className="text-[10px] text-ent-text-light bg-ent-bg px-3 py-1 rounded-lg border border-ent-border font-black uppercase tracking-widest">Business Level</span>
                       </div>
                       <button className="flex items-center gap-3 bg-ent-primary text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-ent-primary/30 transition-all hover:-translate-y-1 active:translate-y-0">
                         <Plus size={16} /> Import to Suite
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QAAssistantView;
