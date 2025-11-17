import React from 'react';
import PersonCard from '../../components/PersonCard';
import PageHeader from '../../components/PageHeader';

const studentGroups = [
  {
    groupName: 'Power Supply',
    students: [
      {
        id: 'brenden-forrest',
        name: 'Brenden Forrest',
        role: 'Student',
        title: 'Power Supply Team',
        specialization: 'Power Supply',
      },
      {
        id: 'wisdom-jagoi',
        name: 'Wisdom Jagoi',
        role: 'Student',
        title: 'Power Supply Team',
        specialization: 'Power Supply',
      },
      {
        id: 'kamar-mann',
        name: 'Kamar Mann',
        role: 'Student',
        title: 'Power Supply Team',
        specialization: 'Power Supply',
      },
    ],
  },
  {
    groupName: 'Hall Probe',
    students: [
      {
        id: 'bishop-asare',
        name: 'Bishop Asare',
        role: 'Student',
        title: 'Hall Probe Team',
        specialization: 'Hall Probe',
      },
      {
        id: 'james-garner',
        name: 'James Garner',
        role: 'Student',
        title: 'Hall Probe Team',
        specialization: 'Hall Probe',
      },
      {
        id: 'ransford-antwi',
        name: 'Ransford Antwi',
        role: 'Student',
        title: 'Hall Probe Team',
        specialization: 'Hall Probe',
      },
    ],
  },
  {
    groupName: 'Field Visualization',
    students: [
      {
        id: 'aba-anokye',
        name: 'Aba Anokye',
        role: 'Student',
        title: 'Field Visualization Team',
        specialization: 'Field Visualization',
      },
      {
        id: 'abdul-majeed-hamidu',
        name: 'Abdul-Majeed Hamidu',
        role: 'Student',
        title: 'Field Visualization Team',
        specialization: 'Field Visualization',
      },
    ],
  },
  {
    groupName: 'Theory and Simulation',
    students: [
      {
        id: 'leila-alston',
        name: 'Leila Alston',
        role: 'Student',
        title: 'Theory and Simulation Team',
        specialization: 'Theory and Simulation',
      },
      {
        id: 'jayla-higgs',
        name: 'Jayla Higgs',
        role: 'Student',
        title: 'Theory and Simulation Team',
        specialization: 'Theory and Simulation',
      },
      {
        id: 'copernic-mensah',
        name: 'Copernic Mensah',
        role: 'Student',
        title: 'Theory and Simulation Team',
        specialization: 'Theory and Simulation',
      },
      {
        id: 'patrick-janes',
        name: 'Patrick Janes',
        role: 'Student',
        title: 'Theory and Simulation Team',
        specialization: 'Theory and Simulation',
      },
    ],
  },
  {
    groupName: 'STAR_Little',
    students: [
      {
        id: 'rudra-patel',
        name: 'Rudra Patel',
        role: 'Student',
        title: 'STAR_Little Team',
        specialization: 'STAR_Little',
      },
      {
        id: 'abigail-wahl',
        name: 'Abigail Wahl',
        role: 'Student',
        title: 'STAR_Little Team',
        specialization: 'STAR_Little',
      },
      {
        id: 'eddie-zhu',
        name: 'Eddie Zhu',
        role: 'Student',
        title: 'STAR_Little Team',
        specialization: 'STAR_Little',
      },
    ],
  },
  {
    groupName: 'Former Students',
    students: [
      {
        id: 'karen-hu',
        name: 'Karen Hu',
        role: 'Former Student',
        title: 'Former Student',
        specialization: 'Alumni',
      },
      {
        id: 'yuna-chung',
        name: 'Yuna Chung',
        role: 'Former Student',
        title: 'Former Student',
        specialization: 'Alumni',
      },
      {
        id: 'krystall-scott',
        name: 'Krystall Scott',
        role: 'Former Student',
        title: 'Former Student',
        specialization: 'Alumni',
      },
      {
        id: 'zach-meggett',
        name: 'Zach Meggett',
        role: 'Former Student',
        title: 'Former Student',
        specialization: 'Alumni',
      },
      {
        id: 'laura-james',
        name: 'Laura James',
        role: 'Former Student',
        title: 'Former Student',
        specialization: 'Alumni',
      },
      {
        id: 'angel-gayles',
        name: 'Angel Gayles',
        role: 'Former Student',
        title: 'Former Student',
        specialization: 'Alumni',
      },
    ],
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

        <div className="px-4 sm:px-6 lg:px-8 space-y-12">
          {studentGroups.map((group) => (
            <div key={group.groupName}>
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-hampton-blue pb-2">
                {group.groupName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {group.students.map((student) => (
                  <PersonCard key={student.id} person={student} clickable={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}