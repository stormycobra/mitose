
import React from 'react';
import { Chromosome } from './Chromosome';
import { SimulationState, CellConfig } from '../types';

interface CellVisualizationProps {
  phaseIndex: number;
  mode: 'mitosis' | 'meiosis';
}

export const CellVisualization: React.FC<CellVisualizationProps> = ({ phaseIndex, mode }) => {
  
  const getMitosisState = (fase: number): SimulationState => {
      let baseConfig: CellConfig = {
          shape: "w-64 h-64 rounded-full",
          nucleusOpacity: 1,
          nucleusBorder: "border-solid",
          chromosomes: [],
          showCentrioles: false,
          spindleOpacity: 0,
          membraneOpacity: 0
      };

      if (fase === 5) { // Cytokinese
          return {
              cellGap: 1,
              cells: [
                  { ...baseConfig, nucleusOpacity: 1, chromosomes: [{ type: 'messy', position: { x: '30%', y: '30%' } }] },
                  { ...baseConfig, nucleusOpacity: 1, chromosomes: [{ type: 'messy', position: { x: '50%', y: '40%' } }] }
              ]
          };
      }

      // Phases 0-4 (Single cell processing)
      const cell = { ...baseConfig };
      
      switch(fase) {
          case 0: // Interfase
              cell.chromosomes = [
                  { id: 1, type: 'messy', position: {x: '30%', y: '30%'} },
                  { id: 2, type: 'messy', position: {x: '50%', y: '40%'} },
                  { id: 3, type: 'messy', position: {x: '40%', y: '60%'} },
              ];
              break;
          case 1: // Profase
              cell.nucleusBorder = "border-dotted";
              cell.nucleusOpacity = 0.5;
              cell.showCentrioles = true;
              cell.chromosomes = [
                  { id: 1, type: 'x', position: {x: '30%', y: '30%'}, rotation: 15 },
                  { id: 2, type: 'x', position: {x: '60%', y: '40%'}, rotation: -10 },
                  { id: 3, type: 'x', position: {x: '45%', y: '65%'}, rotation: 45 },
              ];
              break;
          case 2: // Metafase
              cell.nucleusOpacity = 0;
              cell.showCentrioles = true;
              cell.spindleOpacity = 1;
              cell.chromosomes = [
                  { id: 1, type: 'x', position: {x: '45%', y: '20%'}, rotation: 90 },
                  { id: 2, type: 'x', position: {x: '45%', y: '45%'}, rotation: 90 },
                  { id: 3, type: 'x', position: {x: '45%', y: '70%'}, rotation: 90 },
              ];
              break;
          case 3: // Anafase
              cell.shape = "w-80 h-64 rounded-[40%]"; 
              cell.nucleusOpacity = 0;
              cell.showCentrioles = true;
              cell.spindleOpacity = 0.5;
              cell.chromosomes = [
                  { id: 1, type: 'v-split', position: {x: '45%', y: '20%'}, rotation: 90 }, 
                  { id: 2, type: 'v-split', position: {x: '45%', y: '45%'}, rotation: 90 },
                  { id: 3, type: 'v-split', position: {x: '45%', y: '70%'}, rotation: 90 },
              ];
              break;
          case 4: // Telofase
              cell.shape = "w-80 h-64 rounded-[3rem]"; 
              cell.nucleusOpacity = 0;
              cell.membraneOpacity = 1;
              cell.showCentrioles = true;
              cell.spindleOpacity = 0.2;
              break;
      }

      return { cellGap: 0, cells: [cell] };
  };

  const getMeiosisState = (fase: number): SimulationState => {
      const BLUE = "text-indigo-600";
      const RED = "text-rose-600"; // Increased contrast from 500 to 600
      
      let baseConfig: CellConfig = {
          shape: "w-64 h-64 rounded-full",
          nucleusOpacity: 1,
          nucleusBorder: "border-solid",
          chromosomes: [],
          showCentrioles: false,
          spindleOpacity: 0,
          membraneOpacity: 0
      };

      // Cytokinesis II
      if (fase === 9) {
          const smallCell = { ...baseConfig, shape: "w-32 h-32 rounded-full", nucleusOpacity: 1 };
          return {
              cellGap: 1,
              cells: [
                  { ...smallCell, chromosomes: [{ type: 'messy', position: { x: '50%', y: '50%' }, color: BLUE }] },
                  { ...smallCell, chromosomes: [{ type: 'messy', position: { x: '50%', y: '50%' }, color: BLUE }] },
                  { ...smallCell, chromosomes: [{ type: 'messy', position: { x: '50%', y: '50%' }, color: RED }] },
                  { ...smallCell, chromosomes: [{ type: 'messy', position: { x: '50%', y: '50%' }, color: RED }] },
              ]
          };
      }

      // Phases 5-8 (Meiosis II - 2 Cells)
      if (fase >= 5) {
          const leftCell = { ...baseConfig };
          const rightCell = { ...baseConfig };
          
          if (fase === 5) { // Cytokinesis I / Prophase II
             leftCell.nucleusOpacity = 1;
             rightCell.nucleusOpacity = 1;
             // Left cell gets Blue, Right gets Red
             leftCell.chromosomes = [
                 { type: 'x', position: { x: '40%', y: '40%' }, color: BLUE }, 
                 { type: 'x', position: { x: '60%', y: '60%' }, color: BLUE }
             ];
             rightCell.chromosomes = [
                 { type: 'x', position: { x: '40%', y: '40%' }, color: RED }, 
                 { type: 'x', position: { x: '60%', y: '60%' }, color: RED }
             ];
          } else if (fase === 6) { // Metaphase II
             leftCell.nucleusOpacity = 0; rightCell.nucleusOpacity = 0;
             leftCell.spindleOpacity = 1; rightCell.spindleOpacity = 1;
             leftCell.chromosomes = [
                 { type: 'x', position: { x: '45%', y: '30%' }, rotation: 90, color: BLUE },
                 { type: 'x', position: { x: '45%', y: '60%' }, rotation: 90, color: BLUE }
             ];
             rightCell.chromosomes = [
                 { type: 'x', position: { x: '45%', y: '30%' }, rotation: 90, color: RED },
                 { type: 'x', position: { x: '45%', y: '60%' }, rotation: 90, color: RED }
             ];
          } else if (fase === 7) { // Anaphase II
             leftCell.nucleusOpacity = 0; rightCell.nucleusOpacity = 0;
             leftCell.shape = "w-64 h-56 rounded-[30%]"; rightCell.shape = "w-64 h-56 rounded-[30%]"; 
             leftCell.spindleOpacity = 0.5; rightCell.spindleOpacity = 0.5;
             leftCell.chromosomes = [
                 { type: 'v-split', position: { x: '45%', y: '30%' }, rotation: 90, color: BLUE },
                 { type: 'v-split', position: { x: '45%', y: '60%' }, rotation: 90, color: BLUE }
             ];
             rightCell.chromosomes = [
                 { type: 'v-split', position: { x: '45%', y: '30%' }, rotation: 90, color: RED },
                 { type: 'v-split', position: { x: '45%', y: '60%' }, rotation: 90, color: RED }
             ];
          } else if (fase === 8) { // Telophase II
             leftCell.nucleusOpacity = 0; rightCell.nucleusOpacity = 0;
             leftCell.shape = "w-64 h-56 rounded-[2rem]"; rightCell.shape = "w-64 h-56 rounded-[2rem]"; 
             leftCell.membraneOpacity = 1; rightCell.membraneOpacity = 1;
             leftCell.spindleOpacity = 0.2; rightCell.spindleOpacity = 0.2;
          }

          return { cellGap: 1, cells: [leftCell, rightCell] };
      }

      // Phases 0-4 (Meiosis I - Single Cell)
      const cell = { ...baseConfig };
      
      switch(fase) {
          case 0: // Interfase
              cell.chromosomes = [
                  { type: 'messy', position: {x: '35%', y: '35%'}, color: BLUE },
                  { type: 'messy', position: {x: '55%', y: '45%'}, color: RED },
                  { type: 'messy', position: {x: '45%', y: '55%'}, color: BLUE },
              ];
              break;
          case 1: // Profase I (Pairing)
              cell.nucleusBorder = "border-dotted";
              cell.nucleusOpacity = 0.5;
              cell.chromosomes = [
                  // Pair 1 - Increased separation slightly to avoid total overlap
                  { type: 'x', position: {x: '35%', y: '38%'}, rotation: 10, color: BLUE },
                  { type: 'x', position: {x: '45%', y: '38%'}, rotation: -10, color: RED },
                  // Pair 2
                  { type: 'x', position: {x: '52%', y: '62%'}, rotation: 10, color: BLUE },
                  { type: 'x', position: {x: '62%', y: '62%'}, rotation: -10, color: RED },
              ];
              break;
          case 2: // Metafase I (Pairs on equator)
              cell.nucleusOpacity = 0;
              cell.spindleOpacity = 1;
              cell.chromosomes = [
                  // Top Pair
                  { type: 'x', position: {x: '45%', y: '25%'}, rotation: 90, color: BLUE },
                  { type: 'x', position: {x: '45%', y: '35%'}, rotation: 90, color: RED },
                  // Bottom Pair
                  { type: 'x', position: {x: '45%', y: '55%'}, rotation: 90, color: BLUE },
                  { type: 'x', position: {x: '45%', y: '65%'}, rotation: 90, color: RED },
              ];
              break;
          case 3: // Anafase I (Homologous chromosomes separate - WHOLE X's move)
              cell.shape = "w-80 h-64 rounded-[40%]"; 
              cell.nucleusOpacity = 0;
              cell.spindleOpacity = 0.5;
              cell.chromosomes = [
                  // Blues go Up, Reds go Down
                  { type: 'x', position: {x: '45%', y: '20%'}, rotation: 90, color: BLUE },
                  { type: 'x', position: {x: '45%', y: '50%'}, rotation: 90, color: BLUE },
                  
                  { type: 'x', position: {x: '45%', y: '70%'}, rotation: 90, color: RED },
                  { type: 'x', position: {x: '45%', y: '80%'}, rotation: 90, color: RED },
              ];
              break;
          case 4: // Telofase I
              cell.shape = "w-80 h-64 rounded-[3rem]"; 
              cell.nucleusOpacity = 0;
              cell.membraneOpacity = 1;
              cell.chromosomes = [
                  { type: 'x', position: {x: '45%', y: '25%'}, rotation: 90, color: BLUE, opacity: 0.5 },
                  { type: 'x', position: {x: '45%', y: '75%'}, rotation: 90, color: RED, opacity: 0.5 },
              ];
              break;
      }

      return { cellGap: 0, cells: [cell] };
  };

  const currentState = mode === 'mitosis' ? getMitosisState(phaseIndex) : getMeiosisState(phaseIndex);

  return (
    <div className="flex-1 w-full h-[400px] bg-slate-100 rounded-xl relative flex items-center justify-center overflow-hidden border border-slate-200">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

        <div className={`flex flex-wrap items-center justify-center transition-all duration-1000 ${currentState.cellGap > 0 ? 'gap-4' : ''}`}>
            
            {currentState.cells.map((cell, idx) => (
                <div key={`${mode}-${idx}`} className={`${cell.shape} bg-indigo-50 border-4 border-indigo-200 relative transition-all duration-1000 ease-in-out`}>
                    
                    {cell.showCentrioles && (
                        <React.Fragment>
                            <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-400 rounded transition-all duration-1000 ${phaseIndex >= 2 ? '-top-6' : 'top-4'}`}></div>
                            <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-400 rounded transition-all duration-1000 ${phaseIndex >= 2 ? '-bottom-6' : 'bottom-4'}`}></div>
                        </React.Fragment>
                    )}

                    <div className={`absolute inset-0 transition-opacity duration-1000 ${cell.spindleOpacity > 0 ? 'opacity-100' : 'opacity-0'}`} style={{ pointerEvents: 'none' }}>
                        <svg width="100%" height="100%">
                            <line x1="50%" y1="0%" x2="50%" y2="50%" stroke="#fb923c" strokeWidth="2" strokeDasharray="4" />
                            <line x1="50%" y1="100%" x2="50%" y2="50%" stroke="#fb923c" strokeWidth="2" strokeDasharray="4" />
                            {mode === 'mitosis' && (
                                <>
                                <line x1="50%" y1="0%" x2="30%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                <line x1="50%" y1="100%" x2="30%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                <line x1="50%" y1="0%" x2="70%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                <line x1="50%" y1="100%" x2="70%" y2="50%" stroke="#fb923c" strokeWidth="1" strokeDasharray="4" className="opacity-50" />
                                </>
                            )}
                        </svg>
                    </div>

                    <div className={`absolute inset-0 m-auto w-full h-full max-w-[70%] max-h-[70%] border-4 border-indigo-300 rounded-full transition-all duration-1000 flex items-center justify-center ${cell.nucleusBorder}`} 
                        style={{ opacity: cell.nucleusOpacity }}>
                        {phaseIndex === 0 && <span className="text-xs text-indigo-400 font-semibold absolute bottom-2">Kern</span>}
                    </div>

                    {cell.membraneOpacity > 0 && (
                        <React.Fragment>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[60%] h-[40%] border-2 border-dotted border-indigo-400 rounded-full opacity-0 animate-in fade-in duration-1000" style={{opacity: 1}}></div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-[40%] border-2 border-dotted border-indigo-400 rounded-full opacity-0 animate-in fade-in duration-1000" style={{opacity: 1}}></div>
                        </React.Fragment>
                    )}

                    {/* Chromosomes Container - z-10 ensures it's above nucleus and spindle */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {/* Rendering Manual Chromosomes for specific visual phases where Component mapping isn't enough (Splits) */}
                        {mode === 'mitosis' && phaseIndex === 4 ? (
                            // Telophase Mitosis specialized render
                            <React.Fragment>
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1">
                                    <span className="text-indigo-600 font-bold rotate-90 opacity-50">&lt;</span>
                                    <span className="text-indigo-600 font-bold rotate-90 opacity-50">&lt;</span>
                                    <span className="text-indigo-600 font-bold rotate-90 opacity-50">&lt;</span>
                                </div>
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                                    <span className="text-indigo-600 font-bold rotate-90 opacity-50">&gt;</span>
                                    <span className="text-indigo-600 font-bold rotate-90 opacity-50">&gt;</span>
                                    <span className="text-indigo-600 font-bold rotate-90 opacity-50">&gt;</span>
                                </div>
                            </React.Fragment>
                        ) : (
                            cell.chromosomes.map((c, i) => (
                                <Chromosome key={i} type={c.type} position={c.position} rotation={c.rotation || 0} color={c.color} opacity={c.opacity} />
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
