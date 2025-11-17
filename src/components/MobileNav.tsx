import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = {
  FUSION: [
    { label: 'Overview', href: '/fusion/overview' },
    { label: 'Research Areas', href: '/fusion/research-areas' },
    { label: 'Facilities', href: '/fusion/facilities' },
  ],
  RESEARCH: [
    { label: 'CFRT', href: '/research/cfrt' },
    { label: 'Divertor Theory', href: '/research/divertor-theory' },
    { label: 'STAR_Lite', href: '/research/star-lite' },
    { label: 'Publications and Presentations', href: '/research/publications' },
    { label: 'Collaborations', href: '/research/collaborations' },
  ],
  PEOPLE: [
    { label: 'Faculty', href: '/people/faculty' },
    { label: 'Students', href: '/people/students' },
    { label: 'Staff', href: '/people/staff' },
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
  if (!isOpen) return null;

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

      <nav className="p-4">
        {Object.entries(navItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">{category}</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="block text-white hover:text-hampton-blue py-2"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Get in Touch Link */}
        <div className="mt-8 pt-6 border-t border-gray-800">
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
