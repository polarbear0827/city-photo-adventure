import { useState, useEffect } from 'react';
import { Station } from '../data/StationData';
import { ThemeColor } from '../data/ColorData';

export interface HistoryRecord {
  id: string;
  timestamp: number;
  station: Station;
  color: ThemeColor;
  completed: boolean;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const item = window.localStorage.getItem('photoAdventureHistory');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('photoAdventureHistory', JSON.stringify(history));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [history]);

  const addRecord = (station: Station, color: ThemeColor) => {
    const newRecord: HistoryRecord = {
      // 替換 randomUUID 以提升所有舊型瀏覽器與本地非 HTTPS 環境相容性
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      timestamp: Date.now(),
      station,
      color,
      completed: false
    };
    setHistory((prev) => [newRecord, ...prev]);
  };

  const toggleCompleted = (id: string) => {
    setHistory((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, completed: !record.completed } : record
      )
    );
  };

  const deleteRecord = (id: string) => {
    setHistory((prev) => prev.filter((record) => record.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addRecord, toggleCompleted, deleteRecord, clearHistory };
}
