import React from 'react';
import PageHeader from '../../components/PageHeader';

export default function CfrtDivertorResearch() {
  return (
    <div className="min-h-screen bg-black pt-20"> {/* Added pt-20 assuming header is fixed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PageHeader
          title="Center for Fusion Research and Training (CFRT)"
          description="Pioneering fusion research, education, and divertor theory at Hampton University"
        />

        {/* Section 1: History and Legacy of CFRT */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">A Legacy of Fusion Research and Training</h2>
          <div className="bg-gray-900 p-6 rounded-lg mb-8 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Hampton University's journey in fusion energy began in 1983. Recognizing the need for specialized training and research opportunities, particularly within HBCUs, the **HU Center for Fusion Research and Training (CFRT)** was established in 1994.
            </p>
            <p className="text-gray-300 leading-relaxed">
              CFRT holds the distinction of being the **first and only center for fusion research and training in the nation located at an HBCU** and within the Commonwealth of Virginia. This pioneering spirit extends to its core mission: mentoring students at all levels.
            </p>
            {/* Optional: Add a summary of student mentoring stats or a simplified visual */}
            <div className="pt-4">
               <h3 className="text-xl text-hampton-blue mb-3">Student Mentorship Impact (Since Inception):</h3>
               <ul className="list-disc list-inside text-gray-300 space-y-1">
                 <li>Extensive involvement from High School, Undergraduate, MS, and PhD students.</li>
                 <li>Students have significantly contributed to numerous conference papers and refereed publications.</li>
                 {/* You could add specific numbers from page 2 of the PDF if desired */}
               </ul>
            </div>
             <p className="text-gray-300 leading-relaxed pt-4">
              The center has a strong publication record, including numerous refereed papers in leading journals (PRL, PoP, NF, etc.) and contributions to major conferences (APS DPP, IAEA FEC). Key long-term collaborations, notably with Dr. Allen H. Boozer (Columbia University) since 1986, have been instrumental.
            </p>
          </div>
        </section>

        {/* Section 2: Non-Resonant Divertor (NRD) Research */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Advancing Stellarator Divertor Physics</h2>
           <div className="bg-gray-900 p-6 rounded-lg space-y-6">
            <p className="text-gray-300 leading-relaxed">
              A significant focus of CFRT's theoretical research, led by Dr. Alkesh Punjabi in collaboration with Dr. Allen Boozer, has been the development and understanding of the **Non-resonant Stellarator Divertor (NRD)** concept, a term coined by Boozer in 2015.
            </p>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What is a Non-Resonant Divertor?</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The core idea of NRD is that magnetic field lines just outside the main confining plasma region naturally collimate into distinct bundles or "magnetic turnstiles." These turnstiles, always appearing in pairs (one incoming, one outgoing), efficiently guide heat and particles towards specific locations on the vessel wall. Understanding how and why these field lines collimate is central to NRD research.
              </p>
              <h4 className="text-lg text-hampton-blue mb-2">Key Properties and Advantages:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-hampton-blue mr-2">•</span>
                  <span>Potential insensitivity to net plasma current, simplifying stellarator operation.</span>
                </li>
                 <li className="flex items-start">
                  <span className="text-hampton-blue mr-2">•</span>
                  <span>Demonstrated resilience and robustness against changes in plasma configuration and external factors (as seen in HSX studies).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hampton-blue mr-2">•</span>
                  <span>Appear naturally in optimized stellarators due to magnetic field shaping near the edge.</span>
                </li>
                 <li className="flex items-start">
                  <span className="text-hampton-blue mr-2">•</span>
                  <span>Considered a potentially revolutionary concept for handling heat exhaust in future stellarator power plants.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Research Approaches and Findings</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                NRD phenomena are studied using both simplified analytical Hamiltonians and detailed magnetic configurations of real devices (like HSX or W7-X). Research at HU using Hamiltonian methods has identified distinct topological types of NRDs:
              </p>
               <ul className="space-y-2 text-gray-300 list-disc list-inside mb-4">
                  <li>NRD Proper</li>
                  <li>Hybrid NRD</li>
                  <li>Two-Mode NRD (noted for potentially favorable properties like long connection length and small footprints)</li>
                </ul>
              <p className="text-gray-300 leading-relaxed">
                Foundational understanding explores concepts like Cantori (holes or slits in magnetic surfaces) and magnetic X-lines as mechanisms for turnstile formation. This research continues to be an active area with broad interest in the fusion community.
              </p>
              {/* Optional: Link to key publications if desired */}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}