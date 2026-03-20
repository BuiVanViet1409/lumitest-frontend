import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, Play, CheckCircle2, FileText, Cpu, Zap, Save, RefreshCcw, Command, Activity, Terminal, Leaf, Shield } from 'lucide-react';

const GenerateTestCase = () => {
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
    { action: 'Neural Protocol: Initialize Onyx Dashboard', target: 'dashboard_root' },
    { action: 'Neural Trigger: Spawn Matrix Node', target: 'css=.btn-initialize' },
    { action: 'Logic Injection: "SIT_ONYX_CLUSTER_01"', target: 'id=node-designation' },
    { action: 'Verification: System Architecture Sync', target: 'xpath=//*[text()="Active"]' }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-16 py-16 custom-scrollbar animate-premium-in relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Editorial Header */}
         <div className="flex items-center gap-10 border-b border-white/5 pb-12">
            <div className="w-24 h-24 bg-[#020617] rounded-[2.5rem] border border-white/5 flex items-center justify-center shadow-2xl relative group overflow-hidden">
               <Sparkles className="text-[#3B82F6] relative z-10 group-hover:scale-125 transition-transform duration-1000" size={40} />
               <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent" />
            </div>
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                  <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.4em]">Synthesis Protocol</span>
               </div>
               <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.8] italic">Neural Logic <br/> Architect</h1>
               <p className="text-[16px] text-[#475569] font-medium max-w-xl leading-relaxed italic">
                 Describe your testing objective. LumiAI will synthesize a high-fidelity execution sequence across the dark SIT clusters.
               </p>
            </div>
         </div>

        {/* Synthesis Control Center */}
         <div className="glass-elite p-10 rounded-[3rem] relative overflow-hidden group border border-white/5" style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="absolute top-0 right-0 p-10 opacity-[0.05] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
               <Cpu size={120} className="text-[#3B82F6]" />
            </div>
            
            <div className="flex items-center gap-3 mb-8">
               <Command size={16} className="text-[#3B82F6]" />
               <span className="text-[11px] font-black text-[#475569] uppercase tracking-[0.3em]">Cognitive Core Input</span>
            </div>
            
            <div className="relative group/text">
               <textarea 
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder="Describe the logic flow... (e.g., 'Architect a validation sequence for the encrypted payment gateway with failover SIT routing')"
                 className="w-full h-40 p-8 bg-[#020617]/60 border border-white/5 rounded-[2.5rem] outline-none focus:ring-[15px] focus:ring-[#3B82F6]/5 focus:border-[#3B82F6]/30 transition-all text-xl font-black text-white placeholder-[#475569] custom-scrollbar shadow-inner italic"
               />
               <div className="absolute bottom-6 right-8 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#475569] uppercase tracking-widest bg-[#020617]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
                     <Activity size={12} className="text-[#3B82F6]" /> Neural Link Active
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between mt-10">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-[#475569] uppercase tracking-widest mb-1">Synthesis Engine</span>
                     <span className="text-[13px] font-black text-white uppercase tracking-tight italic">LumiOnyx v4.2</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-xl bg-[#020617] border border-white/5 flex items-center justify-center text-[#3B82F6]">
                        <Shield size={16} />
                     </div>
                     <span className="text-[11px] font-black text-[#475569] uppercase tracking-widest italic">SIT Ecosystem Aware</span>
                  </div>
               </div>

               <button 
                 onClick={handleGenerate}
                 disabled={isGenerating || !prompt}
                 className={`flex items-center gap-4 px-12 py-5 rounded-[2rem] text-sm font-black transition-all shadow-2xl active:scale-95 uppercase tracking-widest group overflow-hidden relative ${
                   prompt ? 'bg-[#3B82F6] text-white shadow-blue-500/20 hover:bg-[#2563EB]' : 'bg-[#0B0E14] text-[#334155] cursor-not-allowed border border-white/5'
                 }`}
               >
                 {isGenerating ? (
                   <>
                     <RefreshCcw size={20} className="animate-spin text-white" />
                     Synthesizing Nodes...
                   </>
                 ) : (
                   <>
                     <Wand2 size={20} className="group-hover:rotate-[25deg] transition-transform duration-500 text-white" />
                     Initialize Neural
                   </>
                 )}
                 {isGenerating && <div className="absolute bottom-0 left-0 h-1 bg-white animate-[loading_2.8s_ease-in-out_infinite]" style={{ width: '100%' }} />}
               </button>
            </div>
         </div>

        {/* Synthesis Result Area */}
        {hasResult && (
           <div className="space-y-8 animate-premium-in">
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center gap-4">
                    <h3 className="text-[11px] font-black text-[#475569] uppercase tracking-[0.4em]">Candidate Blueprint</h3>
                    <div className="h-px w-20 bg-white/5" />
                    <span className="text-[10px] font-black text-[#3B82F6] bg-[#3B82F6]/5 px-3 py-1 rounded-full border border-[#3B82F6]/20 uppercase tracking-widest italic">4 Neural Nodes Identified</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {generatedSteps.map((step, idx) => (
                   <div key={idx} className="bg-[#0B0E14]/40 border border-white/5 p-8 flex items-center gap-10 group hover:bg-[#0B0E14]/80 relative overflow-hidden transition-all duration-700 rounded-[2.5rem]">
                      <div className="absolute left-0 inset-y-0 w-1 bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="w-14 h-14 rounded-2xl bg-[#020617] flex items-center justify-center text-sm font-black text-[#3B82F6] group-hover:text-white group-hover:bg-[#3B82F6] transition-all duration-500 shadow-xl relative overflow-hidden italic">
                         {(idx + 1).toString().padStart(2, '0')}
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/5 group-hover:bg-white/10 transition-all" />
                      </div>

                      <div className="flex-1">
                         <p className="text-xl font-black text-white leading-none group-hover:text-[#3B82F6] transition-colors uppercase tracking-tight mb-2 italic">{step.action}</p>
                         <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-[#475569] uppercase tracking-widest">Target Logic:</span>
                            <code className="text-[11px] font-black text-[#3B82F6]/80 bg-[#3B82F6]/5 px-3 py-1 rounded-lg border border-[#3B82F6]/20 font-mono italic">{step.target}</code>
                         </div>
                      </div>

                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                         <button className="p-4 bg-[#020617] hover:bg-[#3B82F6] border border-white/10 hover:border-[#3B82F6]/40 rounded-2xl text-[#475569] hover:text-white transition-all shadow-sm active:scale-90"><Save size={20} /></button>
                         <button className="p-4 bg-[#020617] hover:bg-[#3B82F6] border border-white/10 hover:border-[#3B82F6]/40 rounded-2xl text-[#475569] hover:text-white transition-all shadow-sm active:scale-90"><ArrowRight size={20} /></button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex items-center justify-end gap-6 pt-10 px-4">
                 <button className="text-[11px] font-black text-[#475569] hover:text-white transition-all uppercase tracking-widest border-b border-transparent hover:border-white pb-1 italic">Discard Draft</button>
                 <button className="flex items-center gap-4 bg-[#3B82F6] text-white px-12 py-5 rounded-[2rem] text-sm font-black shadow-2xl shadow-blue-500/20 hover:bg-[#2563EB] hover:translate-y-[-4px] active:scale-95 transition-all uppercase tracking-widest group italic">
                    <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform text-white/90" /> 
                    Commit Logic to Matrix
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default GenerateTestCase;
