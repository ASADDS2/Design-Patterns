// src/App.tsx
import React from 'react';
import { useHomeControl } from './hooks/useHomeControl';
import { SceneControl } from './components/SceneControl';
import { ActivityHistory } from './components/ActivityHistory';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const { history, loading, activateMovie, activateWakeUp } = useHomeControl();

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-[#05d9e8]/10 text-[#05d9e8] shadow-[0_0_15px_rgba(5,217,232,0.3)]">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter glow-text-cyan">
          SMART <span className="text-[#ff2a6d] glow-text-pink">HOME</span> FACADE
        </h1>
        <p className="text-[#d1f7ff]/60 uppercase tracking-widest text-xs">
          Control de Sistemas Complejos simplificado
        </p>
      </header>

      <main className="grid grid-cols-1 gap-8">
        <SceneControl 
          onMovie={activateMovie} 
          onWakeUp={activateWakeUp} 
          loading={loading} 
        />
        
        <ActivityHistory history={history} />
      </main>

      <footer className="mt-12 text-center text-[#d1f7ff]/30 text-xs tracking-[0.2em]">
        DESIGN PATTERNS • FACADE PATTERN PROJECT • 2026
      </footer>
    </div>

  );
};

export default App;

