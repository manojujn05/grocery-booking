import express, { Router } from 'express';
import { itemRouter } from './items/items.router';
import { orderRouter } from './orders/orders.router';
import { userRouter } from './users/user.router';

const api: Router = express.Router();

api.use('/item', itemRouter);
api.use('/user', userRouter);
api.use('/order', orderRouter);

export default api;