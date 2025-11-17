import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Users } from 'lucide-react';

interface Project {
  students: string[];
  title: string;
  description: string;
}

const projectsBySemester = [
  {
    semester: '2024 Fall & 2025 Spring',
    projects: [
      {
        students: ['Karen Hu', 'Yuna Chung'],
        title: 'Magnetic Field Measurement',
        description: 'Print wind and measure the magnetic field of a coil from the QUASR database.',
      },
      {
        students: ['Laura James'],
        title: 'Magnetic Field Visualization',
        description: 'Visualize magnetic fields using ferrofluids and perform spectroscopy analysis.',
      },
      {
        students: ['Brenden Forrest', 'Kamar Mann'],
        title: 'Power Supply Integration',
        description: 'Got the 200A CISCO power supplies to work and designed and printed a connector for them.',
      },
      {
        students: ['Krystall Scott', 'Zach Meggett'],
        title: 'Planar Test Coil Design',
        description: 'Designed a planar test coil to use as a test load for our power system.',
      },
      {
        students: ['Angel Gayles', 'Jayla Higgs', 'Leila Alston'],
        title: 'Non-Resonant Divertor Research',
        description: 'Started to understand and reproduce the non-resonant divertor publications and simulations.',
      },
    ],
  },
];

export default function Undergraduate() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <PageHeader
        title="Past Student Projects"
        description="Explore the innovative research projects completed by our undergraduate students"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {projectsBySemester.map((semesterData, idx) => (
          <div key={idx} className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-hampton-blue pb-3">
              {semesterData.semester}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {semesterData.projects.map((project, projectIdx) => (
                <div
                  key={projectIdx}
                  className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
                >
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  {/* Students */}
                  <div className="flex items-start mb-4">
                    <Users className="w-5 h-5 text-hampton-blue mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-gray-300 text-sm">
                      {project.students.join(', ')}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-center border border-hampton-blue/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in Joining Our Research Team?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We welcome motivated students who are passionate about fusion energy research.
            Check out our Summer Research Program or contact us to learn about current opportunities.
          </p>
          <a
            href="/contact"
            className="inline-block bg-hampton-blue hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
