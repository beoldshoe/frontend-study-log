import { create } from 'zustand';
import { loginApi } from '../api/login.js';

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  setLogin: (value) => set({ isLoggedIn: value }),
  login: async (id, pw) => {
    const result = await loginApi(id, pw);
    if (result.success) {
      set({ isLoggedIn: true });
      localStorage.setItem('token', result.token);
      return true;
    } else {
      set({ isLoggedIn: false });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
