import React from 'react';
import { Play, Coffee, Loader2 } from 'lucide-react';

interface SceneControlProps {
  onMovie: () => void;
  onWakeUp: () => void;
  loading: boolean;
}

export const SceneControl: React.FC<SceneControlProps> = ({ onMovie, onWakeUp, loading }) => {
  return (
    <div className="glass-panel p-8 mb-8">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-3 glow-text-cyan">
        <Play size={24} className="text-[#05d9e8]" />
        CONTROL DE ESCENAS
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={onMovie}
          disabled={loading}
          className="group flex flex-col items-center justify-center gap-4 p-8 glass-panel hover:bg-[#ff2a6d]/10 transition-all border-l-4 border-[#ff2a6d] disabled:opacity-50"
        >
          <div className="p-4 rounded-full bg-[#ff2a6d]/10 text-[#ff2a6d] group-hover:shadow-[0_0_20px_rgba(255,42,109,0.4)] transition-all">
            {loading ? <Loader2 className="animate-spin" size={32} /> : <Play fill="#ff2a6d" size={32} />}
          </div>
          <span className="font-bold text-[#ff2a6d] uppercase tracking-widest text-sm">Activar Modo Cine</span>
        </button>

        <button 
          onClick={onWakeUp}
          disabled={loading}
          className="group flex flex-col items-center justify-center gap-4 p-8 glass-panel hover:bg-[#05d9e8]/10 transition-all border-l-4 border-[#05d9e8] disabled:opacity-50"
        >
          <div className="p-4 rounded-full bg-[#05d9e8]/10 text-[#05d9e8] group-hover:shadow-[0_0_20px_rgba(5,217,232,0.4)] transition-all">
            {loading ? <Loader2 className="animate-spin" size={32} /> : <Coffee fill="#05d9e8" size={32} />}
          </div>
          <span className="font-bold text-[#05d9e8] uppercase tracking-widest text-sm">Modo Despertar</span>
        </button>
      </div>
    </div>

  );
};


