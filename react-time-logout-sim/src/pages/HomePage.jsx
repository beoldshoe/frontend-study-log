import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { useEffect } from 'react';

function HomePage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const remainingTime = useAuthStore((state) => state.remainingTime);
  const startInactivityWatcher = useAuthStore(
    (state) => state.startInactivityWatcher
  );

  const navigate = useNavigate();

  const goLoginpage = () => {
    navigate('/login');
  };

  const logout = () => {
    alert('로그아웃 되었습니다.');
    useAuthStore.getState().logout();
  };
  useEffect(() => {
    if (isLoggedIn) {
      startInactivityWatcher();
    }
  }, [isLoggedIn, startInactivityWatcher]);
  // 로그인 또는 새로고침 마다 감시 함수 실행

  return (
    <div>
      <h1>HomePage</h1>
      {isLoggedIn ? (
        <>
          <p>로그인됨! 환영합니다.</p>
          <p>남은 시간 : {remainingTime}초</p>
          <p>토큰 여부 : {localStorage.getItem('token')}</p>
          <p>로그인 여부 : {isLoggedIn.toString()}</p>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          <p>로그인이 필요합니다.</p>
          <p>남은 시간 : {remainingTime}초</p>
          <p>토큰 여부 : {localStorage.getItem('token')}</p>
          <p>로그인 여부 : {isLoggedIn.toString()}</p>
          <button onClick={goLoginpage}>로그인</button>
        </>
      )}
    </div>
  );
}

export default HomePage;
