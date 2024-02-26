import { login,  register } from './users.controller';
import express from 'express';
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);

export {
  userRouter
};