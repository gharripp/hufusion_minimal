import { Timestamp } from 'firebase/firestore';

export type PhdInquiryStatus = 'new' | 'reviewed' | 'contacted' | 'archived';

export interface PhdInquiryInput {
    name: string;
    email: string;
    currentStatus: string;
    institution: string;
    field: string;
    interests: string;
    startTerm: string;
    source: string;
    message: string;
}

export interface PhdInquiry extends PhdInquiryInput {
    id: string;
    cvPath?: string;
    cvName?: string;
    consent: boolean;
    status: PhdInquiryStatus;
    createdAt: Timestamp;
}
