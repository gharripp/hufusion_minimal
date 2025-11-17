import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, Building2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = `Contact Form: ${formData.interest}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AOrganization: ${formData.organization}%0D%0AInterest: ${formData.interest}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;

    window.location.href = `mailto:fusion@hamptonu.edu?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        organization: '',
        interest: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Are you interested in one of our open positions, collaboration opportunities,
            supporting our research, or contributing to the project in any other way?
            Fill out the form below or send us an email at{' '}
            <a
              href="mailto:fusion@hamptonu.edu"
              className="text-hampton-blue hover:underline font-semibold"
            >
              fusion@hamptonu.edu
            </a>
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline-block w-4 h-4 mr-2" />
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white placeholder-gray-500"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="inline-block w-4 h-4 mr-2" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white placeholder-gray-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                <Building2 className="inline-block w-4 h-4 mr-2" />
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white placeholder-gray-500"
                placeholder="Your university, company, or institution"
              />
            </div>

            {/* Interest */}
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                Area of Interest *
              </label>
              <select
                id="interest"
                name="interest"
                required
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white"
              >
                <option value="">Select an option</option>
                <option value="Open Positions">Open Positions</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Support/Funding">Support/Funding</option>
                <option value="Student Opportunities">Student Opportunities</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                <MessageSquare className="inline-block w-4 h-4 mr-2" />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white placeholder-gray-500 resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-hampton-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                Your email client will open. Please send the email to complete your submission.
              </div>
            )}
          </form>
        </div>

        {/* Direct Contact Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center bg-gray-900 rounded-lg px-6 py-4">
            <Mail className="w-5 h-5 mr-3 text-hampton-blue" />
            <span className="text-gray-300">Or email us directly at:</span>
            <a
              href="mailto:fusion@hamptonu.edu"
              className="ml-2 text-hampton-blue hover:underline font-semibold"
            >
              fusion@hamptonu.edu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
