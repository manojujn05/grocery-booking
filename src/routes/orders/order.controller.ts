import { Request, Response } from 'express';
import { bookOrder } from '../../models/order.model';

async function createOrder(req: Request, res: Response): Promise<Response> {
  try {
    const order = await bookOrder(req, res);
    return res.status(200).json(order);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: "Internal server error", details: errorMessage });
  }
}


export {
  createOrder,
};
