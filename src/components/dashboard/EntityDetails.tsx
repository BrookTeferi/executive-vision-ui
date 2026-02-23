import React from 'react';
import { 
  Activity, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User, 
  FileText,
  ArrowRight,
  Database
} from 'lucide-react';

export const EntityDetails: React.FC = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Entity Intelligence: QUOTE-2026-XF</h3>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium">
          Investigation Required
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Owner', value: 'Sarah Chen (Legal)', icon: User },
          { label: 'Last Event', value: 'Workflow Rejection', icon: Activity },
          { label: 'Time in State', value: '14d 2h 44m', icon: Clock },
          { label: 'Origin System', value: 'Salesforce CRM', icon: Database },
        ].map((item, i) => (
          <div key={i} className="p-3 bg-white/2 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <item.icon className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </div>
            <p className="text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Execution Path Timeline</p>
        <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
          {[
            { state: 'Created', time: 'Feb 01, 09:00', status: 'completed' },
            { state: 'Technical Qual', time: 'Feb 01, 14:30', status: 'completed' },
            { state: 'Pricing Approval', time: 'Feb 02, 11:15', status: 'completed' },
            { state: 'Legal Review', time: 'Feb 02, 16:45', status: 'delayed', active: true },
          ].map((step, i) => (
            <div key={i} className="flex gap-4 items-start relative">
              <div className={`w-[22px] h-[22px] rounded-full flex-shrink-0 border-2 z-10 ${
                step.status === 'completed' ? 'bg-cyan-500 border-cyan-500' : 
                step.status === 'delayed' ? 'bg-[#0A0C10] border-amber-500 animate-pulse' : 
                'bg-white/5 border-white/10'
              }`} />
              <div className="flex-1 -mt-0.5">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${step.active ? 'text-amber-400' : ''}`}>{step.state}</p>
                  <span className="text-[10px] text-gray-500">{step.time}</span>
                </div>
                {step.active && (
                  <p className="text-xs text-gray-400 mt-1">Stalled at Legal stage for 14 days. 95th percentile deviation detected.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-sm font-semibold group">
        Full Audit Log
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};