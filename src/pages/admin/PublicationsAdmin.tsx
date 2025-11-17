import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Plus, Edit2, Trash2, FileText, ExternalLink } from 'lucide-react';
import {
  fetchPublications,
  createPublication,
  updatePublication,
  deletePublication,
  PublicationFormData
} from '../../services/publicationService';
import { Publication } from '../../types/publication';

export default function PublicationsAdmin() {
  const { user, signIn, signOut } = useAuthStore();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PublicationFormData>({
    type: 'publication',
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    journal: '',
    doi: '',
    venue: '',
    presentationType: 'poster',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    setLoading(true);
    const data = await fetchPublications();
    setPublications(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data: PublicationFormData = {
        ...formData,
        pdf: pdfFile || undefined,
      };

      if (editingId) {
        await updatePublication(editingId, data);
      } else {
        await createPublication(data);
      }

      await loadPublications();
      resetForm();
    } catch (error) {
      console.error('Error saving publication:', error);
      alert('Failed to save publication');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (pub: Publication) => {
    setEditingId(pub.id);
    setFormData({
      type: pub.type,
      title: pub.title,
      authors: pub.authors,
      year: pub.year,
      journal: pub.journal || '',
      doi: pub.doi || '',
      venue: pub.venue || '',
      presentationType: pub.presentationType || 'poster',
    });
    setPdfFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string, pdfUrl?: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await deletePublication(id, pdfUrl);
      await loadPublications();
    } catch (error) {
      console.error('Error deleting publication:', error);
      alert('Failed to delete publication');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      type: 'publication',
      title: '',
      authors: '',
      year: new Date().getFullYear(),
      journal: '',
      doi: '',
      venue: '',
      presentationType: 'poster',
    });
    setPdfFile(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  // Show login form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-20 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Publications Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-hampton-blue hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Publications & Presentations Admin</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-hampton-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New
            </button>
            <button
              onClick={() => signOut()}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingId ? 'Edit' : 'Add'} Publication/Presentation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'publication' | 'presentation' })}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                  required
                >
                  <option value="publication">Publication</option>
                  <option value="presentation">Presentation</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              {/* Authors */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Authors *</label>
                <input
                  type="text"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="Last, First; Last, First; etc."
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              {/* Publication-specific fields */}
              {formData.type === 'publication' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Journal</label>
                    <input
                      type="text"
                      value={formData.journal}
                      onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">DOI</label>
                    <input
                      type="text"
                      value={formData.doi}
                      onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                      placeholder="10.xxxx/xxxxx"
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                </>
              )}

              {/* Presentation-specific fields */}
              {formData.type === 'presentation' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Venue</label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Conference name, location"
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Presentation Type</label>
                    <select
                      value={formData.presentationType}
                      onChange={(e) => setFormData({ ...formData, presentationType: e.target.value as 'poster' | 'oral' })}
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                    >
                      <option value="poster">Poster</option>
                      <option value="oral">Oral</option>
                    </select>
                  </div>
                </>
              )}

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-hampton-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-gray-900 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold mr-2 ${
                        pub.type === 'publication' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'
                      }`}>
                        {pub.type === 'publication' ? 'Publication' : `Presentation (${pub.presentationType})`}
                      </span>
                      <span className="text-gray-400 text-sm">{pub.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
                    <p className="text-gray-300 mb-2">{pub.authors}</p>
                    {pub.journal && <p className="text-gray-400 text-sm mb-1"><em>{pub.journal}</em></p>}
                    {pub.venue && <p className="text-gray-400 text-sm mb-1">{pub.venue}</p>}
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hampton-blue text-sm hover:underline flex items-center"
                      >
                        DOI: {pub.doi} <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hampton-blue text-sm hover:underline flex items-center mt-1"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View PDF
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(pub)}
                      className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pub.id, pub.pdfUrl)}
                      className="p-2 bg-red-900 hover:bg-red-800 rounded-lg text-white"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
