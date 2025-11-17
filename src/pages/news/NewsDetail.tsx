import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { NewsItem } from '../../types/news';
import { fetchNewsById } from '../../services/newsService';
import { newsItems } from '../../data/news';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      if (!id) {
        setError('No news ID provided');
        setLoading(false);
        return;
      }

      try {
        // Try to fetch from Firestore first
        const firestoreNews = await fetchNewsById(id);
        if (firestoreNews) {
          setNews(firestoreNews);
        } else {
          // Fall back to static data
          const staticNews = newsItems.find(item => item.id === id);
          if (staticNews) {
            setNews(staticNews);
          } else {
            setError('News article not found');
          }
        }
      } catch (err) {
        console.error('Error loading news:', err);
        // Try static data as fallback
        const staticNews = newsItems.find(item => item.id === id);
        if (staticNews) {
          setNews(staticNews);
        } else {
          setError('Failed to load news article');
        }
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">{error || 'The news article you are looking for does not exist.'}</p>
            <Link
              to="/news/latest"
              className="inline-flex items-center text-hampton-blue hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link
          to="/news/latest"
          className="inline-flex items-center text-hampton-blue hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {news.title}
          </h1>

          <div className="flex items-center space-x-6 text-gray-400">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(news.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {news.author}
            </span>
          </div>

          {news.category && (
            <div className="mt-4">
              <span className="inline-block bg-hampton-blue/20 text-hampton-blue px-3 py-1 rounded-full text-sm font-medium capitalize">
                {news.category}
              </span>
            </div>
          )}
        </header>

        {/* Article Excerpt */}
        {news.excerpt && (
          <div className="text-xl text-gray-300 italic border-l-4 border-hampton-blue pl-6 mb-8">
            {news.excerpt}
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {news.content}
          </div>
        </div>

        {/* Back Button at Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link
            to="/news/latest"
            className="inline-flex items-center text-hampton-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </article>
    </div>
  );
}
