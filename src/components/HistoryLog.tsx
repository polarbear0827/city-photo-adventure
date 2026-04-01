import React from 'react';
import { HistoryRecord } from '../hooks/useHistory';
import { Trash2, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to use tailwind-merge and clsx together
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface HistoryLogProps {
  history: HistoryRecord[];
  onToggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function HistoryLog({ history, onToggleCompleted, onDelete, onClearAll }: HistoryLogProps) {
  if (history.length === 0) {
    return (
      <div className="w-full max-w-2xl mt-12 mb-8 text-center text-gray-500">
        目前沒有歷史紀錄，快開始抽獎吧！
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mt-12 mb-8 flex flex-col gap-4 px-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <h2 className="text-xl font-bold">冒險歷史紀錄</h2>
        <button 
          onClick={onClearAll}
          className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
        >
          清空所有歷史
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((record) => {
          const date = new Date(record.timestamp);
          const timeString = `${date.getMonth()+1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          
          return (
            <div 
              key={record.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl bg-surface/80 border transition-colors shadow-sm",
                record.completed ? "border-green-500/30 opacity-60 bg-surface/30" : "border-white/5"
              )}
            >
              <div className="flex flex-1 items-center gap-3 overflow-hidden">
                <button 
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors shadow-inner",
                    record.completed ? "border-green-500 bg-green-500/20" : "border-white/30 bg-black/20 hover:border-primary/50"
                  )}
                  onClick={() => onToggleCompleted(record.id)}
                >
                  {record.completed && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                </button>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 overflow-hidden w-full">
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{timeString}</span>
                  
                  <div className="flex items-center gap-2 font-bold whitespace-nowrap">
                    <span 
                      className="px-2.5 py-1 rounded-md text-sm text-white shadow-sm"
                      style={{ backgroundColor: record.station.lineColor }}
                    >
                      {record.station.name}
                    </span>
                    <span className="text-gray-500 text-sm font-normal">與</span>
                    <span 
                      className="px-2.5 py-1 rounded-md text-sm border border-white/20 shadow-sm"
                      style={{ backgroundColor: record.color.hex, color: record.color.textColor }}
                    >
                      {record.color.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 ml-2">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.station.name + '捷運站')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="在地圖中開啟"
                >
                  <ExternalLink size={18} />
                </a>
                <button 
                  onClick={() => onDelete(record.id)}
                  className="p-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                  title="刪除"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
