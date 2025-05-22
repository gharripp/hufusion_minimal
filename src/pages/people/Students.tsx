import React from 'react';
import PersonCard from '../../components/PersonCard';
import PageHeader from '../../components/PageHeader';

const studentMembers = [
  {
    id: 'student-1',
    name: 'Jane Doe',
    role: 'Graduate Student',
    title: 'PhD Candidate',
    image: '/images/georg.jpg',
    specialization: 'Plasma Diagnostics',
  },
  {
    id: 'student-2',
    name: 'John Smith',
    role: 'Undergraduate Student',
    title: 'Research Assistant',
    image: '/images/georg.jpg',
    specialization: 'Fusion Reactor Design',
  },
   {
    id: 'student-3',
    name: 'Alice Johnson',
    role: 'Undergraduate Student',
    title: 'Research Assistant',
    image: '/images/georg.jpg',
    specialization: 'Plasma Theory',
  },
];

export default function Students() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-16">
        <PageHeader 
          title="Students"
          description="Meet our talented students contributing to cutting-edge fusion research"
        />
        
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentMembers.map((member) => (
              <PersonCard key={member.id} person={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}