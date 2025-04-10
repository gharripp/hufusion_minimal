import React from 'react';

const CollaborationsOverview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gray-900 p-6 rounded-lg space-y-6">
        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          Fusion energy is a global endeavor, and collaboration is key to progress. HU Fusion actively partners with leading national laboratories, universities, and international institutions.
        </p>
        <h3 className="text-xl font-bold text-white mb-4">Current Key Collaborators:</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>Princeton Plasma Physics Laboratory (PPPL)</span>
          </li>
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>North Carolina State University (NCSU) - FPAC Lab</span>
          </li>
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>University of Wisconsin-Madison - HSX Stellarator</span>
          </li>
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>Columbia University (Applied Physics and Applied Mathematics)</span>
          </li>
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>Max Planck Institute for Plasma Physics (IPP), Greifswald</span>
          </li>
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>Flatiron Institute (Simons Foundation)</span>
          </li>
          <li className="flex items-start">
            <span className="text-hampton-blue mr-2">•</span>
            <span>Type One Energy</span>
          </li>
          {/* Add others as needed */}
        </ul>
        <p className="text-gray-300 mt-6">
          We are always open to exploring new partnerships to accelerate fusion research and training.
        </p>
        {/* You could add logos or links to collaborators' sites */}
      </div>
    </div>
  );
};

export default CollaborationsOverview;
