import { useRef, useState, useEffect } from 'react';
import { Station, STATION_REGIONS, RegionKey } from '../data/StationData';
import { ThemeColor, COLOR_DATA } from '../data/ColorData';
import { SlotSpinner } from './SlotSpinner';
import { MapPin, Palette, Zap, Map as MapIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlotMachineProps {
  onResult: (station: Station, color: ThemeColor) => void;
}

export function SlotMachine({ onResult }: SlotMachineProps) {
  const [activeRegion, setActiveRegion] = useState<RegionKey>('north');
  const [isStationSpinning, setStationSpinning] = useState(false);
  const [isColorSpinning, setColorSpinning] = useState(false);
  
  const stationRef = useRef<Station | null>(null);
  const colorRef = useRef<ThemeColor | null>(null);
  const pendingCheck = useRef(false);

  const stations = STATION_REGIONS[activeRegion].stations;

  const startStationSpin = () => {
    pendingCheck.current = true;
    setStationSpinning(true);
  };

  const startColorSpin = () => {
    pendingCheck.current = true;
    setColorSpinning(true);
  };

  const startBothSpin = () => {
    pendingCheck.current = true;
    setStationSpinning(true);
    setColorSpinning(true);
  };

  const handleStationEnd = (station: Station) => {
    stationRef.current = station;
    setStationSpinning(false);
  };

  const handleColorEnd = (color: ThemeColor) => {
    colorRef.current = color;
    setColorSpinning(false);
  };

  useEffect(() => {
    if (pendingCheck.current && !isStationSpinning && !isColorSpinning && stationRef.current && colorRef.current) {
      pendingCheck.current = false;
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onResult(stationRef.current, colorRef.current);
    }
  }, [isStationSpinning, isColorSpinning, onResult]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4 py-8">
      {/* 分類切換按鈕 */}
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-2">
        {(Object.keys(STATION_REGIONS) as RegionKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveRegion(key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
              ${activeRegion === key 
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'}
            `}
          >
            <MapIcon size={16} />
            {STATION_REGIONS[key].displayName}
          </button>
        ))}
      </div>

      <div className="flex w-full gap-4 md:gap-8 justify-center">
        {/* Station Slot */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <MapPin size={24} />
            <span>捷運站點</span>
          </div>
          <SlotSpinner
            items={stations}
            isSpinning={isStationSpinning}
            onSpinEnd={handleStationEnd}
            height={80}
            renderItem={(station) => (
              <span 
                className="px-3 py-1 rounded-full text-base md:text-xl text-white shadow font-bold"
                style={{ backgroundColor: station.lineColor }}
              >
                {station.name}
              </span>
            )}
          />
          <button
            disabled={isStationSpinning}
            onClick={startStationSpin}
            className="w-full py-3 px-6 rounded-xl font-bold bg-surface hover:bg-white/10 transition-colors border border-white/10 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            抽站點
          </button>
        </div>

        {/* Color Slot */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-accent font-semibold">
            <Palette size={24} />
            <span>指定顏色</span>
          </div>
          <SlotSpinner
            items={COLOR_DATA}
            isSpinning={isColorSpinning}
            onSpinEnd={handleColorEnd}
            height={80}
            renderItem={(color) => (
              <span 
                className="px-4 py-1 rounded-lg text-lg md:text-2xl shadow border border-white/20 font-bold"
                style={{ backgroundColor: color.hex, color: color.textColor }}
              >
                {color.name}
              </span>
            )}
          />
          <button
            disabled={isColorSpinning}
            onClick={startColorSpin}
            className="w-full py-3 px-6 rounded-xl font-bold bg-surface hover:bg-white/10 transition-colors border border-white/10 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            抽顏色
          </button>
        </div>
      </div>
      
      <button 
        disabled={isStationSpinning || isColorSpinning}
        onClick={startBothSpin}
        className="flex items-center justify-center gap-2 w-full max-w-md mt-4 py-4 px-8 rounded-2xl font-bold text-lg md:text-xl text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:active:scale-100"
      >
        <Zap className="fill-current" />
        雙重開抽！
      </button>
    </div>
  );
}
