import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setLogin: (value) => set({ isLoggedIn: value }),
}));

export default useAuthStore;
