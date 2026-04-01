import { useRef, useState, useEffect } from 'react';
import { Station, STATION_REGIONS, RegionKey } from '../data/StationData';
import { ThemeColor, COLOR_DATA } from '../data/ColorData';
import { Shape, SHAPE_DATA } from '../data/ShapeData';
import { SlotSpinner } from './SlotSpinner';
import { MapPin, Palette, Zap, Map as MapIcon, Box, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlotMachineProps {
  onResult: (station?: Station, colors?: ThemeColor[], shape?: Shape) => void;
}

export function SlotMachine({ onResult }: SlotMachineProps) {
  // --- 狀態定義 ---
  const [activeRegion, setActiveRegion] = useState<RegionKey>('north');
  
  // 獨立開關，使用者要求預設全開
  const [enabledSlots, setEnabledSlots] = useState({
    station: true,
    color: true,
    shape: true,
  });

  // 顏色抽取數量 (1, 2, 3, 5)
  const [colorCount, setColorCount] = useState(1);

  const [isStationSpinning, setStationSpinning] = useState(false);
  const [isColorSpinning, setColorSpinning] = useState(false);
  const [isShapeSpinning, setShapeSpinning] = useState(false);
  
  const stationRef = useRef<Station | null>(null);
  const colorsRef = useRef<ThemeColor[]>([]);
  const shapeRef = useRef<Shape | null>(null);
  const pendingCheck = useRef(false);

  const stations = STATION_REGIONS[activeRegion].stations;

  // --- 拉霸邏輯 ---
  const startStationSpin = () => {
    if (!enabledSlots.station) return;
    pendingCheck.current = true;
    setStationSpinning(true);
  };

  const startColorSpin = () => {
    if (!enabledSlots.color) return;
    pendingCheck.current = true;
    setColorSpinning(true);
  };

  const startShapeSpin = () => {
    if (!enabledSlots.shape) return;
    pendingCheck.current = true;
    setShapeSpinning(true);
  };

  const startAllActiveSpin = () => {
    pendingCheck.current = true;
    if (enabledSlots.station) setStationSpinning(true);
    if (enabledSlots.color) setColorSpinning(true);
    if (enabledSlots.shape) setShapeSpinning(true);
  };

  const handleStationEnd = (station: Station) => {
    stationRef.current = station;
    setStationSpinning(false);
  };

  const handleColorEnd = (color: ThemeColor) => {
    // 實作邏輯：當主拉霸停下時，若 count > 1，則自動幫使用者隨機補齊其餘顏色
    const results = [color];
    if (colorCount > 1) {
      const otherColors = [...COLOR_DATA].filter(c => c.name !== color.name);
      for (let i = 1; i < colorCount; i++) {
        const randomIndex = Math.floor(Math.random() * otherColors.length);
        results.push(otherColors.splice(randomIndex, 1)[0]);
      }
    }
    colorsRef.current = results;
    setColorSpinning(false);
  };

  const handleShapeEnd = (shape: Shape) => {
    shapeRef.current = shape;
    setShapeSpinning(false);
  };

  // 監聽所有正在旋轉的槽
  useEffect(() => {
    const isAnySpinning = 
      (enabledSlots.station && isStationSpinning) || 
      (enabledSlots.color && isColorSpinning) || 
      (enabledSlots.shape && isShapeSpinning);

    if (pendingCheck.current && !isAnySpinning) {
      pendingCheck.current = false;
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      
      onResult(
        enabledSlots.station ? stationRef.current || undefined : undefined,
        enabledSlots.color ? colorsRef.current : undefined,
        enabledSlots.shape ? shapeRef.current || undefined : undefined
      );
    }
  }, [isStationSpinning, isColorSpinning, isShapeSpinning, enabledSlots, onResult]);

  // 切換開關的小組件
  const ToggleButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
        active 
          ? 'bg-primary/20 border-primary/50 text-white' 
          : 'bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-400'
      }`}
    >
      <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${active ? 'bg-primary border-transparent text-white' : 'border-current'}`}>
        {active && <Check size={12} strokeWidth={4} />}
      </div>
      <Icon size={14} className={active ? 'text-primary' : ''} />
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-5xl px-4 py-8">
      {/* 頂部功能開關 */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        <ToggleButton 
          active={enabledSlots.station} 
          onClick={() => setEnabledSlots(prev => ({ ...prev, station: !prev.station }))}
          icon={MapPin}
          label="捷運站點"
        />
        <ToggleButton 
          active={enabledSlots.color} 
          onClick={() => setEnabledSlots(prev => ({ ...prev, color: !prev.color }))}
          icon={Palette}
          label="指定顏色"
        />
        <ToggleButton 
          active={enabledSlots.shape} 
          onClick={() => setEnabledSlots(prev => ({ ...prev, shape: !prev.shape }))}
          icon={Box}
          label="攝影形狀"
        />
      </div>

      {/* 地區切換按鈕 (僅在捷運站點啟用時顯示明顯) */}
      <div className={`flex flex-wrap justify-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-4 transition-all duration-500 ${!enabledSlots.station ? 'opacity-20 blur-[1px] pointer-events-none scale-95' : 'opacity-100'}`}>
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

      {/* 轉盤主體佈局 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {/* Slot 1: Station */}
        <div className={`flex flex-col items-center gap-4 p-6 rounded-3xl bg-surface/30 border transition-all duration-500 ${!enabledSlots.station ? 'opacity-30 grayscale' : 'border-white/5'}`}>
          <div className="flex items-center gap-2 text-primary font-bold">
            <MapPin size={22} />
            <span>捷運站點</span>
          </div>
          <div className="w-full bg-black/20 rounded-2xl p-4 border border-white/5">
            <SlotSpinner
              items={stations}
              isSpinning={isStationSpinning && enabledSlots.station}
              onSpinEnd={handleStationEnd}
              height={80}
              renderItem={(station) => (
                <span className="px-3 py-1 rounded-full text-lg md:text-xl text-white shadow-lg font-bold whitespace-nowrap" style={{ backgroundColor: station.lineColor }}>
                  {station.name}
                </span>
              )}
            />
          </div>
          <button
            disabled={isStationSpinning || !enabledSlots.station}
            onClick={startStationSpin}
            className="w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all disabled:opacity-50"
          >
            單獨抽站點
          </button>
        </div>

        {/* Slot 2: Color */}
        <div className={`flex flex-col items-center gap-4 p-6 rounded-3xl bg-surface/30 border transition-all duration-500 ${!enabledSlots.color ? 'opacity-30 grayscale' : 'border-white/5'}`}>
          <div className="flex items-center gap-2 text-accent font-bold">
            <Palette size={22} />
            <span>指定顏色</span>
          </div>
          <div className="w-full bg-black/20 rounded-2xl p-4 border border-white/5">
            <SlotSpinner
              items={COLOR_DATA}
              isSpinning={isColorSpinning && enabledSlots.color}
              onSpinEnd={handleColorEnd}
              height={80}
              renderItem={(color) => (
                <span className="px-4 py-1 rounded-lg text-lg md:text-2xl shadow-lg border border-white/20 font-bold" style={{ backgroundColor: color.hex, color: color.textColor }}>
                  {color.name}
                </span>
              )}
            />
          </div>
          
          {/* 顏色數量選擇器 */}
          <div className="flex items-center gap-1 bg-black/20 rounded-xl p-1 w-full border border-white/5">
            {[1, 2, 3, 5].map(n => (
              <button
                key={n}
                onClick={() => setColorCount(n)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${colorCount === n ? 'bg-accent text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
              >
                {n}色
              </button>
            ))}
          </div>

          <button
            disabled={isColorSpinning || !enabledSlots.color}
            onClick={startColorSpin}
            className="w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all disabled:opacity-50"
          >
            單獨抽顏色
          </button>
        </div>

        {/* Slot 3: Shape */}
        <div className={`flex flex-col items-center gap-4 p-6 rounded-3xl bg-surface/30 border transition-all duration-500 ${!enabledSlots.shape ? 'opacity-30 grayscale' : 'border-white/5'}`}>
          <div className="flex items-center gap-2 text-yellow-500 font-bold">
            <Box size={22} />
            <span>攝影形狀</span>
          </div>
          <div className="w-full bg-black/20 rounded-2xl p-4 border border-white/5">
            <SlotSpinner
              items={SHAPE_DATA}
              isSpinning={isShapeSpinning && enabledSlots.shape}
              onSpinEnd={handleShapeEnd}
              height={80}
              renderItem={(shape) => (
                <span className="px-4 py-2 rounded-xl text-lg md:text-2xl font-black text-white bg-white/5 border border-white/10 tracking-wider">
                  {shape.name}
                </span>
              )}
            />
          </div>
          <button
            disabled={isShapeSpinning || !enabledSlots.shape}
            onClick={startShapeSpin}
            className="w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all disabled:opacity-50"
          >
            單獨抽形狀
          </button>
        </div>
      </div>
      
      {/* 總開抽按紐 */}
      <button 
        disabled={isStationSpinning || isColorSpinning || isShapeSpinning || (!enabledSlots.station && !enabledSlots.color && !enabledSlots.shape)}
        onClick={startAllActiveSpin}
        className="flex items-center justify-center gap-2 w-full max-w-xl mt-6 py-5 px-8 rounded-2xl font-black text-xl md:text-2xl text-white bg-gradient-to-r from-primary via-indigo-500 to-accent hover:opacity-90 active:scale-95 transition-all shadow-[0_0_40px_rgba(99,102,241,0.5)] disabled:opacity-50 disabled:active:scale-100 uppercase tracking-widest"
      >
        <Zap className="fill-current" />
        開啟挑戰冒險
      </button>
    </div>
  );
}
