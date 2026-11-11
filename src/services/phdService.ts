import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { PhdInquiry, PhdInquiryInput, PhdInquiryStatus } from '../types/phd';

const COLLECTION = 'phd_inquiries';
const CV_FOLDER = 'phd_cvs';

export const CV_MAX_BYTES = 10 * 1024 * 1024;
export const CV_ACCEPTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function sanitizeFileName(name: string): string {
    const cleaned = name.replace(/[^A-Za-z0-9._-]+/g, '_').replace(/^_+|_+$/g, '');
    return (cleaned || 'cv').slice(-100);
}

// Public: submit an inquiry, optionally with a CV.
// Security rules allow anyone to create (never read) inquiries and CV files.
export async function submitPhdInquiry(input: PhdInquiryInput, cv: File | null): Promise<void> {
    const docRef = doc(collection(db, COLLECTION));

    let cvPath: string | undefined;
    let cvName: string | undefined;
    if (cv) {
        cvName = sanitizeFileName(cv.name);
        cvPath = `${CV_FOLDER}/${docRef.id}/${cvName}`;
        await uploadBytes(ref(storage, cvPath), cv, { contentType: cv.type });
    }

    await setDoc(docRef, {
        name: input.name.trim(),
        email: input.email.trim(),
        currentStatus: input.currentStatus,
        institution: input.institution.trim(),
        field: input.field.trim(),
        interests: input.interests.trim(),
        startTerm: input.startTerm,
        source: input.source,
        message: input.message.trim(),
        ...(cvPath ? { cvPath, cvName } : {}),
        consent: true,
        status: 'new',
        createdAt: serverTimestamp(),
    });
}

// Admin: list all inquiries, newest first.
export async function fetchPhdInquiries(): Promise<PhdInquiry[]> {
    const snapshot = await getDocs(query(collection(db, COLLECTION), orderBy('createdAt', 'desc')));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PhdInquiry));
}

export async function updatePhdInquiryStatus(id: string, status: PhdInquiryStatus): Promise<void> {
    await updateDoc(doc(db, COLLECTION, id), { status });
}

export async function getCvDownloadUrl(cvPath: string): Promise<string> {
    return getDownloadURL(ref(storage, cvPath));
}

export async function deletePhdInquiry(inquiry: PhdInquiry): Promise<void> {
    if (inquiry.cvPath) {
        try {
            await deleteObject(ref(storage, inquiry.cvPath));
        } catch (error) {
            console.error('Could not delete CV file:', error);
        }
    }
    await deleteDoc(doc(db, COLLECTION, inquiry.id));
}
