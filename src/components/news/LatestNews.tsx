import { useEffect, useState } from 'react';
import { newsItems } from '../../data/news';
import { fetchNews } from '../../services/newsService';
import { NewsItem } from '../../types/news';
import NewsGrid from './NewsGrid';

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>(newsItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const firestoreNews = await fetchNews();
        // If we have news from Firestore, use it; otherwise fall back to static data
        if (firestoreNews.length > 0) {
          setNews(firestoreNews);
        }
      } catch (error) {
        console.error('Error loading news:', error);
        // Keep using static data on error
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Latest News</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest developments in fusion research, events, and achievements
            from our team.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <NewsGrid items={news} limit={3} />
        )}
      </div>
    </section>
  );
}