import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight,
  Target,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

interface InsightCardProps {
  title: string;
  type: string;
  image: string;
  description: string;
  impact: string;
  color: string;
}

const insights: InsightCardProps[] = [
  {
    title: 'Root Cause: Legal Latency',
    type: 'Root Cause',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d8c06e1c-18da-4bb6-9adf-755bb15bcc86/root-cause-insight-4e6a46a3-1771832050091.webp',
    description: 'Contract reviews are stalled in Legal queue for +14 days on average. SHAP score: 0.32',
    impact: 'High Impact',
    color: 'border-red-500/20 text-red-400'
  },
  {
    title: 'Golden Path Deviation',
    type: 'Behavioral',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d8c06e1c-18da-4bb6-9adf-755bb15bcc86/behavioral-insight-9ff4854e-1771832050923.webp',
    description: '92% of successful paths include tech validation. EMEA Sales currently skipping this step.',
    impact: 'Process Risk',
    color: 'border-orange-500/20 text-orange-400'
  },
  {
    title: 'Failure Prediction: Fin-App',
    type: 'Predictive',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d8c06e1c-18da-4bb6-9adf-755bb15bcc86/predictive-insight-c65de03a-1771832051183.webp',
    description: '80% failure risk in 3 days for approvals with current handoff delays.',
    impact: 'Strategic',
    color: 'border-purple-500/20 text-purple-400'
  }
];

export const InsightGrid: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Critical Insights
        </h3>
        <button className="text-sm text-cyan-400 flex items-center gap-1 hover:underline">
          View Repository <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`
              group relative overflow-hidden bg-white/5 border ${insight.color} rounded-2xl 
              p-4 hover:bg-white/[0.08] transition-all cursor-pointer
            `}
          >
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                <img 
                  src={insight.image} 
                  alt={insight.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {insight.type}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 bg-white/5 rounded-full border border-white/10">
                    {insight.impact}
                  </span>
                </div>
                <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                  {insight.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {insight.description}
                </p>
              </div>
            </div>
            
            {/* Quick Action Overlay */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated 2m ago
              </span>
              <button className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                Investigate Path <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 rounded-3xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-cyan-500/20 blur-[60px] rounded-full" />
        <div className="relative z-10 space-y-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/20">
            <Target className="w-6 h-6 text-cyan-400" />
          </div>
          <h4 className="font-bold text-lg">Systemic Bottleneck</h4>
          <p className="text-sm text-cyan-100/70">
            Sales→Legal handoff is 28% slower this month. This trend predicts a 12% revenue recognition delay.
          </p>
          <button className="w-full py-2 bg-cyan-500 text-black font-bold text-sm rounded-xl hover:bg-cyan-400 transition-colors">
            Generate Executive Brief
          </button>
        </div>
      </div>
    </div>
  );
};