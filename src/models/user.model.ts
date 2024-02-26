import { Request, Response } from "express";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import pool from '../database/connection';

async function Register(req: Request, res: Response) {
  try {
    let { name, email, password } = req.body;

    if (!isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const callProcedureSQL = `INSERT INTO user (email, name, password) VALUES (?, ?, ?)`;
    await pool.execute(callProcedureSQL, [email, name, hashedPassword]);

    res.status(201).json({
      message: "Registration successful.",
    });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}

async function Login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const sql = `SELECT * FROM user WHERE email = ?`;
    const result: any[][] | any[] = await pool.execute(sql, [email]);
    const rows: any[][] = Array.isArray(result[0]) ? result[0] : [result[0]];

    //const [rows]: [any[][]] = await pool.execute(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, rows[0][0].password);
    if (passwordMatch) {
      res.status(200).json({ message: "Login successful." });
    } else {
      res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export { Register, Login };
