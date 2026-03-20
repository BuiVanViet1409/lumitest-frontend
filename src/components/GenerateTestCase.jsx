import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, Play, CheckCircle2, FileText, Cpu, Zap, Save, RefreshCcw, Command, Activity, Terminal, Leaf, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GenerateTestCase = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setHasResult(false);
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 2800);
  };

  const generatedSteps = [
    { action: 'Neural Protocol: Khởi tạo Onyx Dashboard', target: 'dashboard_root' },
    { action: 'Neural Trigger: Tạo Matrix Node', target: 'css=.btn-initialize' },
    { action: 'Logic Injection: "SIT_ONYX_CLUSTER_01"', target: 'id=node-designation' },
    { action: 'Verification: Đồng bộ hóa kiến trúc hệ thống', target: 'xpath=//*[text()="Active"]' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar animate-premium-in relative bg-white">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Refined Header */}
         <div className="flex items-center gap-8 border-b border-slate-100 pb-10">
            <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-xl relative group overflow-hidden">
               <Sparkles className="text-indigo-600 relative z-10 group-hover:scale-110 transition-transform duration-700" size={32} />
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent" />
            </div>
            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm" />
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{t('generate.logicSynthesis')}</span>
               </div>
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase leading-none">{t('generate.title1')} <br/> {t('generate.title2')}</h1>
               <p className="text-sm text-slate-400 font-bold max-w-lg leading-relaxed">
                 {t('generate.description')}
               </p>
            </div>
         </div>

        {/* Synthesis Control Center */}
         <div className="bg-slate-50 p-8 rounded-2xl relative overflow-hidden group border border-slate-100 transition-all shadow-inner">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] scale-125 rotate-6 group-hover:rotate-0 transition-transform duration-1000">
               <Cpu size={100} className="text-indigo-600" />
            </div>
            
            <div className="flex items-center gap-2 mb-6">
               <Command size={14} className="text-indigo-600" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('generate.intentInput')}</span>
            </div>
            
            <div className="relative group/text">
               <textarea 
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder={t('generate.placeholder')}
                 className="w-full h-32 p-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-8 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-lg font-bold text-slate-900 placeholder-slate-200 custom-scrollbar shadow-sm"
               />
               <div className="absolute bottom-4 right-6 flex items-center gap-3">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                     <Activity size={10} className="text-indigo-600" /> {t('generate.neuralLink')}
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between mt-8">
               <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t('generate.engine')}</span>
                     <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">LumiAI v4.2</span>
                  </div>
                  <div className="w-px h-6 bg-slate-200" />
                  <div className="flex items-center gap-2.5">
                     <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm">
                        <Shield size={14} />
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('generate.secureProtocol')}</span>
                  </div>
               </div>

               <button 
                 onClick={handleGenerate}
                 disabled={isGenerating || !prompt}
                 className={`flex items-center gap-3 px-10 py-3 rounded-xl text-xs font-bold transition-all shadow-xl active:scale-95 uppercase tracking-widest group relative overflow-hidden ${
                   prompt ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                 }`}
               >
                 {isGenerating ? (
                   <>
                     <RefreshCcw size={18} className="animate-spin text-white" />
                     {t('generate.synthesizing')}...
                   </>
                 ) : (
                   <>
                     <Wand2 size={18} className="group-hover:rotate-[20deg] transition-transform duration-500 text-white" />
                     {t('generate.startSynthesis')}
                   </>
                 )}
                 {isGenerating && <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-[loading_2.8s_linear_infinite]" style={{ width: '100%' }} />}
               </button>
            </div>
         </div>

        {/* Synthesis Result Area */}
        {hasResult && (
           <div className="space-y-6 animate-premium-in">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-3">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('generate.blueprint')}</h3>
                    <div className="h-px w-12 bg-slate-100" />
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest">4 {t('generate.nodesGenerated')}</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                 {generatedSteps.map((step, idx) => (
                   <div key={idx} className="bg-white border border-slate-100 p-6 flex items-center gap-8 group hover:bg-slate-50 relative overflow-hidden transition-all duration-500 rounded-2xl shadow-sm hover:shadow-md">
                      <div className="absolute left-0 inset-y-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 shadow-sm relative overflow-hidden">
                         {(idx + 1).toString().padStart(2, '0')}
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/5" />
                      </div>

                      <div className="flex-1">
                         <p className="text-md font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight mb-1.5">{step.action}</p>
                         <div className="flex items-center gap-2">
                            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Pattern:</span>
                            <code className="text-[10px] font-bold text-indigo-600/80 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-mono">{step.target}</code>
                         </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                         <button className="p-3 bg-white hover:bg-indigo-600 border border-slate-200 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm active:scale-90"><Save size={16} /></button>
                         <button className="p-3 bg-white hover:bg-indigo-600 border border-slate-200 rounded-xl text-slate-400 hover:text-white transition-all shadow-sm active:scale-90"><ArrowRight size={16} /></button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex items-center justify-end gap-5 pt-6 px-2">
                 <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest border-b border-transparent hover:border-slate-300 pb-0.5">{t('generate.discard')}</button>
                 <button className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-widest group">
                    <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform text-white/90" /> 
                    {t('generate.commit')}
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default GenerateTestCase;
