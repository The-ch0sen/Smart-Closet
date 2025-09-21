import { useEffect, useState } from 'react';

const defaultLook = {
  id: 'default-look',
  title: '智慧穿搭建議',
  description: '連結天氣、行程與偏好，打造個人專屬穿搭。',
  items: [
    { category: '上衣', name: '白色襯衫' },
    { category: '下身', name: '深色牛仔褲' },
    { category: '鞋履', name: '極簡小白鞋' },
  ],
};

export default function useDailyOutfit() {
  const [isLoading, setLoading] = useState(true);
  const [outfit, setOutfit] = useState(defaultLook);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutfit(defaultLook);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return { outfit, isLoading };
}