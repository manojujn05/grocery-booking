import { Request, Response } from "express";
import pool from '../database/connection';

async function bookOrder(req: Request, res: Response): Promise<any> {
  const  order_items  = req.body;

  try {
    await pool.query('START TRANSACTION');
    const orderItemQuery = 'INSERT INTO order_items (user_id, item_id, quantity, date) VALUES (?, ?, ?, NOW())';
    for (const item of order_items) {
      const { user_id, item_id, quantity } = item;
      await pool.query(orderItemQuery, [user_id, item_id, quantity]);
    }
    const [rows, fields] = await pool.query('COMMIT');
    return rows;
  } catch (error: any) {
    // Rollback in case of error
    await pool.query('ROLLBACK');
    return error.message ;
  }
}
export { bookOrder };
