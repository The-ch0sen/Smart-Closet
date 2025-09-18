# Smart Closet Mobile App (Expo)

此資料夾包含 Smart Closet 智慧穿搭助手的 React Native / Expo 專案骨架。專案聚焦於衣物數位化管理、AI 穿搭建議與行為數據學習三大面向，提供後續功能開發的基礎結構。

## 快速開始

> 注意：在此環境中無法預先安裝套件。請於可連線的開發環境執行以下指令完成安裝與啟動。

```bash
cd smart-closet-app
npm install
npm run start
```

## 專案結構

```
smart-closet-app/
├── App.js                  # 應用程式進入點 (目前載入 HomeScreen)
├── app.json                # Expo 組態設定
├── assets/                 # 應用使用的資產 (暫放 1x1 icon)
├── babel.config.js         # Babel 設定
├── package.json            # NPM 套件與腳本定義
├── README.md               # 此說明文件
└── src/
    ├── components/         # 共用 UI 元件 (Header、FeatureCard、ActionButton...)
    ├── constants/          # 常數與假資料 (featureHighlights 等)
    ├── hooks/              # 自訂 hook，模擬每日穿搭推薦
    ├── screens/            # 主要頁面骨架 (Home、Closet、Outfit、Analytics)
    ├── services/           # API 服務模組 placeholder (天氣、衣櫃)
    └── theme/              # 顏色與 spacing 設定
```

## 後續開發建議

- 整合 React Navigation 或 Expo Router 建立多頁面流程。
- 串接實際的衣物影像分類、天氣與推薦 API。
- 導入狀態管理方案（如 Zustand、Redux Toolkit 或 Recoil）管理衣物與推薦資料。
- 依產品需求實作社交分享、電商導購與學習迴圈 UI。

## 測試

目前尚未配置自動化測試。完成依賴安裝後，可依需要加入 Jest 或 React Native Testing Library。