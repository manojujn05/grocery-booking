import { GetAllItems,  GetItem, InsertItem, DelItem, UpdateItem, GetAvailableItems } from './items.controller';
import express from 'express';
import authToken from '../../middleware/auth'
const itemRouter = express.Router();

itemRouter.get('/allItems', GetAllItems);
itemRouter.get('/avlItems', GetAvailableItems);
itemRouter.post('/insert', authToken, InsertItem);
itemRouter.get('/delete/:id', authToken, DelItem);
itemRouter.post('/update', authToken, UpdateItem);

export {
  itemRouter
};