const featureHighlights = [
  {
    id: 'catalog',
    title: '衣物數位化管理',
    description: '上傳衣物、套用標籤，建立個人化衣櫃資料庫。',
    icon: '📸',
  },
  {
    id: 'recommendations',
    title: 'AI 穿搭推薦',
    description: '根據天氣、行程與偏好生成今日穿搭靈感。',
    icon: '🤖',
  },
  {
    id: 'analytics',
    title: '智慧分析儀表板',
    description: '追蹤衣物出場率，掌握衣櫃利用率與缺口。',
    icon: '📊',
  },
];

const quickActions = [
  { id: 'upload', label: '新增衣物' },
  { id: 'daily-look', label: '今日穿搭' },
  { id: 'plan', label: '行程規劃' },
];

const recommendationSlots = [
  {
    id: 'today',
    title: '今日推薦 Look',
    description: '依據今天天氣 24°C / 多雲，推薦舒適通勤穿搭。',
  },
  {
    id: 'backup',
    title: '備用靈感',
    description: '當前推薦不合心意？這裡還有其他風格選擇。',
  },
];

export { featureHighlights, quickActions, recommendationSlots };