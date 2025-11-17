import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { fetchNews, createNews, updateNews, deleteNews, NewsFormData } from '../../services/newsService';
import { NewsItem } from '../../types/news';
import { PlusCircle, Edit2, Trash2, Save, X, Loader2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsAdmin() {
  const { user, signIn, signOut } = useAuthStore();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'research'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    const newsData = await fetchNews();
    setNews(newsData);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const submitData: NewsFormData = {
        ...formData,
        image: imageFile || undefined
      };

      if (editingId) {
        await updateNews(editingId, submitData);
        setStatusMessage({ type: 'success', text: 'Article updated successfully! You can close this form or edit again.' });
      } else {
        await createNews(submitData);
        setStatusMessage({ type: 'success', text: 'Article created successfully! You can close this form or create another.' });
      }

      // Reload the news list to show the new/updated article
      await loadNews();

      // Clear the form fields but keep the form open so user can see success message
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'research'
      });
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);

      // Don't close the form - let user close it manually after seeing success
    } catch (error: any) {
      console.error('Error saving article:', error);
      setStatusMessage({
        type: 'error',
        text: `Error: ${error.message || 'Failed to save article. Check console for details.'}`
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      author: item.author,
      category: item.category
    });
    setImagePreview(item.image || '');
    setShowForm(true);
  };

  const handleDelete = async (item: NewsItem) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteNews(item.id, item.image);
        await loadNews();
      } catch (error) {
        alert('Error deleting article. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'research'
    });
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
    setStatusMessage(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-hampton-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">News Administration</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-hampton-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add News
            </button>
            <Link
              to="/admin/import"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <Upload size={20} />
              Batch Import
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Article' : 'New Article'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white" disabled={submitting}>
                <X size={24} />
              </button>
            </div>

            {statusMessage && (
              <div
                className={`mb-4 p-3 rounded ${
                  statusMessage.type === 'success'
                    ? 'bg-green-900/50 text-green-200 border border-green-700'
                    : 'bg-red-900/50 text-red-200 border border-red-700'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded h-20"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded h-40"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded"
                  >
                    <option value="research">Research</option>
                    <option value="awards">Awards</option>
                    <option value="outreach">Outreach</option>
                    <option value="collaboration">Collaboration</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 bg-gray-800 rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 max-h-48 rounded"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-hampton-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {editingId ? 'Update' : 'Create'} Article
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="bg-gray-900 p-6 rounded-lg flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-2">{item.excerpt}</p>
                  <div className="text-sm text-gray-500">
                    {item.date} • {item.author} • {item.category}
                  </div>
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded ml-4"
                  />
                )}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
