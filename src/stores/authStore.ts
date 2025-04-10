import { create } from 'zustand';

interface AuthState {
  user: null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
}));
