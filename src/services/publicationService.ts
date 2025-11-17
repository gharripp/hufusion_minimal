import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Publication } from '../types/publication';

const PUBLICATIONS_COLLECTION = 'publications';

export interface PublicationFormData {
  type: 'publication' | 'presentation';
  title: string;
  authors: string;
  year: number;
  journal?: string;
  doi?: string;
  venue?: string;
  presentationType?: 'poster' | 'oral';
  pdf?: File;
}

// Fetch all publications and presentations
export async function fetchPublications(): Promise<Publication[]> {
  try {
    const pubsQuery = query(
      collection(db, PUBLICATIONS_COLLECTION),
      orderBy('year', 'desc')
    );
    const snapshot = await getDocs(pubsQuery);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Publication[];
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

// Upload PDF to Firebase Storage
async function uploadPDF(file: File, publicationId: string): Promise<string> {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `publications/${publicationId}.${fileExtension}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw new Error(`PDF upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create new publication/presentation
export async function createPublication(data: PublicationFormData): Promise<string> {
  try {
    // Create the document first to get an ID
    const docRef = await addDoc(collection(db, PUBLICATIONS_COLLECTION), {
      type: data.type,
      title: data.title,
      authors: data.authors,
      year: data.year,
      journal: data.journal || null,
      doi: data.doi || null,
      venue: data.venue || null,
      presentationType: data.presentationType || null,
      pdfUrl: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    // Upload PDF if provided
    if (data.pdf) {
      const pdfUrl = await uploadPDF(data.pdf, docRef.id);
      await updateDoc(doc(db, PUBLICATIONS_COLLECTION, docRef.id), {
        pdfUrl: pdfUrl
      });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating publication:', error);
    throw error;
  }
}

// Update existing publication/presentation
export async function updatePublication(id: string, data: Partial<PublicationFormData>): Promise<void> {
  try {
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now()
    };

    // Upload new PDF if provided
    if (data.pdf) {
      const pdfUrl = await uploadPDF(data.pdf, id);
      updateData.pdfUrl = pdfUrl;
    }

    // Remove the pdf field if it's a File object (it's been processed)
    if (updateData.pdf instanceof File) {
      delete updateData.pdf;
    }

    await updateDoc(doc(db, PUBLICATIONS_COLLECTION, id), updateData);
  } catch (error) {
    console.error('Error updating publication:', error);
    throw error;
  }
}

// Delete publication/presentation
export async function deletePublication(id: string, pdfUrl?: string): Promise<void> {
  try {
    // Delete PDF from storage if it exists
    if (pdfUrl) {
      try {
        const pdfRef = ref(storage, pdfUrl);
        await deleteObject(pdfRef);
      } catch (error) {
        console.warn('Error deleting PDF:', error);
      }
    }

    // Delete document
    await deleteDoc(doc(db, PUBLICATIONS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting publication:', error);
    throw error;
  }
}
