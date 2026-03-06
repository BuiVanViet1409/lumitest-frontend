import React from 'react'

const TestCaseList = ({ testCases, onRun, onViewExecution }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Danh sách Test Cases</h2>
        <button className="btn-primary">Tạo Test Case mới</button>
      </div>

      <div className="test-grid">
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
