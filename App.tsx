
import React, { useState } from 'react';
import { MitosisSimulation } from './components/MitosisSimulation';

const App: React.FC = () => {
  const [mode, setMode] = useState<'mitosis' | 'meiosis'>('mitosis');

  return (
    <div className="min-h-screen w-full py-8 px-4 flex flex-col items-center">
      
      {/* Mode Switcher */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex flex-wrap justify-center gap-1 mb-6">
          <button 
              onClick={() => setMode('mitosis')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${mode === 'mitosis' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
              Mitose
          </button>
          <button 
              onClick={() => setMode('meiosis')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${mode === 'meiosis' ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
              Meiose
          </button>
      </div>

      <MitosisSimulation mode={mode} />
    </div>
  );
};

export default App;