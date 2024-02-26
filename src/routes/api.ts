import express, { Router } from 'express';
import { itemRouter } from './items/items.router';

const api: Router = express.Router();

api.use('/item', itemRouter);

export default api;