import React from 'react';
import { Layout, Folder, ChevronRight, FolderCheck, Sparkles } from 'lucide-react';

const Sidebar = ({ folders, onSelectFolder, activeFolder }) => {
  return (
    <aside className="w-72 flex flex-col gap-8 shrink-0">
      <div className="bg-ent-surface border border-ent-border rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-ent-border flex items-center justify-between bg-ent-bg/30">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-ent-text-light">Collections</h2>
          <FolderCheck size={14} className="text-ent-primary" />
        </div>
        
        <nav className="p-3 space-y-1">
          <button
            onClick={() => onSelectFolder('All')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${activeFolder === 'All' ? 'bg-ent-primary/10 text-ent-primary' : 'text-ent-text-muted hover:bg-white/5 hover:text-ent-text-main'}`}
          >
            <Layout size={18} className={activeFolder === 'All' ? 'text-ent-primary' : 'text-ent-text-light group-hover:text-ent-text-main'} />
            All Scenarios
          </button>

          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => onSelectFolder(folder)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group ${activeFolder === folder ? 'bg-ent-primary/10 text-ent-primary' : 'text-ent-text-muted hover:bg-white/5 hover:text-ent-text-main'}`}
            >
              <div className="flex items-center gap-3">
                <Folder size={18} className={activeFolder === folder ? 'text-ent-primary' : 'text-ent-text-light group-hover:text-ent-text-main'} />
                {folder}
              </div>
              <ChevronRight size={14} className={`transition-transform ${activeFolder === folder ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Mini Card */}
      <div className="bg-gradient-to-br from-ent-primary/20 to-transparent border border-ent-primary/10 rounded-2xl p-6 relative overflow-hidden group">
        <div className="relative z-10">
           <p className="text-[10px] font-black uppercase tracking-widest text-ent-primary mb-1">Health Score</p>
           <h3 className="text-2xl font-black text-white">98.2%</h3>
           <p className="text-[10px] text-ent-text-muted mt-4 font-bold flex items-center gap-1">
             <span className="w-1.5 h-1.5 bg-ent-success rounded-full animate-pulse"></span>
             System Operational
           </p>
        </div>
        <Sparkles size={60} className="absolute -right-4 -bottom-4 text-ent-primary/10 group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="p-3 rounded-xl flex items-center gap-3 group cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-ent-primary text-white flex items-center justify-center text-xs font-black shadow-lg shadow-ent-primary/20">
            QN
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-ent-text-main truncate">Quang Nguyen</p>
            <p className="text-[10px] text-ent-text-light font-medium truncate uppercase tracking-tighter">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
