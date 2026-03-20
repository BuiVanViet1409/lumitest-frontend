import React, { useState, useEffect } from "react";
import Sidebar from './components/Sidebar';
import CreateTestCaseModal from "./components/CreateTestCaseModal";
import RecorderView from "./components/RecorderView";
import ExecutionView from "./components/ExecutionView";
import TestCaseList from './components/TestCaseList';
import TestCaseDetail from './components/TestCaseDetail';
import ReleaseView from './components/ReleaseView';
import QAAssistantView from './components/QAAssistantView';
import GenerateTestCase from './components/GenerateTestCase';
import EnvironmentSelector from './components/EnvironmentSelector';
import { Plus, Search, Bell, Shield, Sparkles, User, Globe2, ChevronDown, Layout, Beaker, Package, FileText, Command, Cpu, Terminal, Activity, Zap, Leaf } from "lucide-react";
import "./index.css";

function App() {
  const [testCases, setTestCases] = useState([]);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tests'); 
  const [selectedEnv, setSelectedEnv] = useState('SIT'); 
  const [recordingContext, setRecordingContext] = useState(null);
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('All');

  useEffect(() => {
    if (activeTab === 'tests') {
      fetchTestCases(page, selectedFolder, pageSize);
      fetchFolders();
    }
  }, [page, selectedFolder, pageSize, activeTab]);

  const fetchFolders = async () => {
    try {
      const res = await fetch('/api/folders');
      const data = await res.json();
      setFolders(data || []);
    } catch (e) {
      console.error("Error fetching folders:", e);
    }
  };

  const fetchTestCases = async (pageNum = 0, folder = 'All', size = 10) => {
    try {
      setLoading(true);
      const folderParam = folder !== 'All' ? `&folder=${encodeURIComponent(folder)}` : '';
      const res = await fetch(`/api/testcases?page=${pageNum}&size=${size}${folderParam}`);
      const data = await res.json();
      setTestCases(data.content || []);
      setTotalPages(data.totalPages || 0);
      setSelectedIds([]);
    } catch (e) {
      console.error("Error fetching test cases:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTestCase = async (data) => {
    try {
      const { id, steps, ...tcData } = data;
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/testcases/${id}` : "/api/testcases";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tcData),
      });
      const savedTc = await res.json();
      
      if (steps && steps.length > 0) {
        await fetch(`/api/testcases/${savedTc.id}/steps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(steps),
        });
      }
      setEditingTestCase(null);
      setIsCreateModalOpen(false);
      setSelectedTestCase(null);
      fetchTestCases(page, selectedFolder, pageSize);
      fetchFolders();
    } catch (e) {
      console.error("Error saving test case:", e);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Archiving this scenario will remove it from the active neural grid. Proceed?")) {
      await fetch(`/api/testcases/${id}`, { method: "DELETE" });
      setSelectedTestCase(null);
      fetchTestCases(page, selectedFolder, pageSize);
      fetchFolders();
    }
  };

  const handleRun = async (testCaseId) => {
    try {
      const res = await fetch(`/api/testcases/${testCaseId}/run`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ environment: selectedEnv })
      });
      const execution = await res.json();
      setSelectedExecution(execution.id);
    } catch (e) {
      console.error("Execution failed:", e);
    }
  };

  const handleSelectTestCase = async (tc) => {
    try {
      const res = await fetch(`/api/testcases/${tc.id}/steps`);
      const steps = await res.json();
      setSelectedTestCase({ ...tc, steps });
    } catch (e) {
      console.error("Error fetching steps:", e);
      setSelectedTestCase(tc);
    }
  };

  const handleDuplicateTestCase = (tc) => {
    setEditingTestCase({ ...tc, id: null, name: `${tc.name} (Cloned Matrix)` });
    setIsCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans flex text-[#F8FAFC] overflow-hidden antialiased">
      <Sidebar 
        folders={folders} 
        activeFolder={selectedFolder} 
        onSelectFolder={(f) => { 
          setSelectedFolder(f); 
          setPage(0); 
          setSelectedTestCase(null); 
          setActiveTab('tests');
        }} 
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#020617] overflow-hidden relative">
        {/* Midnight Glow Backdrop */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#3B82F6]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#818CF8]/3 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* High-Editorial Dark Header */}
        <header className="h-24 px-16 flex items-center justify-between border-b border-white/5 bg-[#020617]/80 backdrop-blur-3xl z-[100] sticky top-0 shadow-2xl">
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-5 group cursor-pointer">
               <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-[1.25rem] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:rotate-[25deg] transition-all duration-700">
                  <Cpu className="text-white" size={28} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none italic">LUMITEST <span className="text-[#3B82F6] text-[10px] align-top font-black not-italic ml-1 tracking-[0.3em] px-2.5 py-1 border border-[#3B82F6]/30 rounded-full bg-[#3B82F6]/10">ONYX</span></span>
                  <span className="text-[10px] font-black text-[#475569] mt-2 uppercase tracking-[0.4em]">Neural Intelligence Node</span>
               </div>
            </div>
            
            <nav className="flex items-center gap-12 ml-4">
              {[
                { id: 'dashboard', label: 'Matrix', icon: Command },
                { id: 'releases', label: 'Ecosystem', icon: Package },
                { id: 'tests', label: 'Library', icon: Beaker },
                { id: 'generate', label: 'Synthesis', icon: Sparkles }
              ].map(tab => (
                <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`relative py-8 text-[12px] font-black transition-all flex items-center gap-3 uppercase tracking-[0.3em] ${activeTab === tab.id ? 'text-white' : 'text-[#64748B] hover:text-[#94A39B]'}`}
                >
                  <tab.icon size={18} strokeWidth={activeTab === tab.id ? 3 : 2} className={activeTab === tab.id ? 'text-[#3B82F6]' : ''} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3B82F6] rounded-t-full shadow-[0_0_15px_rgba(59,130,246,0.8)] indicator-elite" />
                  )}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-8">
            <EnvironmentSelector selected={selectedEnv} onSelect={setSelectedEnv} />
            
            <div className="w-px h-10 bg-white/5 mx-2" />
            
            <div className="flex items-center gap-5 cursor-pointer group px-2">
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-[#475569] uppercase tracking-[0.5em] leading-none mb-1.5">Authorized</span>
                  <span className="text-sm font-black text-white tracking-tight italic uppercase">Onyx Admin</span>
               </div>
                <div className="w-12 h-12 rounded-[1.25rem] border-2 border-white/10 overflow-hidden group-hover:border-[#3B82F6]/50 transition-all duration-700 shadow-2xl p-0.5 bg-slate-900 shadow-blue-500/5">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Onyx" className="w-full h-full object-cover rounded-[1rem]" alt="User" />
               </div>
            </div>
          </div>
        </header>

        {/* Obsidian Content Canvas */}
        <main className="flex-1 overflow-hidden relative bg-transparent px-16 pb-16 pt-10">
           <div className="h-full flex flex-col relative animate-premium-in">
              {/* Ultra-Dark Glass Container */}
              <div className="flex-1 bg-[#0B0E14]/40 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden relative z-10 flex flex-col">
                 <div className="flex-1 overflow-hidden relative flex flex-col">
                    {activeTab === 'dashboard' && (
                      <div className="flex-1 flex flex-col items-center justify-center p-24 text-center space-y-12 animate-premium-in">
                         <div className="w-40 h-40 bg-[#020617] rounded-[3.5rem] flex items-center justify-center shadow-2xl border border-white/5 relative group overflow-hidden">
                             <Activity size={80} className="text-[#3B82F6]/20 group-hover:scale-110 group-hover:text-[#3B82F6] transition-all duration-1000" />
                             <div className="absolute inset-0 bg-[#3B82F6] blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
                          </div>
                         <div className="space-y-6 max-w-xl">
                            <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none mb-2">Neural Matrix <br/> Monitoring</h2>
                            <p className="text-lg font-bold text-[#64748B] leading-relaxed uppercase tracking-widest opacity-80">The structural integrity of your SIT clusters is being analyzed. Real-time telemetry will stream here.</p>
                         </div>
                          <button className="px-12 py-5 bg-[#3B82F6] text-white rounded-[2rem] font-black shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:translate-y-[-4px] active:scale-95 transition-all tracking-[0.2em] uppercase text-sm">Synchronize Grid</button>
                      </div>
                    )}

                    {activeTab === 'tests' && (
                      <TestCaseList 
                        testCases={testCases} 
                        onSelectTestCase={handleSelectTestCase} 
                        onRunTest={handleRun} 
                      />
                    )}

                    {activeTab === 'releases' && <ReleaseView />}
                    {activeTab === 'ai-assistant' && <QAAssistantView />}
                    {activeTab === 'generate' && <GenerateTestCase />}
                    
                    {activeTab === 'recorder' && (
                      <RecorderView 
                        onBack={() => { setActiveTab('tests'); setRecordingContext(null); fetchTestCases(page, selectedFolder, pageSize); fetchFolders(); }} 
                        initialContext={recordingContext}
                      />
                    )}

                    {selectedExecution && (
                      <ExecutionView 
                        executionId={selectedExecution} 
                        onBack={() => setSelectedExecution(null)} 
                      />
                    )}
                 </div>
              </div>

              {/* Obsidian Inspector Panel Overlay */}
              {selectedTestCase && (
                <div className="absolute inset-y-0 right-0 w-[650px] z-[200] overflow-hidden rounded-l-[4rem] flex shadow-[-80px_0_150px_rgba(0,0,0,0.8)] border-l border-white/5">
                   <TestCaseDetail 
                     testCase={selectedTestCase} 
                     onClose={() => setSelectedTestCase(null)}
                     onSave={handleSaveTestCase}
                     onDelete={handleDelete}
                     onRun={handleRun}
                     onDuplicate={handleDuplicateTestCase}
                   />
                </div>
              )}
           </div>
        </main>
      </div>

      <CreateTestCaseModal
        isOpen={isCreateModalOpen || !!editingTestCase}
        initialData={editingTestCase}
        folders={folders}
        onClose={() => { setIsCreateModalOpen(false); setEditingTestCase(null); }}
        onSave={handleSaveTestCase}
        onRecord={(context) => {
          setRecordingContext(context);
          setActiveTab('recorder');
          setIsCreateModalOpen(false);
          setEditingTestCase(null);
        }}
      />
    </div>
  );
}

export default App;
