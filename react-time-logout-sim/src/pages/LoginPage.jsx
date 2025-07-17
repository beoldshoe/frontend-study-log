import React, { useState } from 'react';
import { loginApi } from '../api/login';
import useAuthStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const setLogin = useAuthStore((state) => state.setLogin);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginApi(id, pw);
      setLogin(true);
      setError('');
      alert('로그인 완료! 환영합니다.');
      navigate('/');
    } catch (e) {
      setError(e.message);
      setLogin(false);
      setId('');
      setPw('');
      alert(`${error}`);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;
