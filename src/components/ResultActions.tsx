import { Station } from '../data/StationData';
import { ThemeColor } from '../data/ColorData';
import { Map } from 'lucide-react';

interface ResultActionsProps {
  station: Station | null;
  color: ThemeColor | null;
}

export function ResultActions({ station, color }: ResultActionsProps) {
  if (!station || !color) return <div className="h-24"></div>; // Placeholder
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.name + '站')}`;

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-6 bg-surface/50 rounded-2xl border border-white/5 shadow-xl animate-fade-in">
      <h3 className="text-xl font-medium text-white/80">你的攝影冒險任務</h3>
      
      <div className="flex items-center gap-3 text-2xl font-bold">
        <span 
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: station.lineColor, color: '#fff' }}
        >
          {station.name}
        </span>
        <span className="text-gray-400">+</span>
        <span 
          className="px-4 py-2 rounded-lg border border-white/20"
          style={{ backgroundColor: color.hex, color: color.textColor }}
        >
          {color.name}
        </span>
      </div>

      <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-2 py-3 px-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
      >
        <Map size={20} />
        在 Google Maps 尋找 {station.name}
      </a>
    </div>
  );
}
