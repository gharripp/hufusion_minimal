import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Students from './pages/people/Students';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Faculty from './pages/people/Faculty';
import PersonBio from './pages/people/PersonBio';
import Hero from './components/Hero';
import Overview from './pages/fusion/Overview';
import MagneticConfinement from './pages/fusion/MagneticConfinement';
import UniversityScale from './pages/fusion/UniversityScale';
import CFRT from './pages/research/CFRT';
import Collaborations from './pages/research/Collaborations';
import Publications from './pages/research/Publications';
import StarLite from './pages/research/StarLite';
import Latest from './pages/news/Latest';
import LatestNews from './components/news/LatestNews';

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
        <Footer />
      </div>
    </Router>
  );
}
