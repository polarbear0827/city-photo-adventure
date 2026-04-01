import { HistoryRecord } from '../hooks/useHistory';
import { ThemeColor } from '../data/ColorData';
import { Trash2, ExternalLink, Box, MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
      <div className="w-full max-w-4xl mt-12 mb-8 text-center text-gray-500 font-medium animate-pulse">
        目前沒有歷史紀錄，快開始你的城市攝影冒險吧！
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-12 mb-8 flex flex-col gap-4 px-4 overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black italic tracking-tight">ADVENTURE LOG</h2>
          <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">History</span>
        </div>
        <button 
          onClick={onClearAll}
          className="text-xs font-bold text-red-500/80 hover:text-red-400 transition-colors uppercase tracking-widest"
        >
          Clear All
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
                "group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-surface/40 backdrop-blur-md border transition-all duration-300 gap-4",
                record.completed ? "border-green-500/20 opacity-50 grayscale-[0.5]" : "border-white/5 hover:border-white/20 hover:bg-surface/60"
              )}
            >
              <div className="flex flex-1 items-center gap-4 w-full overflow-hidden">
                {/* Checkbox */}
                <button 
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all shadow-lg",
                    record.completed 
                      ? "border-green-500 bg-green-500/20 text-green-500" 
                      : "border-white/10 bg-black/40 text-transparent hover:border-primary/50 group-hover:bg-black/60"
                  )}
                  onClick={() => onToggleCompleted(record.id)}
                >
                  <div className={cn("w-3 h-3 rounded-sm bg-current transition-transform", record.completed ? "scale-100" : "scale-0")} />
                </button>
                
                <div className="flex flex-col gap-2 w-full overflow-hidden">
                  <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">{timeString}</span>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Station */}
                    {record.station && (
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        <MapPin size={12} className="text-primary" />
                        <span 
                          className="text-xs font-bold text-white/90"
                        >
                          {record.station.name}
                        </span>
                      </div>
                    )}

                    {record.station && (record.colors || record.shape) && <span className="text-white/10 text-xs">×</span>}

                    {/* Colors */}
                    {(() => {
                      const displayColors = record.colors || (record as any).color ? [(record as any).color] : [];
                      if (displayColors.length === 0) return null;
                      
                      return (
                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                          <div className="flex -space-x-1">
                            {displayColors.map((color: ThemeColor, i: number) => (
                              <div 
                                key={`${color.name}-${i}`}
                                className="w-4 h-4 rounded-sm border border-black/50"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-white/80">
                            {displayColors.length === 1 ? displayColors[0].name : `${displayColors.length}色`}
                          </span>
                        </div>
                      );
                    })()}

                    {(record.station || record.colors) && record.shape && <span className="text-white/10 text-xs">×</span>}

                    {/* Shape */}
                    {record.shape && (
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        <Box size={12} className="text-yellow-500/80" />
                        <span className="text-xs font-bold text-white/90 italic">
                          {record.shape.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {record.station && (
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.station.name + '捷運站')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                    title="Open in Maps"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <button 
                  onClick={() => onDelete(record.id)}
                  className="p-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all"
                  title="Delete"
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
