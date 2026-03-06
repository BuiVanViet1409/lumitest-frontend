import React from 'react';
import { LayoutDashboard, PlayCircle, Search, Bell, Settings, User, Plus } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange }) => (
  <div className="w-64 bg-dark-950 border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col p-4">
    <div className="flex items-center gap-2 mb-10 px-2">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">L</div>
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">LumiTest QA</span>
    </div>
    
    <nav className="flex-1 space-y-2">
      <NavItem 
        icon={<LayoutDashboard size={20} />} 
        label="Test Cases" 
        active={activeTab === 'tests'} 
        onClick={() => onTabChange('tests')}
      />
      <NavItem 
        icon={<PlayCircle size={20} />} 
        label="Web Recorder" 
        active={activeTab === 'recorder'}
        onClick={() => onTabChange('recorder')}
      />
      <NavItem icon={<Search size={20} />} label="Search" />
    </nav>

    <div className="pt-4 border-t border-slate-800 space-y-2">
      <NavItem icon={<Settings size={20} />} label="Settings" />
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all mt-4">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
          <User size={20} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">Quang Nguyen</p>
          <p className="text-xs text-slate-500 truncate">Admin</p>
        </div>
      </div>
    </div>
  </div>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export const Header = ({ onNewTest }) => (
  <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 bg-dark-950/80 backdrop-blur-md z-10">
    <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl w-96">
      <Search size={18} className="text-slate-500" />
      <input type="text" placeholder="Search test cases..." className="bg-transparent border-none outline-none text-sm w-full text-slate-300" />
    </div>
    
    <div className="flex items-center gap-6">
      <button className="relative text-slate-400 hover:text-slate-200 transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-dark-950"></span>
      </button>
      <button 
        onClick={onNewTest}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
      >
        <Plus size={18} />
        New Test Case
      </button>
    </div>
  </header>
);
