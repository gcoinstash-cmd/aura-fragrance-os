import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  AlertCircle,
  Database,
  Radio,
  FlaskConical,
  Layers,
  FileText
} from 'lucide-react';

export interface FormulationBatch {
  id: string;
  batchCode: string;
  name: string;
  olfactoryFamily: string;
  concentration: string;
  agingDays: number;
  status: 'maceration' | 'filtration' | 'bottling' | 'ready';
  volumeBottles: number;
}

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  batches: FormulationBatch[];
  onUpdateStatus: (id: string, newStatus: FormulationBatch['status']) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ 
  isOpen, 
  onClose,
  batches,
  onUpdateStatus
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'batches' | 'notes' | 'telemetry'>('batches');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'fragrance2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAutoFill = () => {
    setPasscode('fragrance2026');
    setIsAuthenticated(true);
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#08080A] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.2)] rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold flex items-center gap-2">
              <Terminal size={14} /> AURA_FRAGRANCE_OS // ATELIER_DISPATCH_GATE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              <Lock size={28} />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 font-mono">
              PERFUMER'S ATELIER // OPERATOR ACCESS
            </h2>
            <p className="text-base text-zinc-200 leading-relaxed max-w-md mb-8">
              Frictionless demo gate active. Use the 1-click bypass button below or enter preset passkey <code className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-mono">fragrance2026</code>.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div className="relative">
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-black/60 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono text-center tracking-widest"
                />
              </div>

              {error && (
                <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-mono">
                  <AlertCircle size={14} />
                  <span>ACCESS DENIED // INVALID CODE</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider py-3 rounded-xl text-base font-semibold min-h-[44px] transition-all duration-200 font-mono shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 cursor-pointer"
              >
                Authenticate Perfumer
              </button>

              {/* 1-Click Auto-Fill Demo Bypass */}
              <button
                type="button"
                onClick={handleAutoFill}
                className="w-full bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 font-mono text-base font-semibold min-h-[44px] uppercase tracking-wider py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>1-Click Auto-Fill Demo Passkey (`fragrance2026`)</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Operator Nav Strip */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/40 font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('batches')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'batches' 
                      ? 'bg-amber-400 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FlaskConical size={13} />
                  <span>MACERATION BATCHES ({batches.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'telemetry' 
                      ? 'bg-amber-400 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Radio size={13} />
                  <span>SUPABASE ATELIER RLS</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold shrink-0">
                <ShieldCheck size={14} />
                <span>ATELIER_AUTH: OK</span>
              </div>
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeTab === 'batches' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-widest">Active Extraction & Aging Cellar</span>
                    <span className="text-amber-400">Aging Temp: 16°C • Humidity: 45%</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {batches.map((b) => (
                      <div 
                        key={b.id}
                        className="bg-black/70 border border-white/10 hover:border-amber-500/40 rounded-xl p-5 space-y-3 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-mono text-amber-400 font-bold block">{b.batchCode} • {b.concentration}</span>
                            <h3 className="text-sm font-bold text-white mt-0.5">{b.name}</h3>
                          </div>
                          <span className={`text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            b.status === 'ready' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                              : b.status === 'maceration' 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse' 
                              : 'bg-white/10 text-slate-300'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3 space-y-1 text-xs font-mono text-slate-300">
                          <div className="flex justify-between">
                            <span>Olfactory Family:</span>
                            <span className="text-white font-bold">{b.olfactoryFamily}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Maceration Elapsed:</span>
                            <span className="text-amber-300 font-bold">{b.agingDays} Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Target Production:</span>
                            <span className="text-slate-200">{b.volumeBottles} Flacons (50ml)</span>
                          </div>
                        </div>

                        {/* Status Switcher */}
                        <div className="pt-2 border-t border-white/5 flex gap-1.5 font-mono text-xs font-semibold tracking-wider">
                          {(['maceration', 'filtration', 'bottling', 'ready'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateStatus(b.id, st)}
                              className={`flex-1 py-1 rounded uppercase transition-colors cursor-pointer ${
                                b.status === st 
                                  ? 'bg-amber-400 text-black font-bold' 
                                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="bg-black/70 border border-white/10 rounded-xl p-6 font-mono text-xs space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Database size={16} />
                    <span>SUPABASE CLUSTER STATUS // AURA_FRAGRANCE_PROD</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">DATABASE ENGINE</span>
                      <strong className="text-white">PostgreSQL 15 (Supabase Hosted)</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">SECURITY LAYER</span>
                      <strong className="text-emerald-400">Row Level Security (RLS) Active</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">TABLE: fragrance_formulas</span>
                      <strong className="text-white">4 Master Formulations Seeded</strong>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-slate-300 block text-xs font-semibold tracking-wider">TABLE: custom_perfume_intakes</span>
                      <strong className="text-white">Active Atelier Queue</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
