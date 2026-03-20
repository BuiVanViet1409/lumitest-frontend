import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Sparkles, Globe2, FileText, Cpu, ChevronDown } from 'lucide-react';

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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#0B0E14] border border-white/5 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-[#020617]/50">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 text-white">
                 <FileText size={24} />
              </div>
              <div>
                 <h2 className="text-xl font-black text-white tracking-tight uppercase italic">{formData.id ? 'Refine Scenario' : 'Architect New Neural Scenario'}</h2>
                 <p className="text-[10px] text-[#475569] font-black mt-0.5 uppercase tracking-widest italic">Blueprint Definition Onyx v4.0</p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all text-[#475569] hover:text-white active:scale-90 border border-transparent hover:border-white/5">
             <X size={24} />
           </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-10 py-10 space-y-8 overflow-y-auto custom-scrollbar max-h-[70vh]">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#475569] uppercase tracking-widest px-1">Scenario Designation</label>
              <input 
                type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Optimized Checkout Validation" 
                className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#3B82F6]/50 focus:ring-[15px] focus:ring-[#3B82F6]/5 transition-all font-black placeholder-[#334155] italic uppercase tracking-tight"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#475569] uppercase tracking-widest px-1">Target Cluster URL</label>
              <div className="relative group">
                 <Globe2 size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#3B82F6] transition-colors" />
                 <input 
                   type="text" value={formData.applicationUrl}
                   onChange={(e) => setFormData({...formData, applicationUrl: e.target.value})}
                   placeholder="https://cluster.alpha-sit.com" 
                   className="w-full bg-[#020617] border border-white/5 rounded-2xl pl-16 pr-6 py-4 text-[#3B82F6] font-black outline-none focus:border-[#3B82F6]/50 focus:ring-[15px] focus:ring-[#3B82F6]/5 transition-all placeholder-[#334155] italic"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#475569] uppercase tracking-widest flex items-center justify-between px-1">
                Cognitive Blueprint Query
                <span className="text-[9px] font-black text-[#3B82F6] bg-[#3B82F6]/5 px-3 py-1 rounded-full border border-[#3B82F6]/20 uppercase tracking-widest italic">Neural Engine Active</span>
              </label>
              <div className="space-y-4">
                 <textarea 
                   rows={4} value={formData.scenario}
                   onChange={(e) => setFormData({...formData, scenario: e.target.value})}
                   placeholder="Describe the test logic in high-level business sequence..." 
                   className="w-full bg-[#020617] border border-white/5 rounded-[2rem] px-6 py-5 text-white placeholder:text-[#334155] outline-none focus:border-[#3B82F6]/50 focus:ring-[15px] focus:ring-[#3B82F6]/5 transition-all resize-none font-medium h-32 custom-scrollbar italic"
                 />
                 <button 
                   type="button" onClick={handleGenerateSteps}
                   disabled={isGenerating || !formData.scenario}
                   className="w-full py-5 bg-[#020617] border border-white/5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] text-[#475569] hover:text-[#3B82F6] hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/5 transition-all flex items-center justify-center gap-4 group disabled:opacity-30 shadow-2xl italic"
                 >
                   <Cpu size={20} className={`${isGenerating ? "animate-spin text-[#3B82F6]" : "text-[#475569] group-hover:text-[#3B82F6]"}`} />
                   {isGenerating ? "Synthesizing Trace Nodes..." : "Generate AI Logic Sequence"}
                 </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#475569] uppercase tracking-widest px-1">Functional Collection</label>
              <div className="relative group">
                 <select 
                   value={formData.folder}
                   onChange={(e) => setFormData({...formData, folder: e.target.value})}
                   className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#3B82F6]/50 transition-all font-black appearance-none cursor-pointer uppercase tracking-widest text-[11px] italic"
                 >
                   <option value="General">General Repository</option>
                   {folders.map(f => <option key={f} value={f}>{f}</option>)}
                 </select>
                 <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#475569] group-hover:text-white pointer-events-none transition-colors" />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-10 py-8 bg-[#020617]/50 border-t border-white/5 flex items-center justify-between gap-6">
           <button 
             type="button" onClick={onClose}
             className="text-[11px] font-black uppercase text-[#475569] hover:text-white transition-colors tracking-[0.3em] italic"
           >
             Discard Draft
           </button>
           <div className="flex gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#3B82F6] text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:bg-[#2563EB] hover:-translate-y-1 transition-all active:translate-y-0 italic"
              >
                {formData.id ? 'Commit Changes' : 'Initialize Scenario'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestCaseModal;
