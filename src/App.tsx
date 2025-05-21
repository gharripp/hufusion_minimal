import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LatestNews from './components/news/LatestNews';

// Lazy load your page components
const Students = lazy(() => import('./pages/people/Students'));
const Faculty = lazy(() => import('./pages/people/Faculty'));
const PersonBio = lazy(() => import('./pages/people/PersonBio'));
const Overview = lazy(() => import('./pages/fusion/Overview'));
const MagneticConfinement = lazy(() => import('./pages/fusion/MagneticConfinement'));
const UniversityScale = lazy(() => import('./pages/fusion/UniversityScale'));
const CFRT = lazy(() => import('./pages/research/CFRT'));
const Collaborations = lazy(() => import('./pages/research/Collaborations'));
const Publications = lazy(() => import('./pages/research/Publications'));
const StarLite = lazy(() => import('./pages/research/StarLite'));
const Latest = lazy(() => import('./pages/news/Latest'));

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <LatestNews />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        {/* Use Suspense to show a fallback while the component is loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fusion/overview" element={<Overview />} />
            <Route path="/fusion/magneticconfinement" element={<MagneticConfinement />} />
            <Route path="/fusion/universityscale" element={<UniversityScale />} />
            <Route path="/research/cfrt" element={<CFRT />} />
            <Route path="/research/collaborations" element={<Collaborations />} />
            <Route path="/research/publications" element={<Publications />} />
            <Route path="/research/star-lite" element={<StarLite />} />
            <Route path="/people/faculty" element={<Faculty />} />
            <Route path="/people/bio/:id" element={<PersonBio />} />
            <Route path="/news/latest" element={<Latest />} />
            <Route path="/people/students" element={<Students />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}