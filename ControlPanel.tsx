import React from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

interface ControlPanelProps {
  currentPhase: number;
  totalPhases: number;
  isPlaying: boolean;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onTogglePlay: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  currentPhase, 
  totalPhases, 
  isPlaying, 
  onNext, 
  onPrev, 
  onReset, 
  onTogglePlay 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <button 
            onClick={onReset}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Opnieuw beginnen"
        >
            <RotateCcw size={24} />
        </button>

        <div className="flex gap-4">
            <button 
                onClick={onPrev}
                disabled={currentPhase === 0}
                className="px-4 py-2 flex items-center gap-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Vorige</span>
            </button>

            <button 
                onClick={onTogglePlay}
                className={`px-6 py-2 flex items-center gap-2 rounded-lg font-bold text-white transition-all shadow-md active:scale-95 ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
                {isPlaying ? (
                    <React.Fragment><Pause size={20} /> Stop</React.Fragment>
                ) : (
                    <React.Fragment><Play size={20} /> <span className="hidden sm:inline">Start Auto</span><span className="inline sm:hidden">Play</span></React.Fragment>
                )}
            </button>

            <button 
                onClick={onNext}
                disabled={currentPhase === totalPhases - 1}
                className="px-4 py-2 flex items-center gap-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <span className="hidden sm:inline">Volgende</span>
                <ChevronRight size={20} />
            </button>
        </div>
    </div>
  );
};