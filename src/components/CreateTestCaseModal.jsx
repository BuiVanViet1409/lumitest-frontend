import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

const CreateTestCaseModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    applicationUrl: '',
    scenario: '',
    steps: []
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        description: initialData.description || '',
        applicationUrl: initialData.applicationUrl || '',
        scenario: initialData.scenario || '',
        steps: (initialData.steps || []).map(s => ({
          ...s,
          selector: s.selector || '',
          value: s.value || ''
        }))
      });
    } else {
      setFormData({
        name: '',
        description: '',
        applicationUrl: '',
        scenario: '',
        steps: []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleGenerateSteps = async () => {
    if (!formData.scenario) {
      alert("Please enter a scenario first.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `/api/testcases/${formData.id}` : "/api/testcases";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name || "Untilted Test", 
          description: formData.description,
          applicationUrl: formData.applicationUrl,
          scenario: formData.scenario 
        }),
      });
      const savedTc = await res.json();
      
      // Sau đó gọi API generate
      const genRes = await fetch(`/api/testcases/${savedTc.id}/generate`, {
        method: "POST"
      });
      const generatedSteps = await genRes.json();
      
      setFormData({
        ...formData,
        id: savedTc.id,
        steps: (generatedSteps || []).map(s => ({
          ...s,
          selector: s.selector || '',
          value: s.value || ''
        }))
      });
    } catch (e) {
      console.error("Error generating steps:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { order: formData.steps.length + 1, action: 'OPEN_URL', selector: '', value: '' }]
    });
  };

  const handleRemoveStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }));
    setFormData({ ...formData, steps: newSteps });
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-800/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Plus className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">LumiTest QA - New Scenario</h2>
              <p className="text-xs text-slate-500">Define your test flow in plain English.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            <div className="space-y-6">
               <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">General Info</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Test Case Name (e.g. Facebook Login)" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:ring-2 ring-indigo-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={formData.applicationUrl}
                  onChange={(e) => setFormData({...formData, applicationUrl: e.target.value})}
                  placeholder="Target URL (https://...)" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:ring-2 ring-indigo-500/50 transition-all placeholder:text-slate-600 font-mono text-sm text-indigo-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center justify-between">
                  Scenario (Plain English)
                  <span className="text-[10px] lowercase font-normal italic">Powered by Heuristic Engine</span>
                </label>
                <textarea 
                  rows={6}
                  value={formData.scenario}
                  onChange={(e) => setFormData({...formData, scenario: e.target.value})}
                  placeholder="Ex: Open Facebook, input email abc@gmail.com, input password 123456, click login, verify homepage is visible" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:ring-2 ring-indigo-500/50 transition-all placeholder:text-slate-600 resize-none text-sm leading-relaxed"
                />
                <button 
                  onClick={handleGenerateSteps}
                  disabled={isGenerating}
                  className="w-full py-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
                >
                  {isGenerating ? <Plus className="animate-spin" size={18} /> : <Plus className="group-hover:rotate-90 transition-all" size={18} />}
                  {isGenerating ? "Analyzing..." : "Generate Automation Steps"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Generated Steps</label>
                <button 
                  onClick={handleAddStep}
                  className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-white transition-all uppercase font-bold"
                >
                  Add Step Manually
                </button>
              </div>

              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-slate-800 group animate-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-700">{step.order}</div>
                    
                    <select 
                      value={step.action}
                      onChange={(e) => handleStepChange(index, 'action', e.target.value)}
                      className="bg-slate-900 border-none rounded-xl px-2 py-1.5 text-[11px] font-bold text-indigo-400 outline-none focus:ring-1 ring-indigo-500/30"
                    >
                      <option value="OPEN_URL">OPEN</option>
                      <option value="CLICK">CLICK</option>
                      <option value="INPUT_TEXT">INPUT</option>
                      <option value="WAIT">WAIT</option>
                      <option value="ASSERT_TEXT">VERIFY</option>
                    </select>

                    <input 
                      type="text" 
                      value={step.selector || ''}
                      onChange={(e) => handleStepChange(index, 'selector', e.target.value)}
                      placeholder="Element Name" 
                      className="flex-1 bg-slate-900 border-none rounded-xl px-3 py-1.5 text-xs text-slate-300 outline-none focus:ring-1 ring-indigo-500/30 placeholder:text-slate-600"
                    />

                    <input 
                      type="text" 
                      value={step.value || ''}
                      onChange={(e) => handleStepChange(index, 'value', e.target.value)}
                      placeholder="Value" 
                      className="flex-1 bg-slate-900 border-none rounded-xl px-3 py-1.5 text-xs text-slate-300 outline-none focus:ring-1 ring-indigo-500/30 placeholder:text-slate-600"
                    />

                    <button 
                      onClick={() => handleRemoveStep(index)}
                      className="p-1.5 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all lg:opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {formData.steps.length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-600 text-sm flex flex-col items-center gap-3">
                    <Plus size={32} className="opacity-20" />
                    <p>Input scenario and click "Generate" <br/> or add steps manually.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-800 bg-slate-800/20 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Save size={18} /> Finalize & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestCaseModal;
