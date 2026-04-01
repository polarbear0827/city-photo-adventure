# 城市攝影冒險 (City Photo Adventure) 🚇 📸

一個針對雙北及桃園捷運、顏色的隨機抽取 Web 應用程式 (SPA)。每次的抽取結果都會指派一個「站點」與「基礎色」攝影任務，你可以用系統自動紀錄並前往探索周邊街景！

👉 **[立即點此開始冒險！(線上預覽)](https://polarbear0827.github.io/city-photo-adventure/)**

## ✨ 核心特色
- **現代深色體驗**: 極簡風深夜設計，操作按鈕友善適配行動裝置單手握持體驗。
- **真實隨機輪盤**: 導入 `Framer Motion` 客製化拉動阻尼與反彈，享受身歷其境的「雙重抽卡」物理極限回饋感。
- **歷史持久紀錄保存**: 整合 LocalStorage 自動快取個人的都市冒險歷史，一鍵檢視曾經走過的所有任務清單。
- **即刻導航出發**: 依據抽取的地名建立 Google Map 直達搜尋連結，按下去立刻帶你到新站點。

## 🛠️ 開發技術棧 (Tech Stack)
- **Core Framework**: `Vite` + `React 18` + `TypeScript`
- **Styling**: `Tailwind CSS`, `Lucide React` (Icons)
- **Animations / FX**: `Framer Motion`, `canvas-confetti`

## 🚀 快速啟動 (Local Development)

請先確認電腦上已安裝 [Node.js](https://nodejs.org/)。

```bash
# 1. 將此專案 Clone 並且進入資料夾內
git clone https://github.com/polarbear0827/city-photo-adventure.git
cd city-photo-adventure

# 2. 安裝相依賴套件
npm install

# 3. 啟動開發用伺服器
npm run dev
```

打開瀏覽器訪問 `http://localhost:5173` 即可開始體驗！

## 🤝 貢獻與資料擴充 (Expand Data)
如果你想要擴增任何新輕軌/捷運、或其他縣市捷運系統，請直接編輯 `src/data/StationData.ts`；若要增加特殊色 (ex. 特殊霓虹、賽博龐克紫)，請編輯 `src/data/ColorData.ts`。架構上完全彈性自適應。
