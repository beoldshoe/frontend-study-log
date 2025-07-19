import { create } from 'zustand';
import { loginApi } from '../api/login.js';

const INACTIVITY_TIMEOUT = 10;

let inactivityTimer = null;
let countdownTimer = null;
let cleanupWatcher = null;

const useAuthStore = create((set, get) => {
  const resetInactivityTimer = () => {
    if (!get().isWatching) return;

    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      alert('10초간 활동이 없어 로그아웃됩니다.');
      get().logout();
    }, INACTIVITY_TIMEOUT * 1000);

    set({ remainingTime: INACTIVITY_TIMEOUT });
  };

  const startCountdown = () => {
    if (countdownTimer) clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      const { remainingTime, isWatching } = get();
      if (!isWatching) return;

      if (remainingTime > 0) {
        set({ remainingTime: remainingTime - 1 });
      }
    }, 1000);
  };

  const startInactivityWatcher = () => {
    if (get().isWatching) return;

    set({ isWatching: true });

    const events = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
      'scroll',
    ];
    const handler = () => resetInactivityTimer();

    events.forEach((e) => window.addEventListener(e, handler));
    resetInactivityTimer();
    startCountdown();

    cleanupWatcher = () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (countdownTimer) clearInterval(countdownTimer);
      inactivityTimer = null;
      countdownTimer = null;
      set({ isWatching: false });
    };
  };

  return {
    isLoggedIn: !!localStorage.getItem('token'),
    remainingTime: INACTIVITY_TIMEOUT,
    isWatching: false,
    startInactivityWatcher,
    login: async (id, pw) => {
      const result = await loginApi(id, pw);
      if (result.success) {
        localStorage.setItem('token', result.token);
        set({ isLoggedIn: true });
        startInactivityWatcher();
        return true;
      } else {
        set({ isLoggedIn: false });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ isLoggedIn: false, remainingTime: INACTIVITY_TIMEOUT });

      if (cleanupWatcher) {
        cleanupWatcher();
        cleanupWatcher = null;
      }
    },
  };
});

export default useAuthStore;
