import React from 'react';
import { TrendingUp, Users, Zap, ShieldCheck } from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  const stats = [
    { label: 'System Health', value: '99.98%', trend: '+0.02%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Event Ingestion', value: '10.4M', trend: '+12%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Anomalies Detected', value: '14', trend: '-22%', icon: TrendingUp, color: 'text-red-400' },
    { label: 'Active Tenants', value: '1,284', trend: '+5%', icon: Users, color: 'text-cyan-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:bg-white/[0.08] transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/5 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
              {stat.trend}
            </span>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
        </div>
      ))}
    </div>
  );
};