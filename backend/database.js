import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`;

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
}).promise();

async function createDatabase() {
  try {
    await pool.query(createDatabaseQuery);
    console.log("Database created successfully or already exists!");
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
}

async function createTable() {
  try {
    await createDatabase();
    await pool.query(`USE ${process.env.MYSQL_DATABASE}`);
    const [rows, fields] = await pool.query(createUserTableQuery);
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();

export default pool;
