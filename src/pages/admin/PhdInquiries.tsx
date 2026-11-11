import { useEffect, useState } from 'react';
import { Calendar, Download, GraduationCap, Mail, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import usePageTitle from '../../hooks/usePageTitle';
import {
    deletePhdInquiry,
    fetchPhdInquiries,
    getCvDownloadUrl,
    updatePhdInquiryStatus,
} from '../../services/phdService';
import { PhdInquiry, PhdInquiryStatus } from '../../types/phd';

const STATUSES: PhdInquiryStatus[] = ['new', 'reviewed', 'contacted', 'archived'];

const STATUS_STYLES: Record<PhdInquiryStatus, string> = {
    new: 'bg-blue-900/60 text-blue-300 border-blue-500/50',
    reviewed: 'bg-yellow-900/40 text-yellow-300 border-yellow-500/40',
    contacted: 'bg-green-900/40 text-green-300 border-green-500/40',
    archived: 'bg-gray-800 text-gray-400 border-gray-600',
};

function Detail({ label, value }: { label: string; value?: string }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
            <dd className="text-gray-200">{value}</dd>
        </div>
    );
}

export default function PhdInquiries() {
    usePageTitle('Ph.D. Inquiries');
    const { user } = useAuthStore();
    const [inquiries, setInquiries] = useState<PhdInquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<PhdInquiryStatus | 'all'>('all');

    useEffect(() => {
        if (!user) return;
        fetchPhdInquiries()
            .then(setInquiries)
            .catch((err) => {
                console.error(err);
                setError('Failed to load inquiries. Is your account approved as an admin?');
            })
            .finally(() => setLoading(false));
    }, [user]);

    const changeStatus = async (inquiry: PhdInquiry, status: PhdInquiryStatus) => {
        try {
            await updatePhdInquiryStatus(inquiry.id, status);
            setInquiries((list) => list.map((i) => (i.id === inquiry.id ? { ...i, status } : i)));
        } catch {
            alert('Failed to update status');
        }
    };

    const openCv = async (inquiry: PhdInquiry) => {
        if (!inquiry.cvPath) return;
        // Open the tab synchronously so pop-up blockers allow it, then point it at the file.
        const tab = window.open('', '_blank');
        try {
            const url = await getCvDownloadUrl(inquiry.cvPath);
            if (tab) tab.location.href = url;
            else window.location.href = url;
        } catch {
            tab?.close();
            alert('Could not open the CV.');
        }
    };

    const remove = async (inquiry: PhdInquiry) => {
        if (!confirm(`Delete the inquiry from ${inquiry.name} (including the CV)? This cannot be undone.`)) return;
        try {
            await deletePhdInquiry(inquiry);
            setInquiries((list) => list.filter((i) => i.id !== inquiry.id));
        } catch {
            alert('Failed to delete inquiry');
        }
    };

    if (!user) return <div className="text-white pt-32 text-center">Please log in.</div>;

    const visible = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);
    const count = (s: PhdInquiryStatus) => inquiries.filter((i) => i.status === s).length;

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <GraduationCap className="w-8 h-8 text-hampton-blue" />
                            Ph.D. Inquiries
                        </h1>
                        <p className="text-gray-400 mt-1">Submitted through hufusion.org/phd</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(['all', ...STATUSES] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                                    filter === s ? 'bg-hampton-blue border-hampton-blue text-white' : 'border-gray-700 text-gray-300 hover:border-gray-500'
                                }`}
                            >
                                {s === 'all' ? `All (${inquiries.length})` : `${s} (${count(s)})`}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-gray-400">Loading…</div>
                ) : error ? (
                    <div className="text-red-400">{error}</div>
                ) : visible.length === 0 ? (
                    <div className="text-gray-400">No inquiries{filter !== 'all' ? ` with status "${filter}"` : ''}.</div>
                ) : (
                    <div className="space-y-4">
                        {visible.map((inq) => (
                            <article key={inq.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">{inq.name}</h2>
                                        <a href={`mailto:${inq.email}`} className="inline-flex items-center gap-2 text-hampton-blue hover:text-white">
                                            <Mail className="w-4 h-4" />
                                            {inq.email}
                                        </a>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            {inq.createdAt?.toDate?.().toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={inq.status}
                                            onChange={(e) => changeStatus(inq, e.target.value as PhdInquiryStatus)}
                                            className={`px-3 py-1 rounded border text-sm capitalize ${STATUS_STYLES[inq.status] ?? STATUS_STYLES.new}`}
                                            aria-label="Status"
                                        >
                                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <button
                                            onClick={() => remove(inq)}
                                            className="p-2 bg-red-900/40 text-red-400 rounded hover:bg-red-900 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    <Detail label="Current status" value={inq.currentStatus} />
                                    <Detail label="Institution" value={inq.institution} />
                                    <Detail label="Field" value={inq.field} />
                                    <Detail label="Desired start" value={inq.startTerm} />
                                    <Detail label="Heard via" value={inq.source} />
                                </dl>

                                <div className="mb-4">
                                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Interests</div>
                                    <p className="text-gray-200 whitespace-pre-wrap">{inq.interests}</p>
                                </div>
                                {inq.message && (
                                    <div className="mb-4">
                                        <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Message</div>
                                        <p className="text-gray-300 whitespace-pre-wrap">{inq.message}</p>
                                    </div>
                                )}

                                {inq.cvPath ? (
                                    <button
                                        onClick={() => openCv(inq)}
                                        className="inline-flex items-center gap-2 bg-hampton-blue hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        CV: {inq.cvName}
                                    </button>
                                ) : (
                                    <span className="text-sm text-gray-500">No CV attached</span>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
