import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Upload, X } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import { CV_ACCEPTED_TYPES, CV_MAX_BYTES, submitPhdInquiry } from '../services/phdService';
import { PhdInquiryInput } from '../types/phd';

const EMPTY_FORM: PhdInquiryInput = {
    name: '',
    email: '',
    currentStatus: '',
    institution: '',
    field: '',
    interests: '',
    startTerm: '',
    source: '',
    message: '',
};

const STATUS_OPTIONS = [
    'Undergraduate student',
    "Bachelor's degree completed",
    "Master's student",
    "Master's degree completed",
    'Other',
];

const START_OPTIONS = ['Fall 2027', 'Spring 2028', 'Fall 2028', 'Not sure yet'];

const SOURCE_OPTIONS = ['Flyer', 'HU Fusion website', 'Conference or talk', 'Professor or colleague', 'Other'];

const inputClass =
    'w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white placeholder-gray-500';
const labelClass = 'block text-sm font-medium text-gray-300 mb-2';

export default function PhdApply() {
    usePageTitle('Ph.D. Positions');

    const [form, setForm] = useState<PhdInquiryInput>(EMPTY_FORM);
    const [cv, setCv] = useState<File | null>(null);
    const [consent, setConsent] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const fileInput = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const file = e.target.files?.[0] ?? null;
        if (!file) return;
        if (!CV_ACCEPTED_TYPES.includes(file.type)) {
            setError('Please upload your CV as a PDF or Word document.');
            e.target.value = '';
            return;
        }
        if (file.size > CV_MAX_BYTES) {
            setError('Your CV must be smaller than 10 MB.');
            e.target.value = '';
            return;
        }
        setCv(file);
    };

    const clearFile = () => {
        setCv(null);
        if (fileInput.current) fileInput.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Bots fill hidden fields; quietly pretend success.
        if (honeypot) {
            setSubmitted(true);
            return;
        }

        setIsSubmitting(true);
        try {
            await submitPhdInquiry(form, cv);
            setSubmitted(true);
            setForm(EMPTY_FORM);
            clearFile();
            setConsent(false);
        } catch (err) {
            console.error('PhD inquiry submission failed:', err);
            setError('Something went wrong while sending your information. Please try again, or email us at fusion@hamptonu.edu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Ph.D. Positions in Stellarator Research
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Help build and operate STAR_Lite, Hampton University's new stellarator. Our Ph.D. students work on
                        every part of the device: hardware, diagnostics, experiments and simulation.
                        Tell us a little about yourself and we will get back to you.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Want to know more first? See{' '}
                        <Link to="/research/star-lite" className="text-hampton-blue hover:text-white">STAR_Lite</Link>
                        {' '}and{' '}
                        <Link to="/people/join" className="text-hampton-blue hover:text-white">Join the Team</Link>.
                    </p>
                </div>

                {submitted ? (
                    <div className="bg-gray-900 rounded-2xl p-10 text-center border border-green-500/40">
                        <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-3">Thank you!</h2>
                        <p className="text-gray-300 mb-8">
                            We have received your information and will be in touch soon.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-hampton-blue hover:text-white transition-colors"
                        >
                            Submit another response
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-800 space-y-6">
                        {/* Honeypot: hidden from people, tempting for bots */}
                        <div className="hidden" aria-hidden="true">
                            <label htmlFor="website">Website</label>
                            <input
                                id="website"
                                name="website"
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className={labelClass}>Full name *</label>
                                <input id="name" name="name" type="text" required maxLength={200}
                                    autoComplete="name" value={form.name} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClass}>Email *</label>
                                <input id="email" name="email" type="email" required maxLength={200}
                                    autoComplete="email" value={form.email} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="currentStatus" className={labelClass}>Current status *</label>
                                <select id="currentStatus" name="currentStatus" required
                                    value={form.currentStatus} onChange={handleChange} className={inputClass}>
                                    <option value="" disabled>Select…</option>
                                    {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="startTerm" className={labelClass}>Desired start</label>
                                <select id="startTerm" name="startTerm"
                                    value={form.startTerm} onChange={handleChange} className={inputClass}>
                                    <option value="">Select…</option>
                                    {START_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="institution" className={labelClass}>University / institution</label>
                                <input id="institution" name="institution" type="text" maxLength={200}
                                    value={form.institution} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="field" className={labelClass}>Field of study</label>
                                <input id="field" name="field" type="text" maxLength={200} placeholder="e.g. Physics, Electrical Engineering"
                                    value={form.field} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="interests" className={labelClass}>What interests you about fusion research and STAR_Lite? *</label>
                            <textarea id="interests" name="interests" required rows={5} maxLength={5000}
                                placeholder="Your research interests, relevant experience (lab work, coding, projects), and what you would like to work on."
                                value={form.interests} onChange={handleChange} className={`${inputClass} resize-y`} />
                        </div>

                        <div>
                            <span className={labelClass}>CV (PDF or Word, max. 10 MB)</span>
                            {cv ? (
                                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-black border border-gray-700 rounded-lg">
                                    <span className="flex items-center gap-2 min-w-0 text-gray-200">
                                        <FileText className="w-5 h-5 flex-shrink-0 text-hampton-blue" />
                                        <span className="truncate">{cv.name}</span>
                                    </span>
                                    <button type="button" onClick={clearFile} className="text-gray-400 hover:text-white" aria-label="Remove CV">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="cv" className="flex items-center justify-center gap-2 px-4 py-6 bg-black border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-hampton-blue text-gray-400 hover:text-white transition-colors">
                                    <Upload className="w-5 h-5" />
                                    Choose a file
                                </label>
                            )}
                            <input ref={fileInput} id="cv" name="cv" type="file" className="sr-only"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleFile} />
                        </div>

                        <div>
                            <label htmlFor="source" className={labelClass}>How did you hear about us?</label>
                            <select id="source" name="source" value={form.source} onChange={handleChange} className={inputClass}>
                                <option value="">Select…</option>
                                {SOURCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className={labelClass}>Anything else? (optional)</label>
                            <textarea id="message" name="message" rows={3} maxLength={5000}
                                value={form.message} onChange={handleChange} className={`${inputClass} resize-y`} />
                        </div>

                        <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
                            <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)}
                                className="mt-1 h-4 w-4 accent-hampton-blue" />
                            <span>
                                I agree that HU Fusion at Hampton University may store the information and CV I submit in order
                                to review my interest and contact me about Ph.D. opportunities. *
                            </span>
                        </label>

                        {error && (
                            <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-hampton-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending…' : 'Send'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
