import React from 'react';
import { Layers, Play, Edit, MoreVertical, Filter, Layout, Search } from 'lucide-react';

const TestCaseList = ({ 
  testCases, 
  onSelectTestCase, 
  onRunTest, 
  onAddTestCase, 
  currentFolder 
}) => {
  return (
     <div className="flex-1 flex flex-col min-h-0">
        <div className="bg-ent-surface border border-ent-border rounded-2xl flex flex-col h-full shadow-2xl overflow-hidden">
          {/* Table Header / Toolbar */}
          <div className="px-6 py-5 border-b border-ent-border bg-ent-bg/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-ent-surface bg-ent-bg flex items-center justify-center text-[10px] font-bold text-ent-text-light">
                     {String.fromCharCode(64 + i)}
                   </div>
                 ))}
               </div>
               <span className="text-[10px] font-bold text-ent-text-muted uppercase tracking-widest pl-2 border-l border-ent-border">
                 {testCases.length} Scenarios Found
               </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-ent-text-light hover:text-ent-text-main hover:bg-white/5 rounded-lg transition-all"><Filter size={18} /></button>
              <button className="p-2 text-ent-text-light hover:text-ent-text-main hover:bg-white/5 rounded-lg transition-all"><MoreVertical size={18} /></button>
            </div>
          </div>

          {/* Actual Table */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-ent-surface z-10">
                <tr className="text-left border-b border-ent-border/50">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-ent-text-light">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ent-text-light">Test Scenario</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ent-text-light text-center">Version</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-ent-text-light text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ent-border/30">
                {testCases.map((tc) => (
                  <tr 
                    key={tc.id} 
                    onClick={() => onSelectTestCase(tc)}
                    className="group hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${tc.lastStatus === 'PASS' ? 'bg-ent-success shadow-lg shadow-ent-success/20' : 'bg-ent-error shadow-lg shadow-ent-error/20 animate-pulse'}`}></div>
                        <span className={`text-[10px] font-black tracking-widest uppercase ${tc.lastStatus === 'PASS' ? 'text-ent-success' : 'text-ent-error'}`}>
                          {tc.lastStatus || 'NEW'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-ent-text-main group-hover:text-ent-primary transition-colors">{tc.name}</span>
                        <span className="text-[10px] text-ent-text-light mt-0.5 font-medium">{tc.folder || 'Unsorted'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <span className="px-2 py-0.5 rounded bg-ent-bg text-ent-text-light text-[10px] font-bold border border-ent-border">v1.2</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2 pr-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onRunTest(tc.id); }}
                          className="p-2 text-ent-primary hover:bg-ent-primary/10 rounded-lg transition-all"
                        >
                          <Play size={16} fill="currentColor" />
                        </button>
                        <button className="p-2 text-ent-text-light hover:text-ent-text-main hover:bg-white/5 rounded-lg transition-all"><Edit size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {testCases.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-32 text-center">
                      <div className="flex flex-col items-center opacity-30">
                         <Layout size={48} className="text-ent-text-light mb-4" />
                         <p className="text-sm font-bold uppercase tracking-widest text-ent-text-light">No Scenarios in this library</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
     </div>
  );
};

export default TestCaseList;
