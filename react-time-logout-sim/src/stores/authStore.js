import { create } from 'zustand';
import { loginApi } from '../api/login.js';

const INACTIVITY_TIMEOUT = 10;

let inactivityTimer = null; // 비활동 감지용 setTimeout
let countdownTimer = null; // 화면 표시용 남은 시간 카운터 setInterval
let cleanupWatcher = null; // 이벤트/타이머 해제용 함수 저장소

const useAuthStore = create((set, get) => {
  const resetInactivityTimer = () => {
    if (!get().isWatching) return; // 감시 중이 아니면 무시 -> set에 있음

    if (inactivityTimer) clearTimeout(inactivityTimer);
    // setTimeout으로 설정한 타이머를 취소(중단)햐는 함수 -> clearTimeout
    // 사용자가 이벤트를 짧은 시간에 여러 번 발생시키면 함수가 일어나는데, 이 함수를 적용하지 않으면 중첩 예약이 된다.
    inactivityTimer = setTimeout(() => {
      alert('10초간 활동이 없어 로그아웃됩니다.');
      get().logout();
    }, INACTIVITY_TIMEOUT * 1000);

    set({ remainingTime: INACTIVITY_TIMEOUT });
  };

  const startCountdown = () => {
    if (countdownTimer) clearInterval(countdownTimer);
    // 위도 중첩을 방지하기 위해 기존 타이머를 취소
    countdownTimer = setInterval(() => {
      // setInterval은 일정 시간마다 반복 실행
      // 아래와 같은 경우 1000ms(1초)마다 실행
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
