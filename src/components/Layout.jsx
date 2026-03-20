import React from 'react';
import { LayoutDashboard, PlayCircle, Search, Bell, Settings, User, Plus } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange }) => (
  <div className="w-64 bg-[#020617] border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col p-4 shadow-2xl">
    <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
      <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">L</div>
      <span className="text-xl font-black bg-gradient-to-r from-white to-[#3B82F6] bg-clip-text text-transparent uppercase tracking-tighter italic">LumiOnyx</span>
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

    <div className="pt-4 border-t border-white/5 space-y-2">
      <NavItem icon={<Settings size={20} />} label="Settings" />
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all mt-4 border border-transparent hover:border-white/5">
        <div className="w-10 h-10 rounded-full bg-[#0B0E14] border border-white/10 flex items-center justify-center text-[#475569]">
          <User size={20} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-black truncate text-white uppercase tracking-tight italic">Quang Nguyen</p>
          <p className="text-[10px] text-[#475569] truncate font-black uppercase tracking-widest">Admin Node</p>
        </div>
      </div>
    </div>
  </div>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 uppercase text-[11px] font-black tracking-widest ${
      active ? 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 shadow-lg shadow-blue-500/5' : 'text-[#475569] hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-black italic">{label}</span>
  </div>
);

export const Header = ({ onNewTest }) => (
  <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-10">
    <div className="flex items-center gap-4 bg-[#0B0E14] border border-white/5 px-4 py-2 rounded-xl w-96 group focus-within:border-[#3B82F6]/30 transition-all">
      <Search size={18} className="text-[#475569] group-focus-within:text-[#3B82F6] transition-colors" />
      <input type="text" placeholder="Search test cases..." className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-[#475569] font-bold italic" />
    </div>
    
    <div className="flex items-center gap-6">
      <button className="relative text-[#475569] hover:text-white transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#3B82F6] rounded-full border-2 border-[#020617]"></span>
      </button>
      <button 
        onClick={onNewTest}
        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-xl text-xs font-black flex items-center gap-3 transition-all shadow-xl shadow-blue-500/20 active:scale-95 uppercase tracking-widest italic"
      >
        <Plus size={18} />
        New Neural Case
      </button>
    </div>
  </header>
);
