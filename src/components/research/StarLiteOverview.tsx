import React from 'react';
// Consider adding images if available in your project structure
// import starLiteDiagram from '../assets/images/starlite-diagram.png'; // Example

const StarLiteOverview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section 1: Introduction and Vision */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Introducing STAR_Lite</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-900 p-6 rounded-lg space-y-4">
            <p className="text-gray-300 leading-relaxed">
              STAR_Lite is a unique, student-driven initiative at Hampton University designed to provide unparalleled hands-on education in fusion science while contributing meaningfully to stellarator research.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Conceived by Dr. Calvin Lowe and built primarily by undergraduate and high school students, STAR_Lite embraces innovative, cost-effective design and manufacturing. Its dual goals are:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>To train the next generation of fusion scientists and engineers with practical, real-world experience.</li>
              <li>To advance research, particularly in areas like non-resonant divertors (NRDs), building on HU's expertise.</li>
            </ul>
          </div>
          {/* Optional: Add an image/diagram here */}
          {/* <div className="flex justify-center">
            <img src={starLiteDiagram} alt="STAR_Lite concept" className="rounded-lg max-w-sm w-full"/>
          </div> */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Guiding Principles</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-hampton-blue mr-2">•</span>
                <span><strong className="text-white">Hands-on Training:</strong> Student-led design, construction, and operation ("Coils will be made, not bought").</span>
              </li>
              <li className="flex items-start">
                <span className="text-hampton-blue mr-2">•</span>
                <span><strong className="text-white">High Plasma Access:</strong> Design prioritizes extensive diagnostic and experimental access.</span>
              </li>
              <li className="flex items-start">
                <span className="text-hampton-blue mr-2">•</span>
                <span><strong className="text-white">Simplified & Cost-Effective:</strong> Utilizes accessible techniques and resourceful engineering (e.g., aluminum coils, repurposed power supplies).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Design Evolution & Innovation */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">From Concept to QUASR</h2>
        <div className="bg-gray-900 p-6 rounded-lg space-y-6">
          <p className="text-gray-300 leading-relaxed">
            STAR_Lite's design has evolved strategically. Initial concepts involved helical coils fabricated with industry partners. However, to accelerate the timeline and enhance in-house capabilities, the team developed the **"spine winding" technique**.
          </p>
          <ul className="space-y-3 text-gray-300 list-disc list-inside pl-4">
            <li>Allows modular coil segments to be built in-house around a single pre-bent rod.</li>
            <li>Empowers students directly in fabrication.</li>
            <li>Enables staged construction and testing (e.g., "STAR_little" prototype).</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            Following optimization challenges and community feedback, a pivotal decision was made to adopt the **QUASR 104183 configuration**. This existing, computationally optimized design offers:
          </p>
          <ul className="space-y-3 text-gray-300 list-disc list-inside pl-4">
            <li>Significant acceleration of the project timeline.</li>
            <li>Direct alignment with HU's NRD research strengths, featuring a desirable tokamak-like X-point divertor geometry.</li>
            <li>Synergy with modular coil construction and the spine winding technique.</li>
            <li>Buildability at R=0.5m, B=0.1T using planned manufacturing and power systems.</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Student Powerhouse */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Powered by Student Innovation</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          STAR_Lite is fundamentally a student-led project, providing invaluable experience across multiple disciplines:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Student Contribution Card */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-hampton-blue mb-2">Poloidal Coil Construction</h3>
            <p className="text-gray-300 text-sm">Undergrads Krystal Scott & Zach Meggett design and build planar field coils, mastering winding and fabrication.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-hampton-blue mb-2">Power System Development</h3>
            <p className="text-gray-300 text-sm">Freshmen Brenden Forrest & Kamar Mann engineer a budget-conscious system using batteries, repurposed welders, and server supplies.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-hampton-blue mb-2">STAR_little Prototype</h3>
            <p className="text-gray-300 text-sm">High schoolers Yuna Chung & Karen Hu build a 1/5th scale model, gaining early fusion experience.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-hampton-blue mb-2">Ferrofluid Visualization</h3>
            <p className="text-gray-300 text-sm">Chemical Engineering student Laura James explores novel, low-cost magnetic field mapping techniques.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-hampton-blue mb-2">NRD Theory & Simulation</h3>
            <p className="text-gray-300 text-sm">Undergrads Leila Alston, Jayla Higgs & Angel Gayles perform simulations informing STAR_Lite's experimental NRD program.</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      </section>

      {/* Section 4: Resourceful Engineering */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Engineering Fusion on a Budget</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Innovative Power System</h3>
            <p className="text-gray-300 mb-4">
              Meeting high current demands affordably required creativity:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Leveraging existing 48V battery bank.</li>
              <li>Repurposing 750A welding power supplies.</li>
              <li>Integrating low-cost, refurbished 40V server power supplies for scalability.</li>
              <li>Using brushed DC motor controllers for digital current control.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              This approach provides essential power while offering rich learning opportunities in power electronics.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Vacuum Vessel Pathways</h3>
            <p className="text-gray-300 mb-4">
              The team is evaluating several manufacturing options for the vacuum vessel, balancing complexity, cost, and performance:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>3D-Printed Stainless Steel (e.g., WAAM).</li>
              <li>Conventional Welded Pipe Segments.</li>
              <li>Complex Bridged/Lofted Designs (feasibility under study).</li>
              <li>Exploratory Hybrid Glass & Steel concepts for visual access.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Research Goals and Future */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Future Horizons</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Research & Development Roadmap:</h3>
          <ul className="space-y-3 text-gray-300 mb-6">
            <li className="flex items-start">
              <span className="text-hampton-blue mr-2">•</span>
              <span><strong className="text-white">Field Validation:</strong> Detailed mapping using a Hall probe system, starting small and scaling up.</span>
            </li>
            <li className="flex items-start">
              <span className="text-hampton-blue mr-2">•</span>
              <span><strong className="text-white">Configuration Optimization:</strong> Continued SIMSOPT work to simplify coils and potentially add TF/divertor coils.</span>
            </li>
            <li className="flex items-start">
              <span className="text-hampton-blue mr-2">•</span>
              <span><strong className="text-white">Sensitivity Studies:</strong> Assessing impact of manufacturing/placement errors and testing configuration robustness.</span>
            </li>
            <li className="flex items-start">
              <span className="text-hampton-blue mr-2">•</span>
              <span><strong className="text-white">NRD & Island Studies:</strong> Experimental investigation of QUASR's X-point divertor and inherent magnetic islands.</span>
            </li>
            <li className="flex items-start">
              <span className="text-hampton-blue mr-2">•</span>
              <span><strong className="text-white">First Plasmas:</strong> Achieving initial discharges in STAR_little, followed by optimization in the full STAR_Lite device.</span>
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            STAR_Lite is poised to significantly contribute to fusion workforce development and stellarator science, demonstrating that impactful research is achievable through student-driven innovation and resourcefulness at the university scale.
          </p>
          {/* Optional: Add Collaboration/Internship Call */}
          {/* <div className="mt-6 border-t border-gray-700 pt-6">
            <h4 className="text-lg text-hampton-blue mb-2">Get Involved</h4>
            <p className="text-gray-300">We welcome collaborations and offer exciting internship opportunities for students passionate about fusion. Contact us to learn more.</p>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default StarLiteOverview;
