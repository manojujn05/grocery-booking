const mysql = require("mysql2/promise");
import { Pool, PoolConnection } from 'mysql2/promise';

// for production
const pool: Pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "grocery_booking",
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
