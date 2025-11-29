
import React, { useState, useEffect, useRef } from 'react';
import { PHASES, MEIOSIS_PHASES } from '../constants';
import { CellVisualization } from './CellVisualization';
import { ControlPanel } from './ControlPanel';
import { PhaseInfo } from './PhaseInfo';

interface MitosisSimulationProps {
  mode: 'mitosis' | 'meiosis';
}

export const MitosisSimulation: React.FC<MitosisSimulationProps> = ({ mode }) => {
  const currentPhases = mode === 'mitosis' ? PHASES : MEIOSIS_PHASES;
  
  const [fase, setFase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset phase when mode changes
  useEffect(() => {
    setFase(0);
    setIsPlaying(false);
  }, [mode]);

  const nextFase = () => {
      setFase((prev) => Math.min(prev + 1, currentPhases.length - 1));
  };

  const prevFase = () => {
      setFase((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
      setFase(0);
      setIsPlaying(false);
  };

  const togglePlay = () => {
      setIsPlaying(!isPlaying);
  };

  useEffect(() => {
      if (isPlaying) {
          timerRef.current = setInterval(() => {
              setFase((prev) => {
                  if (prev === currentPhases.length - 1) {
                      setIsPlaying(false);
                      return prev;
                  }
                  return prev + 1;
              });
          }, 3000); 
      } else {
          if (timerRef.current) clearInterval(timerRef.current);
      }
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
  }, [isPlaying, currentPhases]);

  // Determine sub-header for Meiosis
  const getSubHeader = () => {
      if (mode === 'mitosis') return null;
      if (fase === 0) return null;
      if (fase <= 4) return <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">MEIOSE I</span>;
      if (fase >= 5) return <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded">MEIOSE II</span>;
      return null;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-2 md:p-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="max-w-3xl w-full text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h1 className="text-3xl md:text-5xl font-bold text-indigo-700 tracking-tight">
                {mode === 'mitosis' ? 'Mitose Simulator' : 'Meiose Simulator'}
            </h1>
          </div>
          <p className="text-slate-500 text-lg">
              {mode === 'mitosis' 
                  ? 'Een interactieve reis door de gewone celdeling' 
                  : 'Een interactieve reis door de reductiedeling (geslachtscellen)'}
          </p>
      </div>

      {/* Main Visualization Container */}
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 w-full flex flex-col lg:flex-row gap-8 items-stretch min-h-[600px]">
          
          {/* Left Column: Animation */}
          <div className="flex-1 flex flex-col justify-center relative">
             {/* Stage Indicator Overlay */}
             {getSubHeader() && (
                 <div className="absolute top-0 left-0 z-20">
                    {getSubHeader()}
                 </div>
             )}
             <CellVisualization phaseIndex={fase} mode={mode} />
          </div>

          {/* Right Column: Info & Controls */}
          <div className="flex-1 flex flex-col justify-between gap-6">
              
              <PhaseInfo 
                phase={currentPhases[fase]} 
                phaseIndex={fase}
                totalPhases={currentPhases.length}
              />

              <ControlPanel 
                currentPhase={fase}
                totalPhases={currentPhases.length}
                isPlaying={isPlaying}
                onNext={nextFase}
                onPrev={prevFase}
                onReset={reset}
                onTogglePlay={togglePlay}
              />
              
          </div>
      </div>
    </div>
  );
};
