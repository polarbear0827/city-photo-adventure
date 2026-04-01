import React, { useState, useCallback } from 'react';
import { SlotMachine } from './components/SlotMachine';
import { ResultActions } from './components/ResultActions';
import { HistoryLog } from './components/HistoryLog';
import { useHistory } from './hooks/useHistory';
import { Station } from './data/StationData';
import { ThemeColor } from './data/ColorData';
import { Camera } from 'lucide-react';

export default function App() {
  const { history, addRecord, toggleCompleted, deleteRecord, clearHistory } = useHistory();
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [currentColor, setCurrentColor] = useState<ThemeColor | null>(null);

  const handleResult = useCallback((station: Station, color: ThemeColor) => {
    setCurrentStation(station);
    setCurrentColor(color);
    addRecord(station, color);
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
        <p className="text-gray-400 text-sm md:text-base font-medium tracking-widest uppercase mt-1">
          City Photo Adventure
        </p>
      </header>

      {/* Main Content */}
      <SlotMachine onResult={handleResult} />

      <div className="w-full max-w-2xl px-4 mt-2 h-[120px] flex items-center justify-center">
        {currentStation && currentColor ? (
          <ResultActions station={currentStation} color={currentColor} />
        ) : (
          <div className="text-gray-500 font-medium">按下「雙重開抽」抽取本次的挑戰！</div>
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
