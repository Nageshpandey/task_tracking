import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      login: (token, email, userId) => {
        localStorage.setItem(`auth_token_${email}`, token);
        set({ token, userId });
      },
      logout: (email) => {
        localStorage.removeItem(`auth_token_${email}`);
        set({ token: null, userId: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
