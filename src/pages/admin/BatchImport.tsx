import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Upload, AlertCircle } from 'lucide-react';

interface ImportNewsItem {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string; // YYYY-MM-DD format
  image?: string; // URL to image (optional)
}

export default function BatchImport() {
  const [jsonInput, setJsonInput] = useState('');
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const exampleJson = `[
  {
    "title": "Example Article 1",
    "excerpt": "Short description of the article",
    "content": "Full content of the article goes here...",
    "author": "Dr. John Doe",
    "category": "research",
    "date": "2024-03-15",
    "image": "https://example.com/image.jpg"
  },
  {
    "title": "Example Article 2",
    "excerpt": "Another short description",
    "content": "More content here...",
    "author": "Dr. Jane Smith",
    "category": "awards",
    "date": "2024-03-10"
  }
]`;

  const handleImport = async () => {
    setImporting(true);
    setResults([]);
    const logs: string[] = [];

    try {
      const articles: ImportNewsItem[] = JSON.parse(jsonInput);

      if (!Array.isArray(articles)) {
        throw new Error('JSON must be an array of articles');
      }

      logs.push(`📦 Found ${articles.length} articles to import...`);
      setResults([...logs]);

      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];

        try {
          // Validate required fields
          if (!article.title || !article.excerpt || !article.content || !article.author || !article.category) {
            throw new Error(`Article ${i + 1}: Missing required fields`);
          }

          // Parse the date
          const dateObj = article.date ? new Date(article.date) : new Date();

          // Create the article in Firestore
          const docRef = await addDoc(collection(db, 'news'), {
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            author: article.author,
            category: article.category,
            image: article.image || '',
            date: Timestamp.fromDate(dateObj),
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          });

          logs.push(`✅ Imported: "${article.title}" (ID: ${docRef.id})`);
          setResults([...logs]);
        } catch (error: any) {
          logs.push(`❌ Failed article ${i + 1}: ${error.message}`);
          setResults([...logs]);
        }
      }

      logs.push(`\n🎉 Import complete!`);
      setResults([...logs]);
    } catch (error: any) {
      logs.push(`❌ Error: ${error.message}`);
      setResults([...logs]);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Batch Import News Articles</h1>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Prepare your articles as a JSON array (see example below)</li>
            <li>Paste the JSON into the text area</li>
            <li>Click "Import Articles"</li>
            <li>Wait for the import to complete</li>
          </ol>

          <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-yellow-400 mt-1" size={20} />
              <div className="text-sm text-yellow-200">
                <strong>Note:</strong> Images must be publicly accessible URLs. If you want to upload images from your computer, use the regular admin interface one article at a time.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Example JSON Format</h2>
          <pre className="bg-black p-4 rounded text-sm overflow-x-auto text-gray-300">
            {exampleJson}
          </pre>
          <div className="mt-2 text-sm text-gray-400">
            <strong>Categories:</strong> research, awards, outreach, collaboration
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Paste Your JSON</h2>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-64 p-4 bg-black text-white rounded font-mono text-sm"
            placeholder="Paste your JSON array here..."
            disabled={importing}
          />

          <button
            onClick={handleImport}
            disabled={importing || !jsonInput.trim()}
            className="mt-4 bg-hampton-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {importing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                Importing...
              </>
            ) : (
              <>
                <Upload size={20} />
                Import Articles
              </>
            )}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Import Results</h2>
            <div className="bg-black p-4 rounded font-mono text-sm space-y-1">
              {results.map((result, i) => (
                <div
                  key={i}
                  className={
                    result.includes('✅')
                      ? 'text-green-400'
                      : result.includes('❌')
                      ? 'text-red-400'
                      : result.includes('📦') || result.includes('🎉')
                      ? 'text-blue-400 font-bold'
                      : 'text-gray-300'
                  }
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
