import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Sparkles, Globe2, FileText, Cpu, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CreateTestCaseModal = ({ isOpen, onClose, onSave, onRecord, initialData, folders = [] }) => {
  const { t } = useLanguage();
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-400/20 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg text-white">
                 <FileText size={20} />
              </div>
              <div>
                 <h2 className="text-lg font-bold text-slate-900 tracking-tight">{formData.id ? t('createModal.refineTitle') : t('createModal.newTitle')}</h2>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('createModal.systemSubtitle')}</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200">
             <X size={20} />
           </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6 overflow-y-auto custom-scrollbar max-h-[70vh]">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">{t('createModal.scenarioTitle')}</label>
              <input 
                type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Checkout Validation" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all placeholder-slate-200 font-bold shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">{t('createModal.applicationUrl')}</label>
              <div className="relative group">
                 <Globe2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                 <input 
                   type="text" value={formData.applicationUrl}
                   onChange={(e) => setFormData({...formData, applicationUrl: e.target.value})}
                   placeholder="https://app.example.com" 
                   className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-sm text-indigo-600 font-bold outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all placeholder-slate-200 shadow-sm"
                 />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between px-0.5">
                {t('createModal.testSequence')}
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider animate-pulse">{t('createModal.engineActive')}</span>
              </label>
              <div className="space-y-3">
                 <textarea 
                   rows={4} value={formData.scenario}
                   onChange={(e) => setFormData({...formData, scenario: e.target.value})}
                   placeholder={t('createModal.scenarioPlaceholder')}
                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-200 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all resize-none h-28 custom-scrollbar font-bold shadow-sm"
                 />
                 <button 
                   type="button" onClick={handleGenerateSteps}
                   disabled={isGenerating || !formData.scenario}
                   className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[10px] uppercase tracking-wider text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white transition-all flex items-center justify-center gap-3 group disabled:opacity-30 shadow-sm"
                 >
                   <Cpu size={18} className={`${isGenerating ? "animate-spin text-indigo-600" : "text-slate-300 group-hover:text-indigo-600"}`} />
                   {isGenerating ? t('createModal.processing') : t('createModal.generateSteps')}
                 </button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-0.5">{t('createModal.folderPath')}</label>
              <div className="relative group">
                 <select 
                   value={formData.folder}
                   onChange={(e) => setFormData({...formData, folder: e.target.value})}
                   className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all font-bold appearance-none cursor-pointer uppercase tracking-wider text-[10px] shadow-sm"
                 >
                   <option value="General">{t('createModal.generalRepository')}</option>
                   {folders.map(f => <option key={f} value={f}>{f}</option>)}
                 </select>
                 <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-slate-900 pointer-events-none transition-colors" />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-6">
           <button 
             type="button" onClick={onClose}
             className="text-[10px] font-bold uppercase text-slate-400 hover:text-slate-900 transition-colors tracking-widest"
           >
             {t('common.cancel')}
           </button>
           <button
             type="submit"
             onClick={handleSubmit}
             className="bg-indigo-600 text-white px-10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0"
           >
             {formData.id ? t('createModal.saveChanges') : t('createModal.createScenario')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestCaseModal;
