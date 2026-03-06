import React, { useState, useEffect } from "react";
import TestCaseList from "./components/TestCaseList";
import ExecutionView from "./components/ExecutionView";
import "./index.css";

function App() {
  const [testCases, setTestCases] = useState([]);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testcases")
      .then((res) => res.json())
      .then((data) => {
        setTestCases(data);
        setLoading(false);
      });
  }, []);

  const handleRun = async (testCaseId) => {
    const res = await fetch(`/api/executions/run/${testCaseId}`, {
      method: "POST",
    });
    const text = await res.text();
    alert(text);
    // In a real app, we would poll for execution status or use WebSockets
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "3rem",
            background: "linear-gradient(to right, #6366f1, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LumiTest QA
        </h1>
        <p style={{ color: "#94a3b8" }}>Nền tảng Kiểm thử Tự động dành cho QA chuyên nghiệp</p>
      </header>

      {selectedExecution ? (
        <ExecutionView
          executionId={selectedExecution}
          onBack={() => setSelectedExecution(null)}
        />
      ) : (
        <TestCaseList
          testCases={testCases}
          onRun={handleRun}
          onViewExecution={(id) => setSelectedExecution(id)}
        />
      )}
    </div>
  );
}

export default App;
