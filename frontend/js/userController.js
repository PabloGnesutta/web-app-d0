import { get, post } from './api.js';

async function createUser(userData) {
  const response = await post('/users', userData);
  return response;
}

async function getUsers() {
  const users = await get('/users');
  return users;
}

async function getUser(id) {
  const user = await get('/user', '?id=' + id);
  return user;
}

export { createUser, getUsers, getUser };
