import { get, post } from './api.js';

async function login(userData) {
  const response = await post('/login', userData);
  return response;
}

export { login };
