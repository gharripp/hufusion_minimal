import React from 'react';
import { Link } from 'react-router-dom';

interface Person {
  id: string;
  name: string;
  role: string;
  title: string;
  image?: string;
  specialization: string;
}

interface PersonCardProps {
  person: Person;
  clickable?: boolean;
}

export default function PersonCard({ person, clickable = true }: PersonCardProps) {
  // Format name as "F. Lastname" but preserve titles like "Dr."
  const formatName = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return fullName;

    // Check if first part is a title (Dr., Prof., etc.)
    if (parts[0].endsWith('.')) {
      // Keep the title and format the rest
      const title = parts[0];
      if (parts.length === 2) return fullName; // Just "Dr. Name"
      const firstInitial = parts[1].charAt(0);
      const lastName = parts.slice(2).join(' ');
      return `${title} ${firstInitial}. ${lastName}`;
    }

    // Regular name formatting
    const firstInitial = parts[0].charAt(0);
    const lastName = parts.slice(1).join(' ');
    return `${firstInitial}. ${lastName}`;
  };

  const cardContent = (
    <div className="relative h-80">
      {person.image ? (
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-6xl text-gray-600">
            {person.name.charAt(0)}
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-hampton-blue transition-colors">
          {formatName(person.name)}
        </h3>
        <p className="text-gray-300 font-medium text-sm">{person.title}</p>
        <p className="text-gray-400 text-xs">{person.specialization}</p>
      </div>
    </div>
  );

  if (!clickable) {
    return (
      <div className="group relative block bg-black overflow-hidden rounded-lg">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      to={`/people/bio/${person.id}`}
      className="group relative block bg-black overflow-hidden rounded-lg transition-transform hover:scale-105"
    >
      {cardContent}
    </Link>
  );
}