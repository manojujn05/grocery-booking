import { GetAllItems,  GetItem } from './items.controller';
import express from 'express';
const itemRouter = express.Router();

itemRouter.get('/', GetAllItems);
itemRouter.post('/', GetItem);

export {
  itemRouter
};