import React, { useState } from 'react';
import { Mail, User, AlertCircle } from 'lucide-react';
import { createAccountRequest } from '../../services/adminService';

export default function RequestAccess() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reason: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            await createAccountRequest(formData.email, formData.name, formData.reason);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', reason: '' });
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage((error as Error).message || 'Failed to submit request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">Request Admin Access</h1>
                    <p className="text-lg text-gray-300">
                        Submit a request to access the admin panel. You will be notified when your account is approved.
                    </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            />
                        </div>

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
                            />
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                                <AlertCircle className="inline-block w-4 h-4 mr-2" />
                                Reason (Optional)
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                rows={3}
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-hampton-blue focus:border-transparent text-white placeholder-gray-500 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-hampton-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-center">
                                Request submitted successfully! Please wait for approval.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
                                {errorMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
