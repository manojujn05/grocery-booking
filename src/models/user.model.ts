import { Request, Response } from "express";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import pool from '../database/connection';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

async function Register(req: Request, res: Response) {
  try {
    let { name, email, password } = req.body;

    if (!isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insSQL = `INSERT INTO user (email, name, password) VALUES (?, ?, ?)`;
    const [rows, fields] = await pool.execute(insSQL, [email, name, hashedPassword]);

    return rows;
  } catch (error: any) {
    return  error.message;
  }
}

async function Login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const sql = `SELECT * FROM user WHERE email = ?`;
    const result: any[][] | any[] = await pool.execute(sql, [email]);
    const rows: any[] = Array.isArray(result[0]) ? result[0] : [result[0]];

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || '', {
        expiresIn: '1h' 
      });
       return token ;
    } else {
      return "Invalid credentials.";
    }
  } catch (error: any) {
    return  "Internal server error.";
  }
}

export { User, Register, Login };
