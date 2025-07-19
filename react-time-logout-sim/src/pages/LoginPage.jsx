import React, { useState } from 'react';
import useAuthStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(id, pw);
    if (result) {
      setId('');
      setPw('');
      alert('로그인 성공');
      navigate('/');
    } else {
      setId('');
      setPw('');
      alert('로그인 실패');
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
