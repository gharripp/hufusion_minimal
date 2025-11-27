import {
    collection,
    updateDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    Timestamp,
    setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AccountRequest } from '../types/admin';

const REQUESTS_COLLECTION = 'account_requests';
const ALLOWED_USERS_COLLECTION = 'allowed_users';

// Create a new account request
export async function createAccountRequest(email: string, name: string, reason?: string): Promise<void> {
    try {
        // We use the email as the document ID.
        // This allows us to prevent duplicates using security rules:
        // - 'create' is allowed (public)
        // - 'update' is denied (admin only)
        // So if a document with this email already exists, setDoc will be treated as an update and fail.
        await setDoc(doc(db, REQUESTS_COLLECTION, email), {
            email,
            name,
            reason: reason || '',
            status: 'pending',
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error('A request for this email already exists or you do not have permission.');
        }
        console.error('Error creating account request:', error);
        throw error;
    }
}

// Fetch pending requests
export async function fetchPendingRequests(): Promise<AccountRequest[]> {
    try {
        console.log('Fetching pending requests...');
        const q = query(
            collection(db, REQUESTS_COLLECTION),
            where('status', '==', 'pending'),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        console.log('Pending requests found:', snapshot.size);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as AccountRequest[];
    } catch (error: any) {
        console.error('Error fetching pending requests (sorted):', error);

        // Fallback: Try without sorting (likely missing index)
        try {
            console.log('Attempting fallback query (unsorted)...');
            const q = query(
                collection(db, REQUESTS_COLLECTION),
                where('status', '==', 'pending')
            );
            const snapshot = await getDocs(q);
            console.log('Fallback requests found:', snapshot.size);

            // Sort manually in client
            const requests = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as AccountRequest[];

            return requests.sort((a, b) => {
                const dateA = a.createdAt?.toDate?.() || new Date(0);
                const dateB = b.createdAt?.toDate?.() || new Date(0);
                return dateB.getTime() - dateA.getTime();
            });
        } catch (fallbackError) {
            console.error('Error fetching pending requests (fallback):', fallbackError);
            return [];
        }
    }
}

// Approve a request
export async function approveRequest(requestId: string, email: string): Promise<void> {
    try {
        // 1. Update request status
        await updateDoc(doc(db, REQUESTS_COLLECTION, requestId), {
            status: 'approved',
            updatedAt: Timestamp.now()
        });

        // 2. Add to allowed_users
        // Use email as ID for easy lookup
        await setDoc(doc(db, ALLOWED_USERS_COLLECTION, email), {
            email,
            role: 'admin',
            createdAt: Timestamp.now()
        });

    } catch (error) {
        console.error('Error approving request:', error);
        throw error;
    }
}

// Reject a request
export async function rejectRequest(requestId: string): Promise<void> {
    try {
        await updateDoc(doc(db, REQUESTS_COLLECTION, requestId), {
            status: 'rejected',
            updatedAt: Timestamp.now()
        });
    } catch (error) {
        console.error('Error rejecting request:', error);
        throw error;
    }
}

// Check if a user is allowed
export async function checkIsAllowed(email: string): Promise<boolean> {
    console.log('Checking access for:', email);

    // Always allow the super admin (case-insensitive)
    if (email.toLowerCase() === 'fusion@hamptonu.edu') {
        console.log('Super admin allowed');
        return true;
    }

    try {
        const docRef = doc(db, ALLOWED_USERS_COLLECTION, email);
        const docSnap = await getDoc(docRef);
        const exists = docSnap.exists();
        console.log('User exists in allowed_users:', exists);
        return exists;
    } catch (error) {
        console.error('Error checking allowed status:', error);
        return false;
    }
}
