import React from 'react';
import PCWizard from './components/builder/PCWizard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            PC Custom Configurator
          </h1>
          <p className="text-slate-500 font-medium">
            Implementación profesional del patrón de diseño <span className="text-indigo-600">Builder</span>
          </p>
        </header>

        <main>
          <PCWizard />
        </main>
      </div>
    </div>
  );
}

export default App;
