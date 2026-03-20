import React from 'react';
import { Layout, Beaker, Package, FileText, Settings, Sparkles, ChevronRight, Plus, Command, Activity, Cpu, Terminal, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ folders, onSelectFolder, activeFolder }) => {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'dashboard', label: t('sidebar.settings'), icon: Layout },
    { id: 'releases', label: t('sidebar.releases'), icon: Package },
    { id: 'tests', label: t('sidebar.testCases'), icon: Beaker },
    { id: 'generate', label: t('sidebar.generate'), icon: Sparkles },
  ];

  return (
    <aside className="w-64 flex flex-col bg-white shrink-0 h-full relative z-50 border-r border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ease-in-out font-sans">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />
      
      <div className="flex flex-col gap-8 py-8 h-full relative z-10">
        <div className="px-6 mb-2">
           <div className="flex items-center gap-3 group cursor-pointer text-slate-900" onClick={() => onSelectFolder('All')}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all duration-500">
                 <Terminal className="text-white" size={20} />
              </div>
              <div className="flex flex-col">
                 <span className="text-lg font-bold tracking-tight leading-none">LUMITEST</span>
                 <span className="text-[10px] font-bold text-indigo-600 tracking-[0.2em] uppercase mt-1">STUDIO LIGHT</span>
              </div>
           </div>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          <div className="px-3 mb-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Command size={12} /> {t('common.actions')}
             </span>
          </div>
          {navItems.map((item) => {
            const isActive = activeFolder === item.id || (activeFolder === 'All' && item.id === 'tests');
            return (
              <button
                key={item.id}
                onClick={() => onSelectFolder(item.id === 'tests' ? 'All' : item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-bold transition-all group relative overflow-hidden ${
                  isActive 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full shadow-[0_0_10px_rgba(79,70,229,0.2)]" />
                )}
                <item.icon 
                  size={18} 
                  className={`transition-all duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} 
                />
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2 px-4 mt-6">
           <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Activity size={12} /> {t('sidebar.testCases')}
              </span>
              <div className="p-1 hover:text-indigo-600 transition-colors cursor-pointer text-slate-300 hover:text-indigo-500">
                 <Plus size={14} strokeWidth={3} />
              </div>
           </div>
           <div className="flex flex-col gap-1 overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
              <button
                onClick={() => onSelectFolder('All')}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-[12px] font-bold transition-all group ${
                  activeFolder === 'All' || activeFolder === 'tests'
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package size={14} className={activeFolder === 'All' ? 'text-indigo-600' : 'text-slate-400'} />
                  <span>{t('testCaseList.title')}</span>
                </div>
              </button>
              {folders.map(folder => (
                <button
                  key={folder}
                  onClick={() => onSelectFolder(folder)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-[12px] font-bold transition-all group ${
                    activeFolder === folder 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeFolder === folder 
                      ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]' 
                      : 'bg-slate-200'
                    }`} />
                    <span className="truncate">{folder}</span>
                  </div>
                  {activeFolder === folder && <ChevronRight size={14} className="text-indigo-600" />}
                </button>
              ))}
           </div>
        </div>

        <div className="mt-auto px-4 mb-4">
           <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl group cursor-pointer relative overflow-hidden transition-all duration-300 hover:bg-white hover:shadow-md">
              <div className="relative z-10 flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                       <Sparkles size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-slate-900 tracking-tight">LUMIAI</span>
                       <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">{t('generate.blueprint')}</span>
                    </div>
                 </div>
                 <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-indigo-600 rounded-full" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
