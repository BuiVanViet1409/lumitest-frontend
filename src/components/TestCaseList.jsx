import React from 'react'

const TestCaseList = ({ testCases, onRun, onViewExecution }) => {
  const handleRecord = async () => {
    const url = prompt("Nhập URL website bạn muốn ghi hình:");
    if (!url) return;
    
    alert("Trình duyệt sẽ mở ra. Bạn hãy thực hiện các thao tác (click, nhập liệu) rồi ĐÓNG TRÌNH DUYỆT để hoàn tất ghi hình.");
    
    try {
      const response = await fetch(`/api/testcases/record?url=${encodeURIComponent(url)}`, { method: 'POST' });
      const steps = await response.json();
      
      if (steps && steps.length > 0) {
        const name = prompt("Ghi hình xong! Nhập tên cho Test Case này:", "Ghi hình tự động - " + new Date().toLocaleTimeString());
        if (name) {
          await fetch('/api/testcases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, applicationUrl: url, steps, description: "Được tạo tự động từ Recorder" })
          });
          window.location.reload();
        }
      } else {
        alert("Không ghi nhận được bước nào. Vui lòng thử lại.");
      }
    } catch (e) {
      alert("Lỗi khi ghi hình: " + e.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Danh sách Kịch bản</h2>
        <button className="btn-primary" onClick={handleRecord}>+ Ghi hình Test mới (Recorder)</button>
      </div>

      <div className="test-case-grid">
        {testCases.map(tc => (
          <div key={tc.id} className="glass-card">
            <h3>{tc.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', minHeight: '3rem' }}>{tc.description}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => onRun(tc.id)}>
                Chạy Test ngay
              </button>
              <button 
                style={{ background: 'transparent', border: '1px solid #475569', color: 'white', borderRadius: '0.5rem', padding: '0 1rem' }}
                onClick={() => onViewExecution(tc.id)}
              >
                Kết quả
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestCaseList
