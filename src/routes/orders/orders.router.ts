import { createOrder } from './order.controller';
import express from 'express';
const orderRouter = express.Router();

orderRouter.post('/order', createOrder);

export {
  orderRouter
};