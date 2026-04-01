export interface Station {
  id: string;
  name: string;
  lineName: string;
  lineColor: string;
}

export const STATION_DATA: Station[] = [
  // 淡水信義線
  { id: 'R28', name: '淡水', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R22', name: '北投', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R16', name: '劍潭', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R11', name: '中山', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R10', name: '台北車站', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R05', name: '大安', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R03', name: '台北101/世貿', lineName: '淡水信義線', lineColor: '#e3002c' },
  { id: 'R02', name: '象山', lineName: '淡水信義線', lineColor: '#e3002c' },
  
  // 板南線
  { id: 'BL22', name: '南港展覽館', lineName: '板南線', lineColor: '#0070bd' },
  { id: 'BL18', name: '市政府', lineName: '板南線', lineColor: '#0070bd' },
  { id: 'BL15', name: '忠孝復興', lineName: '板南線', lineColor: '#0070bd' },
  { id: 'BL11', name: '西門', lineName: '板南線', lineColor: '#0070bd' },
  { id: 'BL08', name: '新埔', lineName: '板南線', lineColor: '#0070bd' },
  { id: 'BL05', name: '海山', lineName: '板南線', lineColor: '#0070bd' },
  { id: 'BL01', name: '頂埔', lineName: '板南線', lineColor: '#0070bd' },

  // 松山新店線
  { id: 'G19', name: '松山', lineName: '松山新店線', lineColor: '#008659' },
  { id: 'G16', name: '南京復興', lineName: '松山新店線', lineColor: '#008659' },
  { id: 'G13', name: '北門', lineName: '松山新店線', lineColor: '#008659' },
  { id: 'G09', name: '古亭', lineName: '松山新店線', lineColor: '#008659' },
  { id: 'G07', name: '公館', lineName: '松山新店線', lineColor: '#008659' },
  { id: 'G01', name: '新店', lineName: '松山新店線', lineColor: '#008659' },

  // 中和新蘆線
  { id: 'O21', name: '迴龍', lineName: '中和新蘆線', lineColor: '#f8b61c' },
  { id: 'O15', name: '大橋頭', lineName: '中和新蘆線', lineColor: '#f8b61c' },
  { id: 'O05', name: '頂溪', lineName: '中和新蘆線', lineColor: '#f8b61c' },
  { id: 'O01', name: '南勢角', lineName: '中和新蘆線', lineColor: '#f8b61c' },

  // 文湖線
  { id: 'BR24', name: '南港軟體園區', lineName: '文湖線', lineColor: '#c48c31' },
  { id: 'BR14', name: '大直', lineName: '文湖線', lineColor: '#c48c31' },
  { id: 'BR09', name: '科技大樓', lineName: '文湖線', lineColor: '#c48c31' },
  { id: 'BR01', name: '動物園', lineName: '文湖線', lineColor: '#c48c31' },

  // 機場捷運
  { id: 'A1', name: '台北車站', lineName: '機場捷運', lineColor: '#8246af' },
  { id: 'A3', name: '新北產業園區', lineName: '機場捷運', lineColor: '#8246af' },
  { id: 'A9', name: '林口', lineName: '機場捷運', lineColor: '#8246af' },

  // 環狀線
  { id: 'Y19', name: '新北產業園區', lineName: '環狀線', lineColor: '#ffdb00' },
  { id: 'Y16', name: '板橋', lineName: '環狀線', lineColor: '#ffdb00' },
  { id: 'Y11', name: '景安', lineName: '環狀線', lineColor: '#ffdb00' },

  // 輕軌
  { id: 'V01', name: '紅樹林', lineName: '淡海輕軌', lineColor: '#c4e0e5' },
  { id: 'K09', name: '十四張', lineName: '安坑輕軌', lineColor: '#c5c24e' },
];
