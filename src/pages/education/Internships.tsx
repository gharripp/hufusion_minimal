import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Users, Zap, Cpu, Printer, Route, Atom } from 'lucide-react';

interface Team {
  name: string;
  students: string[];
  project: string;
  description: string;
  icon: React.ReactNode;
}

const summerProgram2024: Team[] = [
  {
    name: 'Theoretical Research',
    students: ['Leila Alston', 'Cheyenne (Howard University)'],
    project: 'Non-Resonant Divertor Hamiltonian Studies',
    description: 'Continuing theoretical research studying the NRD Hamiltonian.',
    icon: <Atom className="w-8 h-8 text-hampton-blue" />,
  },
  {
    name: 'Power System Development',
    students: ['Brenden Forrest', 'Wisdom Jagoi', 'Kamar Mann'],
    project: 'STAR_Little Power System',
    description: 'Figured out how to build the STAR_Little power system. Started with 12V power supplies and motor controller and a battery tester as a dummy load. The goal was to run 3 power supplies and motor controllers in parallel.',
    icon: <Zap className="w-8 h-8 text-hampton-blue" />,
  },
  {
    name: 'Hall Probe Instrumentation',
    students: ['Angel Gayles', 'Bishop Asare'],
    project: '16-Probe Holder Design & Fabrication',
    description: 'Designed and printed a holder for our 16 hall probes. Learned to operate and repair our filament and resin 3D printers in the process.',
    icon: <Printer className="w-8 h-8 text-hampton-blue" />,
  },
  {
    name: 'Motion Control Systems',
    students: ['James Garner (Fayetteville State University)', 'Abdul-Majeed Hamidu'],
    project: 'Translation Stage Control with Python',
    description: 'Learned to talk to our Thorlabs x, y, and z translation stages using Python which are used to position the hall probes precisely.',
    icon: <Route className="w-8 h-8 text-hampton-blue" />,
  },
  {
    name: 'FEM Simulation',
    students: ['Patrick Janes (University of Alabama)'],
    project: 'STAR_Lite Magnetic Field Simulation',
    description: 'Got familiar with COMSOL and simulated the magnetic field of our STAR_Lite configuration using Finite Element Method (FEM).',
    icon: <Cpu className="w-8 h-8 text-hampton-blue" />,
  },
];

export default function Internships() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <PageHeader
        title="Summer Research Program 2025"
        description="Hands-on fusion energy research experience for undergraduate students"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Program Overview */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 mb-12 border border-hampton-blue/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Summer Research Program
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            The HU Fusion Summer Research Program is an intensive 8-week program that provides
            undergraduate students with immersive, hands-on experience in fusion energy research.
            Students work in small teams on real research projects, learning cutting-edge experimental
            and computational techniques while contributing to the advancement of fusion science.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            The program concludes with an educational trip where students visit leading fusion
            research facilities and companies to see the broader landscape of fusion energy development.
          </p>
        </div>

        {/* First Cohort Highlight */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <Users className="w-8 h-8 text-hampton-blue mr-3" />
            <h2 className="text-3xl font-bold text-white">
              First Cohort - 10 Students
            </h2>
          </div>
          <p className="text-gray-300 text-lg mb-8">
            Our inaugural summer cohort consisted of 10 talented students who tackled diverse
            research challenges across theory, experimental design, instrumentation, and simulation.
          </p>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {summerProgram2024.map((team, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors border border-gray-800 hover:border-hampton-blue/50"
              >
                {/* Icon and Team Name */}
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {team.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {team.name}
                  </h3>
                </div>

                {/* Project Title */}
                <h4 className="text-hampton-blue font-semibold mb-3">
                  {team.project}
                </h4>

                {/* Students */}
                <div className="mb-3">
                  <span className="text-gray-400 text-sm font-medium">Team Members:</span>
                  <p className="text-gray-300 text-sm mt-1">
                    {team.students.join(', ')}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {team.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Trip Highlight */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-hampton-blue/50">
          <h3 className="text-2xl font-bold text-white mb-4">
            Greater Boston Area Research Tour
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            In the 9th week, 7 students participated in an amazing work and education trip to the
            greater Boston area, visiting world-leading fusion energy facilities and companies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-hampton-blue font-bold mb-2">Type One Energy</h4>
              <p className="text-gray-400 text-sm">Commercial stellarator development</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-hampton-blue font-bold mb-2">Commonwealth Fusion Systems</h4>
              <p className="text-gray-400 text-sm">Tokamak commercialization</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-hampton-blue font-bold mb-2">MIT PSFC</h4>
              <p className="text-gray-400 text-sm">Plasma Science and Fusion Center</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">
            This unique opportunity allowed students to network with professionals, see cutting-edge
            fusion technology, and understand the diverse career pathways in fusion energy.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-center border border-hampton-blue/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in Joining Our Next Cohort?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Applications for future summer research programs will be announced here.
            For more information or to express your interest, please get in touch with us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-hampton-blue hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
