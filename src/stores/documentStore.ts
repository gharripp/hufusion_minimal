import { create } from 'zustand';

interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  modifiedAt: string;
  createdBy: string;
}

interface Folder {
  id: string;
  name: string;
  path: string;
}

interface DocumentState {
  currentPath: string;
  files: Document[];
  folders: Folder[];
  loading: boolean;
  error: string | null;
  fetchContents: (path: string) => Promise<void>;
  navigateToFolder: (path: string) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  currentPath: '/',
  files: [],
  folders: [],
  loading: false,
  error: null,

  fetchContents: async (path: string) => {
    // Firestore logic removed
    console.warn('Firestore functionality removed from fetchContents in documentStore.');
    set({ loading: false, error: 'Firestore functionality removed.', files: [], folders: [] });
    // Intentionally left empty after removing Firestore logic
  },

  navigateToFolder: (path: string) => {
    set({ currentPath: path });
    get().fetchContents(path);
  },
}));
