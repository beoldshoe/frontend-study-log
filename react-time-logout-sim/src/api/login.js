export function loginApi(id, pw) {
  const validId = 'test';
  const validPw = '1234';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === validId && pw === validPw) {
        resolve(true);
      } else {
        reject(new Error('아이디 또는 비밀번호가 일치하지 않습니다.'));
      }
    }, 500);
  });
}
