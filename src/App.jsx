import React, { useState, useEffect } from "react";
import TestCaseList from "./components/TestCaseList";
import ExecutionView from "./components/ExecutionView";
import { Sidebar, Header } from "./components/Layout";
import CreateTestCaseModal from "./components/CreateTestCaseModal";
import RecorderView from "./components/RecorderView";
import "./index.css";

function App() {
  const [testCases, setTestCases] = useState([]);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' or 'recorder'

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = () => {
    fetch("/api/testcases")
      .then((res) => res.json())
      .then((data) => {
        setTestCases(data || []);
        setLoading(false);
      });
  };

  const handleSaveTestCase = async (data) => {
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
    fetchTestCases();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this test case?")) {
      await fetch(`/api/testcases/${id}`, { method: "DELETE" });
      fetchTestCases();
    }
  };

  const handleEdit = async (tc) => {
    // Fetch steps first to populate modal
    const res = await fetch(`/api/testcases/${tc.id}/steps`);
    const steps = await res.json();
    setEditingTestCase({ ...tc, steps });
    setIsModalOpen(true);
  };

  const handleViewExecution = async (testCaseId) => {
    try {
      const res = await fetch(`/api/testcases/${testCaseId}/latest-execution`);
      if (res.status === 204 || res.status === 404) {
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
    <div className="min-h-screen bg-dark-950 text-slate-200 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header onNewTest={() => { setEditingTestCase(null); setIsModalOpen(true); }} />
        
        <div className="p-8 flex-1">
          {activeTab === 'recorder' ? (
            <RecorderView onBack={() => { setActiveTab('tests'); fetchTestCases(); }} />
          ) : selectedExecution ? (
            <ExecutionView
              executionId={selectedExecution}
              onBack={() => setSelectedExecution(null)}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                  <p className="text-slate-500">Manage and execute your automated test scenarios.</p>
                </div>
              </div>
              
              <TestCaseList
                testCases={testCases}
                onRun={handleRun}
                onViewExecution={handleViewExecution}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>

        <CreateTestCaseModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditingTestCase(null); }}
          onSave={handleSaveTestCase}
          initialData={editingTestCase}
        />
      </main>
    </div>
  );
}

export default App;
