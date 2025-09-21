export async function fetchClosetOverview() {
  return {
    totalItems: 128,
    categories: [
      { label: '上衣', count: 48 },
      { label: '下身', count: 32 },
      { label: '鞋履', count: 20 },
      { label: '配件', count: 28 },
    ],
  };
}