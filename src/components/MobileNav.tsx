import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = {
  FUSION: [
    { label: 'Overview', href: '/fusion/overview' },
    { label: 'Magnetic Confinement', href: '/fusion/magneticconfinement' },
    { label: 'University Scale', href: '/fusion/universityscale' },
  ],
  RESEARCH: [
    { label: 'CFRT and Divertors', href: '/research/cfrt' },
    { label: 'STAR_Lite', href: '/research/star-lite' },
    { label: 'Publications and Presentations', href: '/research/publications' },
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

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (category: string) => {
    setExpandedSection(expandedSection === category ? null : category);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link to="/" className="text-xl font-bold text-white" onClick={onClose}>
          HU Fusion
        </Link>
        <button onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        {Object.entries(navItems).map(([category, items]) => (
          <div key={category} className="mb-2 border-b border-gray-800">
            <button
              onClick={() => toggleSection(category)}
              className="w-full flex items-center justify-between text-white hover:text-hampton-blue py-4 font-semibold text-left transition-colors"
            >
              <span>{category}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expandedSection === category ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === category && (
              <ul className="space-y-1 pb-4 pl-4">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="block text-gray-300 hover:text-hampton-blue py-2 transition-colors"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Get in Touch Link */}
        <div className="mt-6 pt-4">
          <Link
            to="/contact"
            className="block bg-hampton-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
            onClick={onClose}
          >
            GET IN TOUCH
          </Link>
        </div>
      </nav>
    </div>
  );
}
