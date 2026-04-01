export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
  textColor: string;
}

export const COLOR_DATA: ThemeColor[] = [
  { id: 'red', name: '紅色', hex: '#ef4444', textColor: '#ffffff' },
  { id: 'orange', name: '橙色', hex: '#f97316', textColor: '#ffffff' },
  { id: 'yellow', name: '黃色', hex: '#eab308', textColor: '#000000' },
  { id: 'green', name: '綠色', hex: '#22c55e', textColor: '#ffffff' },
  { id: 'blue', name: '藍色', hex: '#3b82f6', textColor: '#ffffff' },
  { id: 'purple', name: '紫色', hex: '#a855f7', textColor: '#ffffff' },
  { id: 'black', name: '黑色', hex: '#171717', textColor: '#ffffff' },
  { id: 'white', name: '白色', hex: '#ffffff', textColor: '#000000' },
  { id: 'gray', name: '灰色', hex: '#71717a', textColor: '#ffffff' },
  { id: 'gold', name: '金色', hex: '#fbbf24', textColor: '#000000' },
  { id: 'silver', name: '銀色', hex: '#e4e4e7', textColor: '#000000' },
];
