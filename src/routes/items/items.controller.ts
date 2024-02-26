import { Request, Response } from 'express';
import { getAllItems, getItem, delItem, insertItem, updateItem, getAvailableItems } from '../../models/item.model';

async function GetAllItems(req: Request, res: Response): Promise<Response> {
  try {
    const items = await getAllItems();
    return res.status(200).json(items);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function GetAvailableItems(req: Request, res: Response): Promise<Response> {
  try {
    const item = await getAvailableItems();
    return res.status(200).json(item);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function GetItem(req: Request, res: Response): Promise<Response> {
  try {
    const item = await getItem(req, res);
    return res.status(200).json(item);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function DelItem(req: Request, res: Response): Promise<Response> {
  try {
    const item = await delItem(req, res);
    return res.status(200).json(item);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function InsertItem(req: Request, res: Response): Promise<Response> {
  try {
    const item = await insertItem(req, res);
    return res.status(200).json(item);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function UpdateItem(req: Request, res: Response): Promise<Response> {
  try {
    const item = await updateItem(req, res);
    return res.status(200).json(item);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

export {
  GetAllItems,
  GetItem,
  DelItem,
  InsertItem,
  UpdateItem,
  GetAvailableItems,
};
