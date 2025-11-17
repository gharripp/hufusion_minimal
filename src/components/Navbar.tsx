import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavDropdown from './NavDropdown';
import MobileNav from './MobileNav';
import { Menu } from 'lucide-react';

const navItems = {
  FUSION: [
    { label: 'Overview', href: '/fusion/overview' },
    { label: 'Magnetic Confinement', href: '/fusion/magneticconfinement' },
    { label: 'University Scale', href: '/fusion/universityscale' },
  ],
  RESEARCH: [
    { label: 'CFRT and Divertors', href: '/research/cfrt' },
    { label: 'STAR_Lite', href: '/research/star-lite' },
    { label: 'Publications', href: '/research/publications' },
    { label: 'Collaborations', href: '/research/collaborations' },
  ],
  PEOPLE: [
    { label: 'Faculty', href: '/people/faculty' },
    { label: 'Students', href: '/people/students' },
  ],
  EDUCATION: [
    { label: 'Past Student Projects', href: '/education/undergraduate' },
    { label: 'Summer Research Program 2025', href: '/education/internships' },
  ],
  NEWS: [
    { label: 'Latest', href: '/news/latest' },
    { label: 'Archive', href: '/news/archive' },
  ],
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo className="h-12 w-auto" variant="full" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-hampton-blue"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(navItems).map(([key, items]) => (
                <NavDropdown
                  key={key}
                  label={key}
                  items={items}
                  isActive={activeDropdown === key}
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                />
              ))}
              <Link
                to="/contact"
                className="text-white hover:text-hampton-blue transition-colors font-medium"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
