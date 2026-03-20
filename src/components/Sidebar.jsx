import React from 'react';
import { Layout, Beaker, Package, FileText, Settings, Sparkles, ChevronRight, Plus, Command, Activity, Cpu, Terminal, Zap } from 'lucide-react';

const Sidebar = ({ folders, onSelectFolder, activeFolder }) => {
  const navItems = [
    { id: 'dashboard', label: 'Matrix Control', icon: Layout },
    { id: 'releases', label: 'Ecosystem', icon: Package },
    { id: 'tests', label: 'Neural Library', icon: Beaker },
    { id: 'reports', label: 'Data Analytics', icon: FileText },
  ];

  return (
    <aside className="w-80 flex flex-col bg-[#05080F] shrink-0 h-full relative z-50 border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 ease-in-out font-sans">
      {/* Obsidian Light Bleed Accent */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="flex flex-col gap-12 py-12 h-full relative z-10">
        {/* Brand/Header */}
        <div className="px-10 mb-2">
           <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-[1.25rem] flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.2)] group-hover:rotate-[15deg] transition-all duration-700">
                 <Cpu className="text-white" size={26} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                 <span className="text-xl font-black text-white tracking-[0.1em] uppercase italic leading-none">LUMITEST</span>
                 <span className="text-[9px] font-black text-[#64748B] tracking-[0.5em] uppercase mt-1.5 opacity-80">ONYX CORE v4</span>
              </div>
           </div>
        </div>

        {/* Neural Navigator Section */}
        <nav className="flex flex-col gap-2 px-6">
          <div className="px-5 mb-4">
             <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.6em] flex items-center gap-3">
                <Command size={12} strokeWidth={3} /> Neural Hub
             </span>
          </div>
          {navItems.map((item) => {
            const isActive = activeFolder === item.id || (activeFolder === 'All' && item.id === 'tests');
            return (
              <button
                key={item.id}
                onClick={() => onSelectFolder(item.id === 'tests' ? 'All' : item.id)}
                className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl text-[13px] font-black transition-all group relative overflow-hidden uppercase tracking-widest ${
                  isActive 
                  ? 'text-white bg-white/5 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)]' 
                  : 'text-[#475569] hover:text-[#F8FAFC] hover:bg-white/[0.02]'
                }`}
              >
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#3B82F6] rounded-r-full shadow-[0_0_20px_rgba(59,130,246,1)] indicator-elite" />
                )}
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 3 : 2}
                  className={`transition-all duration-700 ${isActive ? 'text-[#3B82F6] scale-110 rotate-[-5deg]' : 'text-[#334155] group-hover:text-[#94A3B8]'}`} 
                />
                <span className={`tracking-tight ${isActive ? 'italic' : ''}`}>{item.label}</span>
                {isActive && (
                   <div className="ml-auto w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Core Clusters Section */}
        <div className="flex flex-col gap-3 px-6 mt-6">
           <div className="px-5 mb-4 flex items-center justify-between">
              <span className="text-[10px] font-black text-[#475569] uppercase tracking-[0.6em] flex items-center gap-3">
                 <Activity size={12} strokeWidth={3} /> Data Grids
              </span>
              <div className="p-1 px-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/30 transition-all text-[#475569] hover:text-[#3B82F6] group">
                 <Plus size={14} strokeWidth={4} className="group-hover:rotate-90 transition-transform" />
              </div>
           </div>
           <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[350px] custom-scrollbar pr-1">
              {folders.map(folder => (
                <button
                  key={folder}
                  onClick={() => onSelectFolder(folder)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-[12px] font-black transition-all group border uppercase tracking-widest ${
                    activeFolder === folder 
                    ? 'text-white bg-[#3B82F6]/10 border-[#3B82F6]/20 shadow-[0_20px_40px_rgba(0,0,0,0.4)]' 
                    : 'text-[#334155] border-transparent hover:text-[#94A3B8] hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
                      activeFolder === folder 
                      ? 'bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,1)] scale-125' 
                      : 'bg-[#1E293B]'
                    }`} />
                    <span className={`truncate ${activeFolder === folder ? 'italic' : ''}`}>{folder}</span>
                  </div>
                  {activeFolder === folder && <ChevronRight size={16} strokeWidth={3} className="text-[#3B82F6] animate-pulse" />}
                </button>
              ))}
           </div>
        </div>

        {/* Obsidian Intelligence Panel */}
        <div className="mt-auto px-8 mb-6">
           <div className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] group cursor-pointer relative overflow-hidden transition-all duration-700 hover:translate-y-[-6px] hover:bg-white/[0.03] active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 flex flex-col gap-5">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                       <Sparkles size={28} className="text-[#020617]" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[15px] font-black text-white tracking-tight uppercase italic">ARCHITECT</span>
                       <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-[0.4em]">Logic Synthesis</span>
                    </div>
                 </div>
                 <p className="text-[11px] text-[#475569] leading-relaxed font-black uppercase tracking-[0.05em] opacity-80 border-l-2 border-[#1E293B] pl-5 py-2 group-hover:text-[#94A3B8] transition-colors italic">
                    Grid processing synchronized @ 0.4ms...
                 </p>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
