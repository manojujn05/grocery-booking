import { Request, Response } from 'express';
import { getAllItems, getItem } from '../../models/item.model';

async function GetAllItems(req: Request, res: Response): Promise<Response> {
  try {
    const launches = await getAllItems();
    return res.status(200).json(launches);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

async function GetItem(req: Request, res: Response): Promise<Response> {
  try {
    const category = await getItem(req, res);
    return res.status(200).json(category);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}

export {
  GetAllItems,
  GetItem,
};
