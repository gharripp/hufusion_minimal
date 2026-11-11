import React from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page Not Found');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-hampton-blue font-mono mb-6">404</h1>
      <p className="text-2xl text-gray-300 mb-2">Page not found</p>
      <p className="text-gray-400 mb-8 max-w-xl">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="border-2 border-white px-12 py-3 text-lg hover:bg-white hover:text-black transition-all duration-300"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
