import { createOrder } from './order.controller';
import express from 'express';
import authToken from '../../middleware/auth'
const orderRouter = express.Router();

orderRouter.post('/insert',authToken, createOrder);

export {
  orderRouter
};