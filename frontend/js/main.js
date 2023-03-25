import { createUser, getUsers, getUser } from './userController.js';

const users = await getUsers();

console.log(users);
