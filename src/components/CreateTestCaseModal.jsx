import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Sparkles } from 'lucide-react';

const CreateTestCaseModal = ({ isOpen, onClose, onSave, onRecord, initialData, folders = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    applicationUrl: '',
    scenario: '',
    folder: 'General',
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
        folder: initialData.folder || 'General',
        steps: (initialData.steps || []).map(s => ({
          ...s,
          description: s.description || '',
          testData: s.testData || ''
        }))
      });
    } else {
      setFormData({ name: '', description: '', applicationUrl: '', scenario: '', folder: 'General', steps: [] });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleGenerateSteps = async () => {
    if (!formData.scenario) return;
    setIsGenerating(true);
    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `/api/testcases/${formData.id}` : "/api/testcases";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const savedTc = await res.json();
      const genRes = await fetch(`/api/testcases/${savedTc.id}/generate`, { method: "POST" });
      const generatedSteps = await genRes.json();
      setFormData({ ...formData, id: savedTc.id, steps: generatedSteps || [] });
    } catch (e) { console.error(e); } finally { setIsGenerating(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-ent-surface border border-ent-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-ent-border bg-ent-bg/50">
           <h2 className="text-lg font-black text-white tracking-tight uppercase">{formData.id ? 'Edit Scenario' : 'New Test Scenario'}</h2>
           <button onClick={onClose} className="text-ent-text-light hover:text-white transition-colors">
             <X size={20} />
           </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6 overflow-y-auto custom-scrollbar max-h-[80vh]">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-ent-text-muted uppercase tracking-widest">Test Case Name</label>
              <input 
                type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. User Login Validation" 
                className="w-full bg-ent-bg border border-ent-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-ent-primary/50 focus:ring-4 focus:ring-ent-primary/5 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-ent-text-muted uppercase tracking-widest">Application URL</label>
              <input 
                type="text" value={formData.applicationUrl}
                onChange={(e) => setFormData({...formData, applicationUrl: e.target.value})}
                placeholder="https://app.example.com" 
                className="w-full bg-ent-bg border border-ent-border rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-ent-primary/50 focus:ring-4 focus:ring-ent-primary/5 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-ent-text-muted uppercase tracking-widest flex items-center justify-between">
                Scenario Description
                <span className="text-[9px] font-normal italic lowercase text-ent-text-light tracking-normal">AI analyzes this for steps</span>
              </label>
              <textarea 
                rows={4} value={formData.scenario}
                onChange={(e) => setFormData({...formData, scenario: e.target.value})}
                placeholder="Describe the test flow in plain English..." 
                className="w-full bg-ent-bg border border-ent-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-ent-text-light/30 outline-none focus:border-ent-primary/50 focus:ring-4 focus:ring-ent-primary/5 transition-all resize-none font-medium h-32"
              />
              <button 
                type="button" onClick={handleGenerateSteps}
                disabled={isGenerating || !formData.scenario}
                className="w-full py-3 bg-ent-primary/10 border border-ent-primary/20 rounded-xl font-black text-[10px] uppercase tracking-widest text-ent-primary hover:bg-ent-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
                {isGenerating ? "Analyzing Scenario..." : "Generate Magic Steps"}
              </button>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-ent-text-muted uppercase tracking-widest">Folder / Collection</label>
              <select 
                value={formData.folder}
                onChange={(e) => setFormData({...formData, folder: e.target.value})}
                className="w-full bg-ent-bg border border-ent-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-ent-primary/50 transition-all font-bold appearance-none"
              >
                <option value="General">General</option>
                {folders.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between gap-4 border-t border-ent-border">
            <button 
              type="button" onClick={onClose}
              className="text-[10px] font-black uppercase text-ent-text-muted hover:text-white transition-colors tracking-widest"
            >
              Cancel
            </button>
            <div className="flex gap-4">
               <button
                 type="submit"
                 className="bg-ent-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-ent-primary/20 hover:shadow-ent-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
               >
                 {formData.id ? 'Update Scenario' : 'Create Scenario'}
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestCaseModal;
