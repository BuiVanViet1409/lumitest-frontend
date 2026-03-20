import React, { useState } from 'react';
import { Search, Database, HardDrive, Cpu, AlertCircle, ChevronRight, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DataDiscoveryView = () => {
  const { t } = useLanguage();
  const [fieldName, setFieldName] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!fieldName.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/discovery?fieldName=${encodeURIComponent(fieldName)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-8 space-y-8 animate-premium-in overflow-y-auto custom-scrollbar">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 text-white">
                <Database size={24} />
            </div>
            <div>
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t('discovery.title')}</h1>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('discovery.subtitle')}</p>
            </div>
         </div>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl">
         <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder={t('discovery.searchPlaceholder')}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-40 py-4 text-slate-900 font-bold outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !fieldName.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:translate-y-0.5"
            >
              {isLoading ? t('discovery.searching') : t('discovery.searchBtn')}
            </button>
         </form>
      </div>

      {/* Results Section */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { id: 'mongodb', name: 'MongoDB', icon: Database, color: 'emerald' },
            { id: 'postgresql', name: 'PostgreSQL', icon: HardDrive, color: 'indigo' }
          ].map((db) => {
            const data = results[db.id];
            return (
              <div key={db.id} className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden hover:border-indigo-100 transition-all group">
                <div className={`h-2 bg-${db.color}-500 w-full`} />
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${db.color}-50 rounded-xl text-${db.color}-600`}>
                        <db.icon size={20} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">{db.name}</span>
                    </div>
                    {data ? (
                       <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-widest">Linked</span>
                    ) : (
                       <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-widest">Null</span>
                    )}
                  </div>

                  {data ? (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('discovery.location')}</label>
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 group/item">
                           <span className="text-sm font-bold text-slate-700">{data.location}</span>
                           <button onClick={() => copyToClipboard(data.location, `${db.id}-loc`)} className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-300 hover:text-indigo-600 opacity-0 group-hover/item:opacity-100 border border-transparent hover:border-slate-200">
                             {copied === `${db.id}-loc` ? <Check size={14} /> : <Copy size={14} />}
                           </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('discovery.sampleValue')}</label>
                        <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-indigo-300 relative group/item">
                           <div className="max-h-32 overflow-y-auto custom-scrollbar-dark break-all">
                              {JSON.stringify(data.sampleValue, null, 2)}
                           </div>
                           <button onClick={() => copyToClipboard(JSON.stringify(data.sampleValue), `${db.id}-val`)} className="absolute top-3 right-3 p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all opacity-0 group-hover/item:opacity-100">
                              {copied === `${db.id}-val` ? <Check size={14} /> : <Copy size={14} />}
                           </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                       <AlertCircle size={32} className="text-slate-300" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t('discovery.noResults')}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-[-1]" />
    </div>
  );
};

export default DataDiscoveryView;
