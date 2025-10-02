import axios from 'axios';

export async function userHasValidToken(redirect?: boolean) {
  try {
    const api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    await api.get('/api/user');

    if (redirect) {
      window.location.href = '/dashboard';
    }

    return true;
  } catch (err) {
    void err;

    if (redirect) {
      window.location.href = '/user/authenticate';
    }

    return false;
  }
}
