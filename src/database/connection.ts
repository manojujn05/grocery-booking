const mysql = require("mysql2/promise");
import { Pool, PoolConnection } from 'mysql2/promise';
require('dotenv').config();
// for production
const pool: Pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

pool
  .getConnection()
  .then((connection: PoolConnection) => {
    console.log("Connected to MySQL database!");
    connection.release();
  })
  .catch((error: Error) => {
    console.error("Error connecting to MySQL database:", error.message);
  });

export default pool;
