import React from 'react';
import { GitBranch, Maximize2, RefreshCw, Layers, ShieldCheck, PlayCircle } from 'lucide-react';

export const WorkflowVisualizer: React.FC = () => {
  return (
    <div className="bg-[#0D1117] border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
            <GitBranch className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold">Reconstructed Workflow Graph</h3>
            <p className="text-xs text-gray-500">Global Sales Pipeline • Entity: QUOTE-2026-XF</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400" title="Expand">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl text-sm font-medium hover:bg-cyan-500/20 transition-all">
            <Layers className="w-4 h-4" />
            Layer: Anomaly
          </button>
        </div>
      </div>

      <div className="flex-1 relative group cursor-crosshair">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d8c06e1c-18da-4bb6-9adf-755bb15bcc86/workflow-viz-889c867b-1771832050191.webp" 
          alt="Workflow Graph Visualization" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        />
        
        {/* Floating AI Nodes */}
        <div className="absolute top-1/4 left-1/3 p-3 bg-black/60 backdrop-blur-xl border border-red-500/50 rounded-2xl shadow-2xl animate-pulse">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-3 h-3 text-red-500" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">Drift Detected</span>
          </div>
          <p className="text-[11px] font-medium text-white">Illegal Transition: Legal → Billing</p>
          <p className="text-[9px] text-gray-400">Probability: 0.00042%</p>
        </div>

        <div className="absolute bottom-1/4 right-1/4 p-3 bg-black/60 backdrop-blur-xl border border-cyan-500/50 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
            <PlayCircle className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Golden Path</span>
          </div>
          <p className="text-[11px] font-medium text-white">Optimal: Tech Qual → Pricing</p>
          <p className="text-[9px] text-gray-400">Success Rate: 98.4%</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 flex items-center gap-6 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold">
            <div className="w-2 h-2 rounded-full bg-cyan-400" /> Path Success
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold">
            <div className="w-2 h-2 rounded-full bg-red-400" /> Latency Spike
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-gray-500">
            <div className="w-2 h-2 rounded-full bg-gray-500" /> Metadata Only
          </div>
        </div>
      </div>
    </div>
  );
};