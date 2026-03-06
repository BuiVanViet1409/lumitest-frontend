import React from 'react';
import { Play, Eye, Edit3, Trash2, Layers, Clock } from 'lucide-react';

const TestCaseList = ({ testCases, onRun, onViewExecution, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/50 border-b border-slate-700">
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Steps</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {testCases.map((tc) => (
            <tr key={tc.id} className="hover:bg-indigo-600/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">{tc.name}</span>
                  <span className="text-xs text-slate-500 truncate max-w-xs">{tc.description}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Layers size={14} />
                  <span className="text-sm">{tc.stepsCount || 0} steps</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => onRun(tc.id)}
                  className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-1"
                >
                  <Play size={12} fill="currentColor" />
                  Run
                </button>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Clock size={14} />
                  <span>--:--</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onEdit(tc)}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all" 
                    title="Edit"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => onViewExecution(tc.id)}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all" 
                    title="View Report"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(tc.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all" 
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {testCases.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic text-sm">
                No test cases found. Start by creating a new one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-4 bg-slate-800/30 border-t border-slate-700 flex justify-between items-center text-xs text-slate-500">
        <span>View all recent executions</span>
        <span>v1.0.0</span>
      </div>
    </div>
  );
};

export default TestCaseList;
