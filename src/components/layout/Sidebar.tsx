import React from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  ShieldAlert, 
  Database, 
  Cpu, 
  LineChart, 
  Settings, 
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: GitBranch, label: 'Workflow Graphs' },
    { icon: ShieldAlert, label: 'Intelligence Feed' },
    { icon: Database, label: 'Event Ingestion' },
    { icon: Cpu, label: 'Model Registry' },
    { icon: LineChart, label: 'Observability' },
    { icon: Settings, label: 'System Config' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#0A0C10] border-r border-white/5 z-[70] 
        transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d8c06e1c-18da-4bb6-9adf-755bb15bcc86/logo-6539751c-1771832049788.webp" 
                alt="Logo" 
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-xl font-bold tracking-tight">OpenExec</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group
                  ${item.active 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.active && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-4 rounded-2xl mb-6 border border-cyan-500/10">
              <p className="text-xs text-cyan-400/80 font-semibold mb-1 uppercase tracking-wider">Plan</p>
              <p className="text-sm font-medium mb-3">Enterprise Pro</p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[82%]" />
              </div>
              <p className="text-[10px] text-gray-500 mt-2">8.2M / 10M Events used</p>
            </div>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};