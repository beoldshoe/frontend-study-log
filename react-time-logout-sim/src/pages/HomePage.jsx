import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function HomePage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const goLoginpage = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>HomePage</h1>
      {isLoggedIn ? (
        <>
          <p>로그인됨! 환영합니다.</p>
          <p>토큰 여부 : {localStorage.getItem('token')}</p>
          <p>로그인 여부 : {isLoggedIn}</p>
          <button onClick={() => useAuthStore.getState().logout()}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <p>로그인이 필요합니다.</p>
          <p>토큰 여부 : {localStorage.getItem('token')}</p>
          <p>로그인 여부 : {isLoggedIn}</p>
          <button onClick={goLoginpage}>로그인</button>
        </>
      )}
    </div>
  );
}

export default HomePage;
