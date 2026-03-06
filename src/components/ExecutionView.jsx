import React, { useState, useEffect } from 'react'

const ExecutionView = ({ executionId, onBack }) => {
  const [execution, setExecution] = useState(null)

  useEffect(() => {
    // Giả lập polling dữ liệu report
    const fetchReport = () => {
      fetch(`/api/executions/${executionId}/report`)
        .then(res => res.json())
        .then(data => setExecution(data))
    }

    fetchReport()
    const interval = setInterval(fetchReport, 3000)
    return () => clearInterval(interval)
  }, [executionId])

  if (!execution) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Đang tải kết quả kiểm thử...</div>

  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', marginBottom: '1rem' }}>
        &larr; Quay lại danh sách
      </button>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Báo cáo: {execution.testCaseName}</h2>
          <span className={`status-badge status-${execution.status.toLowerCase()}`}>
            {execution.status}
          </span>
        </div>
        <p style={{ color: '#94a3b8' }}>Bắt đầu: {new Date(execution.startTime).toLocaleString()}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {execution.results.map((res, index) => (
          <div key={res.id} className="glass-card" style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: '#38bdf8' }}>Bước {index + 1}: {res.action}</h4>
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Vị trí (Selector): <code>{res.selector}</code></p>
              <div className={`status-badge status-${res.status.toLowerCase()}`} style={{ display: 'inline-block' }}>
                {res.status === 'PASS' ? 'THÀNH CÔNG' : 'THẤT BẠI'}
              </div>
              {res.errorMessage && (
                <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '0.25rem' }}>
                  {res.errorMessage}
                </p>
              )}
            </div>
            <div style={{ width: '400px' }}>
              <img 
                src={`/api/screenshots/${executionId}/${res.screenshotPath}`} 
                alt="Bằng chứng ảnh chụp" 
                className="screenshot-preview"
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x225?text=Khong+co+anh+chup'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExecutionView
