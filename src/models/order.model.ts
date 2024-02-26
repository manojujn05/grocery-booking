import { Request, Response } from "express";
import pool from '../database/connection';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

async function bookOrder(req: Request, res: Response): Promise<any> {
    const order_items = req.body;

    try {
        // Start transaction
        await pool.query('START TRANSACTION');

        // Insert entries into Order
        const orderQuery = 'INSERT INTO orders (user_id, order_date, total_amount) VALUES (?, NOW(), 0)';
        const orderResult = await pool.query<ResultSetHeader>(orderQuery, [order_items[0].user_id]);
        const orderId = orderResult[0].insertId;
        const orderItemSql = 'INSERT INTO order_items (order_id, item_id, quantity, date) VALUES (?, ?, ?, NOW())';
        const priceSql = 'SELECT price FROM grocery_items WHERE Id = ?';
        let total = 0;
        // Insert order items and calculate total amount
        for (const item of order_items) {
            const { item_id, quantity } = item;
            // Insert order item
            await pool.query(orderItemSql, [orderId, item_id, quantity]);
            // Retrieve item price
            const priceResult = await pool.query<RowDataPacket[]>(priceSql, [item_id]);
            // Calculate total amount if price is found
            if (priceResult && priceResult.length > 0) {
                const [{ price }] = priceResult[0];
                total += price * parseInt(quantity);
            }
        }
        // Update order total amount
        const updTotalSql = 'UPDATE orders SET total_amount = ? WHERE Id = ?';
        await pool.query(updTotalSql, [total, orderId]);

        // Commit transaction
        await pool.query('COMMIT');

        return { message: 'Order placed successfully.', orderId };
    } catch (error: any) {
        // Rollback in case of error
        await pool.query('ROLLBACK');
        return { error: 'Internal server error', details: error.message };
    }
}

export { bookOrder };
