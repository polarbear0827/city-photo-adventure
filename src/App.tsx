import { useState, useCallback } from 'react';
import { SlotMachine } from './components/SlotMachine';
import { ResultActions } from './components/ResultActions';
import { HistoryLog } from './components/HistoryLog';
import { useHistory } from './hooks/useHistory';
import { Station } from './data/StationData';
import { ThemeColor } from './data/ColorData';
import { Shape } from './data/ShapeData'; // 新增形狀資料
import { Camera } from 'lucide-react';

export default function App() {
  const { history, addRecord, toggleCompleted, deleteRecord, clearHistory } = useHistory();
  const [lastResult, setLastResult] = useState<{
    station?: Station;
    colors?: ThemeColor[];
    shape?: Shape;
  } | null>(null);

  const handleResult = useCallback((station?: Station, colors?: ThemeColor[], shape?: Shape) => {
    setLastResult({ station, colors, shape });
    addRecord(station, colors, shape);
  }, [addRecord]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 md:pt-16 pb-16 w-full font-sans hide-scrollbar selection:bg-primary/30">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center px-4 mb-2">
        <div className="flex items-center gap-3 text-white">
          <Camera size={44} className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
            城市攝影冒險
          </h1>
        </div>
        
        {/* Banner 橫幅展示 */}
        <div className="w-full max-w-lg mt-6 mb-4 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group">
          <img 
            src="banner.png" 
            alt="City Photo Adventure Banner" 
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <p className="text-gray-400 text-sm md:text-base font-medium tracking-widest uppercase mt-1">
          City Photo Adventure
        </p>
      </header>

      {/* Main Content */}
      <SlotMachine onResult={handleResult} />

      <div className="w-full max-w-4xl px-4 mt-2 h-auto min-h-[120px] flex items-center justify-center">
        {lastResult ? (
          <ResultActions 
            station={lastResult.station} 
            colors={lastResult.colors} 
            shape={lastResult.shape} 
          />
        ) : (
          <div className="text-gray-500 font-medium">開啟開關並按下「開啟挑戰冒險」！</div>
        )}
      </div>

      <HistoryLog 
        history={history} 
        onToggleCompleted={toggleCompleted} 
        onDelete={deleteRecord} 
        onClearAll={clearHistory} 
      />
    </div>
  );
}
