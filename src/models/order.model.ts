import { Request, Response } from "express";
import pool from '../database/connection';

async function bookOrder(req: Request, res: Response): Promise<Response> {
  const { user_id, order_items } = req.body;

  try {
    // Start a transaction
    await pool.query('START TRANSACTION');

    // Insert into orders table
    const orderQuery = 'INSERT INTO orders (user_id, order_date) VALUES (?, NOW())';
    const [orderResult] = await pool.query(orderQuery, [user_id]);
    const orderId = 1;
    console.log(orderResult);
    // Insert into order_items table
    const orderItemQuery = 'INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)';
    for (const { item_id, quantity } of order_items) {
      await pool.query(orderItemQuery, [orderId, item_id, quantity]);
    }

    // Commit the transaction
    await pool.query('COMMIT');

    return res.status(201).json({ message: 'Order placed successfully.', orderId });
  } catch (error: any) {
    // Rollback in case of error
    await pool.query('ROLLBACK');
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

export { bookOrder };
