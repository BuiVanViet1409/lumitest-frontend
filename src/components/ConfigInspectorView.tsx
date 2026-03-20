import React, { useState, useEffect } from 'react';
import { Search, Shield, AlertCircle, Copy, Check, Table, Activity, LogOut, Sparkles, ArrowRightLeft, Layers, Database, List } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ConnectionParams {
    dbType: 'mongodb' | 'postgresql';
    host: string;
    port: number;
    username: string;
    password: string;
    databaseName: string;
    connectionString?: string;
    fieldName: string;
}

interface DiscoveryResult {
    location: string;
    sampleValue: any;
}

interface ComparisonResult {
    fieldName: string;
    sourceA: DiscoveryResult | null;
    sourceB: DiscoveryResult | null;
    identical: boolean;
    diffSummary: string;
}

const ConfigInspectorView: React.FC = () => {
    const { t } = useLanguage();
    const [mode, setMode] = useState<'search' | 'compare'>('search');
    const [connA, setConnA] = useState<Omit<ConnectionParams, 'fieldName'>>({
        dbType: 'mongodb',
        host: 'localhost',
        port: 27017,
        username: '',
        password: '',
        databaseName: 'admin'
    });
    const [connB, setConnB] = useState<Omit<ConnectionParams, 'fieldName'>>({
        dbType: 'mongodb',
        host: 'localhost',
        port: 27017,
        username: '',
        password: '',
        databaseName: 'admin'
    });
    
    const [fieldName, setFieldName] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [searchResults, setSearchResults] = useState<DiscoveryResult[]>([]);
    const [compareResult, setCompareResult] = useState<ComparisonResult | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [schema, setSchema] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [showSchema, setShowSchema] = useState(false);

    useEffect(() => {
        if (isConnected) {
            fetchSchema();
        }
    }, [isConnected]);

    const fetchSchema = async () => {
        try {
            const res = await fetch('/api/discovery/schema');
            const data = await res.json();
            setSchema(data);
        } catch (err) {
            console.error("Failed to fetch schema", err);
        }
    };

    const handleConnect = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simplified for demo - just assume "Standard" connection for now
            setIsConnected(true);
        } catch (err) {
            setError(t('discovery.connError'));
        } finally {
            setLoading(false);
        }
    };

    const handleInspect = async (e?: React.FormEvent, overrideField?: string) => {
        if (e) e.preventDefault();
        const targetField = overrideField || fieldName;
        if (!targetField.trim()) return;

        setLoading(true);
        setSearchResults([]);
        setCompareResult(null);
        setSuggestions([]);
        
        try {
            if (mode === 'search') {
                const res = await fetch('/api/inspect/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...connA, fieldName: targetField })
                });
                const data = await res.json();
                setSearchResults(data);
            } else {
                const res = await fetch('/api/inspect/compare', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sourceA: connA, sourceB: connB, fieldName: targetField })
                });
                const data = await res.json();
                setCompareResult(data);
            }
        } catch (err) {
            setError(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleSuggest = async () => {
        if (!fieldName.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('/api/inspect/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ intent: fieldName })
            });
            const data = await res.json();
            setSuggestions(data);
        } catch (err) {
            console.error("AI Suggestion failed", err);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="flex-1 flex flex-col p-8 space-y-8 animate-in fade-in duration-500 overflow-y-auto custom-scrollbar bg-slate-50/50">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200/50 text-white">
                        <Activity size={28} />
                    </div>
                    <div>
                         <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-3">
                            {t('discovery.title')} <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full not-italic tracking-widest font-bold">DYNAMIC v2.5</span>
                         </h1>
                         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('discovery.subtitle')}</p>
                    </div>
                </div>
                
                {/* Desktop Actions */}
                <div className="flex items-center gap-4">
                    {/* Schema Browser Toggle */}
                    {isConnected && (
                        <button 
                            onClick={() => setShowSchema(!showSchema)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${showSchema ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                            <Database size={14} /> Schema Browser
                        </button>
                    )}

                    {/* Mode Toggle */}
                    <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex gap-1">
                        {[
                            { id: 'search', icon: Search, label: t('discovery.modeSearch') },
                            { id: 'compare', icon: ArrowRightLeft, label: t('discovery.modeCompare') }
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id as any)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${mode === m.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                <m.icon size={14} />
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {isConnected && (
                        <button 
                            onClick={() => { setIsConnected(false); setSearchResults([]); setCompareResult(null); setSuggestions([]); setShowSchema(false); }}
                            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest ml-4"
                        >
                            <LogOut size={14} /> {t('discovery.disconnectBtn')}
                        </button>
                    )}
                </div>
            </div>

            {!isConnected ? (
                <div className="max-w-4xl mx-auto w-full bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
                        <Shield size={40} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{t('discovery.connTitle')}</h2>
                        <p className="text-sm text-slate-400">{t('discovery.connSubtitle')}</p>
                    </div>
                    <button 
                        onClick={handleConnect}
                        className="bg-slate-900 text-white px-12 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
                    >
                        {t('discovery.connectBtn')}
                    </button>
                </div>
            ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500 relative">
                    {/* Schema Browser (Conditional) */}
                    {showSchema && (
                        <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-500">
                             {['mongodb', 'postgresql'].map(type => (
                                <div key={type} className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col max-h-[400px]">
                                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <List size={18} className="text-indigo-600" />
                                            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{type} Collections/Tables</span>
                                        </div>
                                        <span className="px-3 py-1 bg-white text-indigo-600 text-[8px] font-bold rounded-full border border-slate-100 uppercase tracking-widest">
                                            {schema[type]?.length || 0} items
                                        </span>
                                    </div>
                                    <div className="p-6 overflow-y-auto custom-scrollbar space-y-2">
                                        {(schema[type] || []).map((name, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all group border border-transparent hover:border-slate-100">
                                                <span className="text-sm font-bold text-slate-600">{name}</span>
                                                <button 
                                                    onClick={() => { setFieldName(name); handleInspect(undefined, name); }}
                                                    className="p-2 opacity-0 group-hover:opacity-100 bg-indigo-600 text-white rounded-lg transition-all hover:scale-110"
                                                >
                                                    <Search size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {(schema[type] || []).length === 0 && (
                                            <div className="text-center py-10 text-slate-400 text-xs italic">No items found</div>
                                        )}
                                    </div>
                                </div>
                             ))}
                        </div>
                    )}

                    {/* Search & AI Section */}
                    <div className="flex flex-col gap-4 max-w-4xl">
                        <div className="flex gap-4 items-end">
                            <form onSubmit={(e) => handleInspect(e)} className="flex-1 relative group shadow-2xl shadow-indigo-100/50 rounded-3xl overflow-hidden bg-white">
                                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={24} />
                                 <input 
                                    type="text" 
                                    value={fieldName}
                                    onChange={(e) => setFieldName(e.target.value)}
                                    placeholder={t('discovery.searchPlaceholder')}
                                    className="w-full bg-transparent pl-16 pr-44 py-7 text-lg text-slate-900 font-bold outline-none placeholder:text-slate-200"
                                 />
                                 <button 
                                    type="submit"
                                    disabled={loading || !fieldName.trim()}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-10 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                 >
                                    {loading && suggestions.length === 0 ? t('discovery.searching') : (mode === 'search' ? t('discovery.searchBtn') : 'Compare')}
                                 </button>
                            </form>
                            
                            <button 
                                onClick={handleSuggest}
                                disabled={loading || !fieldName.trim()}
                                title={t('discovery.aiSuggestTooltip')}
                                className={`bg-white p-6 rounded-3xl border border-slate-200 text-indigo-600 hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-100/50 relative group ${loading ? 'animate-pulse' : ''}`}
                            >
                                <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
                                {loading && <div className="absolute inset-0 border-2 border-indigo-600 rounded-3xl animate-ping opacity-25"></div>}
                            </button>
                        </div>

                        {/* AI Suggestions Dropdown */}
                        {suggestions.length > 0 && (
                            <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 animate-in slide-in-from-top-4 duration-300 space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                                    <Sparkles size={14} /> {t('discovery.aiSuggest')}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((s, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => { setFieldName(s); setSuggestions([]); handleInspect(undefined, s); }}
                                            className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl text-xs font-bold transition-all border border-slate-100 hover:border-indigo-100"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compare Settings (If mode is compare) */}
                    {mode === 'compare' && (
                        <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
                            {[
                                { id: 'A', label: t('discovery.compareSourceA'), conn: connA, setConn: setConnA },
                                { id: 'B', label: t('discovery.compareSourceB'), conn: connB, setConn: setConnB }
                            ].map(src => (
                                <div key={src.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{src.label}</label>
                                        <div className="flex gap-2 p-1 bg-slate-50 rounded-lg border border-slate-100">
                                            {['mongodb', 'postgresql'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => src.setConn({ ...src.conn, dbType: type as any })}
                                                    className={`px-3 py-1 rounded-md text-[8px] font-bold uppercase tracking-widest transition-all ${src.conn.dbType === type ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <input 
                                        className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
                                        placeholder="Endpoint (e.g. localhost)"
                                        value={src.conn.host}
                                        onChange={e => src.setConn({...src.conn, host: e.target.value})}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results Table (Search Mode) */}
                    {mode === 'search' && searchResults.length > 0 && (
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden overflow-x-auto animate-in slide-in-from-bottom-4">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-200">
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t('common.status')}</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t('discovery.location')}</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t('discovery.sampleValue')}</th>
                                        <th className="px-8 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{t('common.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {searchResults.map((result, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-emerald-600">
                                                    <Activity size={12} className="animate-pulse" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Located</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                                    <Table size={12} className="text-slate-300" />
                                                    {result.location}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <code className="block p-3 rounded-xl bg-slate-900 text-indigo-300 text-xs font-bold font-mono shadow-xl max-w-md truncate border border-slate-800">
                                                    {JSON.stringify(result.sampleValue)}
                                                </code>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button 
                                                    onClick={() => copyToClipboard(JSON.stringify(result.sampleValue), `${idx}`)}
                                                    className={`p-2.5 rounded-xl transition-all shadow-sm border ${copied === `${idx}` ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-white border-slate-100 text-slate-300 hover:text-indigo-600 group-hover:opacity-100 opacity-0'}`}
                                                >
                                                    {copied === `${idx}` ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Comparison View (Compare Mode) */}
                    {mode === 'compare' && compareResult && (
                        <div className="grid grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
                            {[
                                { id: 'A', data: compareResult.sourceA, label: 'Environment A' },
                                { id: 'B', data: compareResult.sourceB, label: 'Environment B' }
                            ].map(res => (
                                <div key={res.id} className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
                                    <div className={`p-6 border-b border-slate-100 flex items-center justify-between ${res.data ? 'bg-indigo-50/30' : 'bg-slate-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <Layers size={18} className="text-indigo-600" />
                                            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{res.label}</span>
                                        </div>
                                        {compareResult.identical ? (
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-bold rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1">
                                                <Check size={10} /> {t('discovery.identical')}
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[8px] font-bold rounded-full border border-rose-100 uppercase tracking-widest flex items-center gap-1">
                                                <AlertCircle size={10} /> {t('discovery.mismatch')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-8 flex-1 space-y-4">
                                        {res.data ? (
                                            <>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('discovery.location')}</label>
                                                    <div className="text-sm font-bold text-slate-700 font-mono bg-slate-50 px-3 py-2 rounded-xl inline-block border border-slate-100">{res.data.location}</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('discovery.sampleValue')}</label>
                                                    <pre className="bg-slate-900 text-indigo-300 p-6 rounded-3xl text-xs font-bold font-mono overflow-auto custom-scrollbar-dark max-h-64 shadow-2xl border border-slate-800">
                                                        {JSON.stringify(res.data.sampleValue, null, 2)}
                                                    </pre>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center text-slate-300 space-y-4 py-20 grayscale opacity-50">
                                                <AlertCircle size={48} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('discovery.noResults')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ConfigInspectorView;
