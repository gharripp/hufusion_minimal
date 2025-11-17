import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { NewsItem } from '../types/news';

const NEWS_COLLECTION = 'news';

export interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image?: File;
}

// Fetch all news articles
export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const newsQuery = query(
      collection(db, NEWS_COLLECTION),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(newsQuery);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.()?.toISOString().split('T')[0] || doc.data().date
    })) as NewsItem[];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Fetch a single news article by ID
export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        date: docSnap.data().date?.toDate?.()?.toISOString().split('T')[0] || docSnap.data().date
      } as NewsItem;
    }
    return null;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    return null;
  }
}

// Upload image to Firebase Storage
async function uploadImage(file: File, newsId: string): Promise<string> {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `news/${newsId}.${fileExtension}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create new news article
export async function createNews(data: NewsFormData): Promise<string> {
  try {
    // Create the document first to get an ID
    const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      category: data.category,
      image: '',
      date: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    // Upload image if provided
    if (data.image) {
      const imageUrl = await uploadImage(data.image, docRef.id);
      await updateDoc(doc(db, NEWS_COLLECTION, docRef.id), {
        image: imageUrl
      });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
}

// Update existing news article
export async function updateNews(id: string, data: Partial<NewsFormData>): Promise<void> {
  try {
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now()
    };

    // Upload new image if provided
    if (data.image) {
      const imageUrl = await uploadImage(data.image, id);
      updateData.image = imageUrl;
    }

    // Remove the image field if it's a File object (it's been processed)
    if (updateData.image instanceof File) {
      delete updateData.image;
    }

    await updateDoc(doc(db, NEWS_COLLECTION, id), updateData);
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

// Delete news article
export async function deleteNews(id: string, imageUrl?: string): Promise<void> {
  try {
    // Delete image from storage if it exists
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.warn('Error deleting image:', error);
      }
    }

    // Delete document
    await deleteDoc(doc(db, NEWS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}
