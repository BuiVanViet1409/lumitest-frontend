import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CreateTestCaseModal from "./components/CreateTestCaseModal";
import RecorderView from "./components/RecorderView";
import ExecutionView from "./components/ExecutionView";
import TestCaseList from "./components/TestCaseList";
import QAAssistantView from "./components/QAAssistantView";
import TestCaseDetail from "./components/TestCaseDetail";
import { Plus, Search, Bell, Shield, Sparkles, User } from "lucide-react";
import "./index.css";

function App() {
  const [testCases, setTestCases] = useState([]);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' or 'recorder'
  const [recordingContext, setRecordingContext] = useState(null);
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('All');

  useEffect(() => {
    fetchTestCases(page, selectedFolder, pageSize);
    fetchFolders();
  }, [page, selectedFolder, pageSize]);

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
      alert("Failed to save test case.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this test case?")) {
      await fetch(`/api/testcases/${id}`, { method: "DELETE" });
      setSelectedTestCase(null);
      fetchTestCases(page, selectedFolder, pageSize);
      fetchFolders();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} selected test cases? This action cannot be undone.`)) {
      try {
        await fetch('/api/testcases/bulk', {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedIds)
        });
        fetchTestCases(page, selectedFolder, pageSize);
        fetchFolders();
      } catch (e) {
        console.error("Bulk delete failed:", e);
        alert("Failed to delete selected test cases.");
      }
    }
  };

  const handleEdit = async (tc) => {
    try {
      const res = await fetch(`/api/testcases/${tc.id}/steps`);
      const steps = await res.json();
      setEditingTestCase({ ...tc, steps });
      setIsCreateModalOpen(true);
    } catch (e) {
      console.error("Error fetching steps:", e);
      setEditingTestCase(tc);
      setIsCreateModalOpen(true);
    }
  };

  const handleViewExecution = async (testCaseId) => {
    try {
      const res = await fetch(`/api/testcases/${testCaseId}/latest-execution`);
      if (!res.ok) {
         alert("No execution found for this test case. Please run it first.");
         return;
      }
      const execution = await res.json();
      if (execution && execution.id) {
        setSelectedExecution(execution.id);
      } else {
        alert("No execution found for this test case. Please run it first.");
      }
    } catch (e) {
      console.error("Error fetching latest execution:", e);
      alert("Could not load report. Please try again.");
    }
  };

  const handleRun = async (testCaseId) => {
    try {
      const res = await fetch(`/api/testcases/${testCaseId}/run`, { method: "POST" });
      const execution = await res.json();
      setSelectedExecution(execution.id);
    } catch (e) {
      alert("Lỗi khi chạy test: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-ent-bg font-sans flex text-ent-text-main">
      <Sidebar 
        folders={folders} 
        selectedFolder={selectedFolder} 
        onSelectFolder={(f) => { setSelectedFolder(f); setPage(0); setSelectedTestCase(null); }} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Header - Dark Enterprise Style */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-ent-border bg-ent-surface/50 backdrop-blur-xl z-20">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-ent-primary to-[#9F8FFF] rounded-xl flex items-center justify-center shadow-lg shadow-ent-primary/20 group-hover:scale-105 transition-transform">
                <Shield className="text-white" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter text-white uppercase italic">LumiTest</span>
                <span className="text-[10px] font-bold text-ent-primary uppercase tracking-[0.2em] -mt-1">Enterprise QA</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => { setActiveTab('tests'); setSelectedFolder('All'); setPage(0); }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'tests' && selectedFolder !== 'QA_ASSISTANT' ? 'bg-ent-primary/10 text-ent-primary shadow-sm shadow-ent-primary/5' : 'text-ent-text-muted hover:text-ent-text-main hover:bg-white/5'}`}
              >
                Test Cases
              </button>
              <button 
                onClick={() => { setSelectedFolder('QA_ASSISTANT'); setPage(0); }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${selectedFolder === 'QA_ASSISTANT' ? 'bg-ent-primary text-white shadow-lg shadow-ent-primary/20' : 'text-ent-text-muted hover:text-ent-primary hover:bg-ent-primary/5'}`}
              >
                <Sparkles size={16} className={selectedFolder === 'QA_ASSISTANT' ? 'animate-pulse' : ''} />
                AI Assistant
              </button>
            </nav>

            <div className="relative group ml-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ent-text-light group-focus-within:text-ent-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search test cases..." 
                className="w-80 bg-ent-bg/50 border border-ent-border rounded-xl py-2.5 pl-12 pr-4 text-sm text-ent-text-main placeholder:text-ent-text-light focus:outline-none focus:border-ent-primary/50 focus:bg-ent-surface transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-ent-text-muted hover:text-ent-text-main transition-all relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-ent-error rounded-full border-2 border-ent-surface"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-ent-border cursor-pointer group">
              <div className="text-right flex flex-col justify-center">
                <span className="text-xs font-bold text-ent-text-main group-hover:text-ent-primary transition-colors">Quang Nguyen</span>
                <span className="text-[10px] text-ent-text-light font-medium uppercase tracking-wider">QA Manager</span>
              </div>
              <div className="w-10 h-10 bg-ent-surface border border-ent-border rounded-xl flex items-center justify-center text-ent-primary hover:bg-ent-primary hover:text-white transition-all cursor-pointer shadow-sm">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dash/Tool Sub-Header */}
        <div className="px-10 py-8 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tight uppercase tracking-[0.1em]">
              {selectedFolder === 'QA_ASSISTANT' ? 'AI Scenario Navigator' : 'Test Library'}
            </h1>
            <p className="text-xs text-ent-text-muted font-medium mt-1">
              {selectedFolder === 'QA_ASSISTANT' ? 'Generate advanced test scenarios with LumiAI' : `Managing ${testCases.length} test scenarios in ${selectedFolder}`}
            </p>
          </div>
          <button
            onClick={() => { setEditingTestCase(null); setIsCreateModalOpen(true); }}
            className="flex items-center gap-2 bg-ent-primary text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-ent-primary/20 hover:shadow-ent-primary/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={16} />
            New Test Case
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex min-h-0 overflow-hidden px-10 pb-8">
          <main className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'recorder' ? (
                <RecorderView 
                  onBack={() => { setActiveTab('tests'); setRecordingContext(null); fetchTestCases(page, selectedFolder, pageSize); fetchFolders(); }} 
                  initialContext={recordingContext}
                />
              ) : selectedExecution ? (
                <ExecutionView 
                  executionId={selectedExecution} 
                  onBack={() => setSelectedExecution(null)} 
                />
              ) : selectedFolder === 'QA_ASSISTANT' ? (
                <div className="h-full bg-ent-surface ring-1 ring-ent-border rounded-2xl overflow-hidden shadow-2xl">
                   <QAAssistantView />
                </div>
              ) : (
                <TestCaseList 
                  testCases={testCases} 
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  selectedIds={selectedIds}
                  selectedTestCaseId={selectedTestCase?.id}
                  onPageChange={(newPage) => setPage(newPage)}
                  onPageSizeChange={(newSize) => { setPageSize(newSize); setPage(0); }}
                  onSelectionChange={setSelectedIds}
                  onBulkDelete={handleBulkDelete}
                  onRun={handleRun}
                  onViewExecution={handleViewExecution}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSelectTestCase={setSelectedTestCase}
                />
              )}
            </div>
          </main>

          {/* Slide-in Detail Panel Overlay Context */}
          {selectedTestCase && (
            <TestCaseDetail 
              testCase={selectedTestCase}
              onClose={() => setSelectedTestCase(null)}
              onSave={handleSaveTestCase}
              onDelete={handleDelete}
              onRun={handleRun}
              onDuplicate={(tc) => { setEditingTestCase({ ...tc, id: null, name: `${tc.name} (Copy)` }); setIsCreateModalOpen(true); }}
            />
          )}
        </div>
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

