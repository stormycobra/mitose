import React from 'react';
import { Info } from 'lucide-react';
import { PhaseData } from '../types';

interface PhaseInfoProps {
  phase: PhaseData;
  phaseIndex: number;
  totalPhases: number;
}

export const PhaseInfo: React.FC<PhaseInfoProps> = ({ phase, phaseIndex, totalPhases }) => {
  return (
    <>
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
                <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Fase {phaseIndex + 1}
                </span>
                <h2 className="text-2xl font-bold text-indigo-900">{phase.titel}</h2>
            </div>
            <h3 className="text-lg text-indigo-600 font-semibold mb-3">{phase.subtitel}</h3>
            <p className="text-slate-700 leading-relaxed mb-4 min-h-[80px]">
                {phase.beschrijving}
            </p>
            
            <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                <h4 className="flex items-center gap-2 font-semibold text-sm text-slate-500 mb-2">
                    <Info size={16} />
                    Kenmerken:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                    {phase.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-slate-600">{detail}</li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
            <div 
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${((phaseIndex + 1) / totalPhases) * 100}%` }}
            ></div>
        </div>
    </>
  );
};