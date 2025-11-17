import { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { FileText, ExternalLink, Users, Calendar } from 'lucide-react';
import { fetchPublications } from '../../services/publicationService';
import { Publication } from '../../types/publication';

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublications = async () => {
      const data = await fetchPublications();
      setPublications(data);
      setLoading(false);
    };
    loadPublications();
  }, []);

  // Group by year
  const publicationsByYear = publications.reduce((acc, pub) => {
    const year = pub.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-black pt-20">
      <PageHeader
        title="Publications and Presentations"
        description="Our research contributions to the fusion energy community"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : publications.length === 0 ? (
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <p className="text-gray-300 text-lg">
              Publications and presentations will appear here once added.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {years.map((year) => (
              <div key={year}>
                <h2 className="text-3xl font-bold text-white mb-6 border-b border-hampton-blue pb-2">
                  {year}
                </h2>
                <div className="space-y-6">
                  {publicationsByYear[year].map((pub) => (
                    <div key={pub.id} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <FileText className="w-6 h-6 text-hampton-blue" />
                        </div>
                        <div className="ml-4 flex-1">
                          {/* Type badge */}
                          <div className="mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              pub.type === 'publication'
                                ? 'bg-blue-900 text-blue-300'
                                : 'bg-purple-900 text-purple-300'
                            }`}>
                              {pub.type === 'publication'
                                ? 'Publication'
                                : `Presentation - ${pub.presentationType === 'poster' ? 'Poster' : 'Oral'}`
                              }
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3">
                            {pub.title}
                          </h3>

                          {/* Authors */}
                          <div className="flex items-center text-gray-300 mb-2">
                            <Users className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{pub.authors}</span>
                          </div>

                          {/* Journal or Venue */}
                          {pub.journal && (
                            <p className="text-gray-400 mb-2">
                              <em>{pub.journal}</em>
                            </p>
                          )}
                          {pub.venue && (
                            <p className="text-gray-400 mb-2">
                              {pub.venue}
                            </p>
                          )}

                          {/* Links */}
                          <div className="flex flex-wrap gap-4 mt-3">
                            {pub.doi && (
                              <a
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-hampton-blue hover:underline flex items-center text-sm"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                DOI: {pub.doi}
                              </a>
                            )}
                            {pub.pdfUrl && (
                              <a
                                href={pub.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-hampton-blue hover:underline flex items-center text-sm"
                              >
                                <FileText className="w-4 h-4 mr-1" />
                                View PDF
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
