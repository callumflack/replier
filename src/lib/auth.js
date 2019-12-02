/**
 * Handle authentication
 *
 * @module auth
 */
import api from './api';

export const login = async credentials => api.post('/write/auth/login', credentials);

export const register = async credentials => api.post('/write/auth/register', credentials);

export const logout = async () => api.get('/write/auth/logout');

export const getUser = async () => api.get('/write/auth/user');
