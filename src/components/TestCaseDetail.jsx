import React, { useState, useEffect } from 'react';
import { X, Play, Layers, Copy, Plus } from 'lucide-react';

const TestCaseDetail = ({ testCase, onClose, onSave, onRunNow, onDelete, onDuplicate }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (testCase) setFormData({ ...testCase });
    else setFormData(null);
  }, [testCase]);

  if (!formData) return null;

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-[500px] bg-ent-surface border-l border-ent-border shadow-2xl transform transition-transform duration-300 z-[120] flex flex-col ${testCase ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="px-8 py-6 border-b border-ent-border bg-ent-bg/40 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-ent-primary shadow-sm shadow-ent-primary/40"></div>
             <span className="text-[10px] font-black text-ent-text-light uppercase tracking-widest">Scenario Detail</span>
          </div>
          <h2 className="text-lg font-bold text-white truncate max-w-[320px]">{formData.name}</h2>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => onDuplicate(formData)} className="p-2 text-ent-text-light hover:text-ent-primary hover:bg-white/5 rounded-lg transition-all" title="Duplicate"><Copy size={18} /></button>
           <button onClick={onClose} className="p-2 text-ent-text-light hover:text-ent-error hover:bg-white/5 rounded-lg transition-all"><X size={20} /></button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
        {/* Status Strip */}
        <div className="flex items-center justify-between p-4 bg-ent-bg/20 border border-ent-border rounded-xl">
           <div className="flex flex-col gap-1">
             <span className="text-[9px] font-black text-ent-text-light uppercase tracking-tighter">Current Status</span>
             <span className={`text-xs font-black tracking-widest ${formData.lastStatus === 'PASS' ? 'text-ent-success' : 'text-ent-error'}`}>
               {formData.lastStatus || 'UNTESTED'}
             </span>
           </div>
           <button 
             onClick={() => onRunNow(formData.id)}
             className="flex items-center gap-2 bg-ent-primary text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:shadow-lg hover:shadow-ent-primary/20 transition-all active:scale-95"
           >
             <Play size={12} fill="currentColor" /> Run Now
           </button>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-ent-text-muted uppercase tracking-wider">Preconditions</label>
              <textarea 
                value={formData.preconditions || ''}
                onChange={(e) => setFormData({ ...formData, preconditions: e.target.value })}
                className="w-full bg-ent-surface border border-ent-border rounded-lg px-3 py-2 text-xs text-ent-text-main outline-none focus:border-ent-primary h-20 resize-none font-mono"
                placeholder="Initial setup requirements..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-ent-text-muted uppercase tracking-wider">Acceptance Criteria Mapping</label>
              <input 
                type="text"
                value={formData.acceptanceCriteriaMapping || ''}
                onChange={(e) => setFormData({ ...formData, acceptanceCriteriaMapping: e.target.value })}
                className="w-full bg-ent-surface border border-ent-border rounded-lg px-3 py-2 text-xs text-ent-text-main outline-none focus:border-ent-primary"
                placeholder="e.g., AC-1, AC-2"
              />
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-[10px] font-black text-ent-text-light uppercase tracking-[0.2em] flex items-center gap-2">
               <Layers size={14} className="text-ent-primary" /> Test Steps ({formData.steps?.length || 0})
             </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ent-border text-[9px] font-black text-ent-text-light uppercase tracking-tighter">
                  <th className="px-2 py-3 text-left w-10">#</th>
                  <th className="px-2 py-3 text-left min-w-[150px]">Description</th>
                  <th className="px-2 py-3 text-left">Data</th>
                  <th className="px-2 py-3 text-left w-24">Verify Type</th>
                  <th className="px-2 py-3 text-left w-10"></th>
                </tr>
              </thead>
              <tbody>
                {formData.steps?.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="border-b border-ent-border/50 group hover:bg-white/5 transition-colors">
                      <td className="px-2 py-4 align-top text-[10px] font-mono text-ent-text-light font-bold">{idx + 1}</td>
                      <td className="px-2 py-4 align-top">
                        <textarea 
                          value={step.description || ''}
                          onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-xs text-white outline-none resize-none overflow-hidden h-8 focus:h-20 transition-all font-medium"
                          placeholder="Action description..."
                        />
                      </td>
                      <td className="px-2 py-4 align-top">
                        <input 
                          type="text"
                          value={step.testData || ''}
                          onChange={(e) => handleStepChange(idx, 'testData', e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-xs text-ent-text-light outline-none"
                          placeholder="Data..."
                        />
                      </td>
                      <td className="px-2 py-4 align-top">
                        <select 
                          value={step.verificationType || 'UI'}
                          onChange={(e) => handleStepChange(idx, 'verificationType', e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-[10px] font-black text-ent-primary outline-none cursor-pointer uppercase tracking-tight"
                        >
                          <option value="UI" className="bg-ent-surface">UI</option>
                          <option value="API" className="bg-ent-surface">API</option>
                          <option value="DATABASE" className="bg-ent-surface">DB</option>
                          <option value="MESSAGE" className="bg-ent-surface">MSG</option>
                        </select>
                      </td>
                      <td className="px-2 py-4 align-top text-right">
                        <button className="text-ent-text-muted hover:text-ent-error transition-colors"><X size={14} /></button>
                      </td>
                    </tr>
                    <tr className="border-b border-ent-border/30 bg-ent-bg/5">
                      <td></td>
                      <td colSpan="4" className="px-2 py-3 space-y-3">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <label className="text-[8px] font-black text-ent-text-muted uppercase tracking-tighter">Expected Result</label>
                               <textarea 
                                 value={step.expectedResult || ''}
                                 onChange={(e) => handleStepChange(idx, 'expectedResult', e.target.value)}
                                 className="w-full bg-ent-bg/40 border border-ent-border/50 rounded-lg px-2 py-1.5 text-[11px] text-ent-text-main outline-none focus:border-ent-primary resize-none h-12"
                                 placeholder="What should happen?"
                               />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[8px] font-black text-ent-text-muted uppercase tracking-tighter">Verification Rule (Config)</label>
                               <textarea 
                                 value={step.verificationRule || ''}
                                 onChange={(e) => handleStepChange(idx, 'verificationRule', e.target.value)}
                                 className="w-full bg-ent-bg/40 border border-ent-border/50 rounded-lg px-2 py-1.5 text-[11px] text-ent-text-main outline-none focus:border-ent-primary resize-none h-12 font-mono"
                                 placeholder="e.g., endpoint: /api/status, status: 200"
                               />
                            </div>
                         </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            
            <button className="w-full py-4 mt-4 border border-dashed border-ent-border rounded-xl text-[10px] font-black uppercase tracking-widest text-ent-text-light hover:border-ent-primary hover:text-ent-primary transition-all flex items-center justify-center gap-2 bg-ent-surface/50">
              <Plus size={14} /> Add Test Step
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-8 bg-ent-bg/40 border-t border-ent-border flex items-center justify-between">
        <button 
          onClick={() => onDelete(formData.id)}
          className="text-[10px] font-black text-ent-error uppercase tracking-widest hover:underline"
        >
          Delete Scenario
        </button>
        <button 
          onClick={() => onSave(formData)}
          className="bg-ent-primary text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-ent-primary/20 hover:shadow-ent-primary/40 transition-all active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TestCaseDetail;
