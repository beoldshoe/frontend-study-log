export async function loginApi(id, pw) {
  const validId = 'test';
  const validPw = '1234';

  if (id === validId && pw === validPw) {
    return {
      success: true,
      token: 'Bearer faketoken-abc123xyz',
    };
  } else {
    return false;
  }
}
