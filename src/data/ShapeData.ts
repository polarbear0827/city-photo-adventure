export interface Shape {
  id: string;
  name: string;
  description: string;
}

export const SHAPE_DATA: Shape[] = [
  { id: 'circle', name: '圓形', description: '尋找圓滑的輪廓、圓窗或球體物件' },
  { id: 'square', name: '正方形', description: '尋找對稱的方格、磁磚或正方建築元素' },
  { id: 'rectangle', name: '長方形', description: '尋找門窗、廣告看板或延伸的矩形結構' },
  { id: 'triangle', name: '三角形', description: '尋找屋頂尖端、夾角或透視形成的三角幾何' },
  { id: 'diamond', name: '菱形', description: '尋找傾斜的方塊、菱形網格或幾何裝飾' },
  { id: 'lines', name: '線條', description: '尋找強烈的導引線、欄杆、影子或地平線' },
];
