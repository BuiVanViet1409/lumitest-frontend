import React, { useState, useEffect } from 'react';
import { Play, StopCircle, Globe, ChevronRight, Save, Trash2 } from 'lucide-react';

const RecorderView = ({ onBack }) => {
  const [url, setUrl] = useState('https://www.google.com');
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [steps, setSteps] = useState([]);
  const [testName, setTestName] = useState('New Recorded Test');

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
    const res = await fetch(`/api/recorder/start?url=${encodeURIComponent(url)}`, { method: 'POST' });
    const session = await res.json();
    setSessionId(session.id);
    setIsRecording(true);
    setSteps([]);
  };

  const handleStop = async () => {
    await fetch(`/api/recorder/stop?sessionId=${sessionId}&name=${encodeURIComponent(testName)}`, { method: 'POST' });
    setIsRecording(false);
    setSessionId(null);
    alert('Recording saved as: ' + testName);
    onBack(); // Go back to dashboard to see new test
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Web Recorder</h1>
          <p className="text-slate-500">Record your interactions and transform them into automated tests.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Globe size={20} className="text-indigo-400" />
              Configuration
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target URL</label>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isRecording}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Test Case Name</label>
              <input 
                type="text" 
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <div className="pt-4">
              {!isRecording ? (
                <button 
                  onClick={handleStart}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Play size={20} fill="currentColor" />
                  Start Recording
                </button>
              ) : (
                <button 
                  onClick={handleStop}
                  className="w-full bg-rose-500 hover:bg-rose-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 animate-pulse-subtle"
                >
                  <StopCircle size={20} />
                  Stop & Save
                </button>
              )}
            </div>
          </div>

          {isRecording && (
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                <span className="text-indigo-400 font-semibold italic text-sm">Recording in progress...</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Interact with the browser window that just opened. Every click and input will be captured here.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Steps Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Live Step Feed</h3>
            <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded-lg">
              {steps.length} Actions Captured
            </span>
          </div>

          <div className="space-y-3">
            {steps.length === 0 ? (
              <div className="bg-slate-900/30 border border-dashed border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-slate-600">
                <ChevronRight size={40} className="mb-4 opacity-20" />
                <p>No actions recorded yet.</p>
              </div>
            ) : (
              steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 group hover:border-indigo-500/50 transition-all animate-slide-up"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-500 text-sm">
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 uppercase tracking-tighter">
                        {step.action}
                      </span>
                      {step.selector && (
                        <span className="text-xs font-mono text-slate-500 truncate max-w-[200px]">
                          {step.selector}
                        </span>
                      )}
                    </div>
                    {step.value && (
                      <p className="text-sm text-slate-300 mt-1 truncate">
                        Value: <span className="text-emerald-400">"{step.value}"</span>
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecorderView;
