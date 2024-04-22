import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`;

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

const createPostTableQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

const createCommentTableQuery = `
  CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
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

async function createTable(createTableQuery, tableName) {
  try {
    await pool.query(`USE ${process.env.MYSQL_DATABASE}`);
    const [rows, fields] = await pool.query(createTableQuery);
    console.log(`Table ${tableName} created successfully!`);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createDatabase();
createTable(createUserTableQuery, "users");
createTable(createPostTableQuery, "posts");
createTable(createCommentTableQuery, "comments");

export default pool;
