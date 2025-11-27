import { Timestamp } from 'firebase/firestore';

export interface AccountRequest {
    id: string;
    email: string;
    name: string;
    reason?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface AllowedUser {
    email: string;
    role: 'admin';
    createdAt: Timestamp;
}
