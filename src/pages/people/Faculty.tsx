import PersonCard from '../../components/PersonCard';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  title: string;
  image?: string;
  specialization: string;
}

const projectManagement: StaffMember[] = [
  {
    id: 'hattie-session',
    name: 'Hattie Session',
    role: 'Project Manager',
    title: 'Project Manager',
    image: '/images/hattie_session.jpg',
    specialization: 'HU Fusion',
  },
];

const facultyMembers: StaffMember[] = [
  {
    id: 'dr-lowe',
    name: 'Dr. Calvin Lowe',
    role: 'HU Fusion Director',
    title: 'Research Professor',
    image: '/images/Calvin-Lowe.png',
    specialization: 'Plasma Physics',
  },
  {
    id: 'dr-naik',
    name: 'Dr. Shibabrat Naik',
    role: 'STAR_Lite Theory Lead',
    title: 'Assistant Professor',
    image: '/images/naik_shibabrat.jpg',
    specialization: 'Non-Linear Systems',
  },
  {
    id: 'dr-tema-biwole',
    name: 'Dr. Arsene Tema Biwole',
    role: 'STAR_Lite Experiment',
    title: 'Assistant Professor',
    image: '/images/arsene_tema_biwole.jpg',
    specialization: 'Plasma Transport',
  },
  {
    id: 'dr-smith',
    name: 'Dr. Carl Smith',
    role: 'RF Pulsed Power',
    title: 'Research Assistant Professor',
    image: '/images/carl_smith.jpg',
    specialization: 'RF Pulsed Power',
  },
  {
    id: 'dr-harrer',
    name: 'Dr. Georg Harrer',
    role: 'STAR_Lite Experimental Lead',
    title: 'Research Assistant Professor',
    image: '/images/georg_harrer.jpg',
    specialization: 'Plasma Edge Physics',
  },
];

const cfrtFounders: StaffMember[] = [
  {
    id: 'dr-punjabi',
    name: 'Dr. Alkesh Punjabi',
    role: 'Head of HU Theory',
    title: 'Research Professor',
    image: '/images/punjabi.jpg',
    specialization: 'Divertor Theory',
  },
  {
    id: 'dr-ali',
    name: 'Dr. Halima Ali',
    role: 'Education Director',
    title: 'Professor',
    image: '/images/halima_ali.jpg',
    specialization: 'Divertor Theory',
  },
];

const sections: { heading: string; description?: string; members: StaffMember[] }[] = [
  { heading: 'Project Management', members: projectManagement },
  { heading: 'Faculty', members: facultyMembers },
  {
    heading: 'Founders of CFRT',
    description: 'Founders of the Center for Fusion Research and Training (CFRT), established in 1994.',
    members: cfrtFounders,
  },
];

export default function Faculty() {
  usePageTitle('Staff');

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-16">
        <PageHeader
          title="Staff"
          description="Meet the people behind HU Fusion and the STAR_Lite stellarator"
        />

        <div className="px-4 sm:px-6 lg:px-8 space-y-16 mt-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-hampton-blue mb-2">{section.heading}</h2>
              {section.description && (
                <p className="text-gray-400 mb-6">{section.description}</p>
              )}
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${section.description ? '' : 'mt-6'}`}>
                {section.members.map((member) => (
                  <PersonCard key={member.id} person={member} clickable={false} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
