# 로그인 및 로그아웃 시뮬레이션 구현, 시간에 따른 자동 로그아웃 시뮬레이션 구현

* 사용 기술
  * React, Vite, Zustand

## 로그인
* 임의로 만들어둔 id, pw가 일치하면 zustand를 활용해 isLoggedIn 변수 true로 변경
* 로그인 성공, 실패에 대한 alert 처리

## 홈페이지
* 남은 시간을 확인하기 위해 남은 시간 화면에 출력(10초로 설정)
* 로그인, 비로그인 시의 화면이 상이
* HomePage는 isLogggedIn 변수를 확인하고 로그인 상태(true, false)에 따라 다르게 문구 렌더링
* 로그인이 되어있을 때는 localstorage에 임시로 저장한 토큰 화면에 출력

## 비로그인시 홈페이지
<img width="342" height="277" alt="image" src="https://github.com/user-attachments/assets/ece44c5f-ac78-498b-ac41-bacb37217dfb" />


## 로그인시 홈페이지
<img width="356" height="255" alt="스크린샷 2025-07-26 오후 11 45 23" src="https://github.com/user-attachments/assets/db324c64-e7de-4e1b-a2d3-cb38e24e75de" />

핸들러에 등록된 이벤트가 10초간 일어나지 않았을 때 alert 창을 띄우고 자동 로그아웃

<img width="445" height="147" alt="스크린샷 2025-07-26 오후 11 45 48" src="https://github.com/user-attachments/assets/e9f31c4a-0c21-48c0-be9a-0ff97a980131" />


  

