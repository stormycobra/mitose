
import React from 'react';
import { ChromosomeProps } from '../types';

export const Chromosome: React.FC<ChromosomeProps> = ({ type, position, rotation = 0, opacity = 1, color }) => {
  const colorClass = color || "text-indigo-600";
  const borderColorClass = color ? color.replace("text-", "border-").replace("600", "400").replace("500", "400") : "border-indigo-400";
  const strokeClass = color ? color.replace("text-", "stroke-").replace("600", "400").replace("500", "400") : "stroke-indigo-400";
  
  const baseStyle = `absolute transition-all duration-1000 ease-in-out w-8 h-8 flex items-center justify-center font-bold text-2xl ${colorClass}`;
  
  const style = {
      left: position.x,
      top: position.y,
      transform: `rotate(${rotation}deg)`,
      opacity: opacity
  };

  if (type === 'messy') {
      return (
          <div className="absolute transition-all duration-1000" style={{ left: position.x, top: position.y, opacity }}>
             <svg width="40" height="40" viewBox="0 0 100 100" className={`${strokeClass} fill-none stroke-2`}>
               <path d="M10,50 Q30,10 50,50 T90,50" />
               <path d="M10,30 Q30,70 50,30 T90,30" />
             </svg>
          </div>
      );
  }

  if (type === 'v-split') {
      return (
          <React.Fragment>
              <div style={{ ...style, transform: `rotate(${rotation - 90}deg) translate(-20px, 0)` }} className={baseStyle}>&lt;</div>
              <div style={{ ...style, transform: `rotate(${rotation + 90}deg) translate(-20px, 0)` }} className={baseStyle}>&gt;</div>
          </React.Fragment>
      )
  }

  return <div style={style} className={baseStyle}>X</div>;
};
