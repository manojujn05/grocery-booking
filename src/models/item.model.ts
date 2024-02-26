import { Request, Response } from 'express';
import pool from '../database/connection';

async function getAllItems(): Promise<any> {
  const sqlQuery: string = "SELECT * FROM grocery_items;";
  const [rows, fields] = await pool.execute(sqlQuery);
  return rows;
}

async function getItem(req: Request, res: Response): Promise<any> {
  let { Id } = req.body;
  const selSql: string = `SELECT * FROM grocery_items where Id = ${Id};`;
  const [rows, fields] = await pool.execute(selSql);
  return rows;
}

async function delItem(req: Request, res: Response): Promise<any> {
  let { Id } = req.body;
  const delSql: string = `DELETE FROM grocery_items WHERE Id = ${Id};`;
  const [rows, fields] = await pool.execute(delSql);
  return rows;
}

async function updateItem(req: Request, res: Response): Promise<any> {
  let { Id, name, price, quantity } = req.body;
  let updateFields: string[] = [];
  let queryParams: any[] = [];

  if (name) {
    updateFields.push(`name = ?`);
    queryParams.push(name);
  }
  if (price) {
    updateFields.push(`price = ?`);
    queryParams.push(price);
  }
  if (quantity) {
    updateFields.push(`quantity = ?`);
    queryParams.push(quantity);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  queryParams.push(Id);
  const updSql: string = `UPDATE grocery_items SET ${updateFields.join(", ")} WHERE Id = ?`;
  
  try {
    const [rows, fields] = await pool.execute(updSql, queryParams);
    return res.status(200).json({ message: "Item updated successfully." });
  } catch (error : any) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

async function insertItem(req: Request, res: Response): Promise<any> {
  let { name, price, quantity } = req.body;
  const insQuery: string = `INSERT INTO grocery_items(name, price, quantity) VALUES ('${name}', '${price}', '${quantity}')`;
  console.log(insQuery);
  return await pool.execute(insQuery);
}

export {
  getAllItems,
  getItem,
  insertItem, 
  updateItem,
  delItem
};
