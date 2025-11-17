import React from 'react';

const PublicationsOverview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gray-900 p-6 rounded-lg text-center">
        <p className="text-gray-300 text-lg">
          Information about our publications, including journal articles and conference proceedings, will be available here soon.
        </p>
        {/* You could add a link to Google Scholar or a specific publications database if available */}
        <p className="text-gray-300 mt-4">
          In the meantime, our research spans areas like stellarator theory, non-resonant divertors, plasma stability, and magnetic confinement optimization.
        </p>
      </div>
    </div>
  );
};

export default PublicationsOverview;
