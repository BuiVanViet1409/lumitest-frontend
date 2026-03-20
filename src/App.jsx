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
import ConfigInspectorView from './components/ConfigInspectorView';
import { Plus, Search, Bell, Shield, Sparkles, User, Globe2, ChevronDown, Layout, Beaker, Package, FileText, Command, Cpu, Terminal, Activity, Zap, Leaf, Database } from "lucide-react";
import "./index.css";
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { lang, toggleLanguage, t } = useLanguage();
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
    <div className="min-h-screen bg-white font-sans flex text-slate-900 overflow-hidden antialiased">
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

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden relative">
        {/* Subtle Backdrop Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        {/* Refined Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl z-[100] sticky top-0 shadow-sm">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab('tests')}>
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                  <Terminal className="text-white" size={20} strokeWidth={2.5} />
               </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900 tracking-tight uppercase leading-none">LUMITEST <span className="text-indigo-600 text-[9px] align-top font-bold ml-1 tracking-wider px-2 py-0.5 border border-indigo-200 rounded-md bg-indigo-50">PRO</span></span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t('common.automationEngine')}</span>
               </div>
            </div>
            
            <nav className="flex items-center gap-8 ml-4">
              {[
                { id: 'dashboard', label: t('sidebar.settings'), icon: Activity },
                { id: 'releases', label: t('sidebar.releases'), icon: Package },
                { id: 'tests', label: t('sidebar.testCases'), icon: Beaker },
                { id: 'generate', label: t('sidebar.generate'), icon: Sparkles },
                { id: 'inspector', label: t('sidebar.dataDiscovery'), icon: Database }
              ].map(tab => (
                <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`relative py-5 text-[11px] font-bold transition-all flex items-center gap-2.5 uppercase tracking-wider ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <tab.icon size={16} strokeWidth={activeTab === tab.id ? 2.5 : 2} className={activeTab === tab.id ? 'text-indigo-600' : ''} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full shadow-[0_0_10px_rgba(79,70,229,0.2)]" />
                  )}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-[10px] font-bold uppercase tracking-widest text-slate-600 shadow-sm"
            >
              <Globe2 size={14} className="text-indigo-500" />
              {lang === 'en' ? 'EN' : 'VI'}
            </button>

            <EnvironmentSelector selected={selectedEnv} onSelect={setSelectedEnv} />
            
            <div className="w-px h-8 bg-slate-200 mx-1" />
            
            <div className="flex items-center gap-4 cursor-pointer group px-1">
               <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{t('common.authenticated')}</span>
                  <span className="text-xs font-bold text-slate-900 tracking-tight uppercase">{t('common.admin')}</span>
               </div>
                <div className="w-10 h-10 rounded-xl border border-slate-200 overflow-hidden group-hover:border-indigo-600/40 transition-all duration-300 shadow-sm p-0.5 bg-white">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=UX" className="w-full h-full object-cover rounded-lg" alt="User" />
               </div>
            </div>
          </div>
        </header>

        {/* Global Content Canvas */}
        <main className="flex-1 overflow-hidden relative bg-transparent px-8 pb-8 pt-6">
           <div className="h-full flex flex-col relative animate-premium-in">
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative z-10 flex flex-col">
                 <div className="flex-1 overflow-hidden relative flex flex-col">
                    {activeTab === 'dashboard' && (
                      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8 animate-premium-in">
                         <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center shadow-md border border-slate-100 relative group overflow-hidden">
                             <Activity size={40} className="text-slate-300 group-hover:scale-110 group-hover:text-indigo-600 transition-all duration-500" />
                          </div>
                         <div className="space-y-4 max-w-md">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight uppercase leading-none mb-1">{t('dashboard.telemetryTitle')}</h2>
                            <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-widest">{t('dashboard.telemetryDesc')}</p>
                         </div>
                          <button className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all tracking-wider uppercase text-xs">{t('dashboard.syncGrid')}</button>
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
                    {activeTab === 'inspector' && <ConfigInspectorView />}
                    
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

              {/* Inspector Panel Overlay */}
              {selectedTestCase && (
                <div className="absolute inset-y-0 right-0 w-[600px] z-[200] overflow-hidden rounded-l-2xl flex shadow-2xl border-l border-slate-200 bg-white">
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

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
