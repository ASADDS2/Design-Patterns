import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';
import { HomeState } from '../types';

export const ActivityHistory: React.FC<{ history: HomeState[] }> = ({ history }) => {
  return (
    <div className="glass-panel p-8">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-3 glow-text-pink">
        <History size={24} className="text-[#ff2a6d]" />
        HISTORIAL DE ACTIVIDAD
      </h2>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
        {history.length === 0 ? (
          <div className="p-8 text-center text-[#d1f7ff]/20 italic border-2 border-dashed border-[#005678]/30 rounded-xl">
            Esperando comandos...
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-[#005678]/10 border border-[#005678]/30 hover:border-[#05d9e8]/50 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className="font-black text-[#d1f7ff] tracking-tight group-hover:text-[#05d9e8] transition-colors">
                  {item.last_action.toUpperCase()}
                </span>
                <span className="text-[10px] text-[#d1f7ff]/40 font-mono tracking-tighter">
                  {new Date(item.activated_at).toLocaleTimeString()} • {new Date(item.activated_at).toLocaleDateString()}
                </span>
              </div>
              <ul className="text-xs text-[#d1f7ff]/70 space-y-2">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#05d9e8]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>

  );
};
