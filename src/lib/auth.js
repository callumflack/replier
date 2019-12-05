/**
 * Handle authentication
 *
 * @module auth
 */
import api from './api';

export const login = async (credentials) => {
  const data = await api.post('/write/auth/login', credentials);

  if (data.token) {
    localStorage.setItem('bearerToken', data.token);
  }

  return data;
};

export const register = async (credentials) => {
  const data = await api.post('/write/auth/register', credentials);

  if (data.token) {
    localStorage.setItem('bearerToken', data.token);
  }

  return data;
};


export const logout = async () => {
  /*
  const data = api.get('/write/auth/logout', null, {
  */
  /* eslint-disable */
  /*
    bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwic3RyaXBlQ3VzdG9tZXJJZCI6ImN1c19HSHY1cE00ZnRIdWZQVyIsInN0cmlwZVN1YnNjcmlwdGlvbklkIjoic3ViX0dIdjVnTlh2Y3VBNW1NIiwic3RyaXBlU3Vic2NyaXB0aW9uRW5kIjpudWxsLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTAyVDAzOjM5OjM5LjYxM1oiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTAyVDAzOjM5OjM5LjYxM1oiLCJpYXQiOjE1NzU1MDgwNzJ9.9gppHG_OtlWS4RQ0BuSwEVMeDhoPOrzkQ6pohgqEJ9c',
  });
  */

  localStorage.removeItem('bearerToken');
};

export const getUser = async () => {
  return api.get('/write/auth/user');
};
