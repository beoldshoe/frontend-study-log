# 로그인 및 로그아웃 시뮬레이션 구현, 시간에 따른 자동 로그아웃 시뮬레이션 구현

* 사용 기술
  * React, Vite, Zustand

## 로그인
* 임의로 만들어둔 id, pw가 일치하면 zustand를 활용해 isLoggedIn 변수 true로 변경
* HomePage는 isLogggedIn 변수를 확인하고 로그인 상태(true, false)에 따라 다르게 문구 렌더링

