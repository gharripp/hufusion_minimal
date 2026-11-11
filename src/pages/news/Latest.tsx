import { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { newsItems } from '../../data/news';
import { fetchNews } from '../../services/newsService';
import { NewsItem } from '../../types/news';
import NewsGrid from '../../components/news/NewsGrid';
import usePageTitle from '../../hooks/usePageTitle';

export default function Latest() {
  usePageTitle('Latest News');

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
    <div className="min-h-screen bg-black pt-20">
      <PageHeader
        title="Latest News"
        description="Stay informed about our latest research, achievements, and events"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <NewsGrid items={news} />
        )}
      </div>
    </div>
  );
}