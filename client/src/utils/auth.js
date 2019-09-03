/**
 * Handle authentication
 *
 * @module auth
 */
import api from './api';

export const login = async credentials => api.post('/auth/login', credentials);

export const register = async credentials => api.post('/auth/register', credentials);

export const logout = async () => api.get('/auth/logout');

export const getUser = async () => api.get('/auth/user');
