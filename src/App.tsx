import React from 'react';
import { Layout, BarChart3, Activity, Zap, ShieldCheck, Settings, Bell, Search, Menu, Filter, Info, ArrowUpRight, TrendingUp, AlertTriangle, Clock, Target } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { InsightGrid } from './components/dashboard/InsightGrid';
import { WorkflowVisualizer } from './components/dashboard/WorkflowVisualizer';
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary';
import { EntityDetails } from './components/dashboard/EntityDetails';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-gray-100 font-sans selection:bg-cyan-500/30">
      <Toaster position="top-right" theme="dark" />
      
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0A0C10]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d8c06e1c-18da-4bb6-9adf-755bb15bcc86/logo-6539751c-1771832049788.webp" 
            alt="OpenExec Logo" 
            className="w-8 h-8 rounded-lg shadow-lg shadow-cyan-500/20"
          />
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            OpenExec
          </span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop & Mobile Drawer */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 w-full min-h-screen lg:pl-64">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                  Execution Intelligence
                </h1>
                <p className="text-gray-400 flex items-center gap-2 text-sm sm:text-base">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Analyzing 10.4M events/day • Next-gen workflow reconstruction active
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search entities, insights..." 
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-full md:w-64 transition-all"
                  />
                </div>
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#0A0C10]"></span>
                </button>
              </div>
            </div>

            {/* Dashboard Sections */}
            <ExecutiveSummary />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <WorkflowVisualizer />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Intelligence Streams</h3>
                      <button className="text-sm text-cyan-400 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: 'Legal Latency Spike', impact: 'High', status: 'Resolving', trend: '+14%' },
                        { title: 'Workflow Deviance - Q3', impact: 'Medium', status: 'Analyzing', trend: '-2%' },
                        { title: 'Anomaly: Fin-Approval', impact: 'Critical', status: 'Action Required', trend: '+45%' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${item.impact === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`} />
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.status}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-mono ${item.trend.startsWith('+') ? 'text-red-400' : 'text-emerald-400'}`}>
                              {item.trend}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <EntityDetails />
                </div>
              </div>
              
              <div className="space-y-8">
                <InsightGrid />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;