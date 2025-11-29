
export interface PhaseData {
  titel: string;
  subtitel: string;
  beschrijving: string;
  details: string[];
}

export interface ChromosomeProps {
  id?: number;
  type: 'messy' | 'x' | 'v-split';
  position: { x: string; y: string };
  rotation?: number;
  opacity?: number;
  color?: string;
}

export interface CellConfig {
  shape: string;
  nucleusOpacity: number;
  nucleusBorder: string;
  chromosomes: ChromosomeProps[];
  showCentrioles: boolean;
  spindleOpacity: number;
  membraneOpacity: number;
}

export interface SimulationState {
    cells: CellConfig[];
    cellGap: number;
}
