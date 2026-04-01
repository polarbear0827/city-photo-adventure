import { Station } from '../data/StationData';
import { ThemeColor } from '../data/ColorData';
import { Shape } from '../data/ShapeData';
import { Map, Box, MapPin } from 'lucide-react';

interface ResultActionsProps {
  station?: Station;
  colors?: ThemeColor[];
  shape?: Shape;
}

export function ResultActions({ station, colors, shape }: ResultActionsProps) {
  if (!station && (!colors || colors.length === 0) && !shape) return null;
  
  const googleMapsUrl = station ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.name + '站')}` : '';

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full p-8 bg-surface/40 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl animate-fade-in text-center">
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-sm font-black text-primary/80 uppercase tracking-[0.3em]">Adventure Mission</h3>
        <p className="text-2xl font-bold text-white">你的攝影挑戰任務</p>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {/* Station Part */}
        {station && (
          <div className="flex items-center gap-3 bg-white/5 p-2 pr-5 rounded-full border border-white/5 shadow-inner">
            <span 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: station.lineColor }}
            >
              <MapPin size={20} />
            </span>
            <span className="text-xl font-black italic tracking-tight">{station.name}</span>
          </div>
        )}

        {station && (colors || shape) && <span className="text-white/20 font-black text-2xl">×</span>}

        {/* Color Part */}
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-2 bg-white/5 p-2 px-3 rounded-2xl border border-white/5">
            <div className="flex -space-x-2">
              {colors.map((color, idx) => (
                <div 
                  key={`${color.name}-${idx}`}
                  className="w-10 h-10 rounded-xl border-2 border-surface shadow-xl"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-bold text-white/90">
              {colors.length === 1 ? colors[0].name : `${colors.length} 色模式`}
            </span>
          </div>
        )}

        {(station || colors) && shape && <span className="text-white/20 font-black text-2xl">×</span>}

        {/* Shape Part */}
        {shape && (
          <div className="flex items-center gap-3 bg-white/5 p-2 pr-5 rounded-2xl border border-white/5 shadow-inner">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500 border border-yellow-500/30">
              <Box size={22} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tighter leading-none">{shape.name}</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Composition</span>
            </div>
          </div>
        )}
      </div>

      {station && (
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-4 px-10 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] group mt-2"
        >
          <Map size={20} className="group-hover:rotate-12 transition-transform" />
          前往 {station.name}
        </a>
      )}
    </div>
  );
}
