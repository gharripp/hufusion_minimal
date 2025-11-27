import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { fetchPendingRequests, approveRequest, rejectRequest } from '../../services/adminService';
import { AccountRequest } from '../../types/admin';
import { Check, X, User, Mail, Calendar } from 'lucide-react';

export default function AdminRequests() {
    const { user } = useAuthStore();
    const [requests, setRequests] = useState<AccountRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const data = await fetchPendingRequests();
            setRequests(data);
        } catch (err) {
            setError('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (req: AccountRequest) => {
        if (!confirm(`Approve access for ${req.email}?`)) return;
        try {
            await approveRequest(req.id, req.email);
            setRequests(requests.filter(r => r.id !== req.id));
        } catch (err) {
            alert('Failed to approve request');
        }
    };

    const handleReject = async (req: AccountRequest) => {
        if (!confirm(`Reject request from ${req.email}?`)) return;
        try {
            await rejectRequest(req.id);
            setRequests(requests.filter(r => r.id !== req.id));
        } catch (err) {
            alert('Failed to reject request');
        }
    };

    if (!user) return <div className="text-white pt-32 text-center">Please log in.</div>;

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">Pending Access Requests</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : requests.length === 0 ? (
                    <div className="text-gray-400">No pending requests.</div>
                ) : (
                    <div className="grid gap-4">
                        {requests.map((req) => (
                            <div key={req.id} className="bg-gray-900 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold">{req.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-300">{req.email}</span>
                                    </div>
                                    {req.reason && (
                                        <div className="text-sm text-gray-400 mt-2 italic">"{req.reason}"</div>
                                    )}
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        {req.createdAt?.toDate?.().toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleApprove(req)}
                                        className="p-2 bg-green-900/50 text-green-400 rounded hover:bg-green-900 transition-colors"
                                        title="Approve"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleReject(req)}
                                        className="p-2 bg-red-900/50 text-red-400 rounded hover:bg-red-900 transition-colors"
                                        title="Reject"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
