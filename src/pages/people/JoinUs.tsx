import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function JoinUs() {
    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Join the HU Fusion Team
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We are actively recruiting talented and motivated individuals to help build the STAR_Lite stellarator.
                        This is a unique opportunity to shape a fusion device from the very beginning.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">

                    {/* What we are looking for */}
                    <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                        <h2 className="text-2xl font-bold mb-6 text-hampton-blue">We are looking for people who want to:</h2>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-blue-500" />
                                <div>
                                    <strong className="text-white block mb-1">Build a real device:</strong>
                                    <span className="text-gray-400">Join one of the few stellarator projects actively being constructed right now.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-purple-500" />
                                <div>
                                    <strong className="text-white block mb-1">Bridge hardware and software:</strong>
                                    <span className="text-gray-400">Get hands-on with a screwdriver <em>and</em> run measurements as well as advanced simulation codes.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-blue-500" />
                                <div>
                                    <strong className="text-white block mb-1">See the big picture:</strong>
                                    <span className="text-gray-400">Prefer to understand and work on all key components of a stellarator, rather than being a small part of a massive project.</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-purple-500" />
                                <div>
                                    <strong className="text-white block mb-1">Make an impact:</strong>
                                    <span className="text-gray-400">Get involved at the critical early stages of setup, commissioning, and first-plasma experiments.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Current Openings */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            Current Openings
                            <div className="h-px bg-gray-800 flex-grow ml-4"></div>
                        </h2>

                        <div className="space-y-6">
                            {/* Assistant Professor */}
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-hampton-blue transition-colors group">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-hampton-blue transition-colors">
                                            Tenure-Track Assistant Professor
                                        </h3>
                                        <p className="text-gray-400 mt-1">Plasma Physics / Fusion Energy</p>
                                    </div>
                                    <a
                                        href="https://home.hamptonu.edu/hr/2025/11/13/assistant-professor-of-plasma-physics-2/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-hampton-blue hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold whitespace-nowrap"
                                    >
                                        Apply Now <ExternalLink className="ml-2 w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Post-Doc */}
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                <h3 className="text-xl font-bold text-white mb-2">Post-Doctoral Research Staff</h3>
                                <p className="text-gray-400 mb-4">
                                    We are seeking motivated post-doctoral researchers to lead experimental and computational efforts.
                                </p>
                                <Link to="/contact" className="text-hampton-blue hover:text-white transition-colors inline-flex items-center">
                                    Contact us to apply <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>

                            {/* Grad Students */}
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                <h3 className="text-xl font-bold text-white mb-2">Graduate Students (Ph.D. and M.Sc.)</h3>
                                <p className="text-gray-400 mb-4">
                                    Join our graduate program and conduct cutting-edge research in stellarator physics.
                                </p>
                                <Link to="/contact" className="text-hampton-blue hover:text-white transition-colors inline-flex items-center">
                                    Inquire about positions <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>

                            {/* Undergrad */}
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                <h3 className="text-xl font-bold text-white mb-2">Undergraduate Researchers (B.Sc.)</h3>
                                <p className="text-gray-400 mb-4">
                                    Gain hands-on experience in our lab. We welcome enthusiastic undergraduates from Physics and Engineering.
                                </p>
                                <Link to="/contact" className="text-hampton-blue hover:text-white transition-colors inline-flex items-center">
                                    Get involved <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* General CTA */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 rounded-2xl border border-blue-500/30 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                        <p className="text-gray-300 mb-6">
                            If you don't see a specific opening that fits but are passionate about our work, we'd still love to hear from you.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block w-full sm:w-auto bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-lg transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
