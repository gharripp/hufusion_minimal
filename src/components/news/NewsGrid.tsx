import { NewsItem } from '../../types/news';
import NewsCard from './NewsCard';
import { useEffect, useState } from 'react';
import { newsItems as staticNewsItems } from '../../data/news';

interface NewsGridProps {
  limit?: number;
}

export default function NewsGrid({ limit }: NewsGridProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const displayItems = limit ? items.slice(0, limit) : items;

  useEffect(() => {
    const fetchNews = async () => {
      setItems(staticNewsItems);
    };

    fetchNews();
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayItems.map((item, index) => (
        <NewsCard 
          key={item.id} 
          news={item}
          featured={index === 0}
        />
      ))}
    </div>
  );
}
